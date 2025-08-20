import { CRSFormData } from "./calculateCRSScore";
import { languageScoreToPoints, languageScoreToPointsSingle, secondLanguageScoreToPoints } from "../data/crsOptions";

export function calculateCoreHumanCapital(data: CRSFormData) {
  const isSingle =
    data.maritalStatus !== "married" && data.maritalStatus !== "common_law";

  // --- Age ---
  const agePointsSingle: { [key: string]: number } = {
    "17_less": 0, "18": 99, "19": 105, "20_29": 110, "30": 95,
    "31": 90, "32": 85, "33": 80, "34": 75, "35": 70,
    "36": 65, "37": 60, "38": 55, "39": 50, "40": 45,
    "41": 35, "42": 25, "43": 15, "44": 5, "45_more": 0,
  };
  const agePointsSpouse: { [key: string]: number } = {
    "17_less": 0, "18": 90, "19": 95, "20_29": 100, "30": 90,
    "31": 85, "32": 80, "33": 75, "34": 70, "35": 65,
    "36": 60, "37": 55, "38": 50, "39": 45, "40": 35,
    "41": 25, "42": 15, "43": 5, "44": 0, "45_more": 0,
  };
  const ageScore = isSingle
    ? agePointsSingle[data.age] || 0
    : agePointsSpouse[data.age] || 0;

  // --- Education ---
  const educationPointsSingle: { [key: string]: number } = {
    none: 0, secondary: 30, one_year_post_secondary: 90,
    two_year_post_secondary: 98, bachelor: 120,
    two_or_more_post_secondary: 128, masters: 135, doctoral: 150,
  };
  const educationPointsSpouse: { [key: string]: number } = {
    none: 0, secondary: 28, one_year_post_secondary: 84,
    two_year_post_secondary: 91, bachelor: 112,
    two_or_more_post_secondary: 119, masters: 126, doctoral: 140,
  };
  const educationScore = isSingle
    ? educationPointsSingle[data.educationLevel] || 0
    : educationPointsSpouse[data.educationLevel] || 0;

  // --- First Official Language ---
  const getFirstLangScore = (skill: string, score: string) => {
    if (!data.firstLangTest || !score) return 0;
    
    // Choose scoring system based on marital status
    const scoringSystem = isSingle ? languageScoreToPointsSingle : languageScoreToPoints;
    
    const testType = data.firstLangTest as keyof typeof scoringSystem;
    const skillKey = skill as keyof typeof scoringSystem[typeof testType];
    
    if (!scoringSystem[testType] || !scoringSystem[testType][skillKey]) {
      return 0;
    }
    
    const pointsMap = scoringSystem[testType][skillKey];
    return pointsMap[score as keyof typeof pointsMap] || 0;
  };

  const firstLangScore =
    getFirstLangScore("speaking", data.firstLangSpeaking) +
    getFirstLangScore("listening", data.firstLangListening) +
    getFirstLangScore("reading", data.firstLangReading) +
    getFirstLangScore("writing", data.firstLangWriting);

  // --- Second Official Language ---
  let secondLangScore = 0;
  if (data.secondLangTest && data.secondLangTest !== "none_or_not_applicable") {
    const getSecondLangScore = (skill: string, score: string) => {
      if (!data.secondLangTest || !score) return 0;
      
      // Second language always uses the reduced scoring system (max 6 points per skill)
      // This is independent of marital status - second language is always lower
      const testType = data.secondLangTest as keyof typeof secondLanguageScoreToPoints;
      const skillKey = skill as keyof typeof secondLanguageScoreToPoints[typeof testType];
      
      if (!secondLanguageScoreToPoints[testType] || !secondLanguageScoreToPoints[testType][skillKey]) {
        console.log(`❌ Second language scoring issue: ${testType}.${skillKey} not found`);
        return 0;
      }
      
      const pointsMap = secondLanguageScoreToPoints[testType][skillKey];
      const points = pointsMap[score as keyof typeof pointsMap] || 0;
      
      console.log(`🔍 Second Language Debug: ${testType} ${skill} "${score}" = ${points} points`);
      return points;
    };

    const speakingScore = getSecondLangScore("speaking", data.secondLangSpeaking);
    const listeningScore = getSecondLangScore("listening", data.secondLangListening);
    const readingScore = getSecondLangScore("reading", data.secondLangReading);
    const writingScore = getSecondLangScore("writing", data.secondLangWriting);
    
    secondLangScore = speakingScore + listeningScore + readingScore + writingScore;
    
    console.log(`🔍 Second Language Total: ${speakingScore} + ${listeningScore} + ${readingScore} + ${writingScore} = ${secondLangScore}`);
  }

  // --- Canadian Work Experience ---
  const workExpPointsSingle: { [key: string]: number } = {
    none: 0, "1_year": 40, "2_years": 53,
    "3_years": 64, "4_years": 72, "5_years_or_more": 80,
  };
  const workExpPointsSpouse: { [key: string]: number } = {
    none: 0, "1_year": 35, "2_years": 46,
    "3_years": 56, "4_years": 63, "5_years_or_more": 70,
  };
  const canadianExpScore = isSingle
    ? workExpPointsSingle[data.canadianWorkExperience] || 0
    : workExpPointsSpouse[data.canadianWorkExperience] || 0;

  const total =
    ageScore + educationScore + firstLangScore + secondLangScore + canadianExpScore;

  return {
    total,
    breakdown: {
      age: ageScore,
      education: educationScore,
      firstLang: firstLangScore,
      secondLang: secondLangScore,
      canadianExp: canadianExpScore,
    },
  };
}
