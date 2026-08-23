import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { PROCESS_STEPS } from '@/data';
import { fadeUp, viewportOnce, staggerContainer } from '@/utils/animations';

export default function ProcessSection() {
  return (
    <section
      className="section-padding bg-white overflow-hidden"
      aria-label="Our construction process"
    >
      <div className="container-custom">
        <SectionHeader
          label="Our Process"
          title={<>How We <span className="text-orange-500">Work</span></>}
          subtitle="A transparent, step-by-step process designed to make your construction journey smooth, predictable, and stress-free."
          center
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative mt-4">
          {/* Connector line */}
          <div
            className="absolute top-10 left-0 right-0 h-0.5 bg-gray-200 mx-24"
            aria-hidden="true"
          />

          <motion.div
            className="grid grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {PROCESS_STEPS.map((step, i) => {
              const IconComponent = Icons[step.icon] || Icons.Circle;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-5 border-4 border-white"
                    style={{ backgroundColor: step.color }}
                  >
                    <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                    <span
                      className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 text-xs font-extrabold flex items-center justify-center"
                      style={{ color: step.color, borderColor: step.color }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile / Tablet vertical timeline */}
        <div className="lg:hidden mt-4">
          <motion.div
            className="relative pl-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Vertical line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"
              aria-hidden="true"
            />

            {PROCESS_STEPS.map((step, i) => {
              const IconComponent = Icons[step.icon] || Icons.Circle;
              const isLast = i === PROCESS_STEPS.length - 1;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className={`relative flex gap-5 ${isLast ? '' : 'mb-8'}`}
                >
                  {/* Circle on line */}
                  <div
                    className="absolute -left-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                    aria-hidden="true"
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>

                  {/* Content card */}
                  <div className="bg-gray-50 rounded-xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-extrabold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        Step {step.step}
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
