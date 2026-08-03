"use client"
import { universitiesData } from '@/data/universities';
import { getMatchingPrograms } from '@/data/matcher';
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/components/aya/sidebar"
import {
  GraduationCap,
  Sparkles,
  Wallet,
  Mic,
  Send,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  RotateCcw,
  DollarSign,
  Clock,
  MapPin,
  Check,
  CheckCircle2,
  AlertTriangle,
  LayoutGrid,
  SlidersHorizontal,
  Heart,
  Share2,
  Globe,
  Users,
  Landmark,
  TrendingUp,
  Rocket,
  FileText,
  ChevronRight,
  PenTool,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  BookOpen,
  Award,
  Languages,
  Eye,
  Focus,
  Settings2,
  Brain,
  ChevronUp,
  Map,
  Receipt,
  Coffee,
  Mail,
  Trash2,
  UserCircle,
  Bookmark,
  MicOff,
  Lock,
  Terminal,
  Shield,
  CalendarDays,
  Share,
  Battery,
  Table
} from "lucide-react"

type PanelMode = "welcome" | "standard" | "scholarships" | "results" | "detail" | "review" | "tutor" | "roadmap" | "interview" | "email" | "profile" | "financial"
type Sender = "ai" | "user"
type Chip = { label: string; icon?: "grid" | "back" | "pen" | "book" | "map" | "message" | "mail" }
type Message = { id: number; sender: Sender; text: string; chips?: Chip[], widget?: "compare" | "budget" | null }
type ProfileTab = "saved" | "letters" | "tutor" | "emails" | "interviews"

const INITIAL_MESSAGE: Message = { id: 1, sender: "ai", text: "Hi! I'm Aya. What kind of Master's program are we looking for today?" }
const FIELDS = ["Artificial Intelligence", "UI/UX & Interactive Design", "Creative Arts & Media", "Education & Linguistics", "Business & Management"]
const COUNTRIES = ["Any Country", "South Korea", "China", "Japan", "United Kingdom", "United States", "Germany", "Canada"]
const SCHOLARSHIPS = [
  { id: "mext", flag: "🇯🇵", name: "MEXT", subtitle: "Japan Ministry of Education", country: "Japan", estValue: 35000 },
  { id: "csc", flag: "🇨🇳", name: "CSC", subtitle: "China Scholarship Council", country: "China", estValue: 25000 },
  { id: "gks", flag: "🇰🇷", name: "GKS", subtitle: "Global Korea Scholarship", country: "South Korea", estValue: 30000 },
  { id: "erasmus", flag: "🇪🇺", name: "Erasmus+", subtitle: "European Union Exchange", country: "Germany", estValue: 40000 },
  { id: "fulbright", flag: "🇺🇸", name: "Fulbright", subtitle: "U.S. State Dept. Program", country: "United States", estValue: 60000 },
  { id: "chevening", flag: "🇬🇧", name: "Chevening", subtitle: "UK Government Scholarship", country: "United Kingdom", estValue: 45000 },
  { id: "vanier", flag: "🇨🇦", name: "Vanier CGS", subtitle: "Canada Gov Scholarship", country: "Canada", estValue: 50000 },
]
const NONE_CERT = "None";
const ENGLISH_CERTIFICATES = ["IELTS Academic", "TOEFL iBT", "Duolingo English Test", "PTE Academic", "Cambridge C1/C2", NONE_CERT]
const LOCAL_CERTIFICATES: Record<string, string[]> = {
  "Japan": ["JLPT", NONE_CERT],
  "China": ["HSK", NONE_CERT],
  "South Korea": ["TOPIK", NONE_CERT],
  "Germany": ["Goethe-Zertifikat", "TestDaF", NONE_CERT],
  "Canada": ["TEF Canada", "TCF Canada", NONE_CERT],
  "United States": [NONE_CERT],
  "United Kingdom": [NONE_CERT]
}

const gridContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const gridItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

function formatText(text: string | number | undefined | null, isBionic: boolean, isDark: boolean) {
  if (text === undefined || text === null) return "";
  const strText = String(text);
  if (isBionic) {
    const cleanText = strText.replace(/\*\*/g, '');
    const parts = cleanText.split(/([a-zA-Zа-яА-ЯёЁ0-9]+)/);
    return parts.map((part, i) => {
      if (/[a-zA-Zа-яА-ЯёЁ0-9]+/.test(part)) {
        const chars = Array.from(part);
        const mid = Math.ceil(chars.length / 2);
        return (
          <span key={i}>
            <b className={`font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}>{chars.slice(0, mid).join('')}</b>
            <span className={isDark ? "text-slate-400" : "text-slate-600"}>{chars.slice(mid).join('')}</span>
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }
  const parts = strText.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => part.startsWith("**") && part.endsWith("**") ? ( <strong key={i} className="font-bold">{part.slice(2, -2)}</strong> ) : ( <span key={i}>{part}</span> ));
}

function RadarChart({ gpa, score }: { gpa: number, score: number }) {
  const normGpa = Math.min(100, (gpa / 4.0) * 100);
  const normLang = Math.min(100, (score / 9.0) * 100); 
  const mextIdeal = 85; 
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto my-4 flex items-center justify-center">
       <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
         <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,30 70,50 50,70 30,50" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
         <line x1="50" y1="10" x2="50" y2="90" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="10" y1="50" x2="90" y2="50" stroke="#f1f5f9" strokeWidth="1" />
         <polygon points={`50,${50 - (mextIdeal*0.4)} ${50 + (mextIdeal*0.4)},50 50,${50 + (mextIdeal*0.4)} ${50 - (mextIdeal*0.4)},50`} fill="rgba(148, 163, 184, 0.2)" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
         <polygon points={`50,${50 - (normGpa*0.4)} ${50 + (normLang*0.4)},50 50,${50 + (normGpa*0.3)} ${50 - (normLang*0.3)},50`} fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="2" />
       </svg>
       <div className="absolute top-0 w-full text-center text-[9px] font-bold text-slate-500">Academics (GPA)</div>
       <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-500">Language</div>
    </div>
  )
}

function BreathingWidget({ onFinish }: { onFinish: ()=>void }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl">
       <h2 className="text-2xl font-bold text-white mb-12">Let's take a 30-second break.</h2>
       <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="w-32 h-32 rounded-full bg-emerald-500/30 flex items-center justify-center border-4 border-emerald-400/50 shadow-[0_0_50px_rgba(16,185,129,0.5)]"
       >
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
            className="w-16 h-16 rounded-full bg-emerald-400" 
          />
       </motion.div>
       <div className="mt-12 flex gap-8 text-emerald-300 font-bold uppercase tracking-widest text-sm">
         <motion.span animate={{opacity: [1,0,0]}} transition={{ duration: 8, repeat: Infinity, times: [0, 0.5, 1]}}>Breathe In</motion.span>
         <motion.span animate={{opacity: [0,1,0]}} transition={{ duration: 8, repeat: Infinity, times: [0, 0.5, 1]}}>Breathe Out</motion.span>
       </div>
       <button onClick={onFinish} className="mt-20 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all">I feel better, return</button>
    </motion.div>
  )
}

export default function Page() {
  const [panelMode, setPanelMode] = useState<PanelMode>("welcome")
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const [field, setField] = useState(FIELDS[0])
  const [country, setCountry] = useState(COUNTRIES[0])
  const [budget, setBudget] = useState(10000)
  const [gpa, setGpa] = useState(3.5)
  const [language, setLanguage] = useState<"English-taught" | "Local Language">("English-taught")
  const [format, setFormat] = useState<"Online" | "On-Campus" | "Hybrid">("On-Campus")
  const [duration, setDuration] = useState<"1 Year" | "18 Months" | "2 Years">("2 Years")
  const [detailTab, setDetailTab] = useState<"Overview" | "Requirements" | "Funding">("Overview")
  
  const [scholarship, setScholarship] = useState(SCHOLARSHIPS[0].id)
  const [pathway, setPathway] = useState<"Embassy Track" | "University Track">("University Track")
  const [grantLanguage, setGrantLanguage] = useState<"English-taught" | "Local Language">("English-taught")
  const [grantField, setGrantField] = useState(FIELDS[0])
  const [certificate, setCertificate] = useState("IELTS Academic")
  const [certScore, setCertScore] = useState(7.0) 
  const [searchOrigin, setSearchOrigin] = useState<"standard" | "scholarships">("standard")
  const [matchedPrograms, setMatchedPrograms] = useState<any[]>([])
  const [selectedProgram, setSelectedProgram] = useState<any>(null)
  
  const [draftLetter, setDraftLetter] = useState("")
  const [isBrainDump, setIsBrainDump] = useState(false) 
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResult, setReviewResult] = useState<any>(null)
  const [draftText, setDraftText] = useState("")
  const [isTutoring, setIsTutoring] = useState(false)
  const [tutorResult, setTutorResult] = useState<any>(null)
  const [emailProfName, setEmailProfName] = useState("")
  const [emailInterest, setEmailInterest] = useState("")
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false)
  const [emailResult, setEmailResult] = useState("")
  const [isEmailBrainDump, setIsEmailBrainDump] = useState(false)
  const [emailError, setEmailError] = useState("")

  const [activeRoadmapId, setActiveRoadmapId] = useState<number | null>(null)
  const [roadmapTargetCountry, setRoadmapTargetCountry] = useState("Japan")
  const [roadmapScholarship, setRoadmapScholarship] = useState("MEXT")
  const [roadmapHomeCountry, setRoadmapHomeCountry] = useState("Kazakhstan")
  const [roadmapEngCert, setRoadmapEngCert] = useState(NONE_CERT)
  const [roadmapLocalCert, setRoadmapLocalCert] = useState(NONE_CERT)
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false)
  const [roadmapResult, setRoadmapResult] = useState<any>(null)
  const [taskStatus, setTaskStatus] = useState<boolean[]>([])
  const [costStatus, setCostStatus] = useState<boolean[]>([])
  const [isOverwhelmed, setIsOverwhelmed] = useState(false)
  
  const [finSavings, setFinSavings] = useState(2000)
  const [finHours, setFinHours] = useState(15)
  const [finResults, setFinResults] = useState<any[]>([])
  
  const [interviewCountry, setInterviewCountry] = useState("Japan")
  const [interviewContext, setInterviewContext] = useState("")
  const [hasInterviewStarted, setHasInterviewStarted] = useState(false)
  const [interviewMessages, setInterviewMessages] = useState<{role: string, content: string}[]>([])
  const [interviewInput, setInterviewInput] = useState("")
  const [isInterviewing, setIsInterviewing] = useState(false)
  
  const [profileTab, setProfileTab] = useState<ProfileTab>("saved")
  const [savedUniversities, setSavedUniversities] = useState<any[]>([])
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([])
  const [historyLetters, setHistoryLetters] = useState<any[]>([])
  const [historyTutor, setHistoryTutor] = useState<any[]>([])
  const [historyEmails, setHistoryEmails] = useState<any[]>([])
  const [historyInterviews, setHistoryInterviews] = useState<any[]>([])
  
  const [isNeuroInclusiveMode, setIsNeuroInclusiveMode] = useState(false)
  const [isRSDMode, setIsRSDMode] = useState(false)
  const [spoons, setSpoons] = useState(10)
  const [sensoryLevel, setSensoryLevel] = useState(100)
  const [isXRayMode, setIsXRayMode] = useState(false)
  const [xrayLogs, setXrayLogs] = useState<string[]>(["[SYSTEM] Aya X-Ray Engine Initialized..."])
  const [bodyDoubleCount, setBodyDoubleCount] = useState(14)
  const [isDyslexicFont, setIsDyslexicFont] = useState(false)
  const [isBionicReading, setIsBionicReading] = useState(false)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false)
  const [activeMenuAccordion, setActiveMenuAccordion] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false) 
  
  const settingsRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null) 
  const xrayEndRef = useRef<HTMLDivElement>(null)
  const backspaceCountRef = useRef(0)
  const lastBackspaceTimeRef = useRef(0)
  const [isHydrated, setIsHydrated] = useState(false);

  const getActiveScholValue = () => {
    const found = SCHOLARSHIPS.find(s => s.name === roadmapScholarship);
    return found ? found.estValue : 30000;
  };

  useEffect(() => {
    const savedData = localStorage.getItem('aya_profile_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.savedUniversities) setSavedUniversities(parsed.savedUniversities);
        if (parsed.savedRoadmaps) setSavedRoadmaps(parsed.savedRoadmaps);
        if (parsed.historyLetters) setHistoryLetters(parsed.historyLetters);
        if (parsed.historyTutor) setHistoryTutor(parsed.historyTutor);
        if (parsed.historyEmails) setHistoryEmails(parsed.historyEmails);
        if (parsed.historyInterviews) setHistoryInterviews(parsed.historyInterviews);
      } catch (e) { console.error("Parse error", e) }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const dataToSave = { messages, savedUniversities, savedRoadmaps, historyLetters, historyTutor, historyEmails, historyInterviews };
      localStorage.setItem('aya_profile_data', JSON.stringify(dataToSave));
    }
  }, [messages, savedUniversities, savedRoadmaps, historyLetters, historyTutor, historyEmails, historyInterviews, isHydrated]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) setShowSettings(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])
  useEffect(() => { xrayEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [xrayLogs])
  
  useEffect(() => {
    const int = setInterval(() => setBodyDoubleCount(p => Math.max(8, p + Math.floor(Math.random() * 5) - 2)), 15000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if (isDyslexicFont) { 
      document.body.style.fontFamily = "'OpenDyslexic', sans-serif"; 
      document.body.style.letterSpacing = "0.05em"; 
      document.body.style.lineHeight = "1.8"; 
    } else { 
      document.body.style.fontFamily = ""; 
      document.body.style.letterSpacing = ""; 
      document.body.style.lineHeight = ""; 
    }
  }, [isDyslexicFont]);

  const addXrayLog = (l: string) => { 
    if (isXRayMode) setXrayLogs(p => [...p, `[${new Date().toLocaleTimeString()}] ${l}`]); 
  }

  const startListening = (setter: (text: string | ((prev: string) => string)) => void) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      }
      if (finalTranscript) setter((prev: string) => prev + " " + finalTranscript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setTimeout(() => { if (isListening) recognition.stop(); }, 15000);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, originalHandler: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      originalHandler(); 
    }

    if (e.key === 'Backspace' && isNeuroInclusiveMode) {
      const now = Date.now();
      if (now - lastBackspaceTimeRef.current < 400) {
        backspaceCountRef.current += 1;
      } else {
        backspaceCountRef.current = 1;
      }
      lastBackspaceTimeRef.current = now;

      if (backspaceCountRef.current > 15) {
        triggerOverwhelm();
        backspaceCountRef.current = 0;
      }
    }
  };

  const activeScholObj = SCHOLARSHIPS.find(s => s.id === scholarship) || SCHOLARSHIPS[0];
  const currentAvailableCerts = (grantLanguage === "English-taught" 
      ? ENGLISH_CERTIFICATES 
      : (LOCAL_CERTIFICATES[activeScholObj.country] || ENGLISH_CERTIFICATES)).filter(Boolean);
  
  useEffect(() => {
    if (!currentAvailableCerts.includes(certificate)) {
      const fallback = currentAvailableCerts[0] || "IELTS Academic";
      setCertificate(fallback);
      if (fallback === "JLPT") setCertScore(2); 
      else if (fallback === "HSK" || fallback === "TOPIK") setCertScore(4);
      else setCertScore(7.0); 
    }
  }, [grantLanguage, scholarship, currentAvailableCerts, certificate]);

  useEffect(() => {
    if (["fulbright", "chevening"].includes(scholarship)) {
      setGrantLanguage("English-taught");
    }
  }, [scholarship]);

  const getSliderConfig = (cert: string) => {
    switch (cert) {
      case "IELTS Academic": return { min: 4.0, max: 9.0, step: 0.5, format: (v: number) => v.toFixed(1) };
      case "TOEFL iBT": return { min: 1, max: 120, step: 1, format: (v: number) => `Score ${v}` }; 
      case "Duolingo English Test": return { min: 10, max: 160, step: 5, format: (v: number) => v.toString() };
      case "PTE Academic": return { min: 10, max: 90, step: 1, format: (v: number) => v.toString() };
      case "Cambridge C1/C2": return { min: 160, max: 230, step: 1, format: (v: number) => v.toString() };
      case "JLPT": return { min: 1, max: 5, step: 1, format: (v: number) => `N${6 - v}` }; 
      case "HSK": return { min: 1, max: 6, step: 1, format: (v: number) => `Level ${v}` };
      case "TOPIK": return { min: 1, max: 6, step: 1, format: (v: number) => `Level ${v}` };
      default: return { min: 1, max: 10, step: 1, format: (v: number) => v.toString() };
    }
  }
  const activeCertConfig = getSliderConfig(certificate || "IELTS Academic");

  const handleRoadmapCountryChange = (c: string) => {
    setRoadmapTargetCountry(c);
    const validSchol = SCHOLARSHIPS.find(s => s.country === c);
    if (validSchol) setRoadmapScholarship(validSchol.name);
    setRoadmapLocalCert(NONE_CERT);
  }

  const handleRoadmapScholarshipChange = (sName: string) => {
    setRoadmapScholarship(sName);
    const schol = SCHOLARSHIPS.find(s => s.name === sName);
    if (schol && schol.country) {
      setRoadmapTargetCountry(schol.country);
      setRoadmapLocalCert(NONE_CERT);
    }
  }

  const resetApp = () => {
    setMessages([INITIAL_MESSAGE]); setPanelMode("welcome"); setReviewResult(null); setDraftLetter(""); setTutorResult(null);
    setDraftText(""); setRoadmapResult(null); setEmailResult(""); setInterviewMessages([]); setHasInterviewStarted(false);
    setIsToolsMenuOpen(false); setIsOverwhelmed(false); setActiveRoadmapId(null); setActiveMenuAccordion(null); setIsBrainDump(false); setFinResults([]);
  }

  const pushMessages = (extra: Message[]) => setMessages((prev) => { 
    let id = prev.length ? prev[prev.length - 1].id : 0; 
    return [...prev, ...extra.map((m) => ({ ...m, id: ++id }))] 
  })

  const navAction = (msg: string, aiMsg: string, mode: PanelMode) => { 
    pushMessages([{ id: 0, sender: "user", text: msg }, { id: 0, sender: "ai", text: aiMsg }]); 
    setPanelMode(mode); 
  }

  const handleStandard = () => { setSearchOrigin("standard"); navAction("💰 Standard Paid Programs", "Perfect — set your budget and preferences on the right.", "standard"); }
  const handleScholarships = () => { setSearchOrigin("scholarships"); navAction("✨ Explore Full Scholarships", "Great choice! Configure parameters on the right.", "scholarships"); }
  const handleRoadmap = () => { navAction("🗺️ Smart Roadmap & Costs", "Tell me where you are applying, and I'll create a stress-free plan.", "roadmap"); }
  const handleEmailGen = () => { navAction("✉️ Cold Email Generator", "Finding a supervisor is hard. Give me the details on the right.", "email"); }
  const handleReviewer = () => { navAction("📝 Motivation Letter Review", "Paste your draft on the right, and I'll analyze it.", "review"); }
  const handleInterviewPanel = () => { setHasInterviewStarted(false); navAction("🎤 Mock Interview Simulator", "I will act as the admission committee. Set up context on the right.", "interview"); }
  const handleTutor = () => { navAction("📚 Academic Language Tutor", "Paste a paragraph on the right, and I'll upgrade your vocabulary.", "tutor"); }
  const handleProfile = () => { navAction("👤 My Profile & History", "Here is your saved history and favorite universities.", "profile"); }
  const handleFinancial = () => { navAction("🧮 What-If Financial Engine", "Let's calculate the financial safety of different paths.", "financial"); }

  const toggleFavoriteUniversity = (prog: any) => {
    const exists = (savedUniversities || []).find(u => u.id === prog.id);
    if (exists) {
      setSavedUniversities((savedUniversities || []).filter(u => u.id !== prog.id));
    } else {
      setSavedUniversities([...(savedUniversities || []), prog]);
    }
  }

  const saveCurrentRoadmap = () => {
    if (!roadmapResult) return;
    const existingIdx = (savedRoadmaps || []).findIndex(r => r.id === activeRoadmapId);
    const roadmapData = {
      id: activeRoadmapId || Date.now(),
      country: roadmapTargetCountry,
      scholarship: roadmapScholarship,
      result: roadmapResult,
      taskStatus: taskStatus || [],
      costStatus: costStatus || [],
      date: new Date().toLocaleDateString()
    };
    if (existingIdx >= 0) {
      const updated = [...savedRoadmaps];
      updated[existingIdx] = roadmapData;
      setSavedRoadmaps(updated);
    } else {
      setSavedRoadmaps([roadmapData, ...(savedRoadmaps || [])]);
      setActiveRoadmapId(roadmapData.id);
    }
  }
  useEffect(() => { if (activeRoadmapId) saveCurrentRoadmap(); }, [taskStatus, costStatus]);

  const loadSavedRoadmap = (r: any) => {
    setRoadmapTargetCountry(r.country); setRoadmapScholarship(r.scholarship); setRoadmapResult(r.result);
    setTaskStatus(r.taskStatus || []); setCostStatus(r.costStatus || []); setActiveRoadmapId(r.id); setPanelMode("roadmap");
  }

  const deleteHistoryItem = (type: string, index: number) => {
    if (type === 'letters') setHistoryLetters(prev => prev.filter((_, i) => i !== index));
    if (type === 'tutor') setHistoryTutor(prev => prev.filter((_, i) => i !== index));
    if (type === 'emails') setHistoryEmails(prev => prev.filter((_, i) => i !== index));
    if (type === 'interviews') setHistoryInterviews(prev => prev.filter((_, i) => i !== index));
    if (type === 'roadmaps') setSavedRoadmaps(prev => prev.filter((_, i) => i !== index));
  }
  
  const clearHistorySection = (type: string) => {
    if (type === 'letters') setHistoryLetters([]);
    if (type === 'tutor') setHistoryTutor([]);
    if (type === 'emails') setHistoryEmails([]);
    if (type === 'interviews') setHistoryInterviews([]);
    if (type === 'roadmaps') setSavedRoadmaps([]);
  }

  const clearHistory = () => {
    localStorage.removeItem('aya_profile_data');
    resetApp();
    setSavedUniversities([]); setSavedRoadmaps([]); setHistoryLetters([]); setHistoryTutor([]); setHistoryEmails([]); setHistoryInterviews([]);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, submitFn: () => void) => { 
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitFn(); } 
  }

  const generateICS = () => {
    if (!roadmapResult || !roadmapResult.microTasks) return;
    addXrayLog("[TOOL] Generating .ics calendar file for Time-Blindness Sync...");

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Aya AI//Roadmap//EN\n";

    const now = new Date();
    (roadmapResult.microTasks || []).forEach((task: any, index: number) => {
      const taskDate = new Date(now.getTime() + (index + 1) * 24 * 60 * 60 * 1000); 
      const start = taskDate.toISOString().replace(/-|:|\.\d+/g, '');
      const end = new Date(taskDate.getTime() + 30 * 60000).toISOString().replace(/-|:|\.\d+/g, ''); 
      
      icsContent += "BEGIN:VEVENT\n";
      icsContent += `DTSTART:${start}\n`;
      icsContent += `DTEND:${end}\n`;
      icsContent += `SUMMARY:Aya Task: ${task.title}\n`;
      icsContent += `DESCRIPTION:${task.antiBurnoutTip}\n`;
      icsContent += "END:VEVENT\n";
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'aya_admission_roadmap.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const generateInspireGuide = () => {
    alert("In a full build, this generates a beautifully localized PDF summary of your entire application journey to share with local high schools in " + roadmapHomeCountry + "!");
    addXrayLog("[SOCIAL GOOD] Inspire Others PDF requested.");
  }

  const runFinancialEngine = () => {
    addXrayLog("[COMPUTE] Running local Financial Optimization Engine...");
    const annualIncome = finHours * 15 * 52; 
    const totalCapital = finSavings + (annualIncome * 2);

    const results = SCHOLARSHIPS.map(schol => {
      const livingCost2Yrs = 28000; 
      const covered = schol.estValue; 
      const outOfPocket = Math.max(0, livingCost2Yrs - covered); 
      const safetyIndex = totalCapital - outOfPocket;

      let category = "High Risk";
      if (safetyIndex > 5000) category = "Safe Match";
      else if (safetyIndex > 0) category = "Moderate";

      return { ...schol, outOfPocket, safetyIndex, category };
    });
    setFinResults(results);
    addXrayLog(`[COMPUTE] Financial Engine calculation complete. Validated ${results.length} scholarships.`);
  }

  const handleFindPrograms = () => {
    addXrayLog(`[TOOL] Executing internal getMatchingPrograms()`);
    let targetCountry = searchOrigin === "standard" ? country : "Any Country";
    if (searchOrigin === "scholarships") {
      const activeSchol = SCHOLARSHIPS.find(s=>s.id === scholarship);
      if (activeSchol) targetCountry = activeSchol.country;
    }
    const currentFilters = { targetCountry: targetCountry, fieldOfStudy: searchOrigin === "standard" ? field : grantField, userGpa: gpa, maxBudget: searchOrigin === "standard" ? budget : 0, isScholarshipSearch: searchOrigin === "scholarships" };
    addXrayLog(`[PAYLOAD] Filters: ${JSON.stringify(currentFilters)}`);
    const results = getMatchingPrograms(universitiesData, currentFilters) || [];
    setMatchedPrograms(results.slice(0, 3));
    addXrayLog(`[STATE] Extracted top ${Math.min(3, results.length)} matches.`);
    pushMessages([{ id: 0, sender: "user", text: "Find matching programs" }, { id: 0, sender: "ai", text: `Found **${results.length} programs**. Top 3 shown on the right.`, chips: [{ label: "View Results →", icon: "grid" }] }])
    setPanelMode("results")
  }

  const submitRoadmap = async () => {
    setIsGeneratingRoadmap(true); setIsOverwhelmed(false); setActiveRoadmapId(null);
    addXrayLog(`[INTENT] Initiating Roadmap API generation...`);
    addXrayLog(`[PAYLOAD] Generating steps for ${roadmapScholarship} in ${roadmapTargetCountry}`);
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCountry: roadmapTargetCountry, scholarship: roadmapScholarship, homeCountry: roadmapHomeCountry, engCert: roadmapEngCert, localCert: roadmapLocalCert }),
      });
      const data = await response.json();
      setRoadmapResult(data);
      if(data.microTasks) setTaskStatus(new Array(data.microTasks.length).fill(false));
      if(data.hiddenCosts) setCostStatus(new Array(data.hiddenCosts.length).fill(false));
      addXrayLog(`[NETWORK] 200 OK - Roadmap structured successfully. Calculated Hidden Cost:  $${data.totalHiddenCost}`);
    } catch (error) { console.error("Roadmap failed", error); } finally { setIsGeneratingRoadmap(false); }
  }

  const toggleTask = (index: number) => { 
    const newStatus = [...(taskStatus||[])]; 
    newStatus[index] = !newStatus[index]; 
    setTaskStatus(newStatus); 
  }
  const toggleCost = (index: number) => { 
    const newStatus = [...(costStatus||[])]; 
    newStatus[index] = !newStatus[index]; 
    setCostStatus(newStatus); 
  }
  
  const triggerOverwhelm = () => setIsOverwhelmed(!isOverwhelmed);

  const startInterview = async () => {
    setHasInterviewStarted(true); setIsInterviewing(true);
    addXrayLog(`[INTENT] Starting Interview Simulator via LLM`);
    addXrayLog(`[PAYLOAD] Context: ${interviewContext}`);
    try {
      const response = await fetch('/api/interview', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [], country: interviewCountry, context: interviewContext }),
      });
      const data = await response.json();
      const initMsg = [{ role: "assistant", content: data.result }];
      setInterviewMessages(initMsg);
      setHistoryInterviews(prev => [{ id: Date.now(), country: interviewCountry, context: interviewContext, messages: initMsg, date: new Date().toLocaleDateString() }, ...(prev || [])]);
      addXrayLog(`[STATE] Committee Initialized and speaking.`);
    } catch (e) { console.error(e) } finally { setIsInterviewing(false) }
  }

  const submitInterviewResponse = async () => {
    if (!interviewInput.trim()) return;
    const newMsgs = [...(interviewMessages||[]), { role: "user", content: interviewInput }];
    setInterviewMessages(newMsgs); setInterviewInput(""); setIsInterviewing(true);
    addXrayLog(`[USER] Submitted interview answer.`);
    addXrayLog(`[NETWORK] Sending history to /api/interview...`);
    try {
      const response = await fetch('/api/interview', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, country: interviewCountry, context: interviewContext }),
      });
      const data = await response.json();
      const finalMsgs = [...newMsgs, { role: "assistant", content: data.result }];
      setInterviewMessages(finalMsgs);
      setHistoryInterviews(prev => [{ id: Date.now(), country: interviewCountry, context: interviewContext, messages: finalMsgs, date: new Date().toLocaleDateString() }, ...(prev || []).filter(i=>i.context !== interviewContext)]);
      addXrayLog(`[LLM] Evaluated response & generated next question.`);
    } catch (e) { console.error(e) } finally { setIsInterviewing(false); }
  }

  const submitEmail = async () => {
    if (!emailProfName.trim() || !emailInterest.trim()) {
      setEmailError("Please fill in Professor's Name and Research Topic.");
      return;
    }
    
    setEmailError("");
    setIsGeneratingEmail(true);
    addXrayLog(`[INTENT] Generating Cold Email Template...`);
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: roadmapTargetCountry, professorName: emailProfName, researchInterest: emailInterest, isBrainDump: isEmailBrainDump }),
      });
      const data = await response.json();
      
      const finalEmail = data.email || data.result || data.content;
      
      if (!finalEmail) {
         setEmailError("Backend API Error: The AI did not return a valid email text.");
         setIsGeneratingEmail(false);
         return;
      }
      
      setEmailResult(finalEmail);
      setHistoryEmails(prev => [{ prof: emailProfName, interest: emailInterest, email: finalEmail, date: new Date().toLocaleDateString() }, ...(prev || [])])
      addXrayLog(`[NETWORK] 200 OK - Email Drafted Successfully.`);
      
    } catch (e) { 
      console.error(e);
      setEmailError("Network Error: Failed to connect to the backend API.");
    } finally { 
      setIsGeneratingEmail(false); 
      setIsEmailBrainDump(false);
    }
  }

  const submitReview = async () => { 
    setIsReviewing(true); 
    addXrayLog(`[INTENT] Initiating Motivation Letter Review`);
    addXrayLog(`[STATE] BrainDump Mode: ${isBrainDump}, RSD-Safe Mode: ${isRSDMode}`);
    addXrayLog(`[NETWORK] Calling /api/review...`);
    try { 
      const response = await fetch('/api/review', { 
        method: 'POST', headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ letter: draftLetter, isBrainDump: isBrainDump, isRSDSafe: isRSDMode }) 
      }); 
      const data = await response.json(); 
      setReviewResult(data); 
      setHistoryLetters(prev => [{ original: draftLetter, score: data.score, result: data, date: new Date().toLocaleDateString() }, ...(prev || [])]); 
      addXrayLog(`[LLM] Review Complete. Estimated Score: ${data.score}%`);
    } catch (e) { } finally { setIsReviewing(false); setIsBrainDump(false); } 
  }

  const submitTutor = async () => { 
    setIsTutoring(true); 
    addXrayLog(`[INTENT] Initiating Language Tutor Evaluation`);
    addXrayLog(`[NETWORK] Uploading text to /api/tutor...`);
    try { 
      const response = await fetch('/api/tutor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: draftText }) }); 
      const data = await response.json(); 
      setTutorResult(data); 
      setHistoryTutor(prev => [{ original: draftText, score: data.score, result: data, date: new Date().toLocaleDateString() }, ...(prev || [])]); 
      addXrayLog(`[LLM] Tutor Analysis Complete. Score: ${data.score}`);
    } catch (e) { } finally { setIsTutoring(false); } 
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    const newUserMsg: Message = { id: Date.now(), sender: "user", text: inputValue }
    setMessages((prev) => [...prev, newUserMsg])
    setInputValue("")
    setIsLoading(true)

    addXrayLog(`[USER MESSAGE] ${newUserMsg.text}`);

    const txtLower = newUserMsg.text.toLowerCase();
    if (txtLower.includes("сравни") || txtLower.includes("compare")) {
       setTimeout(() => {
         setMessages(p => [...p, { id: Date.now()+1, sender: "ai", text: "Here is the detailed scholarship comparison you requested:", widget: "compare" }]);
         setIsLoading(false);
         addXrayLog(`[GENERATIVE UI] Injected Comparison Table Widget`);
       }, 800);
       return;
    }
    if (txtLower.includes("бюджет") || txtLower.includes("budget") || txtLower.includes("cost")) {
       setTimeout(() => {
         setMessages(p => [...p, { id: Date.now()+1, sender: "ai", text: "Let's configure your budget directly here:", widget: "budget" }]);
         setIsLoading(false);
         addXrayLog(`[GENERATIVE UI] Injected Budget Slider Widget`);
       }, 800);
       return;
    }

    addXrayLog(`[INTENT] Classifying request via LLM...`);

    try {
      const apiMessages = messages.filter(m=>!m.widget).map(m => ({ role: m.sender === "ai" ? "assistant" : "user", content: m.text }))
      apiMessages.push({ role: "user", content: newUserMsg.text })
      addXrayLog(`[NETWORK] Sending message history to /api/chat...`);

      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: apiMessages }), })
      if (!response.ok) { setIsLoading(false); return }
      const data = await response.json()

      addXrayLog(`[NETWORK] 200 OK received.`);

      if (data.isToolCall) {
        const args = data.toolData.arguments ? JSON.parse(data.toolData.arguments) : {};
        const updates: string[] = [];
        addXrayLog(`[TOOL EXECUTION] LLM requested function: update_ui_filters(${JSON.stringify(args)})`);

        if (args.country) { const c = COUNTRIES.find(x => x.toLowerCase().includes(args.country.toLowerCase())); if (c) { setCountry(c); updates.push(c); } }
        if (args.scholarship) { const s = SCHOLARSHIPS.find(x => args.scholarship.toLowerCase().includes(x.id) || args.scholarship.toLowerCase().includes(x.name.toLowerCase())); if (s) { setScholarship(s.id); updates.push(s.name); } }
        if (args.language) { const val = args.language.toLowerCase().includes("local") ? "Local Language" : "English-taught"; setLanguage(val); setGrantLanguage(val); updates.push(val); }
        if (args.gpa) { let g = parseFloat(String(args.gpa).replace(',', '.').replace(/[^0-9.]/g, '')); if (!isNaN(g)) { if (g > 4.0) g = 4.0; setGpa(g); updates.push(`GPA ${g}`); } }
        if (args.budget !== undefined) { const b = parseInt(String(args.budget).replace(/[^0-9]/g, ''), 10); if (!isNaN(b)) { setBudget(b); updates.push(b === 0 ? "Full Ride" : `$${b}`); } }
        if (args.certificate) { const cert = [...ENGLISH_CERTIFICATES, "JLPT", "HSK", "TOPIK", "TestDaF"].find(c => c.toLowerCase().includes(args.certificate.toLowerCase())); if (cert) { setCertificate(cert); updates.push(cert); } }
        if (args.field) { const matchedField = FIELDS.find(f => f.toLowerCase().includes(args.field.toLowerCase())); if (matchedField) { setField(matchedField); setGrantField(matchedField); updates.push(matchedField); } }
        if (args.format) { const fmt = args.format.toLowerCase().includes("online") ? "Online" : args.format.toLowerCase().includes("hybrid") ? "Hybrid" : "On-Campus"; setFormat(fmt); updates.push(fmt); }
        if (args.duration) { const d = args.duration.toLowerCase(); const dur = d.includes("18") ? "18 Months" : (d.includes("12") || d.includes("1 year") || d === "1") ? "1 Year" : "2 Years"; setDuration(dur); updates.push(dur); }
        
        if (args.scholarship || (args.budget !== undefined && String(args.budget) === "0")) { setPanelMode("scholarships"); setSearchOrigin("scholarships"); } 
        else if (updates.length > 0 && !args.scholarship) { setPanelMode("standard"); setSearchOrigin("standard"); }

        let finalMessage = `✨ I've updated the filters for you! Focusing on: **${updates.length > 0 ? updates.join(", ") : "your filters"}**.`;
        if (data.aiText && data.aiText.trim() !== "") finalMessage += `\n\n${data.aiText.replace(/I'?\s*(?:ve)?\s*updated the filters.*?(?:\n|$)/ig, '').trim()}`;
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: finalMessage }]);
        addXrayLog(`[STATE] UI synced successfully with LLM intentions.`);
      
      } else if (data.result) {
        addXrayLog(`[LLM] Text generation completed.`);
        
        let cleanText = typeof data.result === 'string' ? data.result : (data.result.content || "");
        
        cleanText = cleanText.replace(/<function[^>]*>[\s\S]*?<\/function>/g, '').trim();
        cleanText = cleanText.replace(/```json[\s\S]*?```/g, '').trim();
        
        if (cleanText) {
          setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: cleanText }]);
        } else {
          setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: "I've checked the information for you! What else would you like to know?" }]);
        }
      }
    } catch (error) { console.error("Chat failed:", error) } finally { setIsLoading(false) }
  }

  const areAllTasksDone = taskStatus.length > 0 && taskStatus.every(t => t === true);

  if (!isHydrated) return null;

  return (
    <main className={`flex h-screen w-full overflow-hidden bg-slate-50 transition-all duration-500
        ${isFocusMode ? "bg-slate-900" : "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/60 via-slate-50 to-purple-50/60"}
       ${sensoryLevel <= 80 ? "[&_*]:!transition-none [&_*]:!duration-0" : ""}
       ${sensoryLevel <= 50 ? "saturate-50 contrast-75" : ""}
    `}>

      <AnimatePresence>
         {isOverwhelmed && <BreathingWidget onFinish={() => setIsOverwhelmed(false)} />}
      </AnimatePresence>

      <div className={`transition-all duration-500 ${isFocusMode ? "opacity-10 pointer-events-none blur-sm" : "opacity-100"}`}>
        <Sidebar />
      </div>

      <div className={`flex min-w-0 flex-1 border-l transition-all duration-500 ${isFocusMode ? "border-transparent bg-transparent" : "border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl"}`}>
        
        <div className={`relative z-10 flex w-full min-w-[320px] max-w-[34%] flex-col transition-all duration-500 ${isFocusMode ? "mx-auto max-w-2xl scale-[1.02] shadow-[0_0_0_9999px_rgba(15,23,42,0.85)] rounded-3xl border border-slate-700 bg-slate-900 mt-6 mb-6" : "border-r border-slate-200/50 bg-white/50"}`}>
          <header className={`flex items-center justify-between px-5 py-4 transition-colors ${isFocusMode ? "border-b border-slate-800" : "border-b border-slate-200/60"}`}>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${isFocusMode ? "text-slate-200" : "text-slate-900"}`}>{formatText("Aya AI", isBionicReading, isFocusMode)}</p>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-500" />{formatText(isFocusMode ? "FOCUS MODE ACTIVE" : "ADVISOR", isBionicReading, isFocusMode)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative" ref={settingsRef}>
                <button onClick={() => setShowSettings(!showSettings)} className={`flex size-8 items-center justify-center rounded-lg border transition-colors ${isFocusMode ? "border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300" : "border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"} ${showSettings || isDyslexicFont || isBionicReading || isFocusMode || isXRayMode || sensoryLevel < 100 ? "ring-2 ring-emerald-400 border-transparent" : ""}`}>
                  <Settings2 className="size-4" />
                </button>
                <AnimatePresence>
                  {showSettings && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className={`absolute right-0 top-10 z-50 mt-2 w-64 rounded-2xl border p-4 shadow-xl ${isFocusMode ? "border-slate-700 bg-slate-800 text-white" : "border-slate-100 bg-white"}`}>
                      <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${isFocusMode ? "text-slate-400" : "text-slate-500"}`}>Accessibility & Dev</p>
                      <div className="space-y-3">
                        
                        <button onClick={() => setIsNeuroInclusiveMode(!isNeuroInclusiveMode)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${isNeuroInclusiveMode ? "bg-amber-50 text-amber-700 border border-amber-200" : isFocusMode ? "hover:bg-slate-700 text-slate-200" : "hover:bg-slate-50 text-slate-700 border border-transparent"}`}>
                          <div className="flex items-center gap-2"><Sparkles className={`size-4 ${isNeuroInclusiveMode ? "text-amber-500" : ""}`} /><span className="font-bold">Neuro-Inclusive UI</span></div>
                          <div className={`relative h-5 w-9 rounded-full transition-colors ${isNeuroInclusiveMode ? "bg-amber-500" : isFocusMode ? "bg-slate-600" : "bg-slate-200"}`}><div className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${isNeuroInclusiveMode ? "translate-x-4" : "translate-x-0"}`} /></div>
                        </button>

                        <button onClick={() => setIsDyslexicFont(!isDyslexicFont)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${isDyslexicFont ? "bg-emerald-50 text-emerald-700" : isFocusMode ? "hover:bg-slate-700 text-slate-200" : "hover:bg-slate-50 text-slate-700"}`}>
                          <div className="flex items-center gap-2"><Eye className={`size-4 ${isDyslexicFont ? "text-emerald-500" : ""}`} /><span className="font-semibold">Dyslexia Font</span></div>
                          <div className={`relative h-5 w-9 rounded-full transition-colors ${isDyslexicFont ? "bg-emerald-500" : isFocusMode ? "bg-slate-600" : "bg-slate-200"}`}><div className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${isDyslexicFont ? "translate-x-4" : "translate-x-0"}`} /></div>
                        </button>

                        <button onClick={() => setIsBionicReading(!isBionicReading)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${isBionicReading ? "bg-emerald-50 text-emerald-700" : isFocusMode ? "hover:bg-slate-700 text-slate-200" : "hover:bg-slate-50 text-slate-700"}`}>
                          <div className="flex items-center gap-2"><Brain className={`size-4 ${isBionicReading ? "text-emerald-500" : ""}`} /><span className="font-semibold">Bionic Reading</span></div>
                          <div className={`relative h-5 w-9 rounded-full transition-colors ${isBionicReading ? "bg-emerald-500" : isFocusMode ? "bg-slate-600" : "bg-slate-200"}`}><div className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${isBionicReading ? "translate-x-4" : "translate-x-0"}`} /></div>
                        </button>

                        <button onClick={() => setIsFocusMode(!isFocusMode)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${isFocusMode ? "bg-emerald-50/10 text-emerald-400" : "hover:bg-slate-50 text-slate-700"}`}>
                          <div className="flex items-center gap-2"><Focus className={`size-4 ${isFocusMode ? "text-emerald-400" : ""}`} /><span className="font-semibold">Focus Mode</span></div>
                          <div className={`relative h-5 w-9 rounded-full transition-colors ${isFocusMode ? "bg-emerald-500" : "bg-slate-200"}`}><div className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${isFocusMode ? "translate-x-4" : "translate-x-0"}`} /></div>
                        </button>
                        
                        {isNeuroInclusiveMode && (
                          <div className="pt-3 border-t border-slate-200/60 mt-3 aya-fade-in">
                            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-500 flex justify-between">
                              <span>Sensory Overload</span>
                              <span>{sensoryLevel}%</span>
                            </p>
                            <input type="range" min="10" max="100" step="10" value={sensoryLevel} onChange={(e) => setSensoryLevel(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                          </div>
                        )}

                        <div className="pt-3 border-t border-slate-200/60 mt-3">
                          <button onClick={() => setIsXRayMode(!isXRayMode)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${isXRayMode ? "bg-rose-50 text-rose-700" : isFocusMode ? "hover:bg-slate-700 text-slate-200" : "hover:bg-slate-50 text-slate-700"}`}>
                            <div className="flex items-center gap-2"><Terminal className={`size-4 ${isXRayMode ? "text-rose-500" : ""}`} /><span className="font-semibold">Dev X-Ray</span></div>
                            <div className={`relative h-5 w-9 rounded-full transition-colors ${isXRayMode ? "bg-rose-500" : isFocusMode ? "bg-slate-600" : "bg-slate-200"}`}><div className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${isXRayMode ? "translate-x-4" : "translate-x-0"}`} /></div>
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button type="button" onClick={handleProfile} title="My Profile & History" className={`flex size-8 items-center justify-center rounded-lg border transition-colors ${isFocusMode ? "border-slate-700 text-slate-400 hover:bg-emerald-900 hover:text-emerald-300 hover:border-emerald-700" : "border-slate-200 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"}`}>
                <UserCircle className="size-4" />
              </button>
              
              <button type="button" onClick={resetApp} title="Refresh Chat" className={`flex size-8 items-center justify-center rounded-lg border transition-colors ${isFocusMode ? "border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300" : "border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"}`}>
                <RotateCcw className="size-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-5 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className="aya-msg-in">
                <div className={`flex ${msg.sender === "user" ? "justify-end" : "gap-2.5"}`}>
                  {msg.sender === "ai" && <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white"><GraduationCap className="size-4" /></div>}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm transition-colors ${msg.sender === "user" ? "rounded-br-md bg-emerald-500 text-white" : isFocusMode ? "rounded-tl-md border border-slate-700 bg-slate-800 text-slate-200" : "rounded-tl-md border border-slate-100 bg-white text-slate-700"}`}>
                    {formatText(msg.text, isBionicReading && msg.sender === "ai", isFocusMode)}
                  </div>
                </div>

                
                {msg.widget === 'compare' && (
                  <div className="ml-9 mt-3 p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 shadow-sm aya-fade-in overflow-x-auto scrollbar-hide">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                      <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        📊 Global Scholarship Comparison Matrix
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Live AI Analytics
                      </span>
                    </div>
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <th className="pb-2 pr-4">Scholarship</th>
                          <th className="pb-2 pr-4">Tuition</th>
                          <th className="pb-2 pr-4">Stipend</th>
                          <th className="pb-2 pr-4">Airfare</th>
                          <th className="pb-2">Home Bond</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        <tr>
                          <td className="py-2.5 pr-4 font-bold text-emerald-700 flex items-center gap-1.5">
                            <span>🇯🇵</span> MEXT (Japan)
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-slate-800">100%</td>
                          <td className="py-2.5 pr-4 font-mono font-bold text-emerald-600">~$1k/mo</td>
                          <td className="py-2.5 pr-4 text-slate-500">Included</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">None</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-4 font-bold text-blue-700 flex items-center gap-1.5">
                            <span>🇺🇸</span> Fulbright (USA)
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-slate-800">100%</td>
                          <td className="py-2.5 pr-4 font-mono font-bold text-blue-600">~$1.5k/mo</td>
                          <td className="py-2.5 pr-4 text-slate-500">Included</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold text-[10px]">2-Yr Rule</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-4 font-bold text-purple-700 flex items-center gap-1.5">
                            <span>🇬🇧</span> Chevening (UK)
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-slate-800">100%</td>
                          <td className="py-2.5 pr-4 font-mono font-bold text-purple-600">Full</td>
                          <td className="py-2.5 pr-4 text-slate-500">Included</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold text-[10px]">2-Yr Rule</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-4 font-bold text-rose-700 flex items-center gap-1.5">
                            <span>🇰🇷</span> GKS (S. Korea)
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-slate-800">100%</td>
                          <td className="py-2.5 pr-4 font-mono font-bold text-rose-600">~$800/mo</td>
                          <td className="py-2.5 pr-4 text-slate-500">Included</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">None</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {msg.widget === 'budget' && (
                  <div className="ml-9 mt-3 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 shadow-sm aya-fade-in flex flex-col gap-2">
                    <div className="flex justify-between font-bold text-slate-800"><span>Set Target Budget:</span><span>${budget}</span></div>
                    <input type="range" min="0" max="40000" step="500" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                    <button onClick={handleFindPrograms} className="mt-2 w-full py-2 bg-emerald-500 text-white rounded-lg font-bold">Apply Filter</button>
                  </div>
                )}

                {msg.chips && msg.chips.length > 0 && (
                  <div className="ml-9 mt-2.5 flex flex-wrap gap-2.5">
                    {msg.chips.map((chip, idx) => (
                       <button key={idx} type="button" onClick={chip.label === "Back to Start" ? resetApp : () => { setPanelMode("results"); setIsFocusMode(false); }} className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${isFocusMode ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"}`}>
                         {chip.label === "Back to Start" ? <ChevronLeft className="size-4" /> : <LayoutGrid className="size-4" />} {formatText(chip.label, isBionicReading, isFocusMode)}
                       </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div ref={messagesEndRef} />

            {panelMode === "welcome" && (
              <div className="ml-9 flex flex-col items-start pt-1 w-full max-w-[85%]">
                {!isToolsMenuOpen ? (
                  <button type="button" onClick={() => setIsToolsMenuOpen(true)} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}>
                    <span className="flex items-center gap-2"><Sparkles className={`size-4 ${isFocusMode ? "text-emerald-400" : "text-emerald-600"}`} />{formatText("Explore Aya Tools", isBionicReading, isFocusMode)}</span><ChevronDown className={`size-4 ${isFocusMode ? "text-emerald-400" : "text-emerald-600"}`} />
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex w-full flex-col gap-2">
                    <button type="button" onClick={() => setIsToolsMenuOpen(false)} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${isFocusMode ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"}`}>
                      <span className="flex items-center gap-2"><Sparkles className={`size-4 ${isFocusMode ? "text-emerald-400" : "text-emerald-600"}`} />{formatText("Hide Tools", isBionicReading, isFocusMode)}</span><ChevronUp className={`size-4 ${isFocusMode ? "text-emerald-400" : "text-emerald-600"}`} />
                    </button>
                    
                    <div className="w-full mt-2">
                      <button onClick={() => setActiveMenuAccordion(activeMenuAccordion === "find" ? null : "find")} className="flex w-full items-center justify-between py-2 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-emerald-600 transition-colors">
                        {formatText("Find Programs", isBionicReading, isFocusMode)} {activeMenuAccordion === "find" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                      </button>
                      <AnimatePresence>
                        {activeMenuAccordion === "find" && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-2 overflow-hidden mb-2">
                            <button type="button" onClick={handleScholarships} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}><Globe className="size-4 shrink-0" /><span className="truncate">{formatText("Full Scholarships", isBionicReading, isFocusMode)}</span></button>
                            <button type="button" onClick={handleStandard} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}><Wallet className="size-4 shrink-0" /><span className="truncate">{formatText("Paid Programs", isBionicReading, isFocusMode)}</span></button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button onClick={() => setActiveMenuAccordion(activeMenuAccordion === "prep" ? null : "prep")} className="flex w-full items-center justify-between py-2 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-amber-600 transition-colors">
                        {formatText("Application Prep", isBionicReading, isFocusMode)} {activeMenuAccordion === "prep" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                      </button>
                      <AnimatePresence>
                        {activeMenuAccordion === "prep" && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-2 overflow-hidden mb-2">
                            <button type="button" onClick={handleRoadmap} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20" : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"}`}><Map className="size-4 shrink-0" /><span className="truncate">{formatText("Smart Roadmap & Costs", isBionicReading, isFocusMode)}</span></button>
                            <button type="button" onClick={handleFinancial} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}><DollarSign className="size-4 shrink-0" /><span className="truncate">{formatText("What-If Financial Engine", isBionicReading, isFocusMode)}</span></button>
                            <button type="button" onClick={handleEmailGen} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20" : "border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100"}`}><Mail className="size-4 shrink-0" /><span className="truncate">{formatText("Cold Email Generator", isBionicReading, isFocusMode)}</span></button>
                            <button type="button" onClick={handleReviewer} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" : "border-purple-200 bg-purple-50 text-purple-800 hover:bg-purple-100"}`}><PenTool className="size-4 shrink-0" /><span className="truncate">{formatText("Letter Reviewer", isBionicReading, isFocusMode)}</span></button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button onClick={() => setActiveMenuAccordion(activeMenuAccordion === "language" ? null : "language")} className="flex w-full items-center justify-between py-2 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-rose-600 transition-colors">
                        {formatText("Language & Testing", isBionicReading, isFocusMode)} {activeMenuAccordion === "language" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                      </button>
                      <AnimatePresence>
                        {activeMenuAccordion === "language" && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-2 overflow-hidden mb-2">
                            <button type="button" onClick={handleInterviewPanel} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20" : "border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100"}`}><Mic className="size-4 shrink-0" /><span className="truncate">{formatText("Mock Interview Simulator", isBionicReading, isFocusMode)}</span></button>
                            <button type="button" onClick={handleTutor} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"}`}><BookOpen className="size-4 shrink-0" /><span className="truncate">{formatText("Language & Exam Tutor", isBionicReading, isFocusMode)}</span></button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200/60">
                         <button type="button" onClick={handleProfile} className={`flex w-full items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${isFocusMode ? "border-slate-600 bg-slate-700 text-white" : "border-slate-200 bg-slate-800 text-white"}`}><UserCircle className="size-4 shrink-0" /><span className="truncate">{formatText("Profile & History", isBionicReading, isFocusMode)}</span></button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          <div className={`p-4 transition-colors ${isFocusMode ? "border-t border-slate-800" : "border-t border-slate-200/60"}`}>
            <div className={`flex items-center gap-2 rounded-2xl border px-4 py-2 shadow-sm focus-within:ring-2 transition-colors ${isFocusMode ? "border-slate-700 bg-slate-800 focus-within:border-emerald-500 focus-within:ring-emerald-500/20" : "border-slate-200 bg-white focus-within:border-emerald-300 focus-within:ring-emerald-100"}`}>
              <input type="text" placeholder="Ask Aya anything... (Try typing 'Compare scholarships' or 'Set budget')" className={`flex-1 bg-transparent text-sm outline-none ${isFocusMode ? "text-slate-200 placeholder:text-slate-500" : "text-slate-700 placeholder:text-slate-400"}`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e, handleSendMessage)} disabled={isLoading} />
              <button type="button" onClick={() => startListening(setInputValue)} className={`flex size-8 items-center justify-center rounded-lg transition-colors ${isListening ? "bg-rose-100 text-rose-500 animate-pulse" : isFocusMode ? "text-slate-500 hover:bg-slate-700 hover:text-slate-300" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"}`}>{isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}</button>
              <button type="button" onClick={handleSendMessage} disabled={isLoading} className={`flex size-8 items-center justify-center rounded-lg text-white transition-colors ${isLoading ? (isFocusMode ? "bg-emerald-500/50" : "bg-emerald-300") : "bg-emerald-500 hover:bg-emerald-600"}`}><Send className="size-4" /></button>
            </div>
          </div>
        </div>

        <div className={`flex-1 flex overflow-hidden transition-all duration-500 ${isFocusMode ? "opacity-10 pointer-events-none blur-sm" : "bg-white/30"}`}>
          
          <motion.div key={panelMode} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex-1 overflow-y-auto relative">
          
          <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-slate-100/50 mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setPanelMode("welcome")} className="flex items-center justify-center size-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-sm" title="Back to Start">
                <ArrowLeft className="size-4" />
              </button>
              <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
                <span className="text-slate-400">{formatText("Workspace", isBionicReading, false)}</span>
                <ChevronRight className="size-4 text-slate-300" />
                <span className="font-semibold text-emerald-700">
                  {formatText(panelMode === "standard" ? "Standard Programs" : panelMode === "scholarships" ? "Full Scholarships" : panelMode === "results" ? "Results" : panelMode === "detail" ? "Program Detail" : panelMode === "review" ? "Letter Reviewer" : panelMode === "tutor" ? "Language Tutor" : panelMode === "interview" ? "Mock Interview" : panelMode === "email" ? "Cold Email Generator" : panelMode === "profile" ? "Profile & History" : panelMode === "roadmap" ? "Roadmap & Costs" : panelMode === "financial" ? "Financial Engine" : "Overview", isBionicReading, false)}
                </span>
              </nav>
            </div>
            <button type="button" onClick={resetApp} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50"><RotateCcw className="size-3.5" />{formatText("New Search", isBionicReading, false)}</button>
          </div>

          {panelMode === "welcome" && (
            <div className="flex h-[calc(100%-100px)] items-center justify-center p-8">
              <div className="aya-fade-in-up flex max-w-md flex-col items-center rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><GraduationCap className="size-8" /></div>
                <h2 className="mb-3 text-balance text-2xl font-bold text-emerald-900">{formatText("Your workspace is ready", isBionicReading, false)}</h2>
                <p className="text-pretty text-sm leading-relaxed text-slate-500">{formatText("Click 'Explore Aya Tools' on the left to begin your journey.", isBionicReading, false)}</p>
              </div>
            </div>
          )}

          {panelMode === "financial" && (
            <div className="mx-auto max-w-5xl px-8 py-4">
              <div className="aya-fade-in mb-8">
                <h1 className="flex items-center gap-2.5 text-2xl font-bold text-emerald-900"><DollarSign className="size-6 text-emerald-500" />{formatText("What-If Financial Engine", isBionicReading, false)}</h1>
                <p className="mt-1.5 text-sm text-slate-500">{formatText("Enter your resources and work capacity to mathematically calculate the safest scholarship path.", isBionicReading, false)}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
                <div>
                  <div className="mb-2 flex items-center justify-between"><p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{formatText("Current Savings", isBionicReading, false)}</p><span className="font-mono text-sm font-bold text-emerald-600">${finSavings}</span></div>
                  <input type="range" min="0" max="20000" step="500" value={finSavings} onChange={(e) => setFinSavings(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between"><p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{formatText("Expected Part-Time Work", isBionicReading, false)}</p><span className="font-mono text-sm font-bold text-emerald-600">{finHours} hrs/week</span></div>
                  <input type="range" min="0" max="28" step="1" value={finHours} onChange={(e) => setFinHours(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <button onClick={runFinancialEngine} className="md:col-span-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-[0.99]">
                  {formatText("Calculate Safety Index", isBionicReading, false)} <Sparkles className="size-5" />
                </button>
              </div>

              {finResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 aya-fade-in-up">
                  {finResults.slice(0, 3).map((res, i) => (
                    <div key={i} className={`p-6 rounded-3xl border shadow-sm ${res.category === "Safe Match" ? "bg-emerald-50 border-emerald-200" : res.category === "Moderate" ? "bg-amber-50 border-amber-200" : "bg-rose-50 border-rose-200"}`}>
                      <h3 className="font-bold text-lg text-slate-800">{formatText(res.name, isBionicReading, false)}</h3>
                      <p className="text-xs text-slate-500 mb-4">{formatText(res.country, isBionicReading, false)}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm"><span className="text-slate-600">Est. 2-Year Living Cost:</span> <span className="font-mono font-bold">$28,000</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-600">Grant Value:</span> <span className="font-mono font-bold text-emerald-600">+${res.estValue}</span></div>
                        <div className="flex justify-between text-sm border-t pt-2"><span className="text-slate-800 font-bold">Out of Pocket:</span> <span className="font-mono font-bold text-rose-600">-${res.outOfPocket}</span></div>
                      </div>

                      <div className={`text-center py-2 rounded-xl text-xs font-bold uppercase tracking-wider border ${res.category === "Safe Match" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : res.category === "Moderate" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-rose-100 text-rose-700 border-rose-200"}`}>
                        {formatText(res.category, isBionicReading, false)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {panelMode === "profile" && (
            <div className="mx-auto max-w-5xl px-8 py-4">
              <div className="aya-fade-in mb-6 flex justify-between items-end border-b border-slate-200 pb-4">
                <div>
                  <h1 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900"><UserCircle className="size-6 text-slate-500" />{formatText("Profile & History", isBionicReading, false)}</h1>
                  <p className="mt-1.5 text-sm text-slate-500">{formatText("Manage your saved data and clear specific history sections.", isBionicReading, false)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-xl mb-6">
                <button onClick={() => setProfileTab("saved")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${profileTab === "saved" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{formatText("Saved Plans", isBionicReading, false)}</button>
                <button onClick={() => setProfileTab("letters")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${profileTab === "letters" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{formatText("Letter Reviews", isBionicReading, false)}</button>
                <button onClick={() => setProfileTab("emails")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${profileTab === "emails" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{formatText("Cold Emails", isBionicReading, false)}</button>
                <button onClick={() => setProfileTab("tutor")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${profileTab === "tutor" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{formatText("Language Tutor", isBionicReading, false)}</button>
                <button onClick={() => setProfileTab("interviews")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${profileTab === "interviews" ? "bg-white text-rose-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{formatText("Interviews", isBionicReading, false)}</button>
              </div>

              {profileTab === "saved" && (
                <div className="space-y-10 aya-fade-in-up">
                  <section>
                     <div className="flex justify-between items-center mb-4">
                       <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2"><Map className="size-5 text-amber-500" /> {formatText("Saved Roadmaps", isBionicReading, false)}</h2>
                       {(savedRoadmaps || []).length > 0 && <button onClick={() => clearHistorySection('roadmaps')} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg">Clear All</button>}
                     </div>
                     {(savedRoadmaps || []).length === 0 ? (
                       <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">{formatText("No roadmaps saved yet.", isBionicReading, false)}</p>
                     ) : (
                       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                         {(savedRoadmaps || []).map((r, i) => (
                            <div key={r.id || i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
                              <div>
                                <p className="font-bold text-slate-800 text-sm">{formatText(`${r.scholarship} in ${r.country}`, isBionicReading, false)}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{formatText(`Saved: ${r.date} • Progress: ${(r.taskStatus || []).filter(Boolean).length}/${(r.taskStatus || []).length}`, isBionicReading, false)}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => loadSavedRoadmap(r)} className="text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-100">{formatText("Open", isBionicReading, false)}</button>
                                <button onClick={() => deleteHistoryItem('roadmaps', i)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"><Trash2 className="size-4" /></button>
                              </div>
                            </div>
                         ))}
                       </div>
                     )}
                  </section>
                  <section>
                     <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2"><Heart className="size-5 text-rose-500" /> {formatText("Favorite Universities", isBionicReading, false)}</h2>
                     {(savedUniversities || []).length === 0 ? (
                       <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">{formatText("No universities saved yet. Click the heart icon on any program detail page.", isBionicReading, false)}</p>
                     ) : (
                       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                         {(savedUniversities || []).map((u, i) => (
                            <div key={u.id || i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                              <div>
                                <p className="font-bold text-slate-800 text-sm truncate max-w-[200px]">{formatText(u.universityName, isBionicReading, false)}</p>
                                <p className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">{formatText(u.programName, isBionicReading, false)}</p>
                              </div>
                              <button onClick={() => {setSelectedProgram(u); setPanelMode("detail");}} className="text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 shrink-0">{formatText("View", isBionicReading, false)}</button>
                            </div>
                         ))}
                       </div>
                     )}
                  </section>
                </div>
              )}

              {profileTab === "letters" && (
                <div className="aya-fade-in-up">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2"><PenTool className="size-5 text-purple-500" /> {formatText("Letter Reviews", isBionicReading, false)}</h2>
                     {(historyLetters || []).length > 0 && <button onClick={() => clearHistorySection('letters')} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg">Clear All</button>}
                  </div>
                  {(historyLetters || []).length === 0 ? (
                    <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">{formatText("No letters reviewed yet.", isBionicReading, false)}</p>
                  ) : (
                    <div className="space-y-3">
                      {(historyLetters || []).map((l, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center group">
                          <div>
                            <p className="font-bold text-sm text-slate-800">Score: {l.score}%</p>
                            <p className="text-xs text-slate-500">{l.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setDraftLetter(l.original); setReviewResult(l.result); setPanelMode("review"); }} className="text-purple-700 bg-purple-50 px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-100">{formatText("Open", isBionicReading, false)}</button>
                            <button onClick={() => deleteHistoryItem('letters', i)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"><Trash2 className="size-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {profileTab === "emails" && (
                <div className="aya-fade-in-up">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2"><Mail className="size-5 text-indigo-500" /> {formatText("Cold Emails", isBionicReading, false)}</h2>
                     {(historyEmails || []).length > 0 && <button onClick={() => clearHistorySection('emails')} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg">Clear All</button>}
                  </div>
                  {(historyEmails || []).length === 0 ? (
                    <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">{formatText("No emails generated yet.", isBionicReading, false)}</p>
                  ) : (
                    <div className="space-y-3">
                      {(historyEmails || []).map((e, i) => (
                        <details key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm group">
                          <summary className="p-4 cursor-pointer font-bold text-sm text-slate-800 outline-none flex justify-between items-center">
                            <span>{formatText(`To: ${e.prof}`, isBionicReading, false)} <span className="text-xs font-normal text-slate-400 ml-2">{e.date}</span></span>
                            <button onClick={(event) => { event.preventDefault(); deleteHistoryItem('emails', i); }} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"><Trash2 className="size-4" /></button>
                          </summary>
                          <div className="p-4 pt-0 text-xs text-slate-600 font-mono whitespace-pre-wrap border-t border-slate-100 mt-2 pt-2">
                            {formatText(e.email, isBionicReading, false)}
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {profileTab === "tutor" && (
                <div className="aya-fade-in-up">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2"><BookOpen className="size-5 text-blue-500" /> {formatText("Language Tutor", isBionicReading, false)}</h2>
                     {(historyTutor || []).length > 0 && <button onClick={() => clearHistorySection('tutor')} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg">Clear All</button>}
                  </div>
                  {(historyTutor || []).length === 0 ? (
                    <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">{formatText("No texts upgraded yet.", isBionicReading, false)}</p>
                  ) : (
                    <div className="space-y-3">
                      {(historyTutor || []).map((t, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                          <div>
                            <p className="font-bold text-sm text-slate-800">Score: {t.score}/30</p>
                            <p className="text-xs text-slate-500">{t.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setDraftText(t.original); setTutorResult(t.result); setPanelMode("tutor"); }} className="text-blue-700 bg-blue-50 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100">{formatText("Open", isBionicReading, false)}</button>
                            <button onClick={() => deleteHistoryItem('tutor', i)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"><Trash2 className="size-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {profileTab === "interviews" && (
                <div className="aya-fade-in-up">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg font-bold text-rose-900 flex items-center gap-2"><Mic className="size-5 text-rose-500" /> {formatText("Mock Interviews", isBionicReading, false)}</h2>
                     {(historyInterviews || []).length > 0 && <button onClick={() => clearHistorySection('interviews')} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg">Clear All</button>}
                  </div>
                  {(historyInterviews || []).length === 0 ? (
                    <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">{formatText("No interviews saved yet.", isBionicReading, false)}</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {(historyInterviews || []).map((intv, i) => (
                         <div key={intv.id || i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-rose-300 transition-colors">
                           <div>
                             <p className="font-bold text-slate-800 text-sm truncate max-w-[200px]">{formatText(`Interview: ${intv.country}`, isBionicReading, false)}</p>
                             <p className="text-xs text-slate-500 mt-0.5">{intv.date} • {(intv.messages||[]).length} messages</p>
                           </div>
                           <div className="flex items-center gap-2">
                             <button onClick={() => {setInterviewCountry(intv.country); setInterviewContext(intv.context); setInterviewMessages(intv.messages); setHasInterviewStarted(true); setPanelMode("interview");}} className="text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-100 shrink-0">{formatText("Resume", isBionicReading, false)}</button>
                             <button onClick={() => deleteHistoryItem('interviews', i)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"><Trash2 className="size-4" /></button>
                           </div>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {panelMode === "interview" && (
            <div className="mx-auto max-w-4xl px-8 py-4">
              <div className="aya-fade-in mb-6 flex items-center justify-between border-b border-slate-200 pb-6">
                <div>
                  <h1 className="flex items-center gap-2.5 text-2xl font-bold text-rose-900"><Mic className="size-6 text-rose-500" />{formatText("Mock Interview Simulator", isBionicReading, false)}</h1>
                  <p className="mt-1.5 text-sm text-slate-500">{formatText("Practice your academic interview with a strict AI committee.", isBionicReading, false)}</p>
                </div>
              </div>

              {!hasInterviewStarted ? (
                <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm max-w-2xl mx-auto">
                  <Field label="Target Country" isBionic={isBionicReading}>
                    <div className="relative">
                      <select value={interviewCountry} onChange={(e) => setInterviewCountry(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100">
                        {COUNTRIES.filter(c => c !== "Any Country").map((c, i) => ( <option key={i} value={c}>{c}</option> ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </Field>
                  <Field label="Your Situation / Context" isBionic={isBionicReading}>
                    <textarea placeholder="e.g., I'm applying for the MEXT scholarship to study AI at Tokyo University..." value={interviewContext} onChange={(e) => setInterviewContext(e.target.value)} className="w-full h-24 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100" />
                  </Field>
                  <button onClick={startInterview} disabled={isInterviewing || !interviewContext.trim()} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all ${isInterviewing ? "bg-rose-300" : "bg-rose-600 hover:bg-rose-700 hover:shadow-rose-500/35 active:scale-[0.99]"}`}>
                    {formatText(isInterviewing ? "Connecting to Committee..." : "Start Interview Simulation", isBionicReading, false)} <Sparkles className="size-5" />
                  </button>
                </div>
              ) : (
                <div className="flex h-[500px] flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {(interviewMessages||[]).map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                         <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-rose-500 text-white rounded-br-none" : "bg-slate-100 text-slate-800 rounded-bl-none"}`}>
                            {formatText(msg.content, isBionicReading && msg.role !== "user", false)}
                         </div>
                      </div>
                    ))}
                    {isInterviewing && <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl px-5 py-3 text-sm bg-slate-100 text-slate-500 rounded-bl-none animate-pulse">Committee is thinking...</div></div>}
                  </div>
                  <div className="border-t border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <textarea value={interviewInput} onChange={(e) => setInterviewInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e, submitInterviewResponse)} placeholder="Type your answer here..." className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none" rows={2} />
                      <button type="button" onClick={() => startListening(setInterviewInput)} className={`flex size-12 items-center justify-center rounded-xl transition-colors ${isListening ? "bg-rose-100 text-rose-500 animate-pulse" : "bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200"}`}>{isListening ? <MicOff className="size-5" /> : <Mic className="size-5" />}</button>
                      <button onClick={submitInterviewResponse} disabled={isInterviewing || !interviewInput.trim()} className="flex size-12 items-center justify-center rounded-xl bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"><Send className="size-5" /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {panelMode === "email" && (
            <div className="mx-auto max-w-4xl px-8 py-4">
              <div className="aya-fade-in mb-8">
                <h1 className="flex items-center gap-2.5 text-2xl font-bold text-indigo-900"><Mail className="size-6 text-indigo-500" />{formatText("Cold Email Generator", isBionicReading, false)}</h1>
                <p className="mt-1.5 text-sm text-slate-500">{formatText("Generate a culturally-aware email to secure your supervisor.", isBionicReading, false)}</p>
              </div>

              {!emailResult ? (
                <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  
                  <div className="flex gap-2">
                    <button onClick={() => setIsEmailBrainDump(false)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isEmailBrainDump ? "bg-indigo-100 text-indigo-700 border border-indigo-200" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}>Standard Mode</button>
                    <button onClick={() => setIsEmailBrainDump(true)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isEmailBrainDump ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}><Mic className="size-4"/> Brain Dump Mode</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Target Country" isBionic={isBionicReading}>
                      <div className="relative">
                        <select value={roadmapTargetCountry} onChange={(e) => handleRoadmapCountryChange(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                          {COUNTRIES.filter(c => c !== "Any Country").map((c, i) => ( <option key={i} value={c}>{c}</option> ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </Field>
                    <Field label="Professor's Name & Title" isBionic={isBionicReading}>
                      <input type="text" placeholder="e.g., Prof. Kenji Tanaka" value={emailProfName} onChange={(e) => { setEmailProfName(e.target.value); if (emailError) setEmailError(""); }} onKeyDown={(e) => handleKeyDown(e, submitEmail)} className={`w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${emailError && !emailProfName.trim() ? "border-rose-500 bg-rose-50 focus:border-rose-500 focus:ring-rose-200" : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"}`} />
                    </Field>
                  </div>

                  <Field label="Research Topic / Key Ideas" isBionic={isBionicReading}>
                    <div className="relative">
                      <textarea placeholder={isEmailBrainDump ? "Just hit the mic and dump your chaotic thoughts about your research..." : "e.g., Human-robot interaction in elderly care, generative UI systems..."} value={emailInterest} onChange={(e) => { setEmailInterest(e.target.value); if (emailError) setEmailError(""); }} className={`w-full h-32 resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${emailError && !emailInterest.trim() ? "border-rose-500 bg-rose-50 focus:border-rose-500 focus:ring-rose-200 text-rose-900" : isEmailBrainDump ? "bg-amber-50/30 border-amber-200 focus:border-amber-300 focus:ring-amber-100 text-amber-900" : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"}`} />
                      {isEmailBrainDump && (
                        <button type="button" onClick={() => startListening(setEmailInterest)} className={`absolute bottom-4 right-4 p-3 rounded-full shadow-md transition-all ${isListening ? "bg-rose-500 text-white animate-pulse scale-110" : "bg-amber-500 text-white hover:bg-amber-600 hover:scale-105"}`}>{isListening ? <MicOff className="size-5" /> : <Mic className="size-5" />}</button>
                      )}
                    </div>
                  </Field>

                  <div>
                    <button onClick={submitEmail} disabled={isGeneratingEmail} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all ${isGeneratingEmail ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/35 active:scale-[0.99]"}`}>
                      {formatText(isGeneratingEmail ? "Drafting email..." : "Generate Email", isBionicReading, false)} <Sparkles className="size-5" />
                    </button>
                    
                    {emailError && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-center gap-1.5 text-sm font-bold text-rose-500">
                        <AlertTriangle className="size-4" /> {formatText(emailError, isBionicReading, false)}
                      </motion.p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                   <div className="mb-4 flex items-center justify-between">
                     <p className="text-sm font-bold text-slate-800">{formatText("GENERATED DRAFT", isBionicReading, false)}</p>
                   </div>
                   <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 border border-slate-100 font-mono">
                     {formatText(emailResult, isBionicReading, false)}
                   </div>
                   <button onClick={() => setEmailResult("")} className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                     {formatText("Draft another email", isBionicReading, false)}
                   </button>
                </div>
              )}
            </div>
          )}

          {panelMode === "roadmap" && (
            <div className="mx-auto max-w-5xl px-8 py-4">
              <div className="aya-fade-in mb-8 flex justify-between items-start">
                <div>
                  <h1 className="flex items-center gap-2.5 text-2xl font-bold text-amber-900"><Map className="size-6 text-amber-500" />{formatText("Smart Roadmap & Costs", isBionicReading, false)}</h1>
                  <p className="mt-1.5 text-sm text-slate-500">{formatText("Prevent burnout with micro-tasks and estimate real costs.", isBionicReading, false)}</p>
                </div>
                <div className="flex gap-2">
                  {roadmapResult && (
                    <button onClick={generateICS} className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95">
                      <CalendarDays className="size-4" /> {formatText("Sync to Calendar", isBionicReading, false)}
                    </button>
                  )}
                  {roadmapResult && (
                    <button onClick={saveCurrentRoadmap} className={`flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-600 border ${(savedRoadmaps || []).some(r=>r.id === activeRoadmapId) ? "border-amber-400 bg-amber-50" : "border-slate-300"} px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95`}>
                      <Bookmark className="size-4" fill={(savedRoadmaps || []).some(r=>r.id === activeRoadmapId) ? "currentColor" : "none"} /> {formatText("Save", isBionicReading, false)}
                    </button>
                  )}
                </div>
              </div>

              {!roadmapResult ? (
                <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  
                  {isNeuroInclusiveMode && (
                    <div className="mb-2 p-5 bg-purple-50 rounded-2xl border border-purple-100 aya-fade-in">
                      <p className="text-sm font-bold text-purple-900 mb-1 flex items-center gap-2">🥄 Spoon Theory: Energy Check</p>
                      <p className="text-xs text-purple-700 mb-4">How much mental energy do you have today?</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xl">🔋</span>
                        <input type="range" min="1" max="10" value={spoons} onChange={(e)=>setSpoons(Number(e.target.value))} className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer" />
                        <span className="font-bold text-purple-900 w-16">{spoons} Spoons</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field label="Target Country" isBionic={isBionicReading}>
                      <div className="relative">
                        <select value={roadmapTargetCountry} onChange={(e) => handleRoadmapCountryChange(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                          {COUNTRIES.filter(c => c !== "Any Country").map((c, i) => ( <option key={i} value={c}>{c}</option> ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </Field>
                    <Field label="Scholarship / Program" isBionic={isBionicReading}>
                      <div className="relative">
                        <select value={roadmapScholarship} onChange={(e) => handleRoadmapScholarshipChange(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                          {SCHOLARSHIPS.filter(s => s.country === roadmapTargetCountry).map((s, i) => ( <option key={i} value={s.name}>{s.name} ({s.flag})</option> ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </Field>
                    
                    <Field label="English Certificate" isBionic={isBionicReading}>
                      <div className="relative">
                        <select value={roadmapEngCert} onChange={(e) => setRoadmapEngCert(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                          {ENGLISH_CERTIFICATES.map((c, i) => ( <option key={i} value={c}>{c}</option> ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </Field>

                    {!["United States", "United Kingdom"].includes(roadmapTargetCountry) && (
                      <Field label="Local Language Certificate" isBionic={isBionicReading}>
                        <div className="relative">
                          <select value={roadmapLocalCert} onChange={(e) => setRoadmapLocalCert(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                            {(LOCAL_CERTIFICATES[roadmapTargetCountry] || [NONE_CERT]).map((c, i) => ( <option key={i} value={c}>{c}</option> ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </Field>
                    )}

                    <Field label="Your Home Country" isBionic={isBionicReading}>
                      <input type="text" placeholder="e.g., Kazakhstan" value={roadmapHomeCountry} onChange={(e) => setRoadmapHomeCountry(e.target.value)} onKeyDown={(e) => handleKeyDown(e, submitRoadmap)} className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none" />
                    </Field>
                  </div>
                  <button onClick={submitRoadmap} disabled={isGeneratingRoadmap || !roadmapTargetCountry || !roadmapHomeCountry} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all ${isGeneratingRoadmap ? "bg-amber-300" : "bg-amber-500 hover:bg-amber-600 hover:shadow-amber-500/35 active:scale-[0.99]"}`}>
                    {formatText(isGeneratingRoadmap ? "Calculating costs & planning..." : "Generate Anti-Burnout Plan", isBionicReading, false)} <Sparkles className="size-5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  <div className="flex flex-col gap-6 lg:col-span-1">
                    <div className="rounded-3xl border border-rose-100 bg-rose-50/50 p-6 shadow-sm">
                      <p className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-rose-800"><Receipt className="size-4" /> {formatText("ESTIMATED PREP COSTS", isBionicReading, false)}</p>
                      <div className="mb-6 flex items-baseline gap-1 text-rose-600">
                        <span className="text-3xl font-black">${(roadmapResult.hiddenCosts || []).reduce((acc: number, c: any, i: number) => acc + ((costStatus && costStatus[i]) ? 0 : (c.cost || 0)), 0)}</span>
                        <span className="text-sm font-semibold">{formatText("USD Remaining", isBionicReading, false)}</span>
                      </div>
                      
                      <div className="mb-6 rounded-xl bg-white p-4 border border-rose-100">
                        <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{formatText("ROI Visualization", isBionicReading, false)}</p>
                        <div className="flex items-end gap-3 h-24 mt-2 border-b border-slate-200 pb-1">
                           <div className="flex flex-col items-center justify-end w-1/2 h-full">
                              <div className="w-full bg-rose-400 rounded-t-sm transition-all duration-500" style={{height: `${Math.max((((roadmapResult.hiddenCosts || []).reduce((acc: number, c: any, i: number) => acc + ((costStatus && costStatus[i]) ? 0 : (c.cost || 0)), 0)) / getActiveScholValue()) * 100, 5)}%`}}></div>
                              <span className="text-[10px] font-bold text-rose-600 mt-1">{formatText("Costs", isBionicReading, false)}</span>
                           </div>
                           <div className="flex flex-col items-center justify-end w-1/2 h-full">
                              <div className="w-full bg-emerald-500 rounded-t-sm h-full"></div>
                              <span className="text-[10px] font-bold text-emerald-700 mt-1">{formatText("Grant", isBionicReading, false)}</span>
                           </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 text-center">{formatText(`Potential Value: ~$${getActiveScholValue()}`, isBionicReading, false)}</p>
                      </div>

                      <ul className="space-y-4">
                        {(roadmapResult.hiddenCosts || []).map((cost: any, i: number) => {
                          const isPaid = (costStatus || [])[i];
                          return (
                          <li key={i} className={`flex flex-col gap-1 border-b border-rose-100/50 pb-3 last:border-0 last:pb-0 transition-opacity ${isPaid ? "opacity-40" : ""}`}>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" checked={isPaid || false} onChange={() => toggleCost(i)} className="rounded text-rose-500 focus:ring-rose-400 cursor-pointer" />
                              <div className="flex flex-1 items-center justify-between text-sm font-bold text-slate-800">
                                <span className={isPaid ? "line-through" : ""}>{formatText(cost.item, isBionicReading, false)}</span>
                                <span>${cost.cost}</span>
                              </div>
                            </div>
                            <span className="text-xs text-slate-500 ml-6">{formatText(cost.note, isBionicReading, false)}</span>
                          </li>
                        )})}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="flex items-center justify-between rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
                      <div>
                        <p className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide text-emerald-800">
                          <Brain className="size-4" /> {formatText("AYA'S ADVICE", isBionicReading, false)}
                        </p>
                        <p className="text-sm leading-relaxed text-emerald-700 italic">
                          "{formatText(roadmapResult.burnoutMessage, isBionicReading, false)}"
                        </p>
                      </div>
                      <button onClick={triggerOverwhelm} className="shrink-0 flex flex-col items-center gap-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ml-4">
                        <span className="text-lg">🏳️</span> {formatText("Overwhelmed?", isBionicReading, false)}
                      </button>
                    </div>

                    <div className="relative flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-sm font-bold text-slate-800">{formatText("RPG SKILL TREE", isBionicReading, false)}</p>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                           {(taskStatus || []).filter(Boolean).length} / {(roadmapResult.microTasks || []).length} {formatText("Done", isBionicReading, false)}
                        </span>
                      </div>
                      
                      <div className="absolute left-[39px] top-[70px] bottom-[40px] w-0.5 bg-slate-100" />

                      <div className="space-y-6 relative">
                        {(() => {
                          const tasks = roadmapResult.microTasks || [];
                          const visibleTasks = (isNeuroInclusiveMode && spoons <= 3) ? tasks.slice(0, 1) : tasks;
                          
                          return visibleTasks.map((task: any, i: number) => {
                            const isDone = (taskStatus || [])[i];
                            const isLocked = i > 0 && !(taskStatus || [])[i-1] && !isDone; 
                            
                            return (
                            <div key={i} className={`flex gap-4 transition-all duration-300 ${isDone ? "opacity-50 grayscale" : ""} ${isLocked ? "opacity-40" : ""}`}>
                              <div className="relative mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-100 ring-4 ring-white z-10 cursor-pointer" onClick={() => { if(!isLocked) toggleTask(i); }}>
                                {isLocked ? <Lock className="size-3 text-slate-400" /> : <div className={`size-3 rounded-full transition-colors ${isDone ? "bg-emerald-500" : "bg-amber-400"}`} />}
                              </div>
                              <div className={`flex flex-1 flex-col rounded-2xl border ${isLocked ? "border-slate-100 bg-slate-50" : "border-amber-200 bg-amber-50/30 shadow-sm"} p-4 transition-colors`}>
                                <div className="flex items-start justify-between gap-4">
                                  <p className={`text-sm font-bold text-slate-800 ${isDone ? "line-through" : ""}`}>{formatText(task.title, isBionicReading, false)}</p>
                                  <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
                                    {formatText(task.timeEstimate, isBionicReading, false)}
                                  </span>
                                </div>
                                <p className={`mt-3 flex items-start gap-1.5 text-xs ${isLocked ? "text-slate-400" : "text-amber-700"}`}>
                                  <Coffee className="size-3.5 shrink-0 mt-0.5" /> 
                                  <span>{formatText(task.antiBurnoutTip, isBionicReading, false)}</span>
                                </p>
                              </div>
                            </div>
                          )});
                        })()}

                        {isNeuroInclusiveMode && spoons <= 3 && (
                          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-sm text-purple-800 text-center font-bold mt-4 aya-fade-in">
                            🔋 Low Energy Mode Active. <br/><span className="font-normal text-purple-600">The rest of your roadmap is hidden. Just focus on this one thing today. You are doing enough.</span>
                          </div>
                        )}
                      </div>
                      
                      {areAllTasksDone && (
                        <div className="mt-8 w-full rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-6 text-center shadow-lg aya-fade-in">
                          <div className="flex justify-center mb-3"><Globe className="size-10 text-emerald-500" /></div>
                          <h3 className="text-lg font-black text-emerald-900 mb-2">You Did It.</h3>
                          <p className="text-sm text-emerald-700 mb-4">You have successfully mapped out and completed the prep for {roadmapScholarship}. Turn your journey into a localized guide for students in {roadmapHomeCountry} who don't have access to advisors.</p>
                          <button onClick={generateInspireGuide} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition-all active:scale-95">
                            Inspire Others (Generate Blueprint)
                          </button>
                        </div>
                      )}

                      {!areAllTasksDone && (
                        <button onClick={() => {setRoadmapResult(null); setActiveRoadmapId(null); setIsOverwhelmed(false)}} className="mt-8 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                          {formatText("Plan another path", isBionicReading, false)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {panelMode === "tutor" && (
            <div className="mx-auto max-w-5xl px-8 py-4">
              <div className="aya-fade-in mb-6">
                <h1 className="flex items-center gap-2.5 text-2xl font-bold text-blue-900"><BookOpen className="size-6 text-blue-500" />{formatText("AI Academic Language & Exam Tutor", isBionicReading, false)}</h1>
                <p className="mt-1.5 text-sm text-slate-500">{formatText("Paste your simple draft below. I will upgrade your vocabulary and estimate your exam writing score.", isBionicReading, false)}</p>
              </div>

              {!tutorResult ? (
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <textarea value={draftText} onChange={(e) => setDraftText(e.target.value)} onKeyDown={(e) => handleTextareaKeyDown(e, submitTutor)} placeholder="Enter a paragraph you'd like to make more academic..." className="h-64 w-full resize-none rounded-2xl border border-slate-200 p-5 text-sm leading-relaxed text-slate-700 shadow-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100" />
                    <button type="button" onClick={() => startListening(setDraftText)} className={`absolute bottom-4 right-4 p-3 rounded-full transition-colors ${isListening ? "bg-rose-100 text-rose-500 animate-pulse" : "bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-500"}`}>{isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}</button>
                  </div>
                  <button onClick={submitTutor} disabled={isTutoring || !draftText.trim()} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all ${isTutoring ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/35 active:scale-[0.99]"}`}>
                    {formatText(isTutoring ? "Evaluating..." : "Upgrade Language", isBionicReading, false)} <Sparkles className="size-5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="flex flex-col gap-6 lg:col-span-1">
                    <div className="rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-sm">
                      <p className="text-sm font-bold tracking-wide text-slate-400">{formatText("ESTIMATED SCORE", isBionicReading, false)}</p>
                      <div className="mx-auto mt-4 flex size-32 items-center justify-center rounded-full border-8 border-blue-100 bg-blue-50 text-4xl font-black text-blue-600">{tutorResult.score}/30</div>
                      <p className="mt-4 text-sm text-slate-500">{formatText("Writing Section Equivalent", isBionicReading, false)}</p>
                    </div>

                    <div className="rounded-3xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
                      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-amber-800"><Languages className="size-4" /> {formatText("GRAMMAR & STRUCTURE", isBionicReading, false)}</p>
                      <ul className="space-y-3">
                        {(tutorResult.feedback || []).map((f: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" /><span>{formatText(f, isBionicReading, false)}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-800">{formatText("ACADEMIC C1/C2 VERSION", isBionicReading, false)}</p>
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700">{formatText("AI Upgraded", isBionicReading, false)}</span>
                      </div>
                      <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 border border-slate-100">
                        {formatText(tutorResult.academicVersion, isBionicReading, false)}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-800"><Award className="size-4" /> {formatText("VOCABULARY UPGRADES", isBionicReading, false)}</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {(tutorResult.vocabularyUpgrades || []).map((item: any, i: number) => (
                          <div key={i} className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
                            <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
                              <span className="line-through text-slate-400">{formatText(item.simple, isBionicReading, false)}</span>
                              <ArrowRight className="size-3 text-emerald-500" />
                              <span className="text-emerald-700">{formatText(item.academic, isBionicReading, false)}</span>
                            </p>
                            <p className="mt-2 text-xs text-slate-500">{formatText(item.explanation, isBionicReading, false)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button onClick={() => setTutorResult(null)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                      {formatText("Practice Another Text", isBionicReading, false)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {panelMode === "review" && (
            <div className="mx-auto max-w-5xl px-8 py-4">
              <div className="aya-fade-in mb-6">
                <h1 className="flex items-center gap-2.5 text-2xl font-bold text-purple-900"><PenTool className="size-6 text-purple-500" />{formatText("AI Motivation Letter Reviewer", isBionicReading, false)}</h1>
                <p className="mt-1.5 text-sm text-slate-500">{formatText("Paste your draft below and Aya will evaluate your admission chances.", isBionicReading, false)}</p>
              </div>

              {!reviewResult ? (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <button onClick={() => setIsBrainDump(false)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isBrainDump ? "bg-purple-100 text-purple-700 border border-purple-200" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}>Standard Draft</button>
                    <button onClick={() => setIsBrainDump(true)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isBrainDump ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}><Mic className="size-4"/> Brain Dump Mode</button>
                    
                    {isNeuroInclusiveMode && (
                      <button onClick={() => setIsRSDMode(!isRSDMode)} className={`ml-auto px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isRSDMode ? "bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`} title="Rejection Sensitive Dysphoria Safe Mode">
                        <Shield className="size-4"/> Gentle Feedback
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <textarea value={draftLetter} onChange={(e) => setDraftLetter(e.target.value)} onKeyDown={(e) => handleTextareaKeyDown(e, submitReview)} placeholder={isBrainDump ? "Just hit the mic and dump your chaotic thoughts here. Aya will structure them..." : "Paste your motivation letter or personal statement here..."} className={`h-80 w-full resize-none rounded-2xl border p-5 text-sm leading-relaxed shadow-sm outline-none focus:ring-4 ${isBrainDump ? "bg-amber-50/30 border-amber-200 focus:border-amber-300 focus:ring-amber-100 text-amber-900" : "bg-white border-slate-200 text-slate-700 focus:border-purple-300 focus:ring-purple-100"}`} />
                    {isBrainDump && (
                      <button type="button" onClick={() => startListening(setDraftLetter)} className={`absolute bottom-6 right-6 p-4 rounded-full shadow-lg transition-all ${isListening ? "bg-rose-500 text-white animate-pulse scale-110" : "bg-amber-500 text-white hover:bg-amber-600 hover:scale-105"}`}>{isListening ? <MicOff className="size-6" /> : <Mic className="size-6" />}</button>
                    )}
                  </div>
                  <button onClick={submitReview} disabled={isReviewing || !draftLetter.trim()} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all ${isReviewing ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/35 active:scale-[0.99]"}`}>
                    {formatText(isReviewing ? "Analyzing..." : isBrainDump ? "Structure My Thoughts" : "Analyze Letter", isBionicReading, false)} <Sparkles className="size-5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="flex flex-col gap-6 lg:col-span-1">
                    <div className="rounded-3xl border border-purple-100 bg-white p-6 text-center shadow-sm">
                      <p className="text-sm font-bold tracking-wide text-slate-400">{formatText("ESTIMATED SCORE", isBionicReading, false)}</p>
                      <div className="mx-auto mt-4 flex size-32 items-center justify-center rounded-full border-8 border-purple-100 bg-purple-50 text-4xl font-black text-purple-600">{reviewResult.score}%</div>
                      <p className="mt-4 text-sm text-slate-500">{formatText("Based on global admission standards", isBionicReading, false)}</p>
                    </div>

                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
                      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-emerald-800"><ThumbsUp className="size-4" /> {formatText("STRENGTHS", isBionicReading, false)}</p>
                      <ul className="space-y-3">
                        {(reviewResult.strengths || []).map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" /><span>{formatText(s, isBionicReading, false)}</span></li>
                        ))}
                      </ul>
                    </div>

                    <div className={`rounded-3xl border p-6 shadow-sm ${isRSDMode ? "border-blue-100 bg-blue-50/50" : "border-rose-100 bg-rose-50/50"}`}>
                      <p className={`mb-4 flex items-center gap-2 text-sm font-bold ${isRSDMode ? "text-blue-800" : "text-rose-800"}`}>
                        {isRSDMode ? <Shield className="size-4" /> : <ThumbsDown className="size-4" />} 
                        {formatText(isRSDMode ? "AREAS FOR GROWTH" : "WEAKNESSES", isBionicReading, false)}
                      </p>
                      <ul className="space-y-3">
                        {(reviewResult.weaknesses || []).map((w: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><AlertTriangle className={`mt-0.5 size-4 shrink-0 ${isRSDMode ? "text-blue-500" : "text-rose-500"}`} /><span>{formatText(w, isBionicReading, false)}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="rounded-3xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-800"><Lightbulb className="size-4" /> {formatText("ACTIONABLE TIPS", isBionicReading, false)}</p>
                      <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
                        {(reviewResult.tips || []).map((t: string, i: number) => <li key={i}>{formatText(t, isBionicReading, false)}</li>)}
                      </ul>
                    </div>

                    <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-800">{formatText("POLISHED VERSION", isBionicReading, false)}</p>
                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase text-purple-700">{formatText("AI Generated", isBionicReading, false)}</span>
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                        {formatText(reviewResult.improvedText, isBionicReading, false)}
                      </div>
                      <button onClick={() => setReviewResult(null)} className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                        {formatText("Review Another Letter", isBionicReading, false)}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {panelMode === "standard" && (
            <div className="mx-auto max-w-4xl px-8 py-6">
              <div className="aya-fade-in mb-6">
                <h1 className="flex items-center gap-2.5 text-2xl font-bold text-emerald-900"><SlidersHorizontal className="size-6 text-emerald-500" />{formatText("Search Parameters", isBionicReading, false)}</h1>
                <p className="mt-1 text-sm text-slate-500">{formatText("Customize filters to match your profile", isBionicReading, false)}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                <Dropdown label="Field of Study" value={field} options={FIELDS} onChange={setField} isBionic={isBionicReading} />
                <Dropdown label="Location" value={country} options={COUNTRIES} onChange={setCountry} isBionic={isBionicReading} />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                <Slider label="Annual Tuition Budget" display={`$${budget.toLocaleString("en-US").replace(/,/g, " ")}`} min={0} max={40000} step={500} value={budget} onChange={setBudget} isBionic={isBionicReading} />
                <Slider label="Minimum GPA" display={`${gpa.toFixed(1)} / 4.0`} min={0} max={4} step={0.1} value={gpa} onChange={setGpa} isBionic={isBionicReading} />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mb-6">
                <Field label="Language of Instruction" isBionic={isBionicReading}>
                  <Segmented options={["English-taught", "Local Language"]} value={language} onChange={(v) => setLanguage(v as typeof language)} isBionic={isBionicReading} />
                </Field>
                <Field label="Study Format" isBionic={isBionicReading}>
                  <Segmented options={["Online", "On-Campus", "Hybrid"]} value={format} onChange={(v) => setFormat(v as typeof format)} isBionic={isBionicReading} />
                </Field>
                <Field label="Duration" isBionic={isBionicReading}>
                  <Segmented options={["1 Year", "18 Months", "2 Years"]} value={duration} onChange={(v) => setDuration(v as typeof duration)} isBionic={isBionicReading} />
                </Field>
              </div>
              <button type="button" onClick={handleFindPrograms} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-500/35 active:scale-[0.99]">
                {formatText("Find Programs", isBionicReading, false)} <ArrowRight className="size-4" />
              </button>
            </div>
          )}

          {panelMode === "scholarships" && (
            <div className="mx-auto max-w-4xl px-8 py-6">
              <div className="aya-fade-in mb-6">
                <h1 className="flex items-center gap-2.5 text-2xl font-bold text-emerald-900"><Sparkles className="size-6 text-emerald-500" />{formatText("Global Grant Parameters", isBionicReading, false)}</h1>
                <p className="mt-1 text-sm text-slate-500">{formatText("Configure eligibility criteria for full scholarship matching.", isBionicReading, false)}</p>
              </div>

              <Field label="1. Select Scholarship" isBionic={isBionicReading}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 mb-6">
                  {SCHOLARSHIPS.map((s, i) => {
                    const active = scholarship === s.id
                    return (
                      <button key={s.id} type="button" onClick={() => { setScholarship(s.id); setGrantLanguage("English-taught"); setCertificate("IELTS Academic"); }} aria-pressed={active} className={`aya-fade-in-up flex flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center transition-all active:scale-[0.98] ${active ? "border-emerald-500 bg-emerald-50/70 shadow-sm shadow-emerald-500/10" : "border-slate-200 bg-white shadow-sm hover:border-emerald-200 hover:bg-slate-50"}`} style={{ animationDelay: `${i * 80}ms` }}>
                        <span className="text-xl leading-none" aria-hidden="true">{s.flag}</span>
                        <span className={`text-[10px] font-bold ${active ? "text-emerald-800" : "text-slate-800"}`}>{formatText(s.name, isBionicReading, false)}</span>
                      </button>
                    )
                  })}
                </div>
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                <Dropdown label="2. Field of Study" value={grantField} options={FIELDS} onChange={setGrantField} isBionic={isBionicReading} />
                {!["fulbright", "chevening"].includes(scholarship) && (
                  <Field label="Language of Instruction" isBionic={isBionicReading}>
                    <Segmented options={["English-taught", "Local Language"]} value={grantLanguage} onChange={(v) => setGrantLanguage(v as typeof grantLanguage)} isBionic={isBionicReading} />
                  </Field>
                )}
              </div>
              
              {["mext", "csc", "gks"].includes(scholarship) && (
                <div className="mb-6">
                  <Field label="3. Submission Pathway" isBionic={isBionicReading}>
                    <Segmented options={["Embassy Track", "University Track"]} value={pathway} onChange={(v) => setPathway(v as typeof pathway)} isBionic={isBionicReading} />
                  </Field>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                <Field label="4. Language Certificate" isBionic={isBionicReading}>
                  <div className="relative">
                    <select value={certificate} onChange={(e) => setCertificate(e.target.value)} aria-label="Language Certificate" className={`w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-sm outline-none transition-colors focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 ${certificate ? "text-slate-800" : "text-slate-400"}`}>
                      {(currentAvailableCerts || []).map((c, i) => ( <option key={i} value={c} className="text-slate-800">{c}</option> ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </Field>
                <Slider label="Minimum Score Required" display={activeCertConfig.format(certScore)} min={activeCertConfig.min} max={activeCertConfig.max} step={activeCertConfig.step} value={certScore} onChange={setCertScore} isBionic={isBionicReading} />
              </div>

              <div className="mb-6">
                <Slider label="5. Minimum GPA" display={`${gpa.toFixed(1)} / 4.0`} min={0} max={4} step={0.1} value={gpa} onChange={setGpa} isBionic={isBionicReading} />
              </div>

              <button type="button" onClick={handleFindPrograms} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-500/35 active:scale-[0.99]">
                {formatText("Find Eligible Programs", isBionicReading, false)} <ArrowRight className="size-4" />
              </button>
            </div>
          )}

          {panelMode === "results" && (
            <div className="mx-auto max-w-6xl px-8 py-8">
              <div className="aya-fade-in mb-8 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><LayoutGrid className="size-5" /></div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">{formatText("Top Matches", isBionicReading, false)}</h1>
                    <p className="mt-0.5 text-sm text-slate-500"><span className="font-semibold text-emerald-600">{formatText("Based on your filters", isBionicReading, false)}</span> · {formatText("showing best matches", isBionicReading, false)}</p>
                  </div>
                </div>
                <button type="button" onClick={() => setPanelMode(searchOrigin)} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                  <ChevronLeft className="size-4" />{formatText("Edit Filters", isBionicReading, false)}
                </button>
              </div>

              <motion.div className="grid grid-cols-1 gap-5 md:grid-cols-3" variants={gridContainer} initial="hidden" animate="show">
                {(matchedPrograms || []).length === 0 ? (
                   <p className="col-span-3 text-center text-slate-500 py-10">{formatText("No programs match your exact criteria. Try lowering your GPA or changing the field.", isBionicReading, false)}</p>
                ) : (
                  (matchedPrograms || []).map((r, i) => {
                    const themes = [ { band: "from-blue-50 to-white", bg: "bg-blue-500" }, { band: "from-indigo-50 to-white", bg: "bg-indigo-900" }, { band: "from-amber-50 to-white", bg: "bg-emerald-600" } ];
                    const theme = themes[i % themes.length];
                    const isSaved = (savedUniversities || []).some(u => u.id === r.id);
                    return (
                      <motion.div key={r.id || i} variants={gridItem} className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className={`flex items-start justify-between bg-gradient-to-br ${theme.band} p-5`}>
                          <div className={`flex size-11 items-center justify-center rounded-2xl ${theme.bg} text-xs font-bold text-white shadow-md uppercase`}>{r.universityName.substring(0, 4)}</div>
                          <div className="flex gap-2">
                             <button onClick={() => toggleFavoriteUniversity(r)} className={`size-7 rounded-full flex items-center justify-center transition-colors ${isSaved ? "bg-rose-100 text-rose-500" : "bg-white/50 text-slate-600 hover:bg-white"}`}>
                               <Heart className="size-3.5" fill={isSaved ? "currentColor" : "none"} />
                             </button>
                             <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{formatText(r.matchPercentage ? `${r.matchPercentage}% match` : "Top match", isBionicReading, false)}</span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-5 pt-4">
                          <p className="flex items-center gap-1.5 text-lg font-bold text-slate-900"><span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 uppercase">{r.country.substring(0, 2)}</span><span className="truncate" title={r.universityName}>{formatText(r.universityName, isBionicReading, false)}</span></p>
                          <p className="mt-1 text-sm text-slate-500 line-clamp-1" title={r.programName}>{formatText(r.programName, isBionicReading, false)}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"><DollarSign className="size-3" />{formatText(r.annualTuitionUsd === 0 ? "Full Ride" : `$${(r.annualTuitionUsd / 1000).toFixed(1)}K`, isBionicReading, false)}</span>
                            <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"><Clock className="size-3" />{formatText(`${r.durationMonths} Mos`, isBionicReading, false)}</span>
                            <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"><MapPin className="size-3" />{formatText(r.country, isBionicReading, false)}</span>
                          </div>
                          <ul className="mt-4 space-y-2.5">
                            {(r.insights?.pros || []).slice(0, 2).map((bullet: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" /><span className="text-pretty">{formatText(bullet, isBionicReading, false)}</span></li>
                            ))}
                          </ul>
                          <button type="button" onClick={() => { setSelectedProgram(r); setPanelMode("detail"); }} className="mt-6 flex w-full mt-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                            {formatText("View Details", isBionicReading, false)} <ArrowRight className="size-4" />
                          </button>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </motion.div>
            </div>
          )}

          {panelMode === "detail" && selectedProgram && (
            <div className="mx-auto max-w-5xl px-8 py-8">
              <div className="aya-fade-in mb-8 flex items-center justify-between">
                <button type="button" onClick={() => setPanelMode("results")} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                  <ArrowLeft className="size-4" />{formatText("Back", isBionicReading, false)}
                </button>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => toggleFavoriteUniversity(selectedProgram)} className={`flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 ${(savedUniversities || []).some(u=>u.id===selectedProgram.id) ? "text-rose-500 bg-rose-50 border-rose-200" : "text-slate-500 hover:text-rose-500"}`}>
                    <Heart className="size-4" fill={(savedUniversities || []).some(u=>u.id===selectedProgram.id) ? "currentColor" : "none"} />
                  </button>
                  <button type="button" className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50"><Share2 className="size-4" /></button>
                </div>
              </div>

              <div className="aya-fade-in-up flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-md uppercase">{selectedProgram.universityName.substring(0, 4)}</div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 uppercase">{selectedProgram.country.substring(0, 2)}</span>
                    <h1 className="text-2xl font-bold text-slate-900">{formatText(selectedProgram.universityName, isBionicReading, false)}</h1>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">{formatText(selectedProgram.matchPercentage ? `${selectedProgram.matchPercentage}% match` : "Top Match", isBionicReading, false)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{formatText(`${selectedProgram.country} • ${selectedProgram.studyFormat}`, isBionicReading, false)}</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-700">{formatText(selectedProgram.programName, isBionicReading, false)}</p>
                </div>
              </div>

              <RadarChart gpa={selectedProgram.minimumGpa || 3.0} score={certScore || 6.5} />

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <StatPill icon={<Globe className="size-4 text-slate-400" />} label={selectedProgram.isScholarshipTrack ? "Grant Available" : "Paid Track"} isBionic={isBionicReading} />
                <StatPill icon={<Users className="size-4 text-slate-400" />} label={selectedProgram.languageOfInstruction} isBionic={isBionicReading} />
                <StatPill icon={<Landmark className="size-4 text-slate-400" />} label={`Min GPA: ${selectedProgram.minimumGpa}`} isBionic={isBionicReading} />
                <StatPill icon={<TrendingUp className="size-4 text-slate-400" />} label={selectedProgram.acceptedLanguageTests?.join(" / ") || "Language Test"} isBionic={isBionicReading} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                <TagPill icon={<Clock className="size-4" />} label={`${selectedProgram.durationMonths} Months`} isBionic={isBionicReading} />
                <TagPill icon={<DollarSign className="size-4" />} label={selectedProgram.annualTuitionUsd === 0 ? "Fully Funded" : `$${selectedProgram.annualTuitionUsd} / yr`} isBionic={isBionicReading} />
                <TagPill icon={<MapPin className="size-4" />} label={selectedProgram.studyFormat} isBionic={isBionicReading} />
                <TagPill icon={<GraduationCap className="size-4" />} label={selectedProgram.fieldOfStudy} isBionic={isBionicReading} />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                <p className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-purple-600"><Sparkles className="size-4" />{formatText("AYA AI INSIGHTS", isBionicReading, false)}</p>
                <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                  {(selectedProgram.insights?.pros || []).map((pro: string, i: number) => ( <Insight key={`pro-${i}`} kind="good" label={pro} isBionic={isBionicReading} /> ))}
                  {(selectedProgram.insights?.cons || []).map((con: string, i: number) => ( <Insight key={`con-${i}`} kind="warn" label={con} isBionic={isBionicReading} /> ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-6 border-b border-slate-200">
                {(["Overview", "Requirements", "Funding"] as const).map((tab) => (
                  <button key={tab} type="button" onClick={() => setDetailTab(tab)} className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${detailTab === tab ? "border-emerald-600 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    {formatText(tab, isBionicReading, false)}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                {detailTab === "Overview" && formatText(`The ${selectedProgram.programName} at ${selectedProgram.universityName} is a comprehensive ${selectedProgram.durationMonths}-month program located in ${selectedProgram.country}. It focuses heavily on ${selectedProgram.fieldOfStudy} and is completely ${selectedProgram.languageOfInstruction.toLowerCase()}.`, isBionicReading, false)}
                {detailTab === "Requirements" && formatText(`Applicants must maintain a minimum GPA of ${selectedProgram.minimumGpa}. The program accepts the following language certificates: ${selectedProgram.acceptedLanguageTests?.join(", ") || "IELTS/TOEFL"}.`, isBionicReading, false)}
                {detailTab === "Funding" && selectedProgram.isScholarshipTrack && formatText(`This program is eligible for the ${selectedProgram.scholarshipType} scholarship via the ${selectedProgram.submissionPathway}. When awarded, it covers the standard tuition of $${selectedProgram.annualTuitionUsd}.`, isBionicReading, false)}
                {detailTab === "Funding" && !selectedProgram.isScholarshipTrack && formatText(`This is a standard paid track. The estimated annual tuition is $${selectedProgram.annualTuitionUsd}. Students are encouraged to look for external or university-specific partial grants.`, isBionicReading, false)}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <button type="button" onClick={() => { window.open(`https://www.google.com/search?q=${encodeURIComponent(`${selectedProgram.universityName} ${selectedProgram.programName} international admission application deadline`)}`, '_blank'); }} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-700 active:scale-[0.99]">
                  <Rocket className="size-5" />{formatText("Check Deadlines & Apply", isBionicReading, false)}
                </button>
                <button type="button" className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                  <FileText className="size-4" />{formatText("PDF", isBionicReading, false)}
                </button>
              </div>
            </div>
          )}
          
          </motion.div>

          <AnimatePresence>
            {isXRayMode && (
              <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 320, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="h-full border-l border-slate-700 bg-slate-900 flex flex-col shadow-2xl z-40 relative">
                 <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <span className="text-[10px] font-bold text-emerald-400 font-mono flex items-center gap-2"><Terminal className="size-3"/> AYA X-RAY ENGINE</span>
                    <button onClick={() => setXrayLogs([])} className="text-[10px] text-slate-500 hover:text-rose-400 font-mono">CLEAR</button>
                 </div>
                 <div className="p-4 overflow-y-auto flex-1 font-mono text-[10px] text-emerald-500 space-y-3">
                    {xrayLogs.map((log, idx) => {
                       const isUser = log.includes("[USER");
                       const isCall = log.includes("[TOOL") || log.includes("[NETWORK]");
                       const isState = log.includes("[STATE]") || log.includes("[INTENT]");
                       return (
                         <div key={idx} className={`break-words p-2 rounded border ${isUser ? "border-slate-700 text-slate-300" : isCall ? "border-amber-900/50 text-amber-500 bg-amber-950/20" : isState ? "border-blue-900/50 text-blue-400 bg-blue-950/20" : "border-emerald-900/50 text-emerald-500 bg-emerald-950/20"}`}>
                           {log}
                         </div>
                       )
                    })}
                    <div ref={xrayEndRef} />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:scale-105 transition-transform cursor-pointer">
          <div className="relative flex size-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-[11px] font-bold text-slate-600">{bodyDoubleCount} {formatText("students working now", isBionicReading, false)}</p>
        </div>
      </div>

    </main>
  )
}

function Divider() { return <div className="my-6 h-px w-full bg-slate-200/70" /> }
function Field({ label, isBionic, children }: { label: string; isBionic?: boolean; children: React.ReactNode }) { return ( <div><p className="mb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">{formatText(label, isBionic || false, false)}</p>{children}</div> ) }
function Dropdown({ label, value, options, onChange, isBionic }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void; isBionic?: boolean }) { return ( <Field label={label} isBionic={isBionic}><div className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100">{options.map((o, i) => ( <option key={i} value={o}>{o}</option> ))}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" /></div></Field> ) }
function Slider({ label, display, min, max, step, value, onChange, isBionic }: { label: string; display: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; isBionic?: boolean }) { const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)) || 0; return ( <div><div className="mb-2 flex items-center justify-between"><p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{formatText(label, isBionic || false, false)}</p><span className="font-mono text-sm font-bold text-emerald-600">{display}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label={label} className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow" style={{ background: `linear-gradient(to right, #059669 ${pct}%, #e2e8f0 ${pct}%)` }} /></div> ) }
function Segmented({ options, value, onChange, isBionic }: { options: readonly string[]; value: string; onChange: (v: string) => void; isBionic?: boolean }) { return ( <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">{options.map((opt, i) => { const active = value === opt; return ( <button key={i} type="button" onClick={() => onChange(opt)} className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${ active ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700" }`}>{formatText(opt, isBionic || false, false)}</button> ) })}</div> ) }
function StatPill({ icon, label, isBionic }: { icon: React.ReactNode; label: string; isBionic?: boolean }) { return ( <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">{icon}{formatText(label, isBionic || false, false)}</div> ) }
function TagPill({ icon, label, isBionic }: { icon: React.ReactNode; label: string; isBionic?: boolean }) { return ( <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700">{icon}{formatText(label, isBionic || false, false)}</div> ) }
function Insight({ kind, label, isBionic }: { kind: "good" | "warn"; label: string; isBionic?: boolean }) { return ( <div className="flex items-start gap-2 text-sm">{kind === "good" ? ( <Check className="mt-0.5 size-4 shrink-0 rounded-full bg-emerald-500 p-0.5 text-white" /> ) : ( <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" /> )}<span className={kind === "good" ? "text-slate-700" : "text-amber-700"}>{formatText(label, isBionic || false, false)}</span></div> ) }