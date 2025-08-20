import { CRSFormData } from "./calculateCRSScore";
import { languageScoreToPoints } from "../data/crsOptions";

export function calculateSpouseFactors(data: CRSFormData) {
  let educationScore = 0;
  let workScore = 0;
  let languageScore = 0;

  // Spouse's Education (Max 10 points)
  switch (data.spouseEducationLevel) {
    case "secondary":
      educationScore = 2;
      break;
    case "one_year_post_secondary":
      educationScore = 6;
      break;
    case "two_year_post_secondary":
      educationScore = 7;
      break;
    case "bachelor":
    case "two_or_more_post_secondary":
      educationScore = 8;
      break;
    case "masters":
    case "doctoral":
      educationScore = 10;
      break;
    default:
      break;
  }

  // Spouse's Canadian Work Experience (Max 10 points)
  switch (data.spouseCanadianWorkExperience) {
    case "1_year":
      workScore = 5;
      break;
    case "2_years":
      workScore = 7;
      break;
    case "3_years":
      workScore = 8;
      break;
    case "4_years":
      workScore = 9;
      break;
    case "5_years_or_more":
      workScore = 10;
      break;
    default:
      break;
  }

  // Spouse's Language Ability (each skill can earn up to 5 points)
  const validLang =
    data.spouseLangTest &&
    data.spouseLangTest !== "none_or_not_applicable" &&
    data.spouseLangSpeaking &&
    data.spouseLangListening &&
    data.spouseLangReading &&
    data.spouseLangWriting;

  if (validLang) {
    const getSpouseLangScore = (skill: string, score: string) => {
      if (!data.spouseLangTest || !score) return 0;
      
      // For spouse language, we use the married/common-law scoring system
      // since spouse factors are only relevant for married applicants
      const scoringSystem = languageScoreToPoints;
      
      const testType = data.spouseLangTest as keyof typeof scoringSystem;
      const skillKey = skill as keyof typeof scoringSystem[typeof testType];
      
      if (!scoringSystem[testType] || !scoringSystem[testType][skillKey]) {
        return 0;
      }
      
      const pointsMap = scoringSystem[testType][skillKey];
      const rawPoints = pointsMap[score as keyof typeof pointsMap] || 0;
      
      // Convert the raw CRS points (0-32) to spouse language points (0-5)
      // The conversion is based on the original system where spouse gets reduced points
      if (rawPoints >= 32) return 5;      // CLB 10+ = 5 points
      if (rawPoints >= 29) return 5;      // CLB 9 = 5 points  
      if (rawPoints >= 22) return 5;      // CLB 8 = 5 points
      if (rawPoints >= 16) return 3;      // CLB 7 = 3 points
      if (rawPoints >= 8) return 2;       // CLB 6 = 2 points
      if (rawPoints >= 6) return 1;      // CLB 5 = 1 point
      return 0;                           // CLB 4 and below = 0 points
    };

    languageScore += getSpouseLangScore("speaking", data.spouseLangSpeaking);
    languageScore += getSpouseLangScore("listening", data.spouseLangListening);
    languageScore += getSpouseLangScore("reading", data.spouseLangReading);
    languageScore += getSpouseLangScore("writing", data.spouseLangWriting);
  }

  const total = educationScore + workScore + languageScore;

  return {
    total,
    breakdown: {
      education: educationScore,
      work: workScore,
      language: languageScore,
    },
  };
}
