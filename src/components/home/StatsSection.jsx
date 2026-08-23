import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Clock, Users, Briefcase } from 'lucide-react';
import StatCounter from '../ui/StatCounter';
import { COMPANY } from '@/data';
import { api } from '@/services/api';
import { staggerContainer, viewportOnce } from '@/utils/animations';

export default function StatsSection() {
  const [projectCount, setProjectCount] = useState(COMPANY.stats.projectsCompleted);

  useEffect(() => {
    api.getProjects()
      .then((projects) => {
        if (projects && Array.isArray(projects)) {
          setProjectCount(`${projects.length}+`);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch projects count for stats:', err);
      });
  }, []);

  const stats = [
    { value: projectCount, label: 'Projects Completed', icon: Building2 },
    { value: COMPANY.stats.yearsExperience, label: 'Years of Experience', icon: Clock },
    { value: COMPANY.stats.happyClients, label: 'Happy Clients', icon: Users },
    { value: COMPANY.stats.professionals, label: 'Professionals', icon: Briefcase },
  ];

  return (
    <section
      id="stats"
      className="bg-blue-900 py-16 md:py-20"
      aria-label="Company statistics"
    >
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <StatCounter
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                light
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
