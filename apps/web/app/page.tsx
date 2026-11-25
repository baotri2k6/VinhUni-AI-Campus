"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BookOpen, CalendarDays, GraduationCap, LayoutGrid, Moon, Sun, Sparkles, ArrowUpRight, Bell, X } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Button, GlassCard } from "@vinhuni/glass-ui";
import { classes, copy, demoReply, progress, type Locale, type Theme } from "./demo";

function readPreference(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preferences still apply to the current view when storage is unavailable.
  }
}

function subscribeToPreferences(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

function getLocale(): Locale {
  return readPreference("campus-locale") === "en" ? "en" : "vi";
}

function getTheme(): Theme {
  const saved = readPreference("campus-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Dashboard() {
  const storedLocale = useSyncExternalStore(subscribeToPreferences, getLocale, () => "vi" as const);
  const storedTheme = useSyncExternalStore(subscribeToPreferences, getTheme, () => "light" as const);
  const [localeOverride, setLocale] = useState<Locale>();
  const [themeOverride, setTheme] = useState<Theme>();
  const locale = localeOverride ?? storedLocale;
  const theme = themeOverride ?? storedTheme;
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]);
  const transcript = useRef<HTMLDivElement>(null);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
  }, [locale, theme]);

  useEffect(() => {
    const log = transcript.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    savePreference("campus-theme", next);
    setTheme(next);
  }

  function toggleLocale() {
    const next = locale === "vi" ? "en" : "vi";
    savePreference("campus-locale", next);
    setLocale(next);
    setDraft("");
    setMessages([]);
  }

  function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { question: trimmed, answer: demoReply(trimmed, locale) }]);
    setDraft("");
  }

  const navigation = [
    { label: t.overview, id: "dashboard", Icon: LayoutGrid },
    { label: t.schedule, id: "schedule", Icon: CalendarDays },
    { label: t.progress, id: "progress", Icon: GraduationCap },
  ];
  const metrics = [
    { label: t.gpa, value: progress.gpa.toLocaleString(locale), detail: "/ 4.00", Icon: GraduationCap },
    { label: t.credits, value: progress.completed, detail: `/ ${progress.required}`, Icon: BookOpen },
    { label: t.classes, value: classes.length, detail: "", Icon: CalendarDays },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#dashboard">{t.skip}</a>
      <div className="shell">
        <aside className="sidebar glass">
          <a className="brand" href="#dashboard">
            <span className="brand-icon" aria-hidden="true"><GraduationCap size={23} /></span>
            <span>VinhUni AI Campus<small>{t.logo}</small></span>
          </a>
          <nav aria-label={t.nav}>
            {navigation.map(({ label, id, Icon }) => (
              <a key={id} href={`#${id}`}><Icon size={18} aria-hidden="true" />{label}</a>
            ))}
          </nav>
          <span className="sidebar-note">{t.demo}</span>
        </aside>
        <main id="dashboard" tabIndex={-1}>
          <header className="topbar">
            <span>{t.workspace}</span>
            <div className="controls">
              <Button onClick={toggleLocale} aria-label={t.language}>{locale === "vi" ? "EN" : "VI"}</Button>
              <Button onClick={toggleTheme} aria-label={t.theme} aria-pressed={theme === "dark"}>
                {theme === "light" ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
              </Button>
              <span className="avatar" role="img" aria-label={t.student}>A</span>
            </div>
          </header>
          <motion.section className="hero" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.35 }}>
            <div>
              <p className="term">{t.term}</p>
              <h1>{t.hello}</h1>
              <p>{t.intro}</p>
              <Button variant="primary" onClick={() => dialog.current?.showModal()}>
                <Sparkles size={18} aria-hidden="true" />{t.copilot}<ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </div>
            <div className="orb-wrap" aria-hidden="true"><div className="orb"><Sparkles size={57} strokeWidth={1.15} /></div></div>
          </motion.section>
          <div className="metrics">
            {metrics.map(({ label, value, detail, Icon }) => (
              <GlassCard key={label} className="metric">
                <Icon className="metric-icon" size={20} aria-hidden="true" />
                <h2>{label}</h2>
                <p>{value} <small>{detail}</small></p>
              </GlassCard>
            ))}
          </div>
          <div className="bento">
            <GlassCard id="schedule" className="schedule">
              <h2>{t.schedule}</h2>
              <p className="muted">{t.sampleDay}</p>
              <ul className="class-list">
                {classes.map((item) => (
                  <li key={item.code}>
                    <span className="class-time">{item.time}</span>
                    <div><strong>{item.name[locale]}</strong><small>{item.code} · {item.room}</small></div>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard id="progress" className="graduation">
              <h2>{t.graduation}</h2>
              <p className="muted">{t.degree}</p>
              <p className="progress-number">{progress.completed} <small>/ {progress.required}</small></p>
              <progress aria-label={t.graduation} value={progress.completed} max={progress.required} />
              <p className="muted">{progress.required - progress.completed} {t.remaining}</p>
            </GlassCard>
            <GlassCard className="announcement">
              <Bell size={22} aria-hidden="true" />
              <div><h2>{t.announcements}</h2><p>{t.notice} <span className="muted">· {t.noticeBody}</span></p></div>
            </GlassCard>
          </div>
          <footer>{t.disclaimer}</footer>
        </main>
      </div>
      <dialog ref={dialog} aria-labelledby="copilot-title">
        <div className="dialog-header">
          <div><span className="muted">{t.demo}</span><h2 id="copilot-title">VinhUni Copilot</h2></div>
          <form method="dialog"><Button type="submit" aria-label={t.close}><X aria-hidden="true" /></Button></form>
        </div>
        <div className="transcript" ref={transcript} role="log">
          <p><strong>{t.prompt}</strong></p>
          <p className="muted">{t.introChat}</p>
          {messages.map(({ question, answer }, index) => (
            <div key={index} className="exchange"><p className="question">{question}</p><p>{answer}</p></div>
          ))}
        </div>
        <div className="suggestions">
          {Object.values(t.topics).map((topic) => <Button key={topic} className="quiet" onClick={() => send(topic)}>{topic}</Button>)}
        </div>
        <form className="composer" onSubmit={(event) => { event.preventDefault(); send(draft); }}>
          <label htmlFor="message">{t.message}</label>
          <div><input id="message" value={draft} placeholder={t.placeholder} maxLength={400} onChange={(event) => setDraft(event.target.value)} />
          <Button type="submit" variant="primary" disabled={!draft.trim()}>{t.send}</Button></div>
        </form>
      </dialog>
    </MotionConfig>
  );
}
