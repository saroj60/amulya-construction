import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const tables = [
  {
    name: 'users',
    ddl: `CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(191) UNIQUE NOT NULL,
  \`password_hash\` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'projects',
    ddl: `CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`status\` VARCHAR(100) NOT NULL,
  \`location\` VARCHAR(255) NOT NULL DEFAULT '',
  \`duration\` VARCHAR(100) NOT NULL DEFAULT '',
  \`description\` TEXT NOT NULL,
  \`highlights\` LONGTEXT NOT NULL,
  \`specifications\` LONGTEXT NOT NULL,
  \`floorLayout\` LONGTEXT,
  \`image\` TEXT NOT NULL,
  \`gallery\` LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'house_styles',
    ddl: `CREATE TABLE IF NOT EXISTS \`house_styles\` (
  \`id\` VARCHAR(191) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`longDescription\` LONGTEXT NOT NULL,
  \`image\` TEXT NOT NULL,
  \`gallery\` LONGTEXT NOT NULL,
  \`features\` LONGTEXT NOT NULL,
  \`materials\` LONGTEXT NOT NULL,
  \`specifications\` LONGTEXT NOT NULL,
  \`price\` VARCHAR(100) DEFAULT '',
  \`floor_plan_image\` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'hero_slides',
    ddl: `CREATE TABLE IF NOT EXISTS \`hero_slides\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`image\` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'testimonials',
    ddl: `CREATE TABLE IF NOT EXISTS \`testimonials\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`rating\` INT DEFAULT 5,
  \`text\` TEXT NOT NULL,
  \`avatar\` VARCHAR(50) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`designation\` VARCHAR(255) NOT NULL,
  \`location\` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'team',
    ddl: `CREATE TABLE IF NOT EXISTS \`team\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`designation\` VARCHAR(255) NOT NULL,
  \`qualification\` VARCHAR(255) NOT NULL,
  \`experience\` VARCHAR(100) NOT NULL,
  \`avatar\` VARCHAR(50) NOT NULL,
  \`color\` VARCHAR(50) NOT NULL,
  \`image\` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'calculator_config',
    ddl: `CREATE TABLE IF NOT EXISTS \`calculator_config\` (
  \`id\` INT PRIMARY KEY,
  \`config_json\` LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'leads',
    ddl: `CREATE TABLE IF NOT EXISTS \`leads\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`name\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(255),
  \`message\` TEXT NOT NULL,
  \`parameters\` LONGTEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'services',
    ddl: `CREATE TABLE IF NOT EXISTS \`services\` (
  \`id\` VARCHAR(191) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`shortDesc\` TEXT NOT NULL,
  \`fullDesc\` LONGTEXT NOT NULL,
  \`icon\` VARCHAR(100) NOT NULL,
  \`image\` TEXT NOT NULL,
  \`features\` LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    name: 'blogs',
    ddl: `CREATE TABLE IF NOT EXISTS \`blogs\` (
  \`id\` VARCHAR(191) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`summary\` TEXT NOT NULL,
  \`content\` LONGTEXT NOT NULL,
  \`image\` TEXT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  }
];

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return String(val);
  return "'" + String(val)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n') + "'";
}

const run = async () => {
  let sql = '-- ============================================================\n';
  sql += '-- Amulya Builders & Engineering Consulting Pvt. Ltd.\n';
  sql += '-- Hostinger MySQL Database Dump (Schema + Initial Data)\n';
  sql += '-- Import this file directly into phpMyAdmin on Hostinger\n';
  sql += '-- ============================================================\n\n';
  sql += 'SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n';

  for (const t of tables) {
    sql += `-- ------------------------------------------------------------\n`;
    sql += `-- Table structure for \`${t.name}\`\n`;
    sql += `-- ------------------------------------------------------------\n`;
    sql += t.ddl + '\n\n';

    const rows = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${t.name}`, (err, r) => err ? reject(err) : resolve(r || []));
    });

    if (rows.length > 0) {
      const cols = Object.keys(rows[0]).map(c => `\`${c}\``).join(', ');
      for (const row of rows) {
        const vals = Object.keys(row).map(k => esc(row[k])).join(', ');
        sql += `INSERT IGNORE INTO \`${t.name}\` (${cols}) VALUES (${vals});\n`;
      }
      sql += '\n';
    }
  }

  sql += 'SET FOREIGN_KEY_CHECKS = 1;\n';

  fs.writeFileSync(path.join(rootDir, 'hostinger-mysql-database.sql'), sql, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public/api/database.sql'), sql, 'utf8');
  console.log('Generated hostinger-mysql-database.sql and public/api/database.sql successfully (' + sql.length + ' bytes)');
  db.close();
};

run();
