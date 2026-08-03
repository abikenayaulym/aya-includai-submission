export const documentsBase = [
  {
    id: "mext-japan",
    tags: ["mext", "japan", "scholarship", "grant", "tokyo", "kyoto"],
    content: `[MEXT Scholarship Guidelines - Japan Ministry of Education]
Deadline: Embassy track applications usually close in mid-May. University track closes in January-February.
Eligibility: GPA must be at least 2.30 out of 3.00 on the Japanese scale. Age limit: Under 35 years old.
Benefits: Full tuition exemption, monthly stipend of 144,000 JPY for Master's students, and round-trip flight ticket.
Language: English or Japanese taught. No strict Japanese requirement for application, but a 6-month language prep course is provided if needed.`
  },
  {
    id: "csc-china",
    tags: ["csc", "china", "scholarship", "grant", "tsinghua", "peking"],
    content: `[CSC Scholarship Guidelines - China Scholarship Council]
Deadline: Type A (Embassy) deadlines are usually January to early April. Type B (University) is typically March to April.
Eligibility: Master's applicants must be under 35. Need HSK 4 for Chinese-taught programs; IELTS/TOEFL for English-taught.
Benefits: Covers tuition, accommodation, comprehensive medical insurance, and a monthly stipend of 3,000 RMB for Master's.`
  },
  {
    id: "gks-korea",
    tags: ["gks", "korea", "south korea", "scholarship", "grant", "seoul"],
    content: `[Global Korea Scholarship (GKS) Guidelines - NIIED]
Deadline: Embassy Track typically opens in February-March. University track opens in February-April.
Eligibility: GPA above 80% from the previous educational institution. Age limit: Under 40 years old.
Benefits: Tuition (up to 5 million KRW/semester), monthly allowance of 1,000,000 KRW, flight, and 1 year of mandatory Korean language training (must reach TOPIK 3 to start degree).`
  },
  {
    id: "erasmus-europe",
    tags: ["erasmus", "europe", "scholarship", "grant", "joint master"],
    content: `[Erasmus Mundus Joint Masters Guidelines]
Deadline: Varies by specific consortium, typically between October and January for the intake in September of the following year.
Eligibility: Must hold a Bachelor's degree. High academic merit required. Mobility rule: Must study in at least two different European countries.
Benefits: Full coverage of participation costs, travel allowance, and a living allowance of up to 1,400 EUR per month for up to 24 months.`
  },
  {
    id: "fulbright-usa",
    tags: ["fulbright", "usa", "america", "scholarship", "grant"],
    content: `[Fulbright Foreign Student Program Guidelines - USA]
Deadline: Varies strictly by country of citizenship, usually between February and October of the preceding year.
Eligibility: Completed Bachelor's degree, strong academic background, high English proficiency (TOEFL/IELTS mandatory). J-1 visa requirement (two-year home-country physical presence requirement applies).
Benefits: Full tuition, airfare, living stipend, and health insurance. Length varies from 1 to 2 years.`
  },
  {
    id: "paid-uk",
    tags: ["uk", "united kingdom", "paid", "tuition", "england"],
    content: `[Standard Paid Masters - United Kingdom]
Duration: Typically 1 year for Master's programs, which saves living costs compared to 2-year programs elsewhere.
Tuition: Averages £15,000 to £30,000+ per year for international students depending on the field (STEM and Business are more expensive).
Requirements: IELTS Academic (usually 6.5 overall, no band less than 6.0), strong personal statement, and Bachelor's degree (minimum 2:1 UK equivalent).`
  },
  {
    id: "paid-germany",
    tags: ["germany", "paid", "tuition-free", "public university"],
    content: `[Standard Paid / Public Masters - Germany]
Tuition: Public universities generally charge NO TUITION FEES for international students, only a semester contribution of 150-300 EUR. (Exception: Baden-Württemberg charges 1,500 EUR/semester).
Living Costs: Students must open a Blocked Account (Sperrkonto) with at least 11,208 EUR per year to get a student visa.
Requirements: IELTS for English-taught, TestDaF/DSH for German-taught. High relevance of Bachelor's degree credits to the Master's program is strictly enforced.`
  }
];

export function retrieveContext(userQuery: string): string {
  const lowerQuery = userQuery.toLowerCase();
  
  const matchedDocs = documentsBase.filter(doc => 
    doc.tags.some(tag => lowerQuery.includes(tag))
  );

  if (matchedDocs.length === 0) return "";

  return matchedDocs.map(doc => doc.content).join("\\n\\n");
}