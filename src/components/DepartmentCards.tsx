import { Building2, Zap, Cog, Monitor, Leaf } from 'lucide-react';
import type { Department } from '../App';

interface DepartmentCardsProps {
  onDepartmentClick: (dept: Department) => void;
}

export function DepartmentCards({ onDepartmentClick }: DepartmentCardsProps) {
  const departments = [
    {
      id: 'civil' as Department,
      name: 'Civil Engineering & Construction',
      icon: Building2,
      color: 'bg-[#1e3a8a]',
      hoverColor: 'hover:bg-[#1e40af]',
    },
    {
      id: 'electrical' as Department,
      name: 'Electrical & Electronics Engineering',
      icon: Zap,
      color: 'bg-[#0ea5e9]',
      hoverColor: 'hover:bg-[#0284c7]',
    },
    {
      id: 'mechanical' as Department,
      name: 'Mechanical & Automotive Engineering',
      icon: Cog,
      color: 'bg-[#0891b2]',
      hoverColor: 'hover:bg-[#0e7490]',
    },
    {
      id: 'computing' as Department,
      name: 'Computing & Software Engineering',
      icon: Monitor,
      color: 'bg-[#06b6d4]',
      hoverColor: 'hover:bg-[#0891b2]',
    },
    {
      id: 'biotechnology' as Department,
      name: 'Biotechnology & Agricultural Science',
      icon: Leaf,
      color: 'bg-[#14b8a6]',
      hoverColor: 'hover:bg-[#0d9488]',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="mb-10 text-center">Departments</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {departments.map((dept) => {
          const Icon = dept.icon;
          return (
            <button
              key={dept.id}
              onClick={() => onDepartmentClick(dept.id)}
              className={`${dept.color} ${dept.hoverColor} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group`}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white break-words">{dept.name}</h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}