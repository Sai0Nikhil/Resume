import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Moon, 
  Sun, 
  Printer, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FolderGit2, 
  BookOpen, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Avatar from './Avatar';

// LinkedIn custom SVG icon component (since Lucide v1+ has removed brand icons)
const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);


export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Highlight/Filter state
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Copy indicator state
  const [copiedField, setCopiedField] = useState(null);

  // Update theme on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme helper
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Copy to clipboard helper
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    });
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Skill groupings
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "Java"]
    },
    {
      title: "Web Technologies & Databases",
      skills: ["HTML", "CSS", "React", "PostgreSQL", "Mongodb"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "Postman", "Render", "MS Office"]
    }
  ];

  // Helper to check if item is highlighted
  const isHighlighted = (itemTags = []) => {
    if (!selectedSkill) return false;
    return itemTags.some(tag => tag.toLowerCase() === selectedSkill.toLowerCase());
  };

  // Experience Data
  const experiences = [
    {
      role: "Research Assistant",
      company: "Interdisciplinary Systems Research Lab (iSRL)",
      location: "Remote",
      date: "Feb 2026 -- Present",
      bullets: [
        "Contributing to interdisciplinary research projects involving data-driven systems",
        "Assisting in experimentation, analysis, and research documentation"
      ],
      tags: ["Python", "Data Science", "Research", "iSRL"]
    },
    {
      role: "Core Research Member",
      company: "RaSoR -- Ramanujan Society of Research",
      location: "Remote",
      date: "Oct 2025 -- Present",
      bullets: [
        "Engaged in algorithmic and mathematical research discussions",
        "Preparing technical reports and structured research summaries"
      ],
      tags: ["Algorithms", "Research", "Technical Writing"]
    },
    {
      role: "Associate Director -- Research & Discovery",
      company: "KL-VEDA, KL University",
      location: "Vijayawada, India",
      date: "Nov 2025 -- Present",
      bullets: [
        "Leading student research initiatives and mentoring collaborative teams",
        "Coordinating technical activities, innovation discussions, and organizational events"
      ],
      tags: ["Leadership", "Teamwork", "Research", "Git"]
    }
  ];

  // Projects Data
  const projects = [
    {
      title: "Nurve2Voice -- IoT Based Solution for Mute Individuals",
      date: "2025 -- Present",
      role: "Founder",
      type: "Startup Initiative",
      bullets: [
        "Researching TTS models and assistive technologies for speech-impaired individuals",
        "Exploring EMG-based communication systems and AI-driven voice synthesis"
      ],
      tags: ["IoT", "AI", "Python", "Research"]
    },
    {
      title: "Attendance Tracking Application using Face Recognition",
      date: "2025 -- Present",
      role: "Developer",
      type: "Personal Project",
      bullets: [
        "Built an AI-based attendance system capable of capturing and recognizing student faces",
        "Implemented facial recognition concepts using Eigenvalues and Eigenvectors for feature extraction",
        "Developed backend connectivity and deployment workflows using Render",
        "Managed attendance and user data using PostgreSQL database systems"
      ],
      tags: ["Face Recognition", "AI", "Python", "PostgreSQL", "Render"]
    }
  ];

  // Publications Data
  const publications = [
    {
      title: "Regulatory Delta of Food Labelling Laws in India",
      date: "2026",
      doi: "10.5281/zenodo.18719394",
      doiLink: "https://doi.org/10.5281/zenodo.18719394",
      publisher: "iSRL",
      bullets: [
        "Comparative analysis of FSSAI 2011 and 2020 food labelling regulations",
        "Focused on allergen declarations, regulatory changes, and digital ingredient identity systems"
      ],
      tags: ["Research", "iSRL"]
    }
  ];

  // Education Data
  const education = [
    {
      institution: "Indian Institute of Technology Madras",
      date: "2025 -- 2029",
      degree: "Bachelor of Science in Data Science and Applications",
      location: "Chennai, India",
      tags: ["Python", "Data Science"]
    },
    {
      institution: "KL University",
      date: "2025 -- 2029",
      degree: "B.Tech in Computer Science and Engineering (Honors)",
      location: "Vijayawada, India",
      gpa: "GPA: 9.61",
      tags: ["Java", "React", "PostgreSQL", "Mongodb", "Git", "CSS", "HTML"]
    },
    {
      institution: "Narayana Junior College",
      date: "2023 -- 2025",
      degree: "Intermediate (AP Board of Intermediate Education)",
      location: "Vijayawada, India",
      tags: ["Mathematics"]
    },
    {
      institution: "Narayana High School",
      date: "Completed 2023",
      degree: "Class X (SSC)",
      location: "Vijayawada, India",
      gpa: "95%",
      tags: []
    }
  ];

  // Achievements Data
  const achievements = [
    "Achieved CEFR B2 English Proficiency through Cambridge University Press & Assessment Linguaskill",
    "Assessed in speaking, listening, reading, and writing for academic and professional communication"
  ];

  // Certifications Data
  const certifications = [
    "Commonwealth Bank -- Introduction to Data Science Job Simulation",
    "Deloitte Australia -- Data Analytics Job Simulation",
    "Introduction to Programming Using Python",
    "Training Certificate -- IIT Bombay"
  ];

  return (
    <div className="app-container">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="sidebar-sticky">
          {/* Avatar Placeholder */}
          <Avatar src="/photo.png" className="shadow-lg" />

          {/* Profile Details Card */}
          <div className="card">
            <h1 className="profile-name">Sai Nikhil Vukka</h1>
            <p className="profile-title">AI & DS Researcher</p>

            <ul className="contact-list">
              <li className="contact-item">
                <Mail className="contact-icon" size={16} />
                <a href="mailto:25f2005507@ds.study.iitm.ac.in" className="contact-link">
                  25f2005507@ds.study.iitm.ac.in
                </a>
                <button 
                  onClick={() => copyToClipboard('25f2005507@ds.study.iitm.ac.in', 'email')}
                  className="copy-btn"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
                {copiedField === 'email' && <span className="copied-tooltip">Copied!</span>}
              </li>

              <li className="contact-item">
                <Phone className="contact-icon" size={16} />
                <a href="tel:+919381480420" className="contact-link">
                  +91 9381480420
                </a>
                <button 
                  onClick={() => copyToClipboard('+919381480420', 'phone')}
                  className="copy-btn"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
                {copiedField === 'phone' && <span className="copied-tooltip">Copied!</span>}
              </li>

              <li className="contact-item">
                <LinkedinIcon className="contact-icon" size={16} />
                <a 
                  href="https://www.linkedin.com/in/sai-nikhil-vukka-iitm" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  linkedin.com/in/sai-nikhil-vukka-iitm
                </a>
                <button 
                  onClick={() => copyToClipboard('https://www.linkedin.com/in/sai-nikhil-vukka-iitm', 'linkedin')}
                  className="copy-btn"
                  title="Copy LinkedIn URL"
                >
                  {copiedField === 'linkedin' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
                {copiedField === 'linkedin' && <span className="copied-tooltip">Copied!</span>}
              </li>

              <li className="contact-item">
                <MapPin className="contact-icon" size={16} />
                <span className="contact-link">Vijayawada, India</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="floating-actions">
            <button 
              onClick={toggleTheme} 
              className="action-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={16} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={16} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button 
              onClick={handlePrint} 
              className="action-btn"
              title="Print / Save PDF"
            >
              <Printer size={16} />
              <span>Print CV</span>
            </button>
          </div>

          {/* Interactive Skill Tags Card */}
          <div className="card skills-container">
            <h3 className="skill-category-title" style={{ marginBottom: '0.25rem' }}>Interactive Filter</h3>
            <p className="text-secondary" style={{ fontSize: '0.75rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>
              Click a skill below to highlight related projects, experiences, and education.
            </p>

            {skillCategories.map((category, idx) => (
              <div key={idx}>
                <h4 className="skill-category-title">{category.title}</h4>
                <div className="skill-tags">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      onClick={() => setSelectedSkill(prev => prev === skill ? null : skill)}
                      className={`skill-tag ${selectedSkill === skill ? 'active' : ''}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Section */}
      <main className="main-content">
        {/* Active Filter Notification Banner */}
        {selectedSkill && (
          <div className="filter-banner">
            <span>
              Showing items related to: <strong>{selectedSkill}</strong>
            </span>
            <button onClick={() => setSelectedSkill(null)} className="filter-clear-btn">
              Clear Filter
            </button>
          </div>
        )}

        {/* Summary */}
        <section className="card">
          <h2 className="section-title">
            <Award className="section-title-icon" size={20} />
            Professional Summary
          </h2>
          <p className="summary-text">
            Freshman at IIT Madras (BS Data Science) and B.Tech CSE (Honors) student at KL University with interests in AI, Machine Learning, Data Science, and Research. Currently serving as Research Assistant at iSRL (IITM), Core Research Member at RaSoR, and Associate Director -- Research & Discovery at KL-VEDA. Strong communication, coordination, leadership, and organizational skills with experience in research collaborations, student initiatives, and technical projects. CEFR B2 English Proficiency.
          </p>
        </section>

        {/* Experience Section */}
        <section className="card">
          <h2 className="section-title">
            <Briefcase className="section-title-icon" size={20} />
            Professional Experience
          </h2>
          <div className="timeline">
            {experiences.map((exp, index) => {
              const highlighted = isHighlighted(exp.tags);
              return (
                <div key={index} className={`timeline-item ${highlighted ? 'highlighted' : ''}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <h3 className="timeline-title">{exp.role}</h3>
                    <span className="timeline-date">{exp.date}</span>
                  </div>
                  <div className="timeline-subtitle">
                    {exp.company} &bull; {exp.location}
                  </div>
                  <ul className="timeline-bullets">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="timeline-bullet">{bullet}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section className="card">
          <h2 className="section-title">
            <FolderGit2 className="section-title-icon" size={20} />
            Key Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project, index) => {
              const highlighted = isHighlighted(project.tags);
              return (
                <div key={index} className={`project-card ${highlighted ? 'highlighted' : ''}`}>
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-type">{project.type}</span>
                  </div>
                  <div className="project-date">{project.date}</div>
                  <div className="project-role">{project.role}</div>
                  <ul className="timeline-bullets" style={{ marginBottom: '0.75rem' }}>
                    {project.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="timeline-bullet">{bullet}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {project.tags.map((tag, tIndex) => (
                      <span 
                        key={tIndex} 
                        onClick={() => setSelectedSkill(prev => prev === tag ? null : tag)}
                        className={`project-tag ${selectedSkill === tag ? 'active' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Publications Section */}
        <section className="card">
          <h2 className="section-title">
            <BookOpen className="section-title-icon" size={20} />
            Publications
          </h2>
          <div className="timeline">
            {publications.map((pub, index) => {
              const highlighted = isHighlighted(pub.tags);
              return (
                <div key={index} className={`timeline-item ${highlighted ? 'highlighted' : ''}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <h3 className="timeline-title">{pub.title}</h3>
                    <span className="timeline-date">{pub.date}</span>
                  </div>
                  <div className="timeline-subtitle">
                    Publisher: {pub.publisher} &bull;{' '}
                    <a 
                      href={pub.doiLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="publication-doi inline-flex items-center gap-1"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>Zenodo DOI: {pub.doi}</span>
                      <ExternalLink size={12} style={{ display: 'inline' }} />
                    </a>
                  </div>
                  <ul className="timeline-bullets">
                    {pub.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="timeline-bullet">{bullet}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education Section */}
        <section className="card">
          <h2 className="section-title">
            <GraduationCap className="section-title-icon" size={20} />
            Education
          </h2>
          <div className="timeline">
            {education.map((edu, index) => {
              const highlighted = isHighlighted(edu.tags);
              return (
                <div key={index} className={`timeline-item ${highlighted ? 'highlighted' : ''}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <h3 className="timeline-title">{edu.institution}</h3>
                    <span className="timeline-date">{edu.date}</span>
                  </div>
                  <div className="timeline-subtitle">
                    {edu.degree} &bull; {edu.location}
                    {edu.gpa && <strong style={{ marginLeft: '0.5rem', color: 'var(--color-secondary)' }}>({edu.gpa})</strong>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements and Certifications Grid */}
        <div className="grid-two-cols">
          {/* Achievements Card */}
          <section className="card">
            <h2 className="section-title">
              <Award className="section-title-icon" size={20} />
              Achievements
            </h2>
            <ul className="simple-list">
              {achievements.map((ach, index) => (
                <li key={index} className="simple-list-item">
                  <ChevronRight className="simple-list-icon" size={14} />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Certifications Card */}
          <section className="card">
            <h2 className="section-title">
              <Award className="section-title-icon" size={20} />
              Certifications
            </h2>
            <ul className="simple-list">
              {certifications.map((cert, index) => (
                <li key={index} className="simple-list-item">
                  <ChevronRight className="simple-list-icon" size={14} />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
