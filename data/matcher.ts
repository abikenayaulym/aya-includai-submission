export interface SearchFilters {
  targetCountry: string;
  fieldOfStudy: string;
  userGpa: number;
  maxBudget: number;
  isScholarshipSearch: boolean;
}

/**
 * Calculates a match percentage for universities based on user criteria.
 * Deducts points for mismatches in location, field, GPA, budget, and track type.
 */
export function getMatchingPrograms(universities: any[], filters: SearchFilters) {
  return universities.map((uni) => {
    let matchScore = 100;

    if (filters.targetCountry !== "Any Country" && uni.country !== filters.targetCountry) {
      matchScore -= 50;
    }

    if (filters.fieldOfStudy !== "Any Field" && !uni.fieldOfStudy.includes(filters.fieldOfStudy)) {
      matchScore -= 50;
    }

    if (filters.userGpa < uni.minimumGpa) {
      const gpaDiff = uni.minimumGpa - filters.userGpa;
      matchScore -= gpaDiff * 40;
    }

    if (!filters.isScholarshipSearch && uni.annualTuitionUsd > filters.maxBudget) {
      matchScore -= 60;
    }

    if (filters.isScholarshipSearch && !uni.isScholarshipTrack) {
      matchScore -= 80;
    }

    const finalScore = Math.max(0, Math.min(100, Math.round(matchScore)));

    return { ...uni, matchPercentage: finalScore };
  })
  .filter((uni) => uni.matchPercentage > 50)
  .sort((a, b) => b.matchPercentage - a.matchPercentage);
}