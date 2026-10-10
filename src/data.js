// All portfolio content lives here. Edit this file, not the components.
export const profile = {
  name: 'Arnav Khajuria',
  email: 'arnavkhajuria431@gmail.com',
  cv: 'https://arnav-khajuria-cv.netlify.app/',
  socials: [
    { label: 'GitHub', icon: 'fa-github', url: 'https://github.com/Arnav431' },
    { label: 'LinkedIn', icon: 'fa-linkedin', url: 'https://www.linkedin.com/in/arnavkhajuria/' },
    { label: 'Instagram', icon: 'fa-instagram', url: 'https://www.instagram.com/arnav.khajuria_1/' },
  ],
};

export const skills = [
  { icon: 'security', title: 'CYBERSECURITY', red: true,
    desc: 'Vulnerability assessment, network analysis and exploit research, applied through security tooling and threat modeling.',
    tags: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'TCP/IP', 'VPN Concepts', 'CTF'] },
  { icon: 'science', title: 'QUANTUM COMPUTING',
    desc: 'Quantum image processing research and quantum-secure cryptography, from circuit design to GPU-accelerated simulation.',
    tags: ['Qiskit', 'IBM Quantum', 'FRQI', 'CuPy', 'State-Vector Sim'] },
  { icon: 'memory', title: 'ARTIFICIAL INTELLIGENCE',
    desc: 'Applied ML and computer vision with a security lens. Intelligent systems built for real-world use.',
    tags: ['PyTorch', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib', 'Gemini API', 'Image Processing'] },
  { icon: 'globe', title: 'WEB',
    desc: 'Responsive full-stack applications with a focus on clean UI and fast performance.',
    tags: ['React', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Render', 'Vercel'] },
  { icon: 'terminal', title: 'LANGUAGES',
    desc: 'Comfortable from systems-level C/C++ up to Python for research and scripting.',
    tags: ['Python', 'C', 'C++', 'Java', 'JavaScript'] },
  { icon: 'database', title: 'DATA & TOOLS',
    desc: 'Relational and document stores, plus the everyday developer toolchain.',
    tags: ['MySQL', 'MongoDB', 'Firebase', 'Git', 'GitHub', 'VS Code', 'Linux', 'Windows'] },
];

export const projects = [
  { featured: true, title: 'Quantum Image Descriptor', meta: 'Research · IIIT Sri City · Jun–Aug 2026',
    desc: 'An entanglement-based quantum image descriptor combining FRQI encoding, state-fidelity matching and classical baselines. Ratio-test filtering, RANSAC verification and confidence scoring cut false positives, with GPU-accelerated state-vector simulation validated against Qiskit and benchmarked on HPatches.',
    stack: ['Python', 'Qiskit', 'CuPy', 'FRQI', 'RANSAC', 'HPatches'] },
  { title: 'Quantum Secure RNG', link: 'https://github.com/Arnav431/QuantumSecureRNG',
    desc: 'Generates true random bits on IBM Quantum through superposition and measurement, then feeds SHA-256 hashing and AES encryption for quantum-assisted key generation. Modular code for circuit execution, randomness extraction and crypto processing.',
    stack: ['Python', 'Qiskit', 'IBM Quantum', 'SHA-256', 'AES'] },
  { title: 'PathFinder', link: 'https://github.com/Arnav431/PathFinder',
    desc: 'AI career guidance platform. Gemini analyses a profile and returns career paths, required skills, salary trends and a learning roadmap, served through a responsive Flask and Tailwind interface.',
    stack: ['Flask', 'Tailwind', 'Gemini', 'Render'] },
  { title: 'SRA – System Risk Analyzer', link: 'https://github.com/Arnav431/SRA-System-Risk-Analyzer',
    desc: 'Uses Gemini 2.0 Flash to detect system vulnerabilities and recommend fixes. Ships with a dark PyQt5 GUI and a CLI, report export, and standalone Windows executables.',
    stack: ['Python', 'PyQt5', 'Gemini', 'Git'] },
  { title: 'ReTech', link: 'https://github.com/Arnav431/ReTech',
    desc: 'Marketplace for verified second-hand electronics with AI spec extraction for sellers, a chatbot, secure authentication, real-time listings and an eco-tracker for the carbon footprint saved.',
    stack: ['Flask', 'Tailwind', 'Firebase', 'Render'] },
];

export const education = [
  { degree: 'SCHOOL EDUCATION', inst: 'Kendriya Vidyalaya No. 1', meta: ['Jammu, J&K, India', 'April 2015 — June 2024'],
    desc: "Proud alumnus of Kendriya Vidyalaya Sangathan, India's premier national school system.",
    highlights: [
      'Served as the Disciplinary Captain for the Red House, academic year 2023–2024.',
      'Active member of the Bharat Scouts & Guides (Rajya Puraskar awardee).',
    ] },
];

// ─── ACHIEVEMENTS ───────────────────────────────────────────────────────────
// Attach certificates to any achievement through its `certificates` array.
//   { label: 'Certificate', image: 'google-sa.jpg' }              thumbnail + full-screen preview
//        (put the file in public/images/achievements/)
//   { label: 'Certificate', link: 'https://drive.google.com/…' }  opens in a new tab
//   { label: 'Certificate', image: 'x.jpg', link: 'https://…' }   preview, plus an "Open original" link
// Add as many as you like per achievement, or add a whole new achievement object.
export const achievements = [
  { title: 'Google Student Ambassador', org: 'Google · Communique Marketing Solutions', year: '2025', icon: 'workspace_premium', img:'google.png',
    text: 'Selected to represent Google developer programs and lead technical initiatives on campus.',
    certificates: [{ label: 'Certificate', image: 'GSA.png', link: 'https://drive.google.com/file/d/1vqLkMQnQGhS95NsgNFgL-7cO4DBdw4m7/view' }] },
  { title: 'Rajya Puraskar', org: 'Bharat Scouts & Guides', icon: 'military_tech', img:'bsg.png',
    text: 'Awarded for leadership, teamwork and community service.',
    certificates: [{ label: 'Certificate', image: 'BSnG.jpg', link: 'https://drive.google.com/file/d/1XAVbl1MXgJZ6sfXZUaEqMmDyQJSCxOlc/view' }] },
  { title: 'Innovation, Design & Entrepreneurship Bootcamp', org: 'AICTE', icon: 'emoji_objects', img: 'AICTE.png',
    text: 'Participated and collaborated in innovation and entrepreneurship activities.',
    certificates: [{ label: 'Certificate', image: 'IDE.jpeg', link: 'https://drive.google.com/file/d/1aL1g4txiBY4AX-2DI0QSZPxMyiWo1Sv9/view' }] },
];

const D = 'https://drive.google.com/file/d/';
export const certs = [
  { name: 'Geodata Processing using Python & ML', issuer: 'ISRO & IIRS Dehradun', tag: 'FEB 2025 · Machine Learning', img: 'isro.png', url: D + '1YvadjzLL2_FqS0rok6xjfDbOSuxWy_-E/view' },
  { name: 'Python (Basic)', issuer: 'HackerRank', tag: 'MAY 2025 · Programming', icon: 'code', img: 'HackerRank.png', url:'https://www.hackerrank.com/certificates/iframe/03ad67677c7c' },
  { name: 'Front End Web Development', issuer: 'IBM SkillsBuild / CSRBOX', tag: 'AUG 2025 · Web Development', img: 'csrbox.png', url: D + '13FhcSH57pUsoTUYdEjDE1-3JbEYLn-bq/view' },
  { name: 'Google Cloud Platform Badges', issuer: 'Google Skills', tag: 'OCT 2025 · Cloud', icon: 'code', img: 'cloudSkills.png', url:'https://www.skills.google/public_profiles/f5b5ac05-224f-411d-9361-83cfd22155d7' },
  { name: 'Building Quantum Intuition with Qiskit', issuer: 'IUCEE / IBM Qiskit', tag: 'DEC 2025 · Quantum Computing', img: 'iucee.png', url: D + '1Sl8e84vMze2REKKpmfWaU93te0UYEYv7/view' },
  { name: 'Google Cybersecurity', issuer: 'Google / Coursera', tag: 'DEC 2025 · Professional', img: 'google.png', url: 'https://www.coursera.org/account/accomplishments/professional-cert/LCN0B7NETJF2' },
  { name: 'IBM Cybersecurity Analyst', issuer: 'IBM / Coursera', tag: 'MAY 2026 · Professional', icon: 'code', img: 'IBM_logo.png', url:'https://www.coursera.org/account/accomplishments/specialization/P0HU4MZDJSIR' },
  { name: 'Business Fundamentals for Entrepreneurs', issuer: 'NPTEL', tag: 'MAY 2026 · Business', icon: 'code', img: 'nptel.png', url: D + '1I-QmKEa_V1ewjcVGiadcBe3vI0GsXOF6/view' },
];

// Optional per role:  certificates: [{ label: 'Certificate', image: 'iiit-sri-city.jpg' }]   (file in public/images/experience/)
//                  or  certificates: [{ label: 'Certificate', link: 'https://…' }]   (opens in a new tab)
// type: research | leadership | opensource   ·   start/end: 'YYYY-MM' (omit end if ongoing)
export const experience = [
  { type: 'research', start: '2026-06', end: '2026-08', date: 'JUN 2026 — AUG 2026', role: 'Summer Research Intern', co: 'IIIT Sri City, Andhra Pradesh',
    intro: 'Completed a research internship on quantum computing meets image processing: an entanglement-based descriptor for image matching.',
    tags: ['Python', 'Qiskit', 'FRQI', 'CuPy', 'RANSAC', 'HPatches'],
    certificates: [],
    points: [
      'Designed an entanglement-based quantum image descriptor in Python and Qiskit using FRQI encoding and state-fidelity matching.',
      'Raised matching accuracy with ratio-test filtering, RANSAC geometric verification and confidence scoring.',
      'Built GPU-accelerated state-vector computation with CuPy and validated it against Qiskit reference outputs.',
      'Automated an HPatches benchmarking pipeline with homography-based ground truth.',
    ] },
  { type: 'leadership', start: '2025-10', date: 'OCT 2025 — Present', role: 'Technical Manager', promotedFrom: 'Web Master', co: 'ACM Student Chapter MIET (ACMSC)',
    intro: 'Promoted from Web Master to Technical Manager of ACMSC MIET, with wider ownership of the chapter\'s technical work and digital presence.',
    tags: ['Technical Leadership', 'HTML', 'CSS', 'JavaScript', 'DSA Mentoring'],
    points: [
      'Promoted from Web Master to Technical Manager of the ACM Student Chapter.',
      'Maintain the chapter website, event pages and technical resources.',
      'Support workshops, hackathons and coding events through site updates and digital outreach.',
      'Mentor juniors in web development fundamentals and Data Structures & Algorithms.',
    ] },
  { type: 'leadership', start: '2025-09', end: '2025-12', date: 'SEP 2025 — DEC 2025', role: 'Google Student Ambassador', co: 'Communique Marketing Solutions',
    intro: 'Bridging students with global developer ecosystems through Google programs.',
    tags: ['Google Developer Programs', 'Workshops', 'Cloud', 'Community'],
    points: [
      'Promoted Google developer technologies, certifications and learning programs on campus.',
      'Organized workshops, study jams and events around software development and cloud.',
      'Built peer-learning communities around modern developer tools.',
    ] },
  { type: 'opensource', start: '2025-09', end: '2025-10', date: 'SEP 2025 — OCT 2025', role: 'Contributor', co: 'GirlScript Summer of Code',
    intro: 'Contributing to open-source by collaborating on real-world projects.',
    tags: ['Git', 'GitHub', 'Pull Requests', 'Open Source'],
    points: ['Participated in GirlScript Summer of Code as an active contributor.', 'Contributed through pull requests, bug fixes and feature enhancements.'] },
];
