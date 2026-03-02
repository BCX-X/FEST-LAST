import type { Department } from '../types';

export interface Programme {
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
  departmentId: Department;
}

export const programmes: Programme[] = [
  {
    id: 'automotive',
    departmentId: 'mechanical',
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
    about: 'This programme focuses on every aspect of vehicles such as the in-depth working mechanism and principle of various automotive systems, diagnosis, servicing, maintenance, safety issues and so on. You will be exposed to exciting opportunities to expand your learning experience, especially during projects.',
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
    departmentId: 'electrical',
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
    departmentId: 'biotechnology',
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
    about: 'Agriculture is the backbone of Malaysia\'s economy. The plantation sector in Malaysia has contributed significantly to the Malaysian economy. Using local expertise, KLUST developed this programme at the sub-professional level to supply trained personnel to cater for the management of plantation crops which are rapidly expanding in the region.',
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
    departmentId: 'mechanical',
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
    whatLearn: 'This programme involves the principles of engineering such as statics, materials science, design and analysis of mechanical parts and systems. Understanding of core areas including mechanics, dynamics, thermodynamics, fluid mechanics, structural analysis, electrical and electronic system.',
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
    departmentId: 'electrical',
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
    whatLearn: 'This course will equip you with fundamental principles and advanced concepts of electronic engineering. You will gain hands-on practical experience in designing and constructing electronic systems using computer simulation and practical laboratory work.',
    whatExpect: 'One of the most valuable skills you would acquire is the ability to solve problems through project work or analysis of technical knowledge. Your course will encourage you to think logically, collect relevant data and make decisions.',
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
    departmentId: 'civil',
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
    departmentId: 'computing',
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
    whatExpect: 'IT professionals are responsible for designing, developing, supporting and managing computer hardware, software, and information networks, including the internet. Upon completion, you will be able to assist in the implementation of these IT activities.',
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
    departmentId: 'computing',
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
    about: 'The Bachelor in Software Engineering program is designed to equip students with comprehensive knowledge and practical skills in software development, system design, and project management. The curriculum integrates foundational theories with hands-on experience in coding, algorithm design, and software testing.',
    isFor: 'If you love technology, enjoy solving problems, and are eager to learn about software development, this program is perfect for you. It\'s ideal for those interested in coding and staying updated with the latest tech trends.',
    whatLearn: 'You will learn software development, system design, coding, algorithm design, software testing, and project management. The curriculum also covers current trends like artificial intelligence, cloud computing, and cybersecurity.',
    whatExpect: 'This programme is designed to produce well-equipped students for a successful career in the software industry and the information technology sector through problem-solving, mathematical foundations of software engineering, programming, and software development methodologies.',
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
    salary: 'The average salary for a software engineering graduate typically ranges from MYR 3,000 to MYR 5,000 per month. With more experience and expertise, software engineers can earn significantly higher salaries.'
  },
  {
    id: 'agricultural-bachelor',
    departmentId: 'biotechnology',
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
    about: 'Agriculture is the backbone of Malaysia\'s economy. The plantation sector has contributed significantly to the Malaysian economy. Malaysia continues to be regarded as the reference point for oil palm, rubber, cocoa, and coconut upstream and downstream technology.',
    isFor: 'Agriculture is a huge industry. We will always need agriculture. Better job and career opportunities. High opportunities for young graduates and entrepreneurs.',
    whatLearn: 'The programme covers comprehensive knowledge in agricultural science & plantation management with emphasis on scientific methods, practical skills, and modern plantation management techniques.',
    whatExpect: 'Students will gain competent knowledge, practical and analytical skills, critical thinking, as well as the agility to adapt to the rapid advancements in various areas of Agricultural Plantation Management.',
    peo: [
      'Graduates with competent knowledge, practical and analytical skills, critical thinking, as well as the agility to adapt to the rapid advancements in various areas of Agricultural Plantation Management.',
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
