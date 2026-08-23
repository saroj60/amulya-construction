import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/utils/animations';

/**
 * SectionHeader — reusable section heading component
 * Props:
 *  label    - small uppercase label above title (string)
 *  title    - main section title (string | JSX)
 *  subtitle - optional paragraph below title (string)
 *  center   - center align (boolean, default false)
 *  light    - light/white text variant for dark backgrounds
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}) {
  const align = center ? 'items-center text-center' : 'items-start';
  const titleColor = light ? 'text-white' : 'text-gray-900';
  const subtitleColor = light ? 'text-gray-300' : 'text-gray-600';

  return (
    <motion.div
      className={`flex flex-col ${align} mb-10 md:mb-14`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      {label && (
        <span className="section-label">
          <span className="w-5 h-0.5 bg-orange-500 rounded-full" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className={`section-title ${titleColor}`}>{title}</h2>
      {!center && (
        <div className="line-accent mt-3" aria-hidden="true" />
      )}
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${subtitleColor} ${center ? 'text-center' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
