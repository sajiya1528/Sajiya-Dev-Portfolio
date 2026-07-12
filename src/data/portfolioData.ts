export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'fullstack' | 'ai' | 'react';
  technologies: string[];
  githubUrl: string;
  liveUrlUrl?: string;
  isFeatured?: boolean;
  image: string; // Placeholder or generated UI mockups
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string[];
  type: 'internship' | 'training' | 'project' | 'education';
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export const portfolioData = {
  personalInfo: {
    logo: "SN",
    fullName: "SAJIYA NAZIR",
    title: "Aspiring Full Stack Developer",
    subtitle: "Artificial Intelligence & Data Science Student",
    roles: [
      "Aspiring Full Stack Developer",
      "Artificial Intelligence & Data Science Student",
      "Frontend Developer",
      "React Developer",
      "Node.js Learner"
    ],
    bio: "Passionate Full Stack Developer focused on creating modern web applications using React, JavaScript, Node.js, Express, SQL and AI technologies.",
    email: "sajiyanazir28@gmail.com",
    phone: "9263815041",
    location: "Hyderabad, India",
    github: "https://github.com/sajiya1528",
    linkedin: "https://www.linkedin.com/in/sajiya-nazir1528",
    resumeUrl: "#", // User will replace this placeholder
  },
  
  techMarquee: [
    "HTML", "CSS", "JavaScript", "React", "TypeScript", "Node.js", "Express.js", 
    "Java", "Python", "SQL", "MySQL", "MongoDB", "Git", "GitHub", "REST API", 
    "Postman", "Docker", "Tailwind CSS", "Bootstrap", "Vite", "AI", "Machine Learning", 
    "Data Science", "Responsive Design", "Figma", "VS Code", "Render", "Vercel", 
    "Netlify", "Linux", "Framer Motion"
  ],

  skillCategories: [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java" },
        { name: "Python" },
        { name: "JavaScript" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "SQL" }
      ]
    },
    {
      title: "Web Technologies",
      skills: [
        { name: "React" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "REST API" },
        { name: "Tailwind" },
        { name: "Bootstrap" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MySQL" },
        { name: "MongoDB" }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "VS Code" },
        { name: "Postman" },
        { name: "Docker" },
        { name: "Figma" }
      ]
    }
  ] as SkillCategory[],

  aboutDomainCards: [
    {
      title: "Frontend Development",
      description: "Building responsive, high-performance user interfaces with React, TypeScript, and Tailwind CSS. Obsessed with smooth animations and layout details.",
      icon: "layout"
    },
    {
      title: "Backend Development",
      description: "Developing robust APIs and server side business logic using Node.js and Express.js, focusing on scalability and secure architecture.",
      icon: "server"
    },
    {
      title: "Database Management",
      description: "Designing efficient data models and optimizing query speeds across relational (MySQL) and non-relational (MongoDB) systems.",
      icon: "database"
    },
    {
      title: "Problem Solving",
      description: "Analyzing computational challenges and implementing optimized algorithms using Java and Python. Experienced in clean code principles.",
      icon: "code"
    },
    {
      title: "UI/UX Design",
      description: "Creating responsive design mockups in Figma, focusing on visual hierarchy, sleek typography, color theory, and interactive states.",
      icon: "palette"
    },
    {
      title: "AI & Machine Learning",
      description: "Applying neural networks, regression models, and data analytics. Incorporating LLM APIs and cognitive workflows in modern apps.",
      icon: "brain"
    }
  ],

  educationTimeline: [
    {
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "Hyderabad Institute of Technology and Management (HITAM)",
      location: "Hyderabad, India",
      duration: "2022 - 2026",
      status: "Current Final Year Student",
      details: "Focusing on artificial intelligence, neural networks, machine learning algorithms, big data, cloud architecture, and modern full-stack web engineering."
    }
  ],

  experience: [
    {
      id: "exp-1",
      title: "Web Development Internship",
      company: "Tech-Vise Solutions",
      duration: "3 Months (June 2025 - August 2025)",
      description: [
        "Assisted in crafting responsive React components and micro-frontends with tailwindcss.",
        "Created API routes in Express.js and tested them through Postman scripts.",
        "Integrated interactive chat bubbles and charts using Framer Motion and Recharts."
      ],
      type: "internship"
    },
    {
      id: "exp-2",
      title: "Full Stack Training",
      company: "Industry Academy Program",
      duration: "6 Months (Jan 2025 - June 2025)",
      description: [
        "Intensive training focusing on MERN Stack development (MongoDB, Express, React, Node.js).",
        "Learned data structures, clean MVC pattern architecture, and JWT-based auth flows.",
        "Completed multiple capstones with Git-based team collaboration reviews."
      ],
      type: "training"
    },
    {
      id: "exp-3",
      title: "Academic Projects & Development",
      company: "HITAM Engineering Lab",
      duration: "Ongoing",
      description: [
        "Created research-driven AI and full-stack utilities like SpendSense AI and Medico AI Assist.",
        "Maintained repository health, resolved lint issues, and automated build flows.",
        "Designed and integrated responsive CSS variables for light/dark layout toggling."
      ],
      type: "project"
    },
    {
      id: "exp-4",
      title: "Learning & Development Journey",
      company: "Self-Directed Study",
      duration: "2022 - Present",
      description: [
        "Learned programming foundations in Java and Python.",
        "Transitioned into web technologies including ES6 JavaScript, REST API integration, and SQL/NoSQL databases.",
        "Enthusiastic explorer of AI prompt engineering, Docker virtualization, and cloud deployments."
      ],
      type: "education"
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "proj-1",
      title: "SpendSense AI",
      description: "An AI-powered smart financial dashboard that analyzes users' expenses, categorizes receipts, provides budget forecasting, and shares smart money tips using integrated LLMs.",
      category: "ai",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Groq AI API", "Chart.js"],
      githubUrl: "https://github.com/sajiya1528/spendsense-ai",
      liveUrlUrl: "#",
      isFeatured: true,
      image: "spendsense"
    },
    {
      id: "proj-2",
      title: "Medico AI Assist",
      description: "A patient-centric AI medical assistance application. It analyzes symptoms, helps map patient-reported queries to appropriate doctor domains, and answers health-related questions securely.",
      category: "ai",
      technologies: ["React", "TypeScript", "Express.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/sajiya1528/medico-ai-assist",
      liveUrlUrl: "#",
      isFeatured: true,
      image: "medico"
    },
    {
      id: "proj-3",
      title: "Apna Mart",
      description: "A premium, full-featured e-commerce platform with real-time stock management, interactive cart systems, responsive layout structures, and Stripe checkout simulation.",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "JWT Auth"],
      githubUrl: "https://github.com/sajiya1528/apna-mart",
      liveUrlUrl: "#",
      isFeatured: true,
      image: "apnamart"
    },
    {
      id: "proj-4",
      title: "Attendance Management System",
      description: "An enterprise-grade attendance tracker with role-based logins, secure CSV report downloads, student/employee check-in dashboards, and custom notifications.",
      category: "fullstack",
      technologies: ["React", "Node.js", "SQL", "Bootstrap", "REST API"],
      githubUrl: "https://github.com/sajiya1528/attendance-system",
      liveUrlUrl: "#",
      isFeatured: false,
      image: "attendance"
    },
    {
      id: "proj-5",
      title: "Weather App",
      description: "A gorgeous weather forecasting dashboard using the OpenWeather API, featuring real-time interactive search, localized temperature charts, and responsive climate animations.",
      category: "frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS", "OpenWeather API", "Framer Motion"],
      githubUrl: "https://github.com/sajiya1528/weather-app",
      liveUrlUrl: "#",
      isFeatured: false,
      image: "weather"
    },
    {
      id: "proj-6",
      title: "Personal Website",
      description: "A high-performance personal website built with a premium glassmorphic theme, custom 3D skill sphere, full-screen page transitions, and an interactive AI chatbot helper.",
      category: "react",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "EmailJS", "Groq AI API"],
      githubUrl: "https://github.com/sajiya1528/Sajiya-Dev-Portfolio",
      liveUrlUrl: "#",
      isFeatured: true,
      image: "portfolio"
    },
    {
      id: "proj-7",
      title: "Zepto Clone",
      description: "A high-fidelity replica UI of the Zepto instant grocery delivery platform, showcasing fast dynamic lists, search optimizations, category toggles, and item management animations.",
      category: "frontend",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/sajiya1528/zepto-clone",
      liveUrlUrl: "#",
      isFeatured: false,
      image: "zepto"
    },
    {
      id: "proj-8",
      title: "MergeMate Smart PDF Merger",
      description: "A client-side utility allowing users to upload, drag-and-reorder, compile, and merge multiple PDF documents inside their web browser safely without sending documents to servers.",
      category: "react",
      technologies: ["React", "TypeScript", "PDF-Lib", "Tailwind CSS", "HTML5 Drag-n-Drop"],
      githubUrl: "https://github.com/sajiya1528/mergemate-pdf-merger",
      liveUrlUrl: "#",
      isFeatured: false,
      image: "mergemate"
    }
  ] as Project[],

  certifications: [
    {
      id: "cert-1",
      name: "React Developer Certification",
      issuer: "Udemy Academy",
      date: "August 2025",
      url: "#"
    },
    {
      id: "cert-2",
      name: "Full Stack Web Engineering Core",
      issuer: "Industry Tech Council",
      date: "May 2025",
      url: "#"
    },
    {
      id: "cert-3",
      name: "Java Foundation Programming",
      issuer: "HackerRank Gold Badge",
      date: "December 2024",
      url: "#"
    },
    {
      id: "cert-4",
      name: "Database Query Optimization with MySQL",
      issuer: "Great Learning Academy",
      date: "September 2024",
      url: "#"
    }
  ] as Certification[],

  chatbotKnowledge: {
    systemPrompt: `You are SN-Bot, Sajiya Nazir's intelligent personal website AI assistant. 
Your purpose is to answer questions about Sajiya Nazir (skills, education, projects, contact info) professionally and concisely.
You MUST be friendly, recruiter-oriented, and only talk about Sajiya and her work.
If asked about topics completely unrelated to Sajiya (e.g. general recipes, history lessons, unrelated programming questions), politely decline to answer, explaining that your knowledge is focused on Sajiya Nazir.
Keep answers under 3-4 sentences. Include bullet points if it helps read quickly.

Here is the verified information you know:
- Name: Sajiya Nazir
- Location: Hyderabad, India
- Role: Aspiring Full Stack Developer & final-year B.Tech Student in AI & Data Science (2022-2026).
- College: Hyderabad Institute of Technology and Management (HITAM).
- Email: sajiyanazir28@gmail.com
- Phone: 9263815041
- Github: https://github.com/sajiya1528
- Linkedin: https://www.linkedin.com/in/sajiya-nazir1528
- Skills: Java, Python, JavaScript, React, Node.js, Express, SQL, MySQL, MongoDB, HTML, CSS, REST APIs, Tailwind CSS, Git, Docker, Postman, Figma.
- Experience: Web Development Internship at Tech-Vise Solutions (3 months) building React components & APIs; Full Stack Training (6 months) in MERN stack; Academic Projects lab research.
- Notable Projects:
  1. SpendSense AI (AI financial dashboard analyzing budgets)
  2. Medico AI Assist (Symptom analysis & patient management assistant)
  3. Apna Mart (Full stack MERN e-commerce app with Stripe mockup)
  4. Attendance Management System (Role-based check-in tracker)
  5. Weather App, Zepto Clone, MergeMate Smart PDF Merger.
- Certifications: React Developer (Udemy), Full Stack Web Engineering, Java Foundations, MySQL Optimization.
- Career Goal: To secure a Full Stack Developer role where she can combine React development with AI and backend technologies to construct premium, high-performance web systems.`,
    
    fallbackAnswers: [
      {
        keywords: ["hello", "hi", "hey", "who are you", "bot", "assistant"],
        answer: "Hello! I am SN-Bot, Sajiya Nazir's website assistant. You can ask me about her skills, projects, professional experience, education, or how to contact her!"
      },
      {
        keywords: ["skills", "technologies", "languages", "tech stack", "what does she know"],
        answer: "Sajiya's core technical skills include **Programming Languages** (Java, Python, JavaScript, HTML, CSS, SQL), **Web Technologies** (React, Node.js, Express, REST APIs, Tailwind CSS, Bootstrap), **Databases** (MySQL, MongoDB), and **Tools** (Git, GitHub, Docker, Postman, Figma)."
      },
      {
        keywords: ["experience", "work", "job", "internship", "intern"],
        answer: "Sajiya worked as a **Web Development Intern** at Tech-Vise Solutions for 3 months, developing interactive components in React and writing Express.js API scripts. She also completed an intensive 6-month **Full Stack Training** program."
      },
      {
        keywords: ["project", "projects", "spendsense", "medico", "apna mart", "pdf", "zepto"],
        answer: "Her major projects include:\n- **SpendSense AI**: An AI budget/finance analyzer.\n- **Medico AI Assist**: An AI healthcare assistance application.\n- **Apna Mart**: A full-stack MERN e-commerce store.\n- **MergeMate**: A client-side PDF reorder and merge utility.\nYou can check the **Projects** section of the website for live demo links and github repositories!"
      },
      {
        keywords: ["education", "college", "btech", "b.tech", "degree", "study", "student", "hitam"],
        answer: "Sajiya is currently a final-year **B.Tech** student in **Artificial Intelligence & Data Science** (2022-2026) at the **Hyderabad Institute of Technology and Management (HITAM)** in Hyderabad, India."
      },
      {
        keywords: ["contact", "email", "phone", "linkedin", "github", "hire", "resume", "reach"],
        answer: "You can reach Sajiya directly via:\n- **Email**: sajiyanazir28@gmail.com\n- **Phone**: +91 9263815041\n- **LinkedIn**: [in/sajiya-nazir1528](https://www.linkedin.com/in/sajiya-nazir1528)\n- **GitHub**: [github.com/sajiya1528](https://github.com/sajiya1528)\nFeel free to fill out the form in the **Contact** section to send her an email!"
      },
      {
        keywords: ["certification", "certifications", "certificate", "certificates"],
        answer: "Sajiya holds certifications in **React Development** (Udemy Academy), **Full Stack Web Engineering Core** (Industry Tech Council), **Java Foundations** (HackerRank), and **MySQL Database Optimization**."
      }
    ],
    defaultAnswer: "Thank you for asking! I'm specialized in Sajiya's work. You can ask me about her skills, MERN stack projects (like SpendSense AI and Apna Mart), work experience, education, or direct contact details. How can I help you recruit Sajiya?"
  }
};
