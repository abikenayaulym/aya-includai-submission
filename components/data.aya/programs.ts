import { Globe, Users, Award, TrendingUp } from "lucide-react"

export type Program = {
  logo: string
  logoClass: string
  match: number
  country: string
  name: string
  degree: string
  price: string
  duration: string
  location: string
  highlights: string[]
  stats: { tag: string, icon: React.ElementType }[]
  desc: string
}

export const programs: Program[] = [
  {
    logo: "UT",
    logoClass: "bg-blue-600",
    match: 97,
    country: "JP",
    name: "The University of Tokyo",
    degree: "Master's in AI Convergence",
    price: "$5.5K / yr",
    duration: "2 Years",
    location: "Tokyo, Japan",
    highlights: ["Perfect alignment with your budget", "World-class human-computer interaction labs"],
    stats: [
      { tag: "#1 Japan", icon: Globe },
      { tag: "28,000+", icon: Users },
      { tag: "Est. 1877", icon: Award },
      { tag: "Top 30 QS", icon: TrendingUp }
    ],
    desc: "This interdisciplinary program bridges core AI, global technology trends, and human-centered design. Tailored for innovators building smart, adaptive IT products with access to world-class research labs in the heart of Tokyo."
  },
  {
    logo: "TH",
    logoClass: "bg-purple-600",
    match: 92,
    country: "CN",
    name: "Tsinghua University",
    degree: "Master's in Interactive Media",
    price: "$6.2K / yr",
    duration: "2 Years",
    location: "Beijing, China",
    highlights: ["Leading creative arts & tech ecosystem", "Strong alumni network in digital media"],
    stats: [
      { tag: "#1 China", icon: Globe },
      { tag: "59,000+", icon: Users },
      { tag: "Est. 1911", icon: Award },
      { tag: "Top 15 QS", icon: TrendingUp }
    ],
    desc: "A globally renowned program integrating art, design, and information technology. Perfect for pushing the boundaries of user experience, digital storytelling, and interactive environments."
  },
  {
    logo: "KU",
    logoClass: "bg-orange-500",
    match: 88,
    country: "BE",
    name: "KU Leuven (Erasmus)",
    degree: "Erasmus Mundus in UX/UI Design",
    price: "Full Scholarship",
    duration: "2 Years",
    location: "Leuven, Belgium",
    highlights: ["Full Erasmus+ funding available", "Study in multiple European countries"],
    stats: [
      { tag: "#1 Belgium", icon: Globe },
      { tag: "60,000+", icon: Users },
      { tag: "Est. 1425", icon: Award },
      { tag: "Top 70 QS", icon: TrendingUp }
    ],
    desc: "An elite Erasmus Mundus joint master degree focusing on user-centered design, cognitive psychology, and European innovation. Includes mobility tracks across partner universities."
  },
]