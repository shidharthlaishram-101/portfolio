import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Resume", "Contact"];

const PROJECTS = [
  {
    title: "RentWheels",
    type: "iOS & Android",
    desc: "A cross-platform mobile app for renting cars. Built with Flutter and Firebase.",
    tags: ["Flutter", "Firebase", "Dart", "PhonePe"],
    icon: "🚗",
    accent: "#00E5A0",
    github: "https://github.com/shidharthlaishram-101/RentWheels-A-Car-Rental-App",
  },
  {
    title: "Hanzify",
    type: "Android, Computer Vision, Machine Learning",
    desc: "A machine learning powered app that translates Sign Language to text and voice in real-time using TensorFlow Lite and MediaPipe.",
    tags: ["Flutter", "TensorFlow Lite", "MediaPipe", "Dart"],
    icon: "🖐️",
    accent: "#5B8CFF",
    github: "https://github.com/shidharthlaishram-101/Hanzify-Sign-Language-Translator-App",
  },
  {
    title: "StemCorp Dynamics",
    type: "Full Stack Website",
    desc: "Built a full stack website for a robotics company using React, Node.js, Express, and MongoDB. Implemented features like product showcase, contact forms, and admin dashboard.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    icon: "🌐",
    accent: "#FF6B6B",
    github: "https://github.com/SOURADIPexe/StemCorp-Offical-Website",
  },
  {
    title: "MindCare",
    type: "iOS & Android, IoT, Machine Learning",
    desc: "A mental wellness app that conducts assessments via Chatbot, integrated with IoT devices for real-time mood monitoring and ML health insights.",
    tags: ["Flutter", "Firebase", "Dart", "IoT", "Scikit-learn", "Pandas", "Numpy", "Python"],
    icon: "🧠",
    accent: "#FFB547",
    github: "https://github.com/shidharthlaishram-101/Mindcare",
  },
  {
    title: "CodeWars",
    type: "Full Stack Website",
    desc: "A competitive programming platform for college events with real-time submissions, user authentication, and challenge creation.",
    tags: ["HTML", "CSS", "Vercel", "AWS", "Docker", "Firebase"],
    icon: "⚔️",
    accent: "#6BCB77",
    github: "https://github.com/shidharthlaishram-101/codewars",
  },
  {
    title: "BreatheWell",
    type: "iOS & Android, IoT",
    desc: "An air quality monitoring app with real-time data from Arduino sensors and ThingSpeak APIs, built with Flutter and Firebase.",
    tags: ["Flutter", "Firebase", "Dart", "IoT", "Arduino", "ThingSpeak"],
    icon: "🌬️",
    accent: "#4ECDC4",
    github: "https://github.com/SOURADIPexe/Air-Quality-Monitoring-System-App",
  },
];

const SKILLS = [
  { group: "Mobile", items: ["Flutter", "React Native"] },
  { group: "Frontend", items: ["React", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Flask"] },
  { group: "Data & Cloud", items: ["MongoDB", "Firebase", "AWS", "Docker"] },
  { group: "Machine Learning", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"] },
  { group: "Design", items: ["Figma", "Canva"] },
  { group: "Version Control", items: ["Git", "GitHub"] },
  { group: "Other", items: ["Agile Methodologies", "Prototyping", "Unit Testing", "CI/CD", "Documentation"] },
  { group: "Soft Skills", items: ["Effective Communication", "Team Collaboration", "Problem Solving"] },
  { group: "Languages", items: ["English (Fluent)", "Hindi (Fluent)", "Assamese (Basic)", "Manipuri (Native)"] },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 1.5rem",
        background: scrolled || menuOpen ? "rgba(8,8,12,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "60px",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", color: "#00E5A0", letterSpacing: "0.08em" }}>
          &lt;DEV /&gt;
        </span>

        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#fff", fontSize: "22px", padding: "4px",
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: "12px",
                color: active === l ? "#00E5A0" : "rgba(255,255,255,0.55)",
                letterSpacing: "0.06em", transition: "color 0.2s",
                padding: "4px 0",
                borderBottom: active === l ? "1px solid #00E5A0" : "1px solid transparent",
              }}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: "rgba(8,8,12,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", padding: "1rem 1.5rem 1.5rem",
          gap: "1.25rem",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: "14px",
              color: active === l ? "#00E5A0" : "rgba(255,255,255,0.7)",
              letterSpacing: "0.06em", textAlign: "left", padding: "4px 0",
            }}>{l}</button>
          ))}
        </div>
      )}
    </>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: isMobile ? "80px 1.25rem 2rem" : "0 2rem",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div style={{
        position: "absolute", top: "20%", left: isMobile ? "30%" : "60%",
        width: isMobile ? "300px" : "500px", height: isMobile ? "300px" : "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "11px" : "13px",
          color: "#00E5A0", letterSpacing: "0.12em", marginBottom: "1.25rem",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)",
          transition: "all 0.6s ease 0.1s",
        }}>HELLO, WORLD — I'M</p>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: isMobile ? "clamp(40px, 12vw, 60px)" : "clamp(52px, 9vw, 96px)",
          lineHeight: 1.0, color: "#fff", margin: "0 0 1.25rem",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}>
          Shidharth<br />
          <span style={{ color: "#00E5A0" }}>Laishram</span> Here.
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: isMobile ? "15px" : "clamp(16px, 2.2vw, 20px)",
          color: "rgba(255,255,255,0.55)", lineHeight: 1.7,
          maxWidth: "520px", marginBottom: "2rem",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "all 0.7s ease 0.35s",
        }}>
          Android & iOS developer, Web/App Full Stack Engineer, and Designer — crafting seamless digital experiences across every platform.
        </p>

        <div style={{
          display: "flex", gap: "0.75rem", flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)",
          transition: "all 0.7s ease 0.5s",
        }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: isMobile ? "12px 24px" : "14px 32px", borderRadius: "4px",
              background: "#00E5A0", border: "none", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: "12px",
              color: "#08080C", fontWeight: 700, letterSpacing: "0.06em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(0,229,160,0.35)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
          >VIEW WORK</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: isMobile ? "12px 24px" : "14px 32px", borderRadius: "4px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: "12px",
              color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#00E5A0"; e.target.style.color = "#00E5A0"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "rgba(255,255,255,0.7)"; }}
          >GET IN TOUCH</button>
        </div>

        <div style={{
          display: "flex", gap: isMobile ? "1.5rem" : "2.5rem", marginTop: "3rem", flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transition: "all 0.7s ease 0.65s",
        }}>
          {[["3+", "Years Exp."], ["10+", "Projects"], ["3", "Platforms"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: isMobile ? "22px" : "28px", color: "#00E5A0" }}>{n}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  return (
    <section id="about" ref={ref} style={{ padding: isMobile ? "4rem 1.25rem" : "7rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00E5A0", letterSpacing: "0.14em", marginBottom: "1rem" }}>01 / ABOUT</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,6vw,56px)", color: "#fff", marginBottom: "2rem", lineHeight: 1.1 }}>
          Building for every screen,<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>end to end.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1.25rem" : "3rem", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "15px" : "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
            I'm a software developer who loves bridging the gap between native mobile and web. From development to design, I build products that feel great and scale well.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "15px" : "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
            Currently open to full-time roles and freelance projects. Based in India. I care deeply about clean code, good UI/UX, version control and shipping things that actually work.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem" }}>
          {SKILLS.map((s, i) => (
            <div key={s.group} style={{
              padding: "1.25rem", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
              transition: `all 0.6s ease ${0.1 + i * 0.06}s`,
            }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#00E5A0", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{s.group.toUpperCase()}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {s.items.map(item => (
                  <span key={item} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                    color: "rgba(255,255,255,0.6)", padding: "3px 9px", borderRadius: "3px",
                    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  return (
    <section id="projects" ref={ref} style={{ padding: isMobile ? "4rem 1.25rem" : "7rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00E5A0", letterSpacing: "0.14em", marginBottom: "1rem" }}>02 / PROJECTS</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,6vw,56px)", color: "#fff", marginBottom: "2rem", lineHeight: 1.1 }}>
          Selected work.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} delay={i * 0.08} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => window.open(p.github, "_blank")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.5rem", borderRadius: "8px",
        border: `1px solid ${hovered ? p.accent + "55" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        cursor: "pointer", transition: "all 0.3s ease",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
        transitionDelay: `${delay}s`, transitionProperty: "opacity, transform, border, background",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span style={{ fontSize: "24px" }}>{p.icon}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {hovered && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: p.accent }}>VIEW ON GITHUB ↗</span>}
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "9px", color: p.accent,
            padding: "3px 7px", border: `1px solid ${p.accent}44`, borderRadius: "3px",
          }}>{p.type.toUpperCase()}</span>
        </div>
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff", marginBottom: "0.5rem" }}>{p.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {p.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'Space Mono', monospace", fontSize: "9px",
            color: "rgba(255,255,255,0.4)", padding: "2px 7px",
            background: "rgba(255,255,255,0.05)", borderRadius: "3px",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ResumeItem({ item, type }) {
  return (
    <div style={{
      padding: "1.25rem", marginBottom: "0.75rem", borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "4px" }}>
            {type === "edu" ? item.degree : item.role}
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#00E5A0", marginBottom: item.desc ? "6px" : 0 }}>
            {type === "edu" ? item.place : item.place}
          </p>
          {item.desc && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{item.desc}</p>}
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>{item.period}</span>
      </div>
    </div>
  );
}

function Resume() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  const experience = [
    { role: "Web Developer Intern", place: "Stemcorp Dynamics — Remote", period: "Aug. 2025 – Dec. 2025", desc: "Developed and deployed responsive full-stack web application features. Improved performance through optimized API handling, database queries, and frontend rendering workflows." },
    { role: "Summer Intern & Trainee", place: "Software Technology Parks of India (STPI) — Guwahati", period: "July 2025 – Aug. 2025", desc: "Built IoT automation systems using Arduino sensors, cloud APIs, and Telegram bot integrations. Developed BreatheWell, an air quality monitoring app using Flutter, Firebase, and ThingSpeak APIs." },
    { role: "Summer Intern", place: "Indian Institute of Information Technology Allahabad — Remote", period: "July 2024 – Aug. 2024", desc: "Developed Android applications using XML layouts and core Android components. Implemented UI workflows, activity lifecycle management, and local data handling." },
    { role: "Summer Intern", place: "Airports Authority of India, RHQ-NER — Guwahati", period: "July 2024 – Aug. 2024", desc: "Worked with enterprise networking, ERP workflows, and database management systems. Analyzed operational IT infrastructure used in airport management." },
  ];

  const education = [
    { degree: "B.Tech in Computer Science & Engineering", place: "Assam Don Bosco University, Guwahati — 8.12 CGPA", period: "2022 – 2026" },
    { degree: "Senior Secondary (XII), Science", place: "Miles Bronson Residential School, Guwahati — 85%", period: "2022" },
    { degree: "Secondary (X)", place: "St. Clare's Convent High School, Guwahati — 95%", period: "2020" },
  ];

  const leadership = [
    { role: "President — Indoor Sports Club", place: "Assam Don Bosco University", period: "Aug. 2024 – June 2025", desc: "Led coordination and execution of sports events for D'VERVE 2024, managing event operations and volunteer collaboration." },
    { role: "Executive Committee Member — Coding Club", place: "Assam Don Bosco University", period: "Aug. 2025 – Dec. 2025", desc: "Developed and deployed a full-stack competitive coding platform for Coding Wars at Prajyuktam 2025. Managed 25+ contestants with real-time code evaluation using Judge0 API on AWS EC2." },
  ];

  const sectionLabel = { fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#00E5A0", letterSpacing: "0.12em", margin: "2rem 0 1rem" };

  return (
    <section id="resume" ref={ref} style={{ padding: isMobile ? "4rem 1.25rem" : "7rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00E5A0", letterSpacing: "0.14em", marginBottom: "1rem" }}>03 / RESUME</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,6vw,56px)", color: "#fff", marginBottom: "2rem", lineHeight: 1.1 }}>
          Experience & Education.
        </h2>

        <p style={sectionLabel}>EXPERIENCE</p>
        {experience.map((item, i) => <ResumeItem key={i} item={item} type="exp" />)}

        <p style={sectionLabel}>EDUCATION</p>
        {education.map((item, i) => <ResumeItem key={i} item={item} type="edu" />)}

        <p style={sectionLabel}>RESEARCH</p>
        <div style={{ padding: "1.25rem", marginBottom: "0.75rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "4px" }}>
            Giving Voice to Signs: A Mobile System for Real-Time ASL to Multilingual Speech Translation
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#00E5A0", marginBottom: "6px" }}>
            Regional International Conference on NLP 2025 — Gauhati University
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            Authored and presented research on real-time sign recognition, multilingual speech synthesis, and mobile deployment for accessibility applications.
          </p>
        </div>

        <p style={sectionLabel}>LEADERSHIP</p>
        {leadership.map((item, i) => <ResumeItem key={i} item={item} type="exp" />)}

        <a href="/resume.pdf" download style={{
          display: "inline-block", marginTop: "2rem",
          padding: isMobile ? "12px 24px" : "14px 32px", borderRadius: "4px",
          background: "#00E5A0", textDecoration: "none",
          fontFamily: "'Space Mono', monospace", fontSize: "12px",
          color: "#08080C", fontWeight: 700, letterSpacing: "0.06em",
        }}>DOWNLOAD RESUME ↓</a>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const isMobile = useIsMobile();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://portfolio-server-wfst.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 15px", borderRadius: "4px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: isMobile ? "4rem 1.25rem 3rem" : "7rem 2rem 5rem", maxWidth: "660px", margin: "0 auto" }}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00E5A0", letterSpacing: "0.14em", marginBottom: "1rem" }}>04 / CONTACT</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,6vw,56px)", color: "#fff", marginBottom: "1rem", lineHeight: 1.1 }}>
          Let's build<br />something great.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.45)", marginBottom: "2rem" }}>
          Drop a message and I'll get back to you within 24 hours.
        </p>

        {status === "sent" ? (
          <div style={{ padding: "2rem", borderRadius: "8px", border: "1px solid rgba(0,229,160,0.3)", background: "rgba(0,229,160,0.05)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", color: "#00E5A0", fontWeight: 700 }}>Message sent! ✓</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>I'll be in touch soon.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#00E5A0"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email address" style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#00E5A0"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#00E5A0"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            <button onClick={handleSubmit} disabled={status === "sending"} style={{
              padding: "13px", borderRadius: "4px",
              background: status === "sending" ? "rgba(0,229,160,0.4)" : "#00E5A0",
              border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: "12px",
              color: "#08080C", fontWeight: 700, letterSpacing: "0.06em", transition: "all 0.2s",
            }}>
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </button>
            {status === "error" && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#FF6B6B", textAlign: "center" }}>
                Something went wrong. Please email me directly.
              </p>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: "1.25rem", marginTop: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[["GitHub", "github.com/shidharthlaishram-101"], ["LinkedIn", "linkedin.com/in/shidharthlaishram"], ["Email", "shidharthlaishram@gmail.com"], ["YouTube", "youtube.com/playlist?list=PLK2KORVEWmb0eouP0PrIDeyvvRa90EI_L&si=hhvR4nwVoq6up_wl"]].map(([label, url]) => (
            <a key={label} href={`https://${url}`} target="_blank" rel="noreferrer"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00E5A0"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
            >{label} ↗</a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "1.5rem", textAlign: "center", borderTop: "1px solid rgb(255, 255, 255)" }}>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(255, 255, 255, 0.68)", letterSpacing: "0.06em" }}>
        © {new Date().getFullYear()} — BUILT WITH 🤍 BY SHIDHARTH LAISHRAM
      </p>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("About");

  useEffect(() => {
    const handler = () => {
      const sections = ["about", "projects", "resume", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: "#08080C", minHeight: "100vh", color: "#fff" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500&display=swap" />
      <Navbar active={activeSection} />
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
