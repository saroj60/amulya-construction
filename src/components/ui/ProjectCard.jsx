import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, CheckCircle, Clock } from 'lucide-react';
import { scaleIn } from '@/utils/animations';

const statusColors = {
  Completed: 'bg-green-100 text-green-700',
  Ongoing: 'bg-blue-100 text-blue-700',
  Upcoming: 'bg-yellow-100 text-yellow-700',
};

const statusIcons = {
  Completed: CheckCircle,
  Ongoing: Clock,
};

export default function ProjectCard({ project }) {
  const StatusIcon = statusIcons[project.status] || CheckCircle;

  return (
    <motion.article
      variants={scaleIn}
      className="bg-white rounded-xl overflow-hidden card-shadow group cursor-pointer"
      whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.25 }}
    >
      <Link to={`/projects/${project.id}`} className="block" aria-label={`View ${project.title} project details`}>
        {/* Image */}
        <div className="relative overflow-hidden h-52 sm:h-60">
          <img
            src={project.image}
            alt={`${project.title} - ${project.category} project in ${project.location}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          <span
            className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[project.status] || statusColors.Completed}`}
          >
            <StatusIcon className="w-3 h-3" aria-hidden="true" />
            {project.status}
          </span>

          {/* Category */}
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-800 text-white text-xs font-semibold">
            <Tag className="w-3 h-3" aria-hidden="true" />
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{project.location}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400 font-medium">{project.year}</span>
            {project.area && (
              <span className="text-xs text-gray-500 font-medium">{project.area}</span>
            )}
            <span className="text-xs font-bold text-orange-500 group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
