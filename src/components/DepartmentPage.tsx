import { ArrowLeft, Users, Calendar as CalendarIcon, Award, BookOpen, Mail, Phone } from 'lucide-react';
import type { Department } from '../App';

interface DepartmentPageProps {
  department: Department;
  onBack: () => void;
}

interface StaffMember {
  name: string;
  designation: string;
  email: string;
  room?: string;
  ext?: string;
}

const DEPARTMENT_STAFF: Record<string, StaffMember[]> = {
  civil: [
    { name: 'Nik Nuraini Binti Azhari', designation: 'Head of Programme (Civil)', email: 'niknuraini@klust.edu.my', room: 'Block 9', ext: '679' },
    { name: 'Assoc. Prof. Ir. Mohd Nasir Bin Hussin', designation: 'Associate Professor', email: 'mohdnasir@klust.edu.my', room: 'Block 9', ext: '665' },
    { name: 'Assoc. Prof. Ts. Dr. Norul Wahida Binti Kamaruzaman', designation: 'Associate Professor', email: 'wahida@klust.edu.my', room: 'Block 9' },
    { name: 'Assoc. Prof. Ts. Dr. Nurazim Binti Ibrahim', designation: 'Deputy Dean CPS', email: 'nurazim@klust.edu.my', room: 'Block 9' },
    { name: 'Assoc. Prof. Ts. Dr. Zulhazmee Bin Bakri', designation: 'Associate Professor', email: 'zulhazmee@klust.edu.my', room: 'Block 9', ext: '876' },
    { name: 'Assoc. Prof. Sr. Ts. Gs. Ranjit Singh', designation: 'Associate Professor', email: 'ranjit@klust.edu.my', room: 'Block 9', ext: '715' },
    { name: 'Assoc. Prof. Ir. Mohamad Bin Ayob', designation: 'Associate Professor', email: 'mohamada@klust.edu.my', room: 'Block 9' },
    { name: 'Naimah Binti Yusoff', designation: 'Senior Lecturer', email: 'naimah@klust.edu.my', room: 'Block 9', ext: '1221' },
    { name: 'Nadzifah Binti Che Mat', designation: 'Senior Lecturer', email: 'nadzifah@klust.edu.my', room: 'Block 9', ext: '878' },
    { name: 'Haslina Binti Mohamed', designation: 'Senior Lecturer', email: 'haslina@klust.edu.my', room: 'Block 9', ext: '881' },
    { name: 'Khairunisah Binti Kamaruzaman', designation: 'Senior Lecturer', email: 'khairunisah@klust.edu.my', room: 'Block 9', ext: '762' },
    { name: 'Hanah Binti Zakariah', designation: 'Senior Lecturer', email: 'hanah@klust.edu.my', room: 'Block 9', ext: '714' },
    { name: 'Shahrul Bin Jainudin', designation: 'Lecturer', email: 'shahruljainudin@klust.edu.my', room: 'Block 9' },
    { name: 'Ir. Ts. Syed Khairi Syed Abbas', designation: 'Lecturer', email: 'syedkhairi@klust.edu.my', room: 'Block 9' },
  ],
  electrical: [
    { name: 'Ir. Nasrin Binti Sulaiman', designation: 'Deputy Dean / Head of Programme', email: 'nasrin@klust.edu.my', room: 'Block 9', ext: '353' },
    { name: 'Ir. Kuan Lee Choo', designation: 'Senior Lecturer', email: 'lckuan@klust.edu.my', room: 'Block 4', ext: '738' },
    { name: 'Assoc. Prof. Hon Kah Wye', designation: 'Associate Professor', email: 'honkw@klust.edu.my', room: 'Block 4', ext: '678' },
    { name: 'Norazlina Binti Mohamed', designation: 'Senior Lecturer', email: 'norazlina@klust.edu.my', room: 'Block 4', ext: '738' },
    { name: 'Ima Binti Sulaiman', designation: 'Senior Lecturer', email: 'ima@klust.edu.my', room: 'Block 4', ext: '738' },
    { name: 'Dr. Jebashini A/P Ponnian', designation: 'Head of Postgraduate Programme', email: 'jebashini@klust.edu.my', room: 'Block 4', ext: '738' },
    { name: 'Sanjay Kumar A/L Ramachandran', designation: 'Senior Lecturer', email: 'sanjay@klust.edu.my', room: 'Block 4', ext: '738' },
    { name: 'Nurul Ajlaa Binti Omar', designation: 'Senior Lecturer', email: 'ajlaa@klust.edu.my', room: 'Block 4', ext: '353' },
    { name: 'Ir. Muhamad Afiqri Bin Ibrahim', designation: 'Lecturer', email: 'muhamadafiqri@klust.edu.my', room: 'Block 4' },
  ],
  mechanical: [
    { name: 'Ida Rasyada Binti Daud', designation: 'Head of Programme', email: 'ida.rasyada@klust.edu.my', room: 'Block 3' },
    { name: 'Prof. Ir. Ts. Dr. Tan Chee Fai', designation: 'Professor / Deputy Vice Chancellor', email: 'tancheefai@klust.edu.my', room: 'Block 8' },
    { name: 'Muhammad Fahmi Bin Md Isa', designation: 'Senior Lecturer', email: 'fahmi@klust.edu.my', room: 'Block 3' },
    { name: 'Ir. Malek Faizal Bin Idrus', designation: 'Senior Lecturer', email: 'malek@klust.edu.my', room: 'Block 3' },
    { name: 'Ir. Ts. Dr. Abu Bakar Bin Mahat', designation: 'Senior Lecturer', email: 'abubakar@klust.edu.my', room: 'Block 3' },
    { name: 'Mohd Zamri Bin Ibrahim', designation: 'Senior Lecturer', email: 'zamri@klust.edu.my', room: 'Block 3' },
    { name: 'Annie Yap Ai kin', designation: 'Senior Lecturer', email: 'annieyap@klust.edu.my', room: 'Block 3' },
    { name: 'Noorradiyah Binti Ismail', designation: 'Senior Lecturer', email: 'noorradiyah@klust.edu.my', room: 'Block 3' },
    { name: 'Norhaslina Binti Abdul Aziz', designation: 'Senior Lecturer', email: 'norhaslina@klust.edu.my', room: 'Block 3' },
    { name: 'Ts. Engku Amirul Rashidin Bin Engku Arif', designation: 'Senior Lecturer', email: 'engkuamirul@klust.edu.my', room: 'Block 3' },
    { name: 'Koh Chu Eyam', designation: 'Assistant Lecturer', email: 'kohce@klust.edu.my', room: 'Block 3' },
  ],
  computing: [
    { name: 'Janagiammal A/P Ramasamy', designation: 'Head of Programme (Software Engineering)', email: 'janagi@klust.edu.my', room: 'Block 9', ext: '877' },
    { name: 'Jaya Malathy A/P Poloha Nadan', designation: 'Head of Programme (Computer Science)', email: 'jayamalathy@klust.edu.my', room: 'Block 9', ext: '877' },
    { name: 'Dr. Abudhahir Buhari', designation: 'Head of Postgraduate Programme', email: 'abudhahir@klust.edu.my', room: 'Block 9', ext: '740' },
    { name: 'Dr. Tadiwa Elisha Nyamasvisva', designation: 'Dean CPS', email: 'tadiwa.elisha@klust.edu.my', room: 'Block 9', ext: '683' },
    { name: 'Suhaila Binti Mohd Nordin', designation: 'Senior Lecturer', email: 'suhailanordin@klust.edu.my', room: 'Block 9' },
    { name: 'Noradibah Binti Adnan', designation: 'Senior Lecturer', email: 'noradibah@klust.edu.my', room: 'Block 9', ext: '712' },
    { name: 'Valeriano A. Dasalla', designation: 'Senior Lecturer', email: 'dasalla@klust.edu.my', room: 'Block 9', ext: '839' },
    { name: 'Hafiza Ahmad', designation: 'Head, ICT and Academic Support', email: 'hafiza@klust.edu.my', room: 'Block 9', ext: '1798' },
  ],
  biotechnology: [
    { name: 'Marzuki Bin Hamzah', designation: 'Head of Programme (Agriculture Science)', email: 'marzuki@klust.edu.my', room: 'Block 9' },
    { name: 'Aizat Bin Mohd Razali', designation: 'Senior Lecturer', email: 'aizatmr@klust.edu.my', room: 'Block 9' },
    { name: 'Noor Hidayu Binti Zakaria', designation: 'Lecturer', email: 'noorhidayu@klust.edu.my', room: 'Block 9' },
    { name: 'Asy Syura Binti Mamat', designation: 'Lecturer', email: 'asysyura@klust.edu.my', room: 'Block 9' },
  ],
};

export function DepartmentPage({ department, onBack }: DepartmentPageProps) {
  const departmentData = {
    civil: {
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

  const data = departmentData[department];
  const staffList = DEPARTMENT_STAFF[department] || [];

  // Separate heads/senior from lecturers
  const heads = staffList.filter(s =>
    s.designation.toLowerCase().includes('head') ||
    s.designation.toLowerCase().includes('professor') ||
    s.designation.toLowerCase().includes('dean')
  );
  const lecturers = staffList.filter(s =>
    s.designation.toLowerCase().includes('lecturer') ||
    s.designation.toLowerCase().includes('trainer')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`${data.color} text-white relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-white mb-4">{data.name}</h1>
              <p className="text-white/90 text-lg mb-6">{data.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <Users className="w-6 h-6 mb-2" />
                  <div className="text-2xl mb-1">{data.students}</div>
                  <div className="text-white/80 text-sm">Students</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Users className="w-6 h-6 mb-2" />
                  <div className="text-2xl mb-1">{data.staff}</div>
                  <div className="text-white/80 text-sm">Staff</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <BookOpen className="w-6 h-6 mb-2" />
                  <div className="text-2xl mb-1">{data.programs.length}</div>
                  <div className="text-white/80 text-sm">Programs</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img src={data.image} alt={data.name} className="rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Programs */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-6">Academic Programmes</h2>
              <div className="space-y-3">
                {data.programs.map((program, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#1e3a8a]" />
                    <span>{program}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-6">Key Achievements</h2>
              <div className="space-y-4">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#14b8a6] mt-1 flex-shrink-0" />
                    <p>{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lecturers & Staff Contacts */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-2">Academic Staff & Contacts</h2>
              <p className="text-sm text-gray-500 mb-6">Contact our lecturers and department heads directly.</p>

              {heads.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Leadership & Senior Staff</h3>
                  <div className="space-y-3">
                    {heads.map((s, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">{s.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                          <p className="text-xs text-[#1e3a8a] mb-1">{s.designation}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                            <a href={`mailto:${s.email}`} className="flex items-center gap-1 hover:text-[#1e3a8a] transition-colors">
                              <Mail className="w-3 h-3" /> {s.email}
                            </a>
                            {s.room && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {s.room}{s.ext ? ` · Ext. ${s.ext}` : ''}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lecturers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Lecturers</h3>
                  <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                    {lecturers.map((s, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 text-xs font-bold">{s.name.split(' ').pop()?.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.designation}</p>
                        </div>
                        <a
                          href={`mailto:${s.email}`}
                          className="flex items-center gap-1.5 text-xs text-[#1e3a8a] hover:text-[#1e40af] bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Mail className="w-3 h-3" />
                          <span className="hidden sm:inline">{s.email}</span>
                          <span className="sm:hidden">Email</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Department Head */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="mb-4">Department Head</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-900">{data.head}</p>
                  <p className="text-sm text-gray-600">Head of Department</p>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {data.upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-[#1e3a8a] pl-4 py-2">
                    <p className="mb-1">{event.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="mb-4">Contact Department</h3>
              <a
                href="mailto:fest@klust.edu.my"
                className="w-full block text-center bg-[#1e3a8a] text-white py-3 rounded-lg hover:bg-[#1e40af] transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}