<?php
/**
 * ============================================================
 * AMULYA BUILDERS — HOSTINGER PHP + MYSQL REST API
 * ============================================================
 * Handles all /api/* endpoints for the frontend & Admin Dashboard
 * backed by Hostinger MySQL Database.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

// Connect to Hostinger MySQL via PDO
try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'MySQL Database connection failed. Please check DB_NAME, DB_USER, and DB_PASS in api/config.php.',
        'details' => $e->getMessage()
    ]);
    exit;
}

// Auto-initialize tables & seed data from database.sql if tables do not exist yet
function ensureDatabaseInitialized(PDO $pdo) {
    try {
        $stmt = $pdo->query("SHOW TABLES LIKE 'projects'");
        if ($stmt->rowCount() === 0) {
            $sqlFile = __DIR__ . '/database.sql';
            if (file_exists($sqlFile)) {
                $sql = file_get_contents($sqlFile);
                $pdo->exec($sql);
            }
        }
    } catch (Exception $e) {
        // Ignore auto-init errors if already initialized
    }
}
ensureDatabaseInitialized($pdo);

// ============================================================
// JWT HELPERS (HS256)
// ============================================================
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

function createJwt(array $payload) {
    $header = base64UrlEncode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['exp'] = time() + (8 * 3600); // 8 hours
    $body = base64UrlEncode(json_encode($payload));
    $signature = base64UrlEncode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    return "$header.$body.$signature";
}

function getBearerToken() {
    $headers = [];
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
    }
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $auth, $matches)) {
        return $matches[1];
    }
    return null;
}

function requireAuth() {
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Access token required']);
        exit;
    }
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid token format']);
        exit;
    }
    [$header, $body, $sig] = $parts;
    $expectedSig = base64UrlEncode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    if (!hash_equals($expectedSig, $sig)) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid or expired token']);
        exit;
    }
    $payload = json_decode(base64UrlDecode($body), true);
    if (!$payload || (isset($payload['exp']) && $payload['exp'] < time())) {
        http_response_code(403);
        echo json_encode(['error' => 'Token has expired']);
        exit;
    }
    return $payload;
}

function getJsonBody() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

function verifyBcryptPassword($password, $hash) {
    // Normalize $2a$ or $2b$ from Node bcryptjs to $2y$ for PHP compatibility
    $normalizedHash = preg_replace('/^\$2[ab]\$/', '$2y$', $hash);
    return password_verify($password, $normalizedHash) || password_verify($password, $hash);
}

// Parse request path relative to /api
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace('#^.*/api/?#', '', $requestUri);
$path = trim($path, '/');
$method = $_SERVER['REQUEST_METHOD'];

// ============================================================
// 1. AUTH ROUTES
// ============================================================
if ($path === 'auth/login' && $method === 'POST') {
    $body = getJsonBody();
    $username = trim($body['username'] ?? '');
    $password = $body['password'] ?? '';

    if (!$username || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password are required']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !verifyBcryptPassword($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        exit;
    }

    $token = createJwt(['id' => (int)$user['id'], 'username' => $user['username']]);
    echo json_encode(['token' => $token, 'username' => $user['username']]);
    exit;
}

if ($path === 'auth/change-password' && $method === 'POST') {
    $authUser = requireAuth();
    $body = getJsonBody();
    $oldPassword = $body['oldPassword'] ?? '';
    $newPassword = $body['newPassword'] ?? '';

    if (!$oldPassword || !$newPassword) {
        http_response_code(400);
        echo json_encode(['error' => 'Old and new passwords are required']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ? LIMIT 1");
    $stmt->execute([$authUser['id']]);
    $user = $stmt->fetch();

    if (!$user || !verifyBcryptPassword($oldPassword, $user['password_hash'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Incorrect old password']);
        exit;
    }

    $newHash = password_hash($newPassword, PASSWORD_BCRYPT);
    $upd = $pdo->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
    $upd->execute([$newHash, $authUser['id']]);

    echo json_encode(['message' => 'Password updated successfully']);
    exit;
}

// ============================================================
// 2. PROJECTS CRUD ROUTES
// ============================================================
function formatProjectRow($row) {
    $specs = json_decode($row['specifications'] ?? '{}', true) ?: [];
    return [
        'id' => (int)$row['id'],
        'title' => $row['title'],
        'category' => $row['category'],
        'status' => $row['status'],
        'location' => $row['location'],
        'duration' => $row['duration'],
        'cost' => $specs['Project Cost'] ?? '',
        'year' => $specs['Completion Year'] ?? '',
        'area' => $specs['Total Area'] ?? ($specs['Plinth Area'] ?? ''),
        'description' => $row['description'],
        'image' => $row['image'],
        'gallery' => json_decode($row['gallery'] ?? '[]', true) ?: [],
        'highlights' => json_decode($row['highlights'] ?? '[]', true) ?: [],
        'specifications' => $specs,
        'floorLayout' => json_decode($row['floorLayout'] ?? '[]', true) ?: [],
    ];
}

if ($path === 'projects' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
    $rows = $stmt->fetchAll();
    echo json_encode(array_map('formatProjectRow', $rows));
    exit;
}

if (preg_match('#^projects/(\d+)$#', $path, $m) && $method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ? LIMIT 1");
    $stmt->execute([(int)$m[1]]);
    $row = $stmt->fetch();
    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found']);
        exit;
    }
    echo json_encode(formatProjectRow($row));
    exit;
}

if ($path === 'projects' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    if (empty($b['title']) || empty($b['category']) || empty($b['status']) || empty($b['description']) || empty($b['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Required fields are missing']);
        exit;
    }
    $stmt = $pdo->prepare("INSERT INTO projects (title, category, status, location, duration, description, highlights, specifications, floorLayout, image, gallery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $b['title'],
        $b['category'],
        $b['status'],
        $b['location'] ?? '',
        $b['duration'] ?? '',
        $b['description'],
        json_encode($b['highlights'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['specifications'] ?? new stdClass(), JSON_UNESCAPED_UNICODE),
        json_encode($b['floorLayout'] ?? [], JSON_UNESCAPED_UNICODE),
        $b['image'],
        json_encode($b['gallery'] ?? [], JSON_UNESCAPED_UNICODE),
    ]);
    http_response_code(201);
    echo json_encode(['id' => (int)$pdo->lastInsertId(), 'message' => 'Project created successfully']);
    exit;
}

if (preg_match('#^projects/(\d+)$#', $path, $m) && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE projects SET title = ?, category = ?, status = ?, location = ?, duration = ?, description = ?, highlights = ?, specifications = ?, floorLayout = ?, image = ?, gallery = ? WHERE id = ?");
    $stmt->execute([
        $b['title'] ?? '',
        $b['category'] ?? '',
        $b['status'] ?? '',
        $b['location'] ?? '',
        $b['duration'] ?? '',
        $b['description'] ?? '',
        json_encode($b['highlights'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['specifications'] ?? new stdClass(), JSON_UNESCAPED_UNICODE),
        json_encode($b['floorLayout'] ?? [], JSON_UNESCAPED_UNICODE),
        $b['image'] ?? '',
        json_encode($b['gallery'] ?? [], JSON_UNESCAPED_UNICODE),
        (int)$m[1],
    ]);
    echo json_encode(['message' => 'Project updated successfully']);
    exit;
}

if (preg_match('#^projects/(\d+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([(int)$m[1]]);
    echo json_encode(['message' => 'Project deleted successfully']);
    exit;
}

// ============================================================
// 3. HOUSE STYLES (DESIGNS) CRUD ROUTES
// ============================================================
function formatStyleRow($row) {
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'category' => $row['category'],
        'description' => $row['description'],
        'longDescription' => $row['longDescription'],
        'image' => $row['image'],
        'gallery' => json_decode($row['gallery'] ?? '[]', true) ?: [],
        'features' => json_decode($row['features'] ?? '[]', true) ?: [],
        'materials' => json_decode($row['materials'] ?? '[]', true) ?: [],
        'specifications' => json_decode($row['specifications'] ?? '{}', true) ?: [],
        'price' => $row['price'] ?? '',
        'floor_plan_image' => $row['floor_plan_image'] ?? '',
    ];
}

if ($path === 'house-styles' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM house_styles");
    echo json_encode(array_map('formatStyleRow', $stmt->fetchAll()));
    exit;
}

if (preg_match('#^house-styles/([^/]+)$#', $path, $m) && $method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM house_styles WHERE id = ? LIMIT 1");
    $stmt->execute([$m[1]]);
    $row = $stmt->fetch();
    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Style not found']);
        exit;
    }
    echo json_encode(formatStyleRow($row));
    exit;
}

if ($path === 'house-styles' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("INSERT INTO house_styles (id, title, category, description, longDescription, image, gallery, features, materials, specifications, price, floor_plan_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $b['id'],
        $b['title'],
        $b['category'],
        $b['description'],
        $b['longDescription'],
        $b['image'],
        json_encode($b['gallery'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['features'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['materials'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['specifications'] ?? new stdClass(), JSON_UNESCAPED_UNICODE),
        $b['price'] ?? '',
        $b['floor_plan_image'] ?? '',
    ]);
    http_response_code(201);
    echo json_encode(['message' => 'House style created successfully']);
    exit;
}

if (preg_match('#^house-styles/([^/]+)$#', $path, $m) && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE house_styles SET title = ?, category = ?, description = ?, longDescription = ?, image = ?, gallery = ?, features = ?, materials = ?, specifications = ?, price = ?, floor_plan_image = ? WHERE id = ?");
    $stmt->execute([
        $b['title'],
        $b['category'],
        $b['description'],
        $b['longDescription'],
        $b['image'],
        json_encode($b['gallery'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['features'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['materials'] ?? [], JSON_UNESCAPED_UNICODE),
        json_encode($b['specifications'] ?? new stdClass(), JSON_UNESCAPED_UNICODE),
        $b['price'] ?? '',
        $b['floor_plan_image'] ?? '',
        $m[1],
    ]);
    echo json_encode(['message' => 'House style updated successfully']);
    exit;
}

if (preg_match('#^house-styles/([^/]+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM house_styles WHERE id = ?");
    $stmt->execute([$m[1]]);
    echo json_encode(['message' => 'House style deleted successfully']);
    exit;
}

// ============================================================
// 4. TEAM CRUD ROUTES
// ============================================================
if ($path === 'team' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM team ORDER BY id ASC");
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['id'] = (int)$r['id'];
    }
    echo json_encode($rows);
    exit;
}

if ($path === 'team' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("INSERT INTO team (name, designation, qualification, experience, avatar, color, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $b['name'] ?? '',
        $b['designation'] ?? '',
        $b['qualification'] ?? '',
        $b['experience'] ?? '',
        $b['avatar'] ?? '',
        $b['color'] ?? '#1e40af',
        $b['image'] ?? '',
    ]);
    http_response_code(201);
    echo json_encode(['id' => (int)$pdo->lastInsertId(), 'message' => 'Team member added successfully']);
    exit;
}

if (preg_match('#^team/(\d+)$#', $path, $m) && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE team SET name = ?, designation = ?, qualification = ?, experience = ?, avatar = ?, color = ?, image = ? WHERE id = ?");
    $stmt->execute([
        $b['name'] ?? '',
        $b['designation'] ?? '',
        $b['qualification'] ?? '',
        $b['experience'] ?? '',
        $b['avatar'] ?? '',
        $b['color'] ?? '#1e40af',
        $b['image'] ?? '',
        (int)$m[1],
    ]);
    echo json_encode(['message' => 'Team member updated successfully']);
    exit;
}

if (preg_match('#^team/(\d+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM team WHERE id = ?");
    $stmt->execute([(int)$m[1]]);
    echo json_encode(['message' => 'Team member deleted successfully']);
    exit;
}

// ============================================================
// 5. CALCULATOR CONFIG ROUTES
// ============================================================
if ($path === 'calculator-config' && $method === 'GET') {
    $stmt = $pdo->query("SELECT config_json FROM calculator_config WHERE id = 1 LIMIT 1");
    $row = $stmt->fetch();
    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Config not found']);
        exit;
    }
    echo $row['config_json'];
    exit;
}

if ($path === 'calculator-config' && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE calculator_config SET config_json = ? WHERE id = 1");
    $stmt->execute([json_encode($b, JSON_UNESCAPED_UNICODE)]);
    echo json_encode(['message' => 'Calculator configurations updated successfully']);
    exit;
}

// ============================================================
// 6. LEADS (INQUIRIES) ROUTES
// ============================================================
if ($path === 'leads' && $method === 'POST') {
    $b = getJsonBody();
    if (empty($b['name']) || empty($b['phone']) || empty($b['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, phone, and message are required.']);
        exit;
    }
    $paramsStr = isset($b['parameters']) ? json_encode($b['parameters'], JSON_UNESCAPED_UNICODE) : null;
    $stmt = $pdo->prepare("INSERT INTO leads (name, phone, email, message, parameters) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$b['name'], $b['phone'], $b['email'] ?? '', $b['message'], $paramsStr]);
    http_response_code(201);
    echo json_encode(['id' => (int)$pdo->lastInsertId(), 'message' => 'Your inquiry has been submitted successfully.']);
    exit;
}

if ($path === 'leads' && $method === 'GET') {
    requireAuth();
    $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['id'] = (int)$r['id'];
        $r['parameters'] = !empty($r['parameters']) ? json_decode($r['parameters'], true) : null;
    }
    echo json_encode($rows);
    exit;
}

if (preg_match('#^leads/(\d+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
    $stmt->execute([(int)$m[1]]);
    echo json_encode(['message' => 'Inquiry record deleted successfully']);
    exit;
}

// ============================================================
// 7. SERVICES CRUD ROUTES
// ============================================================
if ($path === 'services' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM services ORDER BY title ASC");
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['features'] = json_decode($r['features'] ?? '[]', true) ?: [];
    }
    echo json_encode($rows);
    exit;
}

if (preg_match('#^services/([^/]+)$#', $path, $m) && $method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ? LIMIT 1");
    $stmt->execute([$m[1]]);
    $row = $stmt->fetch();
    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Service not found']);
        exit;
    }
    $row['features'] = json_decode($row['features'] ?? '[]', true) ?: [];
    echo json_encode($row);
    exit;
}

if ($path === 'services' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    $id = strtolower(preg_replace('/\s+/', '-', trim($b['id'] ?? '')));
    $stmt = $pdo->prepare("INSERT INTO services (id, title, shortDesc, fullDesc, icon, image, features) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $id,
        $b['title'],
        $b['shortDesc'],
        $b['fullDesc'],
        $b['icon'] ?? 'Wrench',
        $b['image'],
        json_encode($b['features'] ?? [], JSON_UNESCAPED_UNICODE),
    ]);
    http_response_code(201);
    echo json_encode(['message' => 'Service created successfully']);
    exit;
}

if (preg_match('#^services/([^/]+)$#', $path, $m) && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE services SET title = ?, shortDesc = ?, fullDesc = ?, icon = ?, image = ?, features = ? WHERE id = ?");
    $stmt->execute([
        $b['title'],
        $b['shortDesc'],
        $b['fullDesc'],
        $b['icon'] ?? 'Wrench',
        $b['image'],
        json_encode($b['features'] ?? [], JSON_UNESCAPED_UNICODE),
        $m[1],
    ]);
    echo json_encode(['message' => 'Service updated successfully']);
    exit;
}

if (preg_match('#^services/([^/]+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
    $stmt->execute([$m[1]]);
    echo json_encode(['message' => 'Service deleted successfully']);
    exit;
}

// ============================================================
// 8. BLOGS CRUD ROUTES
// ============================================================
if ($path === 'blogs' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM blogs ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll());
    exit;
}

if (preg_match('#^blogs/([^/]+)$#', $path, $m) && $method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ? LIMIT 1");
    $stmt->execute([$m[1]]);
    $row = $stmt->fetch();
    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Blog post not found']);
        exit;
    }
    echo json_encode($row);
    exit;
}

if ($path === 'blogs' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    $id = strtolower(preg_replace('/\s+/', '-', trim($b['id'] ?? '')));
    $stmt = $pdo->prepare("INSERT INTO blogs (id, title, summary, content, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$id, $b['title'], $b['summary'], $b['content'], $b['image']]);
    http_response_code(201);
    echo json_encode(['message' => 'Blog post created successfully']);
    exit;
}

if (preg_match('#^blogs/([^/]+)$#', $path, $m) && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE blogs SET title = ?, summary = ?, content = ?, image = ? WHERE id = ?");
    $stmt->execute([$b['title'], $b['summary'], $b['content'], $b['image'], $m[1]]);
    echo json_encode(['message' => 'Blog post updated successfully']);
    exit;
}

if (preg_match('#^blogs/([^/]+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
    $stmt->execute([$m[1]]);
    echo json_encode(['message' => 'Blog post deleted successfully']);
    exit;
}

// ============================================================
// 9. HERO SLIDES ROUTES
// ============================================================
if ($path === 'hero-slides' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM hero_slides ORDER BY id ASC");
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['id'] = (int)$r['id'];
    }
    echo json_encode($rows);
    exit;
}

if ($path === 'hero-slides' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    if (empty($b['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Image URL is required']);
        exit;
    }
    $stmt = $pdo->prepare("INSERT INTO hero_slides (image) VALUES (?)");
    $stmt->execute([$b['image']]);
    http_response_code(201);
    echo json_encode(['id' => (int)$pdo->lastInsertId(), 'image' => $b['image']]);
    exit;
}

if (preg_match('#^hero-slides/(\d+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM hero_slides WHERE id = ?");
    $stmt->execute([(int)$m[1]]);
    echo json_encode(['message' => 'Hero slide deleted successfully']);
    exit;
}

// ============================================================
// 10. TESTIMONIALS ROUTES
// ============================================================
if ($path === 'testimonials' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY id DESC");
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['id'] = (int)$r['id'];
        $r['rating'] = (int)$r['rating'];
    }
    echo json_encode($rows);
    exit;
}

if ($path === 'testimonials' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    $rating = (int)($b['rating'] ?? 5);
    $stmt = $pdo->prepare("INSERT INTO testimonials (rating, text, avatar, name, designation, location) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$rating, $b['text'], $b['avatar'], $b['name'], $b['designation'], $b['location']]);
    http_response_code(201);
    echo json_encode([
        'id' => (int)$pdo->lastInsertId(),
        'rating' => $rating,
        'text' => $b['text'],
        'avatar' => $b['avatar'],
        'name' => $b['name'],
        'designation' => $b['designation'],
        'location' => $b['location'],
    ]);
    exit;
}

if (preg_match('#^testimonials/(\d+)$#', $path, $m) && $method === 'PUT') {
    requireAuth();
    $b = getJsonBody();
    $stmt = $pdo->prepare("UPDATE testimonials SET rating = ?, text = ?, avatar = ?, name = ?, designation = ?, location = ? WHERE id = ?");
    $stmt->execute([
        (int)($b['rating'] ?? 5),
        $b['text'],
        $b['avatar'],
        $b['name'],
        $b['designation'],
        $b['location'],
        (int)$m[1],
    ]);
    echo json_encode(['message' => 'Testimonial updated successfully']);
    exit;
}

if (preg_match('#^testimonials/(\d+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->execute([(int)$m[1]]);
    echo json_encode(['message' => 'Testimonial deleted successfully']);
    exit;
}

// ============================================================
// 11. IMAGE / FILE UPLOAD ROUTE
// ============================================================
if ($path === 'upload' && $method === 'POST') {
    requireAuth();
    $b = getJsonBody();
    $fileName = $b['fileName'] ?? '';
    $base64Data = $b['base64Data'] ?? '';

    if (!$fileName || !$base64Data) {
        http_response_code(400);
        echo json_encode(['error' => 'Filename and base64Data are required.']);
        exit;
    }

    $uploadDir = dirname(__DIR__) . '/uploads';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $sanitizedName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $fileName);
    $uniqueName = round(microtime(true) * 1000) . '-' . $sanitizedName;
    $filePath = $uploadDir . '/' . $uniqueName;

    $decoded = base64_decode($base64Data);
    if (file_put_contents($filePath, $decoded) === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save file to disk.']);
        exit;
    }

    http_response_code(201);
    echo json_encode(['url' => '/uploads/' . $uniqueName]);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'API endpoint not found: ' . $path]);
