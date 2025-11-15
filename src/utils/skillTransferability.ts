import { CRSFormData } from "./calculateCRSScore";
import { languageScoreToPoints, languageScoreToPointsSingle } from "../data/crsOptions";

export function calculateSkillTransferability(data: CRSFormData) {
  

  // Helper to map score levels to CLB (Canadian Language Benchmark)
  const getCLB = (skill: string, score: string) => {
    if (!data.firstLangTest || !score) return 0;
    
    // Determine marital status for language scoring
    const isSingle = data.maritalStatus !== "married" && data.maritalStatus !== "common_law";
    
    // Choose scoring system based on marital status
    const scoringSystem = isSingle ? languageScoreToPointsSingle : languageScoreToPoints;
    
    const testType = data.firstLangTest as keyof typeof scoringSystem;
    const skillKey = skill as keyof typeof scoringSystem[typeof testType];
    
    if (!scoringSystem[testType] || !scoringSystem[testType][skillKey]) {
      return 0;
    }
    
    const pointsMap = scoringSystem[testType][skillKey];
    const rawPoints = pointsMap[score as keyof typeof pointsMap] || 0;
    
    // Convert CRS points to CLB levels based on the original system
    // For single applicants: CLB 10+ = 34 points, CLB 9 = 31 points, etc.
    // For married applicants: CLB 10+ = 32 points, CLB 9 = 29 points, etc.
    if (rawPoints >= 32) return 10;      // CLB 10+ (works for both systems)
    if (rawPoints >= 29) return 9;       // CLB 9 (works for both systems)
    if (rawPoints >= 22) return 8;       // CLB 8 (works for both systems)
    if (rawPoints >= 16) return 7;       // CLB 7 (works for both systems)
    if (rawPoints >= 8) return 6;        // CLB 6 (works for both systems)
    if (rawPoints >= 6) return 5;        // CLB 5 (works for both systems)
    if (rawPoints >= 1) return 4;        // CLB 4 (works for both systems)
    return 0;                             // CLB 3 and below
  };

  const speaking = getCLB("speaking", data.firstLangSpeaking);
  const listening = getCLB("listening", data.firstLangListening);
  const reading = getCLB("reading", data.firstLangReading);
  const writing = getCLB("writing", data.firstLangWriting);
  
  // For skill transferability, we use the LOWEST CLB level among the four skills
  // This is the correct approach according to CRS guidelines
  const clbLevel = Math.min(speaking, listening, reading, writing);
  const canExp = data.canadianWorkExperience;
  const foreignExp = data.foreignWorkExperience;

  // Debug logging
  console.log("🔍 Skill Transferability Debug:");
  console.log("  • Speaking CLB:", speaking);
  console.log("  • Listening CLB:", listening);
  console.log("  • Reading CLB:", reading);
  console.log("  • Writing CLB:", writing);
  console.log("  • Lowest CLB Level (for transferability):", clbLevel);
  console.log("  • Canadian Exp:", canExp);
  console.log("  • Foreign Exp:", foreignExp);

  // 1. Education + Language
  let eduLang = 0;
  if (
    ["bachelor", "two_or_more_post_secondary"].includes(data.educationLevel)
  ) {
    if (clbLevel >= 9) eduLang = 50;
    else if (clbLevel >= 8) eduLang = 13;  // CLB 8 = 13 points
    else if (clbLevel >= 7) eduLang = 25;
  } else if (["masters", "doctoral"].includes(data.educationLevel)) {
    if (clbLevel >= 9) eduLang = 50;
    else if (clbLevel >= 8) eduLang = 13;  // CLB 8 = 13 points
    else if (clbLevel >= 7) eduLang = 25;
  }
  
  console.log("  • Education Level:", data.educationLevel);
  console.log("  • CLB Level for transferability:", clbLevel);
  console.log("  • Education + Language Points:", eduLang);

  // 2. Education + Canadian Work Experience
  let eduCanExp = 0;
  if (
    ["bachelor", "two_or_more_post_secondary", "masters", "doctoral"].includes(data.educationLevel)
  ) {
    if (
      ["2_years", "3_years", "4_years", "5_years_or_more"].includes(canExp)
    ) {
      eduCanExp = 25;  // 2+ years Canadian work + post-secondary education = 25 points
    } else if (canExp === "1_year") {
      eduCanExp = 25;  // 1 year Canadian work + post-secondary education = 25 points
    }
  }

  // 3. Foreign Work + Language
  let foreignLang = 0;
  if (foreignExp === "3_years_or_more") {
    foreignLang = clbLevel >= 9 ? 50 : clbLevel >= 7 ? 25 : 0;
  } else if (["1_year", "2_years"].includes(foreignExp)) {
    foreignLang = clbLevel >= 9 ? 25 : clbLevel >= 7 ? 13 : 0;
  }
  
  console.log("  • Foreign Work Experience:", foreignExp);
  console.log("  • Foreign Work + Language Points:", foreignLang);

  // 4. Foreign Work + Canadian Work
  let foreignCanExp = 0;
  const hasForeignExp = foreignExp && foreignExp !== "none";
  const hasCanExp = canExp && canExp !== "none";
  if (hasForeignExp && hasCanExp) {
    if (
      foreignExp === "3_years_or_more" &&
      ["2_years", "3_years", "4_years", "5_years_or_more"].includes(canExp)
    ) {
      foreignCanExp = 50;
    } else if (
      ["1_year", "2_years"].includes(foreignExp) &&
      ["1_year", "2_years", "3_years", "4_years", "5_years_or_more"].includes(canExp)
    ) {
      foreignCanExp = 25; // 1-2 years foreign + 1+ years Canadian = 25 points
    }
  }
  
  console.log("  • Foreign + Canadian Work Points:", foreignCanExp);

  // 5. Certificate of Qualification + Language
  let certCombo = 0;
  if (data.certificateOfQualification === "yes") {
    if (clbLevel >= 9) certCombo = 50;
    else if (clbLevel >= 7) certCombo = 25;
  }

  // Apply the 50-point cap on Part 1 (Education + Language + Education + Canadian Work)
  const part1Total = eduLang + eduCanExp;
  const cappedPart1 = Math.min(50, part1Total);
  
  // Apply the 50-point cap on Part 2 (Foreign Work + Language + Foreign Work + Canadian Work)
  const part2Total = foreignLang + foreignCanExp;
  const cappedPart2 = Math.min(50, part2Total);
  
  // Certificate combo points are separate
  const total = cappedPart1 + cappedPart2 + certCombo;
  
  // Final debug logging
  console.log("  • Part 1 Total (raw):", part1Total);
  console.log("  • Part 1 Capped:", cappedPart1);
  console.log("  • Part 2 Total (raw):", part2Total);
  console.log("  • Part 2 Capped:", cappedPart2);
  console.log("  • Certificate Combo:", certCombo);
  console.log("  • Final Total:", total);

  return {
    total,
    breakdown: {
      eduLang,
      eduCanExp,
      foreignLang,
      foreignCanExp,
      certCombo,
      // Add the capped totals for proper display
      cappedPart1,
      cappedPart2,
      part1Total,
      part2Total,
    }
  };
}
