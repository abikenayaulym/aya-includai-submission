export interface UniversityProgram {
  id: string;
  universityName: string;
  country: string;
  programName: string;
  fieldOfStudy: string;
  isScholarshipTrack: boolean;
  scholarshipType: string;
  submissionPathway: string;
  languageOfInstruction: string;
  acceptedLanguageTests: string[];
  minimumGpa: number;
  annualTuitionUsd: number;
  studyFormat: string;
  durationMonths: number;
  insights: {
    pros: string[];
    cons: string[];
  };
}

export const universitiesData: UniversityProgram[] = [
  {
    id: "us-berkeley-ai",
    universityName: "University of California, Berkeley",
    country: "United States",
    programName: "M.S. in Computer Science (Artificial Intelligence)",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.8,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top-tier AI research output", "BAIR lab access"],
      cons: ["High living expenses in Bay Area", "Extremely low acceptance rate"]
    }
  },
  {
    id: "us-gatech-ai",
    universityName: "Georgia Institute of Technology",
    country: "United States",
    programName: "M.S. in Computer Science (Machine Learning)",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Fulbright",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong industry ties in Atlanta", "Rigorous and practical curriculum"],
      cons: ["Large cohort sizes", "Intense coursework"]
    }
  },
  {
    id: "us-uiuc-ai",
    universityName: "University of Illinois Urbana-Champaign",
    country: "United States",
    programName: "Master of Computer Science in AI",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.7,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 103,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 18,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Massive computing resources", "More affordable college town"],
      cons: ["Location is rural", "Cold winters"]
    }
  },
  {
    id: "uk-edinburgh-ai",
    universityName: "University of Edinburgh",
    country: "United Kingdom",
    programName: "MSc in Artificial Intelligence",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Oldest AI research center in the UK", "Beautiful historic city"],
      cons: ["Fast-paced 1-year structure", "Housing can be hard to find"]
    }
  },
  {
    id: "uk-kcl-ai",
    universityName: "King's College London",
    country: "United Kingdom",
    programName: "MSc Artificial Intelligence",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Focus on ethical AI", "Central London location"],
      cons: ["High living costs", "Less established in pure tech than Imperial"]
    }
  },
  {
    id: "uk-manchester-ai",
    universityName: "University of Manchester",
    country: "United Kingdom",
    programName: "MSc Advanced Computer Science: AI",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Chevening",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong industry links in Northern England", "Lower cost of living than London"],
      cons: ["Very large university", "Intense final project timeline"]
    }
  },
  {
    id: "ca-mcgill-ai",
    universityName: "McGill University",
    country: "Canada",
    programName: "MSc in Computer Science (Artificial Intelligence)",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.7,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Mila Institute connections", "Vibrant student city"],
      cons: ["Funding is highly competitive", "French is beneficial for daily life"]
    }
  },
  {
    id: "ca-alberta-ai",
    universityName: "University of Alberta",
    country: "Canada",
    programName: "MSc in Computing Science (AI and ML)",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Amiii institute brings massive AI funding", "Affordable living"],
      cons: ["Very harsh winters", "Isolated from Toronto/Vancouver tech hubs"]
    }
  },
  {
    id: "ca-sfu-ai",
    universityName: "Simon Fraser University",
    country: "Canada",
    programName: "Professional Master's Program in Visual Computing",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 93,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 18,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Specialized in computer vision", "Vancouver location"],
      cons: ["High living costs", "Commuter campus feel"]
    }
  },
  {
    id: "jp-osaka-ai",
    universityName: "Osaka University",
    country: "Japan",
    programName: "Master's Program in Information Science and Technology",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top robotics and AI labs in Japan", "Dynamic city culture"],
      cons: ["Requires strong Japanese", "Traditional lab hierarchy"]
    }
  },
  {
    id: "jp-tohoku-ai",
    universityName: "Tohoku University",
    country: "Japan",
    programName: "Master of Information Sciences",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong materials and computing research", "Quiet environment conducive to study"],
      cons: ["Sendai is less international than Tokyo", "Fewer English-speaking events"]
    }
  },
  {
    id: "jp-nagoya-ai",
    universityName: "Nagoya University",
    country: "Japan",
    programName: "Graduate Program in Informatics",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 80,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Close ties to automotive/robotics industry", "Lower living costs"],
      cons: ["Industrial city atmosphere", "Some electives are only in Japanese"]
    }
  },
  {
    id: "cn-zhejiang-ai",
    universityName: "Zhejiang University",
    country: "China",
    programName: "Master of Computer Science (AI Specialization)",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Close to Alibaba HQ in Hangzhou", "Massive investment in tech"],
      cons: ["Heavy competition for top supervisors", "Dormitories are basic"]
    }
  },
  {
    id: "cn-fudan-ai",
    universityName: "Fudan University",
    country: "China",
    programName: "Master in Data Science and AI",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 30,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top comprehensive university in Shanghai", "Excellent alumni network"],
      cons: ["Theory-heavy approach", "High HSK requirement"]
    }
  },
  {
    id: "cn-ustc-ai",
    universityName: "University of Science and Technology of China",
    country: "China",
    programName: "Master of Artificial Intelligence",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.7,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 36,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Known as the 'Caltech of China'", "Outstanding research output"],
      cons: ["Hefei is a Tier-2 city", "Extremely rigorous academics"]
    }
  },
  {
    id: "kr-korea-ai",
    universityName: "Korea University",
    country: "South Korea",
    programName: "M.S. in Artificial Intelligence",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["SKY prestige", "Vibrant campus culture in Seoul"],
      cons: ["Requires high GPA to maintain grant", "Lab culture can be intense"]
    }
  },
  {
    id: "kr-yonsei-ai",
    universityName: "Yonsei University",
    country: "South Korea",
    programName: "Master of Artificial Intelligence",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Excellent corporate sponsorships", "Modern facilities"],
      cons: ["Korean proficiency expected", "Highly hierarchical"]
    }
  },
  {
    id: "kr-hanyang-ai",
    universityName: "Hanyang University",
    country: "South Korea",
    programName: "M.S. in Artificial Intelligence",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong engineering and practical focus", "Seoul location"],
      cons: ["Less international brand name than SKY", "Heavy workload"]
    }
  },
  {
    id: "de-tubingen-ai",
    universityName: "University of Tübingen",
    country: "Germany",
    programName: "M.Sc. Machine Learning",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 95,
    scholarshipType: "Erasmus+",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Cyber Valley AI hub", "World-renowned ML researchers"],
      cons: ["Small university town", "Housing is extremely scarce"]
    }
  },
  {
    id: "de-kit-ai",
    universityName: "Karlsruhe Institute of Technology (KIT)",
    country: "Germany",
    programName: "M.Sc. Computer Science (AI Focus)",
    fieldOfStudy: "Artificial Intelligence",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["Goethe-Zertifikat", "TestDaF"],
    minLanguageScore: 4,
    scholarshipType: "Erasmus+",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top engineering school in Germany", "Excellent tech industry links"],
      cons: ["Requires high German proficiency", "Tough grading scale"]
    }
  },
  {
    id: "us-risd-ux",
    universityName: "Rhode Island School of Design (RISD)",
    country: "United States",
    programName: "MFA in Digital + Media",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 93,
    scholarshipType: "Fulbright",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Legendary design reputation", "Cross-registration with Brown University"],
      cons: ["More focus on art than corporate UX", "Providence is a small city"]
    }
  },
  {
    id: "us-pratt-ux",
    universityName: "Pratt Institute",
    country: "United States",
    programName: "M.S. in Information Experience Design (IXD)",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Excellent NYC networking", "Very practical HCI/UX focus"],
      cons: ["Expensive area to live", "Studio spaces can be crowded"]
    }
  },
  {
    id: "us-sva-ux",
    universityName: "School of Visual Arts (SVA)",
    country: "United States",
    programName: "MFA in Interaction Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong commercial and agency ties", "Taught by working professionals"],
      cons: ["Less academic research", "Campus is spread across Manhattan"]
    }
  },
  {
    id: "uk-edinburgh-ux",
    universityName: "University of Edinburgh",
    country: "United Kingdom",
    programName: "MSc Design Informatics",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Blends data science with design", "Forward-thinking curriculum"],
      cons: ["Very technical for pure designers", "Intense 12-month program"]
    }
  },
  {
    id: "uk-gsa-ux",
    universityName: "Glasgow School of Art",
    country: "United Kingdom",
    programName: "MDes in Innovation Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 88,
    scholarshipType: "Chevening",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Rich creative heritage", "Collaborative studio culture"],
      cons: ["Older facilities", "Focuses more on strategy than UI craft"]
    }
  },
  {
    id: "uk-brunel-ux",
    universityName: "Brunel University London",
    country: "United Kingdom",
    programName: "MSc Digital Design and Branding",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.1,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "Chevening",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong tech and engineering backing", "Good employability rates"],
      cons: ["Campus is far from central London", "Less prestigious than UAL/RCA"]
    }
  },
  {
    id: "ca-carleton-ux",
    universityName: "Carleton University",
    country: "Canada",
    programName: "Master of Design (Human-Computer Interaction)",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 86,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Ottawa tech hub access", "Strong focus on usability research"],
      cons: ["Very academic", "Cold climate"]
    }
  },
  {
    id: "ca-concordia-ux",
    universityName: "Concordia University",
    country: "Canada",
    programName: "Master of Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Vanier CGS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Bilingual city culture", "Great interdisciplinary arts faculty"],
      cons: ["Less specialized in digital product design", "Winter is harsh"]
    }
  },
  {
    id: "ca-calgary-ux",
    universityName: "University of Calgary",
    country: "Canada",
    programName: "Master of Environmental Design (UX/UI focus)",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 86,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Emerging tech hub in Alberta", "Affordable living"],
      cons: ["Focus is broader than just UI/UX", "Small cohort size"]
    }
  },
  {
    id: "jp-chiba-ux",
    universityName: "Chiba University",
    country: "Japan",
    programName: "Master of Engineering in Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["One of the best industrial design schools in Japan", "Close to Tokyo"],
      cons: ["Requires high Japanese proficiency", "Traditional engineering approach"]
    }
  },
  {
    id: "jp-kyotoit-ux",
    universityName: "Kyoto Institute of Technology",
    country: "Japan",
    programName: "Master of Architecture and Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 80,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Combines traditional crafts with modern tech", "Beautiful city context"],
      cons: ["Smaller international network", "Fewer corporate UX links"]
    }
  },
  {
    id: "jp-kanazawa-ux",
    universityName: "Kanazawa College of Art",
    country: "Japan",
    programName: "MA in Visual Communication Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["High reputation in visual arts", "Rich local culture"],
      cons: ["Location is far from tech hubs", "Primarily Japanese-speaking"]
    }
  },
  {
    id: "cn-jiangnan-ux",
    universityName: "Jiangnan University",
    country: "China",
    programName: "Master of Design (Interaction)",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 30,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top 3 design school in China", "Excellent lab funding"],
      cons: ["Located in Wuxi, not a Tier-1 city", "Strict language requirements"]
    }
  },
  {
    id: "cn-gafa-ux",
    universityName: "Guangzhou Academy of Fine Arts",
    country: "China",
    programName: "MFA in Digital Media and Interaction Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 36,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Access to the Greater Bay Area tech hub", "Very creative output"],
      cons: ["Long 3-year program", "Requires solid portfolio and HSK"]
    }
  },
  {
    id: "cn-scut-ux",
    universityName: "South China University of Technology",
    country: "China",
    programName: "Master of Industrial Design (UX focus)",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong engineering base for tech products", "English track available"],
      cons: ["Less focus on aesthetic visual design", "Campus is very large"]
    }
  },
  {
    id: "kr-skku-ux",
    universityName: "Sungkyunkwan University",
    country: "South Korea",
    programName: "Master of Interaction Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Samsung sponsorship ecosystem", "Excellent tech integration"],
      cons: ["Intense corporate style culture", "Suwon campus location"]
    }
  },
  {
    id: "kr-ewha-ux",
    universityName: "Ewha Womans University",
    country: "South Korea",
    programName: "Master of Design (UX focus)",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Beautiful campus in central Seoul", "Strong supportive alumni network"],
      cons: ["Women-only admission", "More traditional design curriculum"]
    }
  },
  {
    id: "kr-seoultech-ux",
    universityName: "Seoul National University of Science and Technology",
    country: "South Korea",
    programName: "M.S. in IT Design Fusion",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Highly practical tech/design blend", "More relaxed than SKY universities"],
      cons: ["Lower global recognition", "Requires strong Korean"]
    }
  },
  {
    id: "de-hfg-ux",
    universityName: "HfG Schwäbisch Gmünd",
    country: "Germany",
    programName: "M.A. Strategic Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "Erasmus+",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 18,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Pure focus on interaction design", "Project-based learning"],
      cons: ["Very small town", "Niche global recognition"]
    }
  },
  {
    id: "de-fhpotsdam-ux",
    universityName: "University of Applied Sciences Potsdam (FHP)",
    country: "Germany",
    programName: "M.A. Interaction Design",
    fieldOfStudy: "UI/UX & Interactive Design",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["Goethe-Zertifikat", "TestDaF"],
    minLanguageScore: 3,
    scholarshipType: "Erasmus+",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Proximity to Berlin", "Highly practical and experimental"],
      cons: ["German language B2/C1 required", "Applied sciences status vs traditional university"]
    }
  },
  {
    id: "us-ucla-arts",
    universityName: "University of California, Los Angeles (UCLA)",
    country: "United States",
    programName: "MFA in Design Media Arts",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Unmatched LA creative network", "Top-tier studio facilities"],
      cons: ["Extremely competitive (tiny cohort)", "High cost of living"]
    }
  },
  {
    id: "us-saic-arts",
    universityName: "School of the Art Institute of Chicago (SAIC)",
    country: "United States",
    programName: "MFA in Art and Technology Studies",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Fulbright",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Museum access", "Highly interdisciplinary and unstructured"],
      cons: ["Self-directed nature requires high discipline", "Chicago winters"]
    }
  },
  {
    id: "us-yale-arts",
    universityName: "Yale University",
    country: "United States",
    programName: "MFA in Graphic Design",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.7,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Ivy League prestige", "Incredible conceptual rigor"],
      cons: ["Grueling critique culture", "New Haven is a small city"]
    }
  },
  {
    id: "uk-falmouth-arts",
    universityName: "Falmouth University",
    country: "United Kingdom",
    programName: "MA Film and Television",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.0,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 88,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Purpose-built creative campus", "Beautiful coastal location"],
      cons: ["Far from London media hubs", "Small town vibe"]
    }
  },
  {
    id: "uk-bournemouth-arts",
    universityName: "Bournemouth University",
    country: "United Kingdom",
    programName: "MA 3D Computer Animation",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.1,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "Chevening",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Industry-recognized animation hub", "High graduate employment in VFX"],
      cons: ["Intense project deadlines", "Very niche technical focus"]
    }
  },
  {
    id: "uk-westminster-arts",
    universityName: "University of Westminster",
    country: "United Kingdom",
    programName: "MA Media Management",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Central London campus", "Strong ties to UK broadcasting"],
      cons: ["Less studio production, more theory/business", "Large cohorts"]
    }
  },
  {
    id: "ca-uqam-arts",
    universityName: "UQAM",
    country: "Canada",
    programName: "MFA in Visual and Media Arts",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Heart of Montreal's art scene", "Great studio space"],
      cons: ["Classes are strictly in French", "Less focus on commercial media"]
    }
  },
  {
    id: "ca-nscad-arts",
    universityName: "NSCAD University",
    country: "Canada",
    programName: "MFA in Fine Arts",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Vanier CGS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Historical arts institution", "Intimate coastal city (Halifax)"],
      cons: ["Older facilities", "Smaller local industry network"]
    }
  },
  {
    id: "ca-victoria-arts",
    universityName: "University of Victoria",
    country: "Canada",
    programName: "MFA in Visual Arts",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Stunning campus environment", "Excellent faculty support"],
      cons: ["Very small program", "Isolated from major art markets"]
    }
  },
  {
    id: "jp-kyotocity-arts",
    universityName: "Kyoto City University of Arts",
    country: "Japan",
    programName: "MFA in Media Art",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Deeply integrated with Kyoto's culture", "New modern campus"],
      cons: ["High language barrier", "Strictly Japanese-focused curriculum"]
    }
  },
  {
    id: "jp-tokyopoly-arts",
    universityName: "Tokyo Polytechnic University",
    country: "Japan",
    programName: "Master of Media Arts",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.0,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Pioneers in photography and animation", "Practical skills focus"],
      cons: ["Lower academic prestige than national universities", "Location outside central Tokyo"]
    }
  },
  {
    id: "jp-okinawa-arts",
    universityName: "Okinawa Prefectural University of Arts",
    country: "Japan",
    programName: "Master of Fine Arts",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.1,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Unique island culture and arts", "Relaxed environment"],
      cons: ["Far from mainland Japan networks", "Limited commercial media opportunities"]
    }
  },
  {
    id: "cn-sichuan-arts",
    universityName: "Sichuan Fine Arts Institute",
    country: "China",
    programName: "MFA in New Media Art",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 36,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Famous contemporary art legacy", "Chongqing is an incredibly vibrant city"],
      cons: ["Long duration (3 years)", "Heavy language requirement"]
    }
  },
  {
    id: "cn-bfa-arts",
    universityName: "Beijing Film Academy",
    country: "China",
    programName: "MA in Film Production",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "CSC",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["#1 Film school in Asia", "Direct access to Chinese film industry"],
      cons: ["Extremely competitive to shoot projects", "Censorship constraints"]
    }
  },
  {
    id: "cn-nanjing-arts",
    universityName: "Nanjing University of the Arts",
    country: "China",
    programName: "MA in Digital Media Art",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 36,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Oldest higher art education institution in China", "Beautiful city"],
      cons: ["Traditional administration", "Local language only"]
    }
  },
  {
    id: "kr-kyunghee-arts",
    universityName: "Kyung Hee University",
    country: "South Korea",
    programName: "MA in Postmodern Music and Media",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong ties to K-Pop and entertainment", "Stunning campus architecture"],
      cons: ["Requires high Korean proficiency", "Some campuses are outside Seoul"]
    }
  },
  {
    id: "kr-sejong-arts",
    universityName: "Sejong University",
    country: "South Korea",
    programName: "MFA in Animation",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 3,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["One of the best animation programs in Korea", "Central Seoul location"],
      cons: ["Intense studio hours", "Lower overall university rank than SKY"]
    }
  },
  {
    id: "kr-dongguk-arts",
    universityName: "Dongguk University",
    country: "South Korea",
    programName: "MFA in Film & Digital Media",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Renowned theater and film alumni", "Central Namsan mountain location"],
      cons: ["Competitive casting/crew dynamics", "Strict hierarchy"]
    }
  },
  {
    id: "de-hfbk-arts",
    universityName: "HFBK Hamburg",
    country: "Germany",
    programName: "MFA in Time-based Media",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.0,
    acceptedLanguageTests: ["Goethe-Zertifikat", "TestDaF"],
    minLanguageScore: 3,
    scholarshipType: "Erasmus+",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Completely open, interdisciplinary structure", "Hamburg art scene"],
      cons: ["Requires massive self-motivation", "German B2 required"]
    }
  },
  {
    id: "de-khm-arts",
    universityName: "Academy of Media Arts Cologne (KHM)",
    country: "Germany",
    programName: "Diploma in Media and Fine Art",
    fieldOfStudy: "Creative Arts & Media",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "Erasmus+",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Unique hybrid of film, art, and theory", "Great equipment access"],
      cons: ["Diploma title instead of standard MA/MFA", "Small cohorts"]
    }
  },
  {
    id: "us-upenn-edu",
    universityName: "University of Pennsylvania",
    country: "United States",
    programName: "M.S.Ed. in Education Policy",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.7,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Fulbright",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Ivy League network", "Strong quantitative policy focus"],
      cons: ["Very fast-paced 1-year degree", "High cost of living in Philly"]
    }
  },
  {
    id: "us-vanderbilt-edu",
    universityName: "Vanderbilt University",
    country: "United States",
    programName: "M.Ed. in International Education Policy",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Peabody College is consistently top-ranked", "Nashville is a great city"],
      cons: ["Smaller international student body", "Heavy reading load"]
    }
  },
  {
    id: "us-uwmadison-edu",
    universityName: "University of Wisconsin-Madison",
    country: "United States",
    programName: "MS in Curriculum and Instruction",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Huge research output in education", "Classic American college town"],
      cons: ["Very cold winters", "Large university bureaucracy"]
    }
  },
  {
    id: "uk-edinburgh-edu",
    universityName: "University of Edinburgh",
    country: "United Kingdom",
    programName: "MSc in Applied Linguistics",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["World-class linguistics department", "Flexible course options"],
      cons: ["Rigorous dissertation requirements", "Short timeframe"]
    }
  },
  {
    id: "uk-warwick-edu",
    universityName: "University of Warwick",
    country: "United Kingdom",
    programName: "MA Educational Leadership and Management",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Chevening",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Highly practical management focus", "Strong campus community"],
      cons: ["Campus is outside the city (Coventry)", "Less focus on pure pedagogy"]
    }
  },
  {
    id: "uk-leeds-edu",
    universityName: "University of Leeds",
    country: "United Kingdom",
    programName: "MA TESOL",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Excellent student city", "Highly respected TESOL program"],
      cons: ["Requires previous teaching experience", "Intense term structure"]
    }
  },
  {
    id: "ca-alberta-edu",
    universityName: "University of Alberta",
    country: "Canada",
    programName: "MEd in Educational Studies",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 93,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong indigenous education focus", "Generous funding environment"],
      cons: ["Edmonton winters are brutal", "Vanier is tough for non-STEM"]
    }
  },
  {
    id: "ca-calgary-edu",
    universityName: "University of Calgary",
    country: "Canada",
    programName: "MA in Educational Research",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Vanier CGS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Focus on adult learning and leadership", "Proximity to the Rockies"],
      cons: ["Heavy research methodology component", "Requires securing a supervisor early"]
    }
  },
  {
    id: "ca-ottawa-edu",
    universityName: "University of Ottawa",
    country: "Canada",
    programName: "MA in Bilingualism Studies",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["#1 bilingual university in North America", "Great for linguistics"],
      cons: ["French knowledge is almost necessary socially", "Government-heavy town"]
    }
  },
  {
    id: "jp-hokkaido-edu",
    universityName: "Hokkaido University",
    country: "Japan",
    programName: "Master in Education",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 2,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Beautiful spacious campus", "Lower living costs than Tokyo"],
      cons: ["Snowy and cold climate", "Requires strong Japanese reading skills"]
    }
  },
  {
    id: "jp-kyoto-edu",
    universityName: "Kyoto University",
    country: "Japan",
    programName: "Master of Education",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 1,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Incredible prestige in Japan", "Deep philosophical approach to education"],
      cons: ["Highly traditional", "JLPT N1 is strictly enforced"]
    }
  },
  {
    id: "jp-waseda-edu",
    universityName: "Waseda University",
    country: "Japan",
    programName: "MA in Applied Linguistics",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Huge international student body", "Excellent Tokyo location"],
      cons: ["Private university means MEXT quotas can be tricky", "Large class sizes"]
    }
  },
  {
    id: "cn-ccnu-edu",
    universityName: "Central China Normal University",
    country: "China",
    programName: "Master of Education (International)",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 80,
    scholarshipType: "CSC",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Premier 'Normal' university in central China", "Affordable city (Wuhan)"],
      cons: ["Far from coastal tech hubs", "English tracks have limited electives"]
    }
  },
  {
    id: "cn-fudan-edu",
    universityName: "Fudan University",
    country: "China",
    programName: "MA in Chinese Linguistics",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 6,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 36,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top linguistic scholars in China", "Shanghai lifestyle"],
      cons: ["Requires native-level Chinese (HSK 6)", "Highly theoretical"]
    }
  },
  {
    id: "cn-renmin-edu",
    universityName: "Renmin University of China",
    country: "China",
    programName: "Master of Education Policy",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Unmatched connections to government policy", "Located in Beijing"],
      cons: ["Focuses heavily on Chinese domestic systems", "Strict grading"]
    }
  },
  {
    id: "kr-ewha-edu",
    universityName: "Ewha Womans University",
    country: "South Korea",
    programName: "Master of Early Childhood Education",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Historical pioneer in Korean women's education", "Top-tier faculty"],
      cons: ["Female applicants only", "Korean proficiency required"]
    }
  },
  {
    id: "kr-yonsei-edu",
    universityName: "Yonsei University",
    country: "South Korea",
    programName: "MA in Korean Language and Literature",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 5,
    scholarshipType: "GKS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Prestigious SKY network", "Excellent for aspiring Korean language teachers"],
      cons: ["Intense reading and writing in Korean", "Highly competitive admission"]
    }
  },
  {
    id: "kr-sogang-edu",
    universityName: "Sogang University",
    country: "South Korea",
    programName: "MA in Applied Linguistics (TESOL)",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 95,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Famous for rigorous academic standards", "Prime location in Sinchon"],
      cons: ["Known for a heavy workload (Sogang High School)", "Small campus"]
    }
  },
  {
    id: "de-heidelberg-edu",
    universityName: "Heidelberg University",
    country: "Germany",
    programName: "M.A. in Transcultural Studies",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Erasmus+",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Oldest university in Germany", "Beautiful historic town"],
      cons: ["Highly theoretical", "Housing is expensive and rare"]
    }
  },
  {
    id: "de-fuberlin-edu",
    universityName: "Freie Universität Berlin",
    country: "Germany",
    programName: "M.A. in Educational Science",
    fieldOfStudy: "Education & Linguistics",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["Goethe-Zertifikat", "TestDaF"],
    minLanguageScore: 4,
    scholarshipType: "Erasmus+",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Vibrant Berlin culture", "Strong emphasis on critical pedagogy"],
      cons: ["German C1 strictly required", "Bureaucratic administration"]
    }
  },
  {
    id: "us-chicago-biz",
    universityName: "University of Chicago (Booth)",
    country: "United States",
    programName: "Master of Business Administration",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.8,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 104,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 21,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Unmatched quantitative finance focus", "Flexible curriculum"],
      cons: ["Highly rigorous data-driven approach", "Cold winters in Chicago"]
    }
  },
  {
    id: "us-northwestern-biz",
    universityName: "Northwestern University (Kellogg)",
    country: "United States",
    programName: "MBA",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.7,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 105,
    scholarshipType: "Fulbright",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["#1 for Marketing", "Incredibly collaborative culture"],
      cons: ["Suburban Evanston location", "Heavy emphasis on group work"]
    }
  },
  {
    id: "us-mit-biz",
    universityName: "MIT (Sloan)",
    country: "United States",
    programName: "Master of Business Administration",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.8,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 105,
    scholarshipType: "Fulbright",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top tech and entrepreneurship network", "Boston ecosystem"],
      cons: ["Extremely difficult to gain admission", "Heavy quantitative focus"]
    }
  },
  {
    id: "uk-imperial-biz",
    universityName: "Imperial College Business School",
    country: "United Kingdom",
    programName: "MSc Management",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong tech and innovation angle", "Great London networking"],
      cons: ["Expensive area", "Short 1-year timeline for pivoting careers"]
    }
  },
  {
    id: "uk-warwick-biz",
    universityName: "Warwick Business School",
    country: "United Kingdom",
    programName: "MSc Business with Consulting",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Chevening",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Target school for London consulting firms", "Great campus facilities"],
      cons: ["Located in Coventry, not London", "Large cohort size"]
    }
  },
  {
    id: "uk-city-biz",
    universityName: "City, University of London (Bayes)",
    country: "United Kingdom",
    programName: "MSc Finance",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 92,
    scholarshipType: "Chevening",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Located in the heart of London's financial district", "Highly practical"],
      cons: ["Lacks the global prestige of LBS/Oxford", "Very quantitative"]
    }
  },
  {
    id: "ca-mcgill-biz",
    universityName: "McGill University (Desautels)",
    country: "Canada",
    programName: "Master of Management in Finance",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 18,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong global reputation", "Montreal is an amazing student city"],
      cons: ["Finance sector is stronger in Toronto", "Strict grading curves"]
    }
  },
  {
    id: "ca-queens-biz",
    universityName: "Queen's University (Smith)",
    country: "Canada",
    programName: "Master of International Business",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 95,
    scholarshipType: "Vanier CGS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 12,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Incredible domestic alumni network", "Team-based learning approach"],
      cons: ["Kingston is a small town", "Vanier favors research degrees over professional"]
    }
  },
  {
    id: "ca-york-biz",
    universityName: "York University (Schulich)",
    country: "Canada",
    programName: "Master of Business Administration",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 95,
    scholarshipType: "Vanier CGS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Excellent ROI and Toronto connections", "Very diverse cohort"],
      cons: ["Commuter campus outside downtown", "Large class sizes"]
    }
  },
  {
    id: "jp-kyoto-biz",
    universityName: "Kyoto University",
    country: "Japan",
    programName: "MBA in International Project Management",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "MEXT",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["High prestige in Asia", "Focus on global operations"],
      cons: ["Less traditional finance/consulting recruitment than Tokyo", "Academic focus"]
    }
  },
  {
    id: "jp-kobe-biz",
    universityName: "Kobe University",
    country: "Japan",
    programName: "Master of Business Administration",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["JLPT"],
    minLanguageScore: 1,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["One of the oldest business schools in Japan", "Strong local industry ties"],
      cons: ["Requires high Japanese proficiency", "Hilly campus"]
    }
  },
  {
    id: "jp-doshisha-biz",
    universityName: "Doshisha University",
    country: "Japan",
    programName: "Global MBA",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "MEXT",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Focus on sustainability and green business", "Based in beautiful Kyoto"],
      cons: ["Private university so MEXT slots are limited", "Smaller corporate network than Waseda"]
    }
  },
  {
    id: "cn-sjtu-biz",
    universityName: "Shanghai Jiao Tong University (Antai)",
    country: "China",
    programName: "International MBA",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Downtown Shanghai location", "Incredible tech and business integration"],
      cons: ["Highly competitive", "Campus life is very fast-paced"]
    }
  },
  {
    id: "cn-fudan-biz",
    universityName: "Fudan University (FDSM)",
    country: "China",
    programName: "Fudan-MIT International MBA",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 95,
    scholarshipType: "CSC",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Partnership with MIT Sloan", "Elite financial network in China"],
      cons: ["High stress environment", "GMAT required"]
    }
  },
  {
    id: "cn-zhejiang-biz",
    universityName: "Zhejiang University (SOM)",
    country: "China",
    programName: "Master of Management (Innovation and Entrepreneurship)",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["HSK"],
    minLanguageScore: 5,
    scholarshipType: "CSC",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Hangzhou is China's e-commerce capital", "Strong startup support"],
      cons: ["Mandarin required", "Dorms are far from the city center"]
    }
  },
  {
    id: "kr-kaist-biz",
    universityName: "KAIST College of Business",
    country: "South Korea",
    programName: "Techno-MBA",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.5,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Located in Seoul (not main Daejeon campus)", "Pioneering tech-business degree"],
      cons: ["Heavy quantitative focus", "Small alumni base compared to SKY"]
    }
  },
  {
    id: "kr-hanyang-biz",
    universityName: "Hanyang University",
    country: "South Korea",
    programName: "Global MBA",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.3,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 85,
    scholarshipType: "GKS",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 18,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Strong connections to Korean manufacturing/tech", "Practical approach"],
      cons: ["Lower global recognition than SNU/Yonsei", "Fast-paced terms"]
    }
  },
  {
    id: "kr-kyunghee-biz",
    universityName: "Kyung Hee University",
    country: "South Korea",
    programName: "Master of Business Administration",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.2,
    acceptedLanguageTests: ["TOPIK"],
    minLanguageScore: 4,
    scholarshipType: "GKS",
    submissionPathway: "University Track",
    languageOfInstruction: "Local Language",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Beautiful campus", "Good reputation in hospitality and service management"],
      cons: ["Korean language requirement", "Less focus on finance"]
    }
  },
  {
    id: "de-frankfurt-biz",
    universityName: "Frankfurt School of Finance & Management",
    country: "Germany",
    programName: "Master of Finance",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.4,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 90,
    scholarshipType: "Erasmus+",
    submissionPathway: "University Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 24,
    studyFormat: "Hybrid",
    isScholarshipTrack: true,
    insights: {
      pros: ["Heart of European banking", "3-day study model allows for part-time work"],
      cons: ["Private school (Erasmus funding may not cover all fees)", "Highly competitive"]
    }
  },
  {
    id: "de-whu-biz",
    universityName: "WHU – Otto Beisheim School of Management",
    country: "Germany",
    programName: "Master in Management",
    fieldOfStudy: "Business & Management",
    minimumGpa: 3.6,
    acceptedLanguageTests: ["TOEFL iBT", "IELTS Academic", "Duolingo English Test"],
    minLanguageScore: 100,
    scholarshipType: "Erasmus+",
    submissionPathway: "Embassy Track",
    languageOfInstruction: "English-taught",
    annualTuitionUsd: 0,
    durationMonths: 21,
    studyFormat: "On-Campus",
    isScholarshipTrack: true,
    insights: {
      pros: ["Top-ranked business school in Germany", "Unmatched consulting placements"],
      cons: ["Located in Vallendar (very small town)", "Elite/corporate culture isn't for everyone"]
    }
  }
];