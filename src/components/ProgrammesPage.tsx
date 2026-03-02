import { useState } from 'react';
import { ChevronDown, ChevronUp, Send, CheckCircle, X, GraduationCap, User, Mail, Phone, FileText, BookOpen } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Programme {
  id: string;
  name: string;
  code: string;
  intakes: string;
  mode: string;
  duration: string;
  credits: string;
  level: string;
  faculty: string;
  field: string;
  image: string;
  about: string;
  isFor: string;
  whatLearn: string;
  whatExpect: string;
  peo: string[];
  plo?: { code: string; description: string }[];
  eligibility: { qualification: string; requirement: string }[];
  englishReq: { test: string; score: string }[];
  curriculum?: { year: string; subjects: string }[];
  careers: string[];
  salary?: string;
  accreditation?: string;
  didYouKnow?: string;
}

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  qualification: string;
  cgpa: string;
  intakePreference: string;
  message: string;
}

const EMPTY_FORM: ApplicationForm = {
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  dateOfBirth: '',
  qualification: '',
  cgpa: '',
  intakePreference: '',
  message: '',
};

export function ProgrammesPage() {
  const [expandedProgramme, setExpandedProgramme] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<Programme | null>(null);
  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const programmes: Programme[] = [
    {
      id: 'automotive',
      name: 'Bachelor of Technology (Honours) in Automotive',
      code: '(R2/525/6/0108)(01/28)(A 8381)',
      intakes: 'March, June/July & Sept/Oct',
      mode: 'Full Time',
      duration: '3 years',
      credits: '120',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Engineering and Technology',
      image: 'https://images.unsplash.com/photo-1771340012319-0b4fca008b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZW5naW5lZXJpbmclMjBjYXIlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NzE5NDQ3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'This programme focuses on every aspect of vehicles such as the in-depth working mechanism and principle of various automotive systems, diagnosis, servicing, maintenance, safety issues and so on.',
      isFor: 'Are you ever so curious about cars that you just have to know how it is made? Then this should be the right course for you!',
      whatLearn: 'You can expect a conducive environment with full facilities to start with. As you go along the journey, you will be exposed to extensive theoretical and hands on inputs and get to practice them during your industrial training.',
      whatExpect: 'All you need is to be committed not only to learning, but also critical and creative thinking as well as to work independently as a technologist in judgments throughout decision making in automotive related problems.',
      peo: [
        'Graduates will possess an adequate knowledge and competency as well as practical skill in the field of automotive technology.',
        'Graduates are adaptable to the global work environment and/or undergoing lifelong learning to pursue higher academic qualification for career development.',
        'Graduates who are professional, ethical, and socially responsible towards developing the community and nation.'
      ],
      eligibility: [
        { qualification: 'STPM', requirement: 'Minimum 2 Principal Passes' },
        { qualification: 'A-Level', requirement: 'Minimum 2 Principal Passes' },
        { qualification: 'UEC', requirement: 'Minimum 5Bs (including Mathematics)' },
        { qualification: 'Diploma/HND', requirement: 'Minimum CGPA of 2.00' },
        { qualification: 'Foundation/Matriculation', requirement: 'Minimum CGPA of 2.00' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Technologist/Executive in Automotive Industries', 'Executive Service Advisor', 'Executive Supervisor'],
      salary: 'Graduates typically earn RM26K–RM42K annually at entry level. With about 10 years of experience, salaries can rise to RM60K–RM90K per year.',
      didYouKnow: 'We have the most intensive content that covers the basic fundamentals to the advanced technologies with sufficient infrastructure & facilities.'
    },
    {
      id: 'electromechanical',
      name: 'Bachelor of Technology (Honours) in Electro-mechanical',
      code: '(N/523/6/0312)(08/26)(MQA/FA 9681)',
      intakes: 'March, June, September',
      mode: 'Full Time',
      duration: '3.5 years',
      credits: '129',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Engineering and Technology',
      image: 'https://images.unsplash.com/photo-1678225867994-e7a5b071ebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbWVjaGFuaWNhbCUyMGVuZ2luZWVyaW5nJTIwcm9ib3RpY3N8ZW58MXx8fHwxNzcxOTQ0NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'Electro-mechanical technology is an important field that has great potential in the industry today. Also known as mechatronic engineering, this programme combines mechanical, electrical, electronics, computer technology, telecommunications, robotics and control to deliver a unified system.',
      isFor: 'If you enjoy knowing how machinery works and love to assemble items, then this programme is suitable for you.',
      whatLearn: 'Students will be exposed to a mix of both mechanical and electrical related subjects including electric circuits, analog and digital electronic circuits, electrical machines, instrumentation, microcontrollers, Programmable Logic Controllers, industrial automation, pneumatics, hydraulics and process controls.',
      whatExpect: 'This programme focuses more on technical or hands-on skills which is favoured by the industry. You will undergo 6 months practical training in the final semester.',
      peo: [
        'Graduates will establish themselves as practising technologies in the electro-mechanical field.',
        'Graduates will engage with lifelong learning in multidisciplinary situations.',
        'Graduates will contribute to sustainable development and well being of society.'
      ],
      eligibility: [
        { qualification: 'STPM', requirement: 'Minimum 2 Principal Passes (including Mathematics and Physics/Chemistry)' },
        { qualification: 'Diploma/HND', requirement: 'Minimum CGPA of 2.00' },
        { qualification: 'Foundation/Matriculation', requirement: 'Minimum CGPA of 2.00' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Production Engineer', 'Manufacturing Engineer', 'Instrumentation Engineer', 'Plant Design Engineer'],
      didYouKnow: 'KLUST is one of the few institutions that offers this programme.'
    },
    {
      id: 'agri-diploma',
      name: 'Diploma in Agricultural Science (Plantation Management)',
      code: '(R3/0811/4/0011)(05/30)(A 10919)',
      intakes: 'June/September/March',
      mode: 'Full Time',
      duration: '2.5 years / 7 Semester',
      credits: '92',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Agricultural Science',
      image: 'https://images.unsplash.com/photo-1755365134255-df5efd13a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBwbGFudGF0aW9uJTIwcGFsbSUyMG9pbHxlbnwxfHx8fDE3NzE5NDQ3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      about: "Agriculture is the backbone of Malaysia's economy. The plantation sector in Malaysia has contributed significantly to the Malaysian economy.",
      isFor: 'We will always need agriculture. Better job and career opportunities. High opportunities for young graduates and entrepreneurs.',
      whatLearn: 'The main focus would be Organic Chemistry, Soil Science, Plant Biology, Plantation Crop, Farm Planning & Management.',
      whatExpect: 'You will be exposed to modern farming technology, plant protection techniques such as pest and weed control, how to conserve soil and water, how to turn crops into food and so on.',
      peo: [],
      eligibility: [
        { qualification: 'SPM/UEC/O-Levels', requirement: '3 credits including science and a pass in English, or any related certificates with a minimum CGPA of 2.0' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Plantation Supervisor', 'Agro Entrepreneur', 'Agribusiness Executive', 'Agricultural Marketing Executive', 'Field Production Officer'],
      salary: 'For diploma holders, you can expect to earn around RM 2,000 as a start.',
      didYouKnow: '100% of our graduating students are recruited in their final year for careers that start immediately upon completing their studies.'
    },
    {
      id: 'mechanical',
      name: 'Bachelor of Mechanical Engineering with Honours',
      code: '(R2/521/6/0032)(05/29)(MQA/FA 1583)',
      intakes: 'March, June/July & Sept/Oct',
      mode: 'Full Time',
      duration: '4 years',
      credits: '135',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Engineering and Technology',
      image: 'https://images.unsplash.com/photo-1759148413911-5ded7ed2ec06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwZW5naW5lZXJpbmclMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzcxOTQ0NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'Mechanical engineering deals with anything that moves including the human body. Mechanical engineers learn about materials, statics and dynamics, solid and fluid mechanics, thermodynamics, control engineering, industrial engineering, instrumentation and design.',
      isFor: 'If you like physics and mathematics, are curious about how things work, like to dismantle and reassemble things, see yourself as an inventor, and want to make a difference to the world, then this programme may suit you.',
      whatLearn: 'This programme involves the principles of engineering such as statics, materials science, design and analysis of mechanical parts and systems.',
      whatExpect: 'Solid foundation in mathematics, physics and chemistry is required. Graduates will be capable of performing engineering tasks in the manufacturing or production sectors, power generation, oil and gas sectors, transportation, building services and construction industries.',
      peo: [
        'Graduates with adequate knowledge and competency in various fields of mechanical engineering.',
        'Graduates with professional attributes, and are adaptable to the global work environment.'
      ],
      eligibility: [
        { qualification: 'STPM', requirement: 'Minimum 2 Principal Passes (including Mathematics and Physics/Chemistry)' },
        { qualification: 'Diploma/HND', requirement: 'Minimum CGPA of 2.00 and Band 2 MUET' },
        { qualification: 'Foundation/Matriculation', requirement: 'Minimum CGPA of 2.00 and Band 2 MUET' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Aerospace Industry Engineer', 'Automotive Industry Engineer', 'Chemical Industry Engineer', 'Construction Industry Engineer', 'Defence Industry Engineer'],
      salary: 'A Mechanical Engineering graduate typically earns an average of RM30K to RM40K per year. With 10 years of experience, salaries can rise to between RM80K and RM100K annually.',
      accreditation: 'This programme is accredited by the Engineering Accreditation Council (EAC) and recognized under the Washington Accord.'
    },
    {
      id: 'electronics',
      name: 'Bachelor of Electronics Engineering with Honours',
      code: '(R3/523/6/0074)(02/29)(MQA/FA 3801)',
      intakes: 'March, June, September',
      mode: 'Full Time',
      duration: '4 years',
      credits: '135',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Engineering and Technology',
      image: 'https://images.unsplash.com/photo-1631375937044-6dd5beac01d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGVuZ2luZWVyaW5nJTIwY2lyY3VpdCUyMGJvYXJkfGVufDF8fHx8MTc3MTk0NDc2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'This programme is about integration of physics, electronics, and computational science where students would be expected to be able to design electronic applications including integrated circuit or chip.',
      isFor: 'If you enjoy mathematics and science, are fascinated by energy and electronic gadgets, and want to design and invent things that benefit society, you can consider electronic engineering as your career.',
      whatLearn: 'This course will equip you with fundamental principles and advanced concepts of electronic engineering. You will gain hands-on practical experience in designing and constructing electronic systems.',
      whatExpect: 'One of the most valuable skills you would acquire is the ability to solve problems through project work or analysis of technical knowledge.',
      peo: [
        'Graduates are employable in electronic engineering in development of infrastructure.',
        'Graduates are readily adaptable to the global work environment with professional attributes.'
      ],
      eligibility: [
        { qualification: 'STPM', requirement: 'Minimum 2 Principal Passes (including Mathematics and Physics/Chemistry)' },
        { qualification: 'Diploma/HND', requirement: 'Minimum CGPA of 2.00' },
        { qualification: 'Foundation/Matriculation', requirement: 'Minimum CGPA of 2.00' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['IC Chip Design Engineer', 'Electronics Engineer', 'Communication Engineer', 'Design Engineer', 'Computer Engineer', 'Test Engineer'],
      salary: 'The average salary for a fresh graduate in this field can be from RM3,500 to RM5,500.',
      accreditation: 'This programme is accredited by the Engineering Accreditation Council (EAC) and recognized under the Washington Accord.',
      didYouKnow: 'The industrial electronics sub-sector is the second largest sub-sector, comprising 28% of the total investments approved in the Electrical & Electronics sector.'
    },
    {
      id: 'civil',
      name: 'Bachelor of Civil Engineering with Honours',
      code: '(R2/526/6/0140)(03/26)(MQA/FA 4872)',
      intakes: 'March, June/July & Sept/Oct',
      mode: 'Full Time',
      duration: '4 years',
      credits: '140',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Engineering and Technology',
      image: 'https://images.unsplash.com/photo-1648430632482-d363009832e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYnJpZGdlJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3MTgzMDM0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'This programme will provide you with a solid grounding in the design, construction, and management of civil engineering works and equip you with the technical knowledge, communication skills, and ability to operate as a civil engineer within the construction industry.',
      isFor: 'If you are a determined person, energetic, ambitious and willing to take challenges, and if you like to create, innovate and improve, then engineering is for you.',
      whatLearn: 'You will learn about what you always see around you - the characteristics of concrete, soil, water, rainfall, traffic, environment, etc. Then you will get to explore the design process either manually or using software tools.',
      whatExpect: 'Civil Engineering is a rewarding and challenging profession which aims at building and maintaining the physical infrastructure of our society for the benefit of humanity.',
      peo: [
        'To produce graduates with sufficient knowledge and competency in various areas in civil engineering.',
        'To produce graduates with professional attributes, and are readily adaptable to the global work environment.',
        'To produce graduates for work in the development of infrastructure.'
      ],
      eligibility: [
        { qualification: 'STPM', requirement: 'Minimum 2 Principal Passes (including Mathematics and Physics/Chemistry) and pass English in SPM' },
        { qualification: 'Diploma/HND', requirement: 'Minimum CGPA of 2.00' },
        { qualification: 'Foundation/Matriculation', requirement: 'Minimum CGPA of 2.00' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Civil Engineer at Consultants', 'Civil Engineer at Contractors', 'Civil Engineer at Developers', 'Planning and Scheduling Firms', 'Government Agency/Authority'],
      salary: 'The average salary for a fresh graduate can range from RM 1,500 to RM 3,000 monthly.',
      accreditation: 'This programme is accredited by the Engineering Accreditation Council (EAC) and recognized under the Washington Accord.'
    },
    {
      id: 'computer-science',
      name: 'Bachelor in Computer Science (Honours)',
      code: 'R3/0613/6/0026)(08/28)(A 9432)',
      intakes: 'March, June/July & Sept/Oct',
      mode: 'Full Time',
      duration: '3 years',
      credits: '120',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Information Technology',
      image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjBwcm9ncmFtbWluZyUyMGNvZGV8ZW58MXx8fHwxNzcxODY1MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'Computer science is a study of computers that requires thinking in both intellectual and physical terms. The field spans several core areas such as programming, computer theory, scientific computing, hardware and software.',
      isFor: 'If you enjoy knowing every little bit about computers and what it can do, if you like solving computer problems yourself, you might as well obtain the credentials needed to become an expert.',
      whatLearn: 'This course involves the understanding and design of computers and computational process. It ranges from theoretical studies of algorithms to practical problems of implementation in terms of computational hardware and software.',
      whatExpect: 'IT professionals are responsible for designing, developing, supporting and managing computer hardware, software, and information networks, including the internet.',
      peo: [
        'To produce competent graduates by leveraging on current digital technology in Computer Science field',
        'To produce ethical graduates striving in personal and professional development with life-long learning mindsets'
      ],
      eligibility: [
        { qualification: 'STPM (Arts)', requirement: 'Minimum Grade of C (GP 2.00) in any TWO (2) subjects' },
        { qualification: 'STPM (Science)', requirement: 'Minimum Grade of C (GP 2.00) in Mathematics and ONE (1) Science/ICT subject' },
        { qualification: 'Diploma in Computing', requirement: 'Minimum CGPA of 2.50' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Software Developer', 'Data Scientist', 'Cybersecurity Analyst', 'Web Developer', 'Systems Analyst', 'Database Administrator', 'AI/Machine Learning Engineer', 'Network Engineer'],
      salary: 'Entry-Level: RM 3,000 to RM 5,000 per month. Mid-Level: RM 5,000 to RM 8,000 per month. Senior-Level: RM 8,000 to RM 12,000+ per month.'
    },
    {
      id: 'software',
      name: 'Bachelor in Software Engineering (Honours)',
      code: '(R3/0612/6/0015)(07/29)(A 10578)',
      intakes: 'March, June/July & Sept/Oct',
      mode: 'Full Time',
      duration: '3 years',
      credits: '120',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Information Technology',
      image: 'https://images.unsplash.com/photo-1634498507905-3a4f8d7ba9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyaW5nJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzcxOTQ0NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      about: 'The Bachelor in Software Engineering program is designed to equip students with comprehensive knowledge and practical skills in software development, system design, and project management.',
      isFor: "If you love technology, enjoy solving problems, and are eager to learn about software development, this program is perfect for you.",
      whatLearn: 'You will learn software development, system design, coding, algorithm design, software testing, and project management. The curriculum also covers current trends like artificial intelligence, cloud computing, and cybersecurity.',
      whatExpect: 'This programme is designed to produce well-equipped students for a successful career in the software industry and the information technology sector.',
      peo: [
        'To produce competent, ethical and professional graduates by leveraging on current digital technology in Software Engineering field',
        'To produce ethical graduates striving in personal development with lifelong learning mindsets'
      ],
      eligibility: [
        { qualification: 'STPM (Arts)', requirement: 'Minimum Grade of C (GP 2.00) in any TWO (2) subjects' },
        { qualification: 'STPM (Science)', requirement: 'Minimum Grade of C (GP 2.00) in Mathematics and ONE (1) Science/ICT subject' },
        { qualification: 'Diploma in Computing', requirement: 'Minimum CGPA of 2.50' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Software Developer', 'Systems Analyst', 'Data Scientist', 'AI/Machine Learning Engineer', 'Cybersecurity Analyst', 'DevOps Engineer', 'Mobile App Developer', 'Cloud Solutions Architect'],
      salary: 'The average salary for a software engineering graduate typically ranges from MYR 3,000 to MYR 5,000 per month.'
    },
    {
      id: 'agricultural-bachelor',
      name: 'Bachelor of Agricultural Science (Plantation Management) (Honours)',
      code: '(R/0811/6/0001)(09/29)(MQA/FA 10765)',
      intakes: 'June/September/March',
      mode: 'Full Time',
      duration: '3 years / 9 Semesters',
      credits: '123',
      level: 'Undergraduate',
      faculty: 'Faculty of Engineering, Science & Technology (FEST)',
      field: 'Agricultural Science',
      image: 'https://images.unsplash.com/photo-1580982338091-2e635b5759a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBzY2llbmNlJTIwZmFybWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxOTQ0NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      about: "Agriculture is the backbone of Malaysia's economy. The plantation sector has contributed significantly to the Malaysian economy.",
      isFor: 'Agriculture is a huge industry. We will always need agriculture. Better job and career opportunities. High opportunities for young graduates and entrepreneurs.',
      whatLearn: 'The programme covers comprehensive knowledge in agricultural science & plantation management with emphasis on scientific methods, practical skills, and modern plantation management techniques.',
      whatExpect: 'Students will gain competent knowledge, practical and analytical skills, critical thinking, as well as the agility to adapt to the rapid advancements in various areas of Agricultural Plantation Management.',
      peo: [
        'Graduates with competent knowledge, practical and analytical skills, critical thinking.',
        'Graduates with professional attributes, lifelong learning skills and entrepreneurial spirits in Agricultural Plantation Management.',
        'Graduates adapt to the global work environment, lead a team, as well as possess the digital and numerical skills related to Agricultural Plantation Management.'
      ],
      eligibility: [
        { qualification: 'STPM', requirement: 'Minimum 2 Principles or any related diploma and foundation with minimum CGPA of 2' }
      ],
      englishReq: [
        { test: 'IELTS', score: '5' },
        { test: 'MUET', score: 'BAND 3' },
        { test: 'TOEFL (IBT)', score: '40' }
      ],
      careers: ['Agronomist', 'Plantation Manager', 'Plantation Auditor', 'Agro Entrepreneur', 'Soil Scientist/Plant Nutritionist', 'Agribusiness Executive', 'Agricultural Researcher']
    }
  ];

  const toggleProgramme = (id: string) => {
    setExpandedProgramme(expandedProgramme === id ? null : id);
  };

  const openApply = (programme: Programme) => {
    setApplyingTo(programme);
    setForm({ ...EMPTY_FORM, intakePreference: programme.intakes.split(',')[0].trim() });
    setSubmitted(false);
    setError('');
  };

  const closeApply = () => {
    setApplyingTo(null);
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim()) return setError('Full name is required.');
    if (!form.email.trim() || !form.email.includes('@')) return setError('A valid email address is required.');
    if (!form.phone.trim()) return setError('Phone number is required.');
    if (!form.qualification) return setError('Please select your highest qualification.');

    setError('');
    setSubmitting(true);

    const payload = {
      programme_id: applyingTo!.id,
      programme_name: applyingTo!.name,
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      nationality: form.nationality || null,
      date_of_birth: form.dateOfBirth || null,
      qualification: form.qualification,
      cgpa: form.cgpa || null,
      intake_preference: form.intakePreference || null,
      message: form.message || null,
      status: 'pending',
      applied_at: new Date().toISOString(),
    };

    try {
      const { error: dbError } = await supabase.from('programme_applications').insert([payload]);
      if (dbError) {
        // Fallback to localStorage
        const existing = JSON.parse(localStorage.getItem('programme_applications') || '[]');
        existing.push({ ...payload, id: Date.now() });
        localStorage.setItem('programme_applications', JSON.stringify(existing));
      }
      setSubmitted(true);
    } catch {
      const existing = JSON.parse(localStorage.getItem('programme_applications') || '[]');
      existing.push({ ...payload, id: Date.now() });
      localStorage.setItem('programme_applications', JSON.stringify(existing));
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white';
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="mb-4">Academic Programmes</h1>
      <p className="text-xl text-gray-600 mb-12">
        FEST offers a comprehensive range of undergraduate programmes across our five departments.
        Each programme is designed to meet industry needs and prepare students for successful careers.
      </p>

      <div className="space-y-6">
        {programmes.map((programme) => (
          <div key={programme.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={programme.image}
                  alt={programme.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col">
                <div className="flex-1">
                  <h2 className="mb-2">{programme.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{programme.code}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{programme.level}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">{programme.duration}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{programme.credits} Credits</span>
                  </div>
                  <p className="text-gray-700 mb-4">{programme.about}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600"><strong>Intakes:</strong> {programme.intakes}</p>
                      <p className="text-gray-600"><strong>Mode:</strong> {programme.mode}</p>
                    </div>
                    <div>
                      <p className="text-gray-600"><strong>Faculty:</strong> {programme.faculty}</p>
                      <p className="text-gray-600"><strong>Field:</strong> {programme.field}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <button
                    onClick={() => toggleProgramme(programme.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    {expandedProgramme === programme.id ? 'Show Less' : 'Show More Details'}
                    {expandedProgramme === programme.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  <button
                    onClick={() => openApply(programme)}
                    className="flex items-center gap-2 bg-[#1e3a8a] text-white px-5 py-2 rounded-xl hover:bg-[#1e40af] transition-colors text-sm font-semibold ml-auto"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {expandedProgramme === programme.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-blue-600">Is this programme for me?</h3>
                    <p className="text-gray-700">{programme.isFor}</p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-blue-600">What will I learn?</h3>
                    <p className="text-gray-700">{programme.whatLearn}</p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-blue-600">What should I expect?</h3>
                    <p className="text-gray-700">{programme.whatExpect}</p>
                  </div>
                  {programme.peo && programme.peo.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-blue-600">Programme Educational Objectives (PEO)</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {programme.peo.map((obj, i) => <li key={i}>{obj}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h3 className="mb-3 text-blue-600">Entry Requirements</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left border-b">Qualification</th>
                            <th className="px-4 py-2 text-left border-b">Requirement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {programme.eligibility.map((req, i) => (
                            <tr key={i} className="border-b">
                              <td className="px-4 py-2">{req.qualification}</td>
                              <td className="px-4 py-2">{req.requirement}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-blue-600">English Language Requirements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {programme.englishReq.map((req, i) => (
                        <div key={i} className="bg-white border border-gray-300 rounded-lg p-3 text-center">
                          <p className="font-semibold text-sm">{req.test}</p>
                          <p className="text-blue-600 font-bold">{req.score}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-blue-600">Career Choices</h3>
                    <div className="flex flex-wrap gap-2">
                      {programme.careers.map((career, i) => (
                        <span key={i} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm">{career}</span>
                      ))}
                    </div>
                  </div>
                  {programme.salary && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="mb-2 text-green-800">Expected Salary</h3>
                      <p className="text-gray-700">{programme.salary}</p>
                    </div>
                  )}
                  {programme.accreditation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="mb-2 text-blue-800">Professional Recognition</h3>
                      <p className="text-gray-700">{programme.accreditation}</p>
                    </div>
                  )}
                  {programme.didYouKnow && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="mb-2 text-yellow-800">Did you know?</h3>
                      <p className="text-gray-700">{programme.didYouKnow}</p>
                    </div>
                  )}

                  {/* Apply CTA inside expanded */}
                  <div className="pt-2">
                    <button
                      onClick={() => openApply(programme)}
                      className="flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-xl hover:bg-[#1e40af] transition-colors font-semibold"
                    >
                      <GraduationCap className="w-5 h-5" />
                      Apply for this Programme
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── APPLICATION MODAL ── */}
      {applyingTo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4">
            {/* Header */}
            <div className="bg-[#1e3a8a] text-white p-6 rounded-t-2xl relative">
              <button
                onClick={closeApply}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-7 h-7 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-white text-lg font-bold leading-tight">{applyingTo.name}</h2>
                  <p className="text-white/70 text-sm mt-1">{applyingTo.duration} · {applyingTo.mode} · {applyingTo.credits} Credits</p>
                </div>
              </div>
            </div>

            {submitted ? (
              /* Success state */
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-2">
                  Thank you, <strong>{form.fullName}</strong>! Your application for
                </p>
                <p className="font-semibold text-[#1e3a8a] mb-4">{applyingTo.name}</p>
                <p className="text-gray-600 text-sm mb-6">
                  has been received. We will contact you at <strong>{form.email}</strong> within 3–5 working days.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => { setSubmitted(false); setForm({ ...EMPTY_FORM, intakePreference: applyingTo.intakes.split(',')[0].trim() }); }}
                    className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Apply Again
                  </button>
                  <button
                    onClick={closeApply}
                    className="px-5 py-2.5 bg-[#1e3a8a] text-white rounded-xl text-sm hover:bg-[#1e40af]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <p className="text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  Fill in your details below. Anyone can apply — no account needed. Our admissions team will reach out to you.
                </p>

                {/* Personal Info */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#1e3a8a]" /> Personal Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Full Name *</label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="e.g. Ahmad bin Ali"
                        value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input
                        type="email"
                        className={inputCls}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number *</label>
                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="+60 12-345 6789"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Nationality</label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="e.g. Malaysian"
                        value={form.nationality}
                        onChange={e => setForm({ ...form, nationality: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Date of Birth</label>
                      <input
                        type="date"
                        className={inputCls}
                        value={form.dateOfBirth}
                        onChange={e => setForm({ ...form, dateOfBirth: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#1e3a8a]" /> Academic Background
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Highest Qualification *</label>
                      <select
                        className={inputCls}
                        value={form.qualification}
                        onChange={e => setForm({ ...form, qualification: e.target.value })}
                      >
                        <option value="">Select qualification</option>
                        <option>SPM / O-Level</option>
                        <option>STPM / A-Level</option>
                        <option>UEC</option>
                        <option>Foundation / Matriculation</option>
                        <option>Diploma / HND</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>CGPA / Grade (if applicable)</label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="e.g. 3.50 or 5A 2B"
                        value={form.cgpa}
                        onChange={e => setForm({ ...form, cgpa: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Preferred Intake</label>
                      <select
                        className={inputCls}
                        value={form.intakePreference}
                        onChange={e => setForm({ ...form, intakePreference: e.target.value })}
                      >
                        {applyingTo.intakes.split(',').map(i => (
                          <option key={i.trim()} value={i.trim()}>{i.trim()}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional message */}
                <div>
                  <label className={labelCls}>Additional Message (optional)</label>
                  <textarea
                    rows={3}
                    className={inputCls + ' resize-none'}
                    placeholder="Any questions or additional information you'd like to share..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={closeApply}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 py-3 bg-[#1e3a8a] text-white rounded-xl text-sm font-semibold hover:bg-[#1e40af] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <><Send className="w-4 h-4" /> Submit Application</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}