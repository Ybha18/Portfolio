export interface ProjectArchitectureStep {
  label: string;
  detail: string;
}

export interface Project {
  index: string;
  name: string;
  subtitle: string;
  description: string;
  architecture: ProjectArchitectureStep[];
  stack: string[];
  repo: string;
  status: 'ACTIVE' | 'FLAGSHIP';
  details?: {
    overview: string;
    highlights: string[];
    hardwareOrTech: string[];
    telemetryDemo?: {
      voltage?: string;
      current?: string;
      powerFactor?: string;
      frequency?: string;
      anomalyState?: string;
    };
  };
}

export interface SkillGroup {
  title: string;
  code: string;
  icon: 'cpu' | 'factory' | 'terminal' | 'brain' | 'wrench';
  skills: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  category: 'experience' | 'internship' | 'education' | 'leadership';
  badge?: string;
  points: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  skills: string[];
  url: string;
}

export interface AgencyInfo {
  name: string;
  role: string;
  period: string;
  tagline: string;
  type: string;
  location: string;
  website: string;
  description: string;
  services: {
    title: string;
    description: string;
    tools: string[];
  }[];
  points: string[];
  github: string;
}

export const PROFILE = {
  name: 'Yassine Bel Hadj Ali',
  callsign: 'YBHA.ino',
  role: 'Electrical & Automation Engineering Student | Embedded Systems, IoT & AI',
  school: "École Nationale d'Ingénieurs de Gabès (ENIG)",
  graduation: '2029',
  tagline:
    'Electrical & Automation Engineering student at ENIG with hands-on experience in embedded systems, IoT architecture, automation, and applied AI. Proficient in C/C++, Python, ESP32 microcontrollers, MQTT messaging, FastAPI backend integration, and AI-assisted workflow automation.',
  focus: ['Embedded Systems', 'IoT', 'Industrial Automation', 'Applied AI'],
  location: 'Tunis, Tunisia',
  email: 'yassinebelhadjali12@gmail.com',
  phone: '+216 58 891 602',
  github: 'https://github.com/Ybha18',
  linkedin: 'https://www.linkedin.com/in/yassine-bel-hadj-ali-245800348/',
  photoUrl: '/profile.png',
  cvUrl: '/Yassine_Bel_Hadj_Ali_CV.pdf',
};

export const AGENCY_INTELLDEV: AgencyInfo = {
  name: 'IntellDev',
  role: 'Founder',
  period: '2026 — Present',
  type: 'Dev & Marketing Agency',
  location: 'Tunisia',
  website: 'https://intelldev.tn/',
  tagline: 'Development, Workflow Automation & Digital Marketing Agency',
  description:
    'A development and digital marketing agency founded by Yassine Bel Hadj Ali. IntellDev delivers modern web applications, digital marketing solutions, automated operational pipelines, and AI-assisted tooling to empower growing businesses.',
  services: [
    {
      title: 'Web & Digital Solutions',
      description:
        'High-performance web applications, responsive customer portals, and tailored software solutions designed for speed and reliability.',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'REST APIs'],
    },
    {
      title: 'Digital Marketing & Growth',
      description:
        'Data-driven digital marketing strategy, conversion funnels, brand web presence, and customer acquisition workflows.',
      tools: ['CRM Systems', 'Power BI Reporting', 'SEO Optimization', 'Analytics'],
    },
    {
      title: 'Workflow Automation & AI',
      description:
        'End-to-end automation pipelines connecting databases, CRM software, and communication channels with state-of-the-art AI.',
      tools: ['Claude Code', 'Zapier', 'Power Automate', 'Make', 'Generative AI'],
    },
  ],
  points: [
    'Founded a digital development & marketing agency focused on web solutions, applications, workflow automation, and digital services.',
    'Designed digital solutions combining AI-assisted development, automation workflows, and modern software tools.',
    'Applied project management, technical problem-solving, client communication, and solution design across digital projects.',
  ],
  github: 'https://github.com/Ybha18',
};

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'EnerGuard',
    subtitle: 'Intelligent Industrial Energy Monitoring System',
    description:
      'Industrial energy-monitoring architecture using ESP32-based data acquisition for machine-level electrical measurements. Streams sensor data over MQTT/Mosquitto to a FastAPI backend, database services, and a real-time web dashboard for voltage, current, power factor, and electrical anomalies.',
    architecture: [
      {
        label: 'Acquisition',
        detail: 'ESP32 firmware samples voltage & current at machine level',
      },
      {
        label: 'Transport',
        detail: 'MQTT over a Mosquitto broker — lightweight telemetry bus',
      },
      {
        label: 'Processing',
        detail: 'FastAPI backend ingests, stores, and exposes telemetry',
      },
      {
        label: 'Interface',
        detail: 'Real-time dashboard: power factor, consumption, anomalies',
      },
    ],
    stack: [
      'ESP32',
      'C/C++',
      'MQTT',
      'Mosquitto',
      'FastAPI',
      'IoT',
      'Industrial Monitoring',
    ],
    repo: 'https://github.com/Ybha18/Energuard',
    status: 'FLAGSHIP',
    details: {
      overview:
        'EnerGuard provides scalable machine-level energy visibility in industrial manufacturing environments. By interfacing current transformers and voltage transducers with an ESP32 microcontroller, electrical parameters are sampled with high deterministic precision, transmitted over an MQTT bus, and ingested by a FastAPI service for threshold detection and real-time visualization.',
      highlights: [
        'Designed an industrial energy-monitoring architecture using ESP32-based data acquisition for machine-level electrical measurements.',
        'Developed a software pipeline connecting simulated sensor data to MQTT/Mosquitto, a FastAPI backend, database services, and a web dashboard.',
        'Explored monitoring of voltage, current, energy consumption, power factor, and electrical anomalies for industrial equipment.',
        'Focused on scalable IoT architecture, embedded data acquisition, machine-level energy visibility, and industrial monitoring.',
      ],
      hardwareOrTech: [
        'ESP32 NodeMCU',
        'SCT-013-000 Non-invasive Current Sensor',
        'ZMPT101B Voltage Transformer Module',
        'Eclipse Mosquitto MQTT Broker',
        'FastAPI / Python WebSockets',
      ],
      telemetryDemo: {
        voltage: '230.2 V',
        current: '14.85 A',
        powerFactor: '0.94 PF',
        frequency: '50.01 Hz',
        anomalyState: 'NOMINAL',
      },
    },
  },
  {
    index: '02',
    name: 'FloodGuard AI',
    subtitle: 'Flood-Impact Simulation & Evacuation Support (2026 · ENIG)',
    description:
      'Decision-support prototype combining flood scenario modeling, road network GIS data, and real-time route recalculation. Integrates an AI copilot agent for evidence-grounded emergency evacuation explanations while processing real-world spatial datasets and open weather APIs with deterministic computational logic.',
    architecture: [
      {
        label: 'Simulation',
        detail: 'Flood scenario modeling with synthetic terrain & open weather APIs',
      },
      {
        label: 'Graph GIS',
        detail: 'Road network GIS dataset as a dynamic graph with hazard penalties',
      },
      {
        label: 'Routing',
        detail: 'Deterministic A* pathfinding recomputes optimal routes to shelters',
      },
      {
        label: 'AI Copilot',
        detail: 'Natural language emergency briefings & automated tool orchestration',
      },
    ],
    stack: [
      'AI',
      'Python',
      'GIS',
      'Route Optimization',
      'Streamlit',
      'NumPy',
      'NetworkX',
      'Open Weather APIs',
    ],
    repo: 'https://github.com/Ybha18/Floodguard-ai-',
    status: 'ACTIVE',
    details: {
      overview:
        'Built at ENIG, FloodGuard AI combines GIS spatial datasets, hydrodynamic flood propagation, and real-time route recalculation with an integrated AI copilot agent that delivers evidence-grounded emergency evacuation briefings, keeping deterministic hazard calculations auditable and secure.',
      highlights: [
        'Built a decision-support prototype combining flood scenario modeling, road network GIS data, and real-time route recalculation.',
        'Integrated an AI copilot agent to deliver evidence-grounded emergency evacuation explanations and automated tool orchestration.',
        'Processed real-world spatial datasets and open weather APIs while maintaining strict separation between deterministic routing and simulated hazard models.',
      ],
      hardwareOrTech: [
        'GIS Spatial Network Datasets',
        'Open Weather APIs',
        'AI Copilot Agent Architecture',
        'NetworkX Graph Engine',
        'NumPy Array Simulation',
        'A* Shortest Path Algorithm',
        'Streamlit Reactive Framework',
      ],
    },
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Embedded Systems & IoT',
    code: 'SYS.01',
    icon: 'cpu',
    skills: [
      'ESP32',
      'Arduino',
      'Microcontroller Architecture',
      'Sensors',
      'MQTT',
      'Mosquitto',
      'C',
      'C++',
      'Python',
    ],
  },
  {
    title: 'Engineering & Industrial Systems',
    code: 'AUT.02',
    icon: 'factory',
    skills: [
      'Electrical Systems',
      'Electronics',
      'Automation & Control',
      'Industrial Systems',
      'Robotics',
      'Power Distribution',
    ],
  },
  {
    title: 'Automation & Web Backend',
    code: 'SWE.03',
    icon: 'terminal',
    skills: [
      'FastAPI',
      'REST APIs',
      'Web Development',
      'Dashboards',
      'Git',
      'GitHub',
      'Python Backend',
    ],
  },
  {
    title: 'AI & Workflow Automation',
    code: 'AI.04',
    icon: 'brain',
    skills: [
      'Generative AI',
      'AI-assisted Development',
      'Power Automate',
      'Zapier',
      'Claude Code',
      'Data Analysis',
      'Microsoft Power BI',
    ],
  },
  {
    title: 'Methodologies & Engineering Tools',
    code: 'ENG.05',
    icon: 'wrench',
    skills: [
      'System Simulation',
      'Hardware Prototyping',
      'Anomaly Detection',
      'Technical Documentation',
      'GIS Route Optimization',
      'Signal Processing',
    ],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    period: '2026',
    title: 'Engineering Intern — Sotualco',
    org: 'Sotualco · Tunisia',
    category: 'internship',
    badge: 'ENGINEERING INTERN',
    points: [
      'Analyzed automated production lines, control systems, power distribution units, and heavy electrical machinery.',
      'Investigated the practical integration between electrical, mechanical, and industrial automation components.',
    ],
  },
  {
    period: '2026',
    title: 'Industrial Observer — Chimie Couleur',
    org: 'Chimie Couleur · Tunisia',
    category: 'internship',
    badge: 'INDUSTRIAL INTERNSHIP',
    points: [
      'Evaluated automated manufacturing processes, material flow, and supply chain logistics within an industrial plant.',
      'Assessed industrial safety standards, workplace access equipment, and machinery operational procedures.',
    ],
  },
  {
    period: '2026 — Present',
    title: 'Founder — IntellDev',
    org: 'IntellDev · Tunisia (intelldev.tn)',
    category: 'experience',
    badge: 'AGENCY FOUNDER',
    points: [
      'Founded and managed a digital solutions initiative specializing in web development, UI/UX design, and digital marketing workflows.',
      'Oversaw technical delivery and client requirements execution across full-stack development projects.',
    ],
  },
  {
    period: 'Aug 2024 — Jan 2025',
    title: 'Customer Service Advisor — Concentrix (Petro-Canada Account)',
    org: 'Concentrix · Tunisia',
    category: 'experience',
    points: [
      'Resolved complex customer requests and service queries following strict operational and quality standards.',
      'Utilized SugarCRM, Microsoft Power BI, and Office Suite to maintain accurate data reporting and performance metrics.',
    ],
  },
  {
    period: '2025 — Present',
    title: 'National Engineering Diploma in Electrical & Automation Engineering',
    org: "École Nationale d'Ingénieurs de Gabès (ENIG) · Tunisia",
    category: 'education',
    badge: 'EXPECTED JUNE 2029',
    points: [
      'Expected Graduation: June 2029',
      'Core Coursework: Electrical Systems, Electronics, Automation & Control, Industrial Systems, Signal Processing, Numerical Methods, Embedded Programming.',
    ],
  },
  {
    period: '2023 — 2025',
    title: 'Preparatory Engineering Cycle – Mathematics & Physics (MP)',
    org: 'Institut Préparatoire aux Études d’Ingénieurs de Gabès (IPEIG) · Gabès, Tunisia',
    category: 'education',
    points: [
      'Rigorous two-year engineering preparatory cycle in Mathematics & Physics (MP).',
    ],
  },
  {
    period: 'Leadership & Activities',
    title: 'Founder & Coordinator — Casa della Musica',
    org: 'ENIG · Gabès, Tunisia',
    category: 'leadership',
    badge: 'FOUNDER & COORDINATOR',
    points: [
      'Created and coordinated a university music club, organizing campus events and supporting student performances.',
    ],
  },
  {
    period: 'Community Leadership',
    title: 'Head of Internal Affairs — Interact Tunis Paradise',
    org: 'Tunis, Tunisia',
    category: 'leadership',
    points: [
      'Managed internal operations for youth-led community service, social impact, and charity projects.',
    ],
  },
  {
    period: 'Technical Activities',
    title: 'Active Member — ENIG Robotics Club',
    org: 'ENIG · Gabès, Tunisia',
    category: 'leadership',
    points: [
      'Participated in technical robotics initiatives and technical workshops.',
    ],
  },
];

export const LANGUAGES: Language[] = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Professional Working Proficiency (B2)' },
  { name: 'French', level: 'Professional Working Proficiency (B2)' },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Generative AI Certificate',
    issuer: 'GoMyCode',
    date: '2026',
    skills: [
      'Generative AI',
      'AI-assisted development',
      'Workflow automation',
      'Power Automate',
      'Zapier',
      'Claude Code',
    ],
    url: 'https://diploma.gomycode.app/?id=39876087105372732154511014959748041041',
  },
];

export const INTERESTS = [
  'Embedded Systems',
  'Industrial Automation',
  'IoT',
  'Robotics',
  'Artificial Intelligence',
  'Computer Vision',
  'Energy Systems',
];

export const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#agency', label: 'IntellDev Agency' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];
