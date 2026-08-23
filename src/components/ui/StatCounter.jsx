import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * StatCounter — animates a number from 0 to target value when in view.
 * Props:
 *  value  - target number string like "250+" or "15+"
 *  label  - label below the number
 *  icon   - Lucide icon component (optional)
 *  light  - light text variant
 */
export default function StatCounter({ value, label, icon: Icon, light = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Parse numeric value and suffix
  const numeric = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/\d/g, '');

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numeric, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, numeric]);

  const numColor = light ? 'text-white' : 'text-gray-900';
  const labelColor = light ? 'text-gray-300' : 'text-gray-500';
  const iconColor = light ? 'text-orange-400' : 'text-orange-500';

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      {Icon && (
        <Icon className={`w-8 h-8 mb-3 ${iconColor}`} aria-hidden="true" />
      )}
      <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${numColor}`}>
        {display}{suffix}
      </span>
      <span className={`mt-1.5 text-sm font-semibold uppercase tracking-wider ${labelColor}`}>
        {label}
      </span>
    </div>
  );
}
