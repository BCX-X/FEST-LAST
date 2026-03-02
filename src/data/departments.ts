import { Department } from '../types';

interface DepartmentInfo {
  id: Department;
  name: string;
  color: string;
  description: string;
  head: string;
  staff: number;
  students: number;
  programs: string[];
  image: string;
  achievements: string[];
  upcomingEvents: { title: string; date: string }[];
}

export const departments: Record<Department, DepartmentInfo> = {
  civil: {
    id: 'civil',
    name: 'Department of Civil Engineering & Construction',
    color: 'bg-[#1e3a8a]',
    description: 'The Department of Civil Engineering & Construction focuses on developing innovative solutions for infrastructure development, sustainable construction, and urban planning.',
    head: 'Prof. Dr. Ahmad bin Hassan',
    staff: 15,
    students: 320,
    programs: ['Bachelor of Civil Engineering', 'Master in Structural Engineering', 'PhD in Construction Management'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
    achievements: [
      'Winner of National Infrastructure Design Competition 2025',
      'Published 45+ research papers in 2025',
      'Partnership with 10+ leading construction firms',
    ],
    upcomingEvents: [
      { title: 'Civil Engineering Site Visit', date: '2026-01-28' },
      { title: 'Structural Design Workshop', date: '2026-02-05' },
    ],
  },
  electrical: {
    id: 'electrical',
    name: 'Department of Electrical & Electronics Engineering',
    color: 'bg-[#0ea5e9]',
    description: 'Dedicated to advancing knowledge in electrical systems, power engineering, electronics, and telecommunications.',
    head: 'Assoc. Prof. Dr. Sarah Lee',
    staff: 18,
    students: 380,
    programs: ['Bachelor of Electrical Engineering', 'Bachelor of Electronics Engineering', 'Master in Power Systems'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    achievements: [
      'Developed smart grid solution for local utilities',
      'Received RM2.5M research grant for renewable energy',
      '95% graduate employment rate',
    ],
    upcomingEvents: [
      { title: 'Electronics Design Competition', date: '2026-02-10' },
      { title: 'Power Systems Seminar', date: '2026-02-18' },
    ],
  },
  mechanical: {
    id: 'mechanical',
    name: 'Department of Mechanical & Automotive Engineering',
    color: 'bg-[#0891b2]',
    description: 'Leading innovation in mechanical systems, automotive technology, and manufacturing engineering.',
    head: 'Prof. Ir. Michael Wong',
    staff: 16,
    students: 350,
    programs: ['Bachelor of Mechanical Engineering', 'Bachelor of Automotive Engineering', 'Master in Manufacturing'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
    achievements: [
      'Formula Student team ranked Top 5 in Asia',
      'Industry collaboration with major automotive companies',
      'State-of-the-art CAD/CAM facilities',
    ],
    upcomingEvents: [
      { title: 'Robotics Workshop Series', date: '2026-01-20' },
      { title: 'Automotive Innovation Expo', date: '2026-02-22' },
    ],
  },
  computing: {
    id: 'computing',
    name: 'Department of Computing & Software Engineering',
    color: 'bg-[#06b6d4]',
    description: 'Driving digital transformation through cutting-edge software development, AI, cybersecurity, and data science.',
    head: 'Dr. Jennifer Tan',
    staff: 20,
    students: 450,
    programs: ['Bachelor of Computer Science', 'Bachelor of Software Engineering', 'Master in Artificial Intelligence'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
    achievements: [
      'Students won 3 international hackathons in 2025',
      'Launched AI Research Center',
      'Partnership with global tech companies',
    ],
    upcomingEvents: [
      { title: 'Hackathon 2026: Code for Change', date: '2026-02-01' },
      { title: 'AI & Machine Learning Workshop', date: '2026-02-15' },
    ],
  },
  biotechnology: {
    id: 'biotechnology',
    name: 'Department of Biotechnology & Agricultural Science',
    color: 'bg-[#14b8a6]',
    description: 'Pioneering sustainable solutions in biotechnology, agricultural science, and environmental management.',
    head: 'Prof. Dr. Siti Aminah',
    staff: 14,
    students: 280,
    programs: ['Bachelor of Biotechnology', 'Bachelor of Agricultural Science', 'Master in Environmental Science'],
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200',
    achievements: [
      'Breakthrough in drought-resistant crop research',
      'Collaboration with Ministry of Agriculture',
      'Green campus initiative leader',
    ],
    upcomingEvents: [
      { title: 'Sustainable Agriculture Seminar', date: '2026-01-25' },
      { title: 'Biotechnology Research Symposium', date: '2026-02-08' },
    ],
  },
};
