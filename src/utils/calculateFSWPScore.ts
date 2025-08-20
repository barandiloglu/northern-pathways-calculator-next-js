export interface FSWPFormData {
  // Language Skills
  firstLangTest: string;
  firstLangSpeaking: string;
  firstLangListening: string;
  firstLangReading: string;
  firstLangWriting: string;
  secondLangTest: string;
  secondLangSpeaking: string;
  secondLangListening: string;
  secondLangReading: string;
  secondLangWriting: string;
  
  // Education
  educationLevel: string;
  
  // Work Experience
  workExperience: string;
  
  // Age
  age: string;
  
  // Job Offer
  jobOffer: string;
  
  // Canadian Experience
  canadianEducation: string;
  canadianWorkExperience: string;
  
  // Spouse/Partner Factors
  maritalStatus: string;
  spouseCitizen: string;
  spouseAccompanying: string;
  spouseWorkExperience: string;
  spouseCanadianEducation: string;
  spouseLanguageTest: string;
  spouseLanguageSpeaking: string;
  spouseLanguageListening: string;
  spouseLanguageReading: string;
  spouseLanguageWriting: string;
  
  // Adaptability
  relativesInCanada: string;
  adaptabilityFactors: string[];
}

// FSWP Language Points (First Language - max 24 points, 6 per skill)
const fswpLanguagePoints = {
  celpip_g: {
    speaking: { "10-12": 6, "9": 6, "8": 5, "7": 4, "6": 0, "5": 0, "4": 0, "M 0-3": 0 },
    listening: { "10-12": 6, "9": 6, "8": 5, "7": 4, "6": 0, "5": 0, "4": 0, "M 0-3": 0 },
    reading: { "10-12": 6, "9": 6, "8": 5, "7": 4, "6": 0, "5": 0, "4": 0, "M 0-3": 0 },
    writing: { "10-12": 6, "9": 6, "8": 5, "7": 4, "6": 0, "5": 0, "4": 0, "M 0-3": 0 }
  },
  ielts_g: {
    speaking: { "7.5-9.0": 6, "7.0": 6, "6.5": 5, "6.0": 4, "5.5": 0, "5.0": 0, "4.0-4.5": 0, "0-3.5": 0 },
    listening: { "8.5-9.0": 6, "8.0": 6, "7.5": 5, "6.0-7.0": 4, "5.5": 0, "5.0": 0, "4.5": 0, "0-4.0": 0 },
    reading: { "8.0-9.0": 6, "7.0-7.5": 6, "6.5": 5, "6.0": 4, "5.0-5.5": 0, "4.0-4.5": 0, "3.5": 0, "0-3.0": 0 },
    writing: { "7.5-9.0": 6, "7.0": 6, "6.5": 5, "6.0": 4, "5.5": 0, "5.0": 0, "4.0-4.5": 0, "0-3.5": 0 }
  },
  pte_core: {
    speaking: { "89+": 6, "84-88": 6, "76-83": 5, "68-75": 4, "59-67": 0, "51-58": 0, "42-50": 0, "0-41": 0 },
    listening: { "89+": 6, "82-88": 6, "71-81": 5, "60-70": 4, "50-59": 0, "39-49": 0, "28-38": 0, "0-27": 0 },
    reading: { "88+": 6, "78-87": 6, "69-77": 5, "60-68": 4, "51-59": 0, "42-50": 0, "33-41": 0, "0-32": 0 },
    writing: { "90+": 6, "88-89": 6, "79-87": 5, "69-78": 4, "60-68": 0, "51-59": 0, "41-50": 0, "0-40": 0 }
  },
  tef_canada: {
    speaking: { "556-699": 6, "518-555": 6, "494-517": 5, "456-493": 4, "422-455": 0, "387-421": 0, "328-386": 0 },
    listening: { "546-699": 6, "503-545": 6, "462-502": 5, "434-461": 4, "393-433": 0, "352-392": 0, "306-351": 0 },
    reading: { "546-699": 6, "503-545": 6, "462-502": 5, "434-461": 4, "393-433": 0, "352-392": 0, "306-351": 0 },
    writing: { "558-699": 6, "512-557": 6, "472-511": 5, "428-471": 4, "379-427": 0, "330-378": 0, "268-329": 0 }
  },
  tcf_canada: {
    speaking: { "16-20": 6, "14-15": 6, "12-13": 5, "10-11": 4, "7-9": 0, "6": 0, "4-5": 0, "0-3": 0 },
    listening: { "549-699": 6, "523-548": 6, "503-522": 5, "458-502": 4, "398-457": 0, "369-397": 0, "331-368": 0, "0-330": 0 },
    reading: { "549-699": 6, "524-548": 6, "499-523": 5, "453-498": 4, "406-452": 0, "375-405": 0, "342-374": 0, "0-341": 0 },
    writing: { "16-20": 6, "14-15": 6, "12-13": 5, "10-11": 4, "7-9": 0, "6": 0, "4-5": 0, "0-3": 0 }
  }
};

// FSWP Education Points (max 25 points) - Updated to match original
const fswpEducationPoints = {
  high_school: 0,
  one_year_program: 5,
  two_year_program: 15,
  bachelor: 19,
  two_or_more_certificates: 21,
  masters: 23,
  doctoral: 25,
  phd: 25
};

// FSWP Work Experience Points (max 15 points) - Updated to match original
const fswpWorkExperiencePoints = {
  "1_year": 9,
  "2-3_years": 11,
  "4-5_years": 13,
  "6_years_or_more": 15
};

// FSWP Age Points (max 12 points) - Updated to match original
const fswpAgePoints = {
  "17_less": 0,
  "18-35": 12,
  "36": 11,
  "37": 10,
  "38": 9,
  "39": 8,
  "40": 7,
  "41": 6,
  "42": 5,
  "43": 4,
  "44": 3,
  "45": 2,
  "46": 1,
  "47_more": 0
};

// FSWP Job Offer Points (max 10 points) - Updated: Job offers no longer give points as of March 25, 2025
const fswpJobOfferPoints = {
  no: 0,
  yes: 0
};

// FSWP Canadian Education Points (max 5 points)
const fswpCanadianEducationPoints = {
  no: 0,
  yes: 5
};

// FSWP Canadian Work Experience Points (max 10 points)
const fswpCanadianWorkExperiencePoints = {
  none_or_less_than_year: 0,
  "1_year_or_more": 10
};

// FSWP Spouse Work Experience Points (max 5 points)
const fswpSpouseWorkExperiencePoints = {
  none_or_less_than_year: 0,
  "1_year_or_more": 5
};

// FSWP Spouse Canadian Education Points (max 5 points)
const fswpSpouseCanadianEducationPoints = {
  no: 0,
  yes: 5
};

// FSWP Spouse Language Points (max 5 points) - Added missing spouse language points


// FSWP Adaptability Points (max 10 points)
const fswpAdaptabilityPoints = {
  canadian_education: 5,
  canadian_work_experience: 10,
  relatives_in_canada: 5
};

// CLB Level Arrays for Second Language and Spouse Language
const speakingCLB5Array = [
  '5', '6', '5.0', '5.5', '51-58', '59-67', '387-421', '456-493', '6', '7-9', '7', '8', '9', '10-12',
  '6.0', '6.5', '7.0', '7.5-9.0', '68-75', '76-83', '84-88', '89+', '456-493', '494-517', '518-555', '556-699',
  '10-11', '12-13', '14-15', '16-20'
];

const listeningCLB5Array = [
  '5', '6', '5.0', '5.5', '39-48', '50-59', '352-392', '393-433', '369-397', '398-457', '7', '8', '9', '10-12',
  '6.0-7.0', '7.5', '8.0', '8.5-9.0', '60-70', '71-81', '82-88', '89+', '434-461', '462-502', '503-545', '546-699',
  '458-502', '503-522', '523-548', '549-699'
];

const readingCLB5Array = [
  '5', '6', '4.0-4.5', '5.0-5.5', '42-50', '51-59', '352-392', '393-433', '375-405', '406-452', '7', '8', '9', '10-12',
  '6.0', '6.5', '7.0-7.5', '8.0-9.0', '60-68', '69-77', '78-87', '88+', '434-461', '462-502', '503-545', '546-699',
  '453-498', '499-523', '524-548', '549-699'
];

const writingCLB5Array = [
  '5', '6', '5.0', '5.5', '51-59', '60-68', '330-378', '379-427', '6', '7-9', '7', '8', '9', '10-12',
  '6.0', '6.5', '7.0', '7.5-9.0', '69-78', '79-87', '88-89', '90+', '428-471', '472-511', '512-557', '558-699',
  '10-11', '12-13', '14-15', '16-20'
];

const speakingCLB4Array = [
  '4', '5', '6', '4.0-4.5', '5.0', '5.5', '42-50', '51-58', '59-67', '328-386', '387-421', '456-493',
  '4-5', '6', '7-9', '7', '8', '9', '10-12', '6.0', '6.5', '7.0', '7.5-9.0', '68-75', '76-83', '84-88', '89+',
  '456-493', '494-517', '518-555', '556-699', '10-11', '12-13', '14-15', '16-20'
];

const listeningCLB4Array = [
  '4', '5', '6', '4.5', '5.0', '5.5', '28-38', '39-48', '50-59', '306-351', '352-392', '393-433',
  '331-368', '369-397', '398-457', '7', '8', '9', '10-12', '6.0-7.0', '7.5', '8.0', '8.5-9.0', '60-70', '71-81', '82-88', '89+',
  '434-461', '462-502', '503-545', '546-699', '458-502', '503-522', '523-548', '549-699'
];

const readingCLB4Array = [
  '4', '5', '6', '3.5', '4.0-4.5', '5.0-5.5', '33-41', '42-50', '51-59', '306-351', '352-392', '393-433',
  '342-374', '375-405', '406-452', '7', '8', '9', '10-12', '6.0', '6.5', '7.0-7.5', '8.0-9.0', '60-68', '69-77', '78-87', '88+',
  '434-461', '462-502', '503-545', '546-699', '453-498', '499-523', '524-548', '549-699'
];

const writingCLB4Array = [
  '4', '5', '6', '4.0-4.5', '5.0', '5.5', '41-50', '51-59', '60-68', '268-329', '330-378', '379-427',
  '4-5', '6', '7-9', '7', '8', '9', '10-12', '6.0', '6.5', '7.0', '7.5-9.0', '69-78', '79-87', '88-89', '90+',
  '428-471', '472-511', '512-557', '558-699', '10-11', '12-13', '14-15', '16-20'
];

export function calculateFSWPScore(data: FSWPFormData) {
  console.log("🔍 FSWP Calculation Started");
  console.log("📊 Form Data:", data);

  // Language Skills (max 24 points)
  let languagePoints = 0;
  const languageBreakdown = { speaking: 0, listening: 0, reading: 0, writing: 0 };

  if (data.firstLangTest) {
    // Map form values to calculation function keys
    let testType: keyof typeof fswpLanguagePoints;
    switch (data.firstLangTest) {
      case "celpip":
        testType = "celpip_g";
        break;
      case "ielts":
        testType = "ielts_g";
        break;
      case "pte":
        testType = "pte_core";
        break;
      case "tef":
        testType = "tef_canada";
        break;
      case "tcf":
        testType = "tcf_canada";
        break;
      default:
        testType = "celpip_g"; // fallback
    }

    if (testType in fswpLanguagePoints) {
      const testPoints = fswpLanguagePoints[testType];

      // Calculate points for each skill
      languageBreakdown.speaking = testPoints.speaking[data.firstLangSpeaking as keyof typeof testPoints.speaking] || 0;
      languageBreakdown.listening = testPoints.listening[data.firstLangListening as keyof typeof testPoints.listening] || 0;
      languageBreakdown.reading = testPoints.reading[data.firstLangReading as keyof typeof testPoints.reading] || 0;
      languageBreakdown.writing = testPoints.writing[data.firstLangWriting as keyof typeof testPoints.writing] || 0;

      languagePoints = languageBreakdown.speaking + languageBreakdown.listening + languageBreakdown.reading + languageBreakdown.writing;
    }
  }

  // Second Language (max 4 points) - Updated to match original logic
  let secondLanguagePoints = 0;
  if (data.secondLangTest && data.secondLangSpeaking && data.secondLangListening && data.secondLangReading && data.secondLangWriting) {
    // Check if all skills are at least CLB 5
    const isCLB5 = speakingCLB5Array.includes(data.secondLangSpeaking) && 
                   listeningCLB5Array.includes(data.secondLangListening) && 
                   readingCLB5Array.includes(data.secondLangReading) && 
                   writingCLB5Array.includes(data.secondLangWriting);
    
    if (isCLB5) {
      secondLanguagePoints = 4;
    }
  }

  const totalLanguagePoints = languagePoints + secondLanguagePoints;

  // Education (max 25 points)
  const educationPoints = fswpEducationPoints[data.educationLevel as keyof typeof fswpEducationPoints] || 0;

  // Work Experience (max 15 points)
  const workExperiencePoints = fswpWorkExperiencePoints[data.workExperience as keyof typeof fswpWorkExperiencePoints] || 0;

  // Age (max 12 points)
  const agePoints = fswpAgePoints[data.age as keyof typeof fswpAgePoints] || 0;

  // Job Offer (max 0 points) - No longer gives points as of March 25, 2025
  const jobOfferPoints = fswpJobOfferPoints[data.jobOffer as keyof typeof fswpJobOfferPoints] || 0;

  // Canadian Education (max 5 points)
  const canadianEducationPoints = fswpCanadianEducationPoints[data.canadianEducation as keyof typeof fswpCanadianEducationPoints] || 0;

  // Canadian Work Experience (max 10 points)
  const canadianWorkExperiencePoints = fswpCanadianWorkExperiencePoints[data.canadianWorkExperience as keyof typeof fswpCanadianWorkExperiencePoints] || 0;

  // Spouse Work Experience (max 5 points) - only if spouse is accompanying
  let spouseWorkExperiencePoints = 0;
  if (data.maritalStatus === "married" || data.maritalStatus === "common_law") {
    if (data.spouseCitizen === "no" && data.spouseAccompanying === "yes") {
      spouseWorkExperiencePoints = fswpSpouseWorkExperiencePoints[data.spouseWorkExperience as keyof typeof fswpSpouseWorkExperiencePoints] || 0;
    }
  }

  // Spouse Canadian Education (max 5 points) - only if spouse is accompanying
  let spouseCanadianEducationPoints = 0;
  if (data.maritalStatus === "married" || data.maritalStatus === "common_law") {
    if (data.spouseCitizen === "no" && data.spouseAccompanying === "yes") {
      spouseCanadianEducationPoints = fswpSpouseCanadianEducationPoints[data.spouseCanadianEducation as keyof typeof fswpSpouseCanadianEducationPoints] || 0;
    }
  }

  // Spouse Language (max 5 points) - only if spouse is accompanying
  let spouseLanguagePoints = 0;
  if (data.maritalStatus === "married" || data.maritalStatus === "common_law") {
    if (data.spouseCitizen === "no" && data.spouseAccompanying === "yes") {
      if (data.spouseLanguageTest && data.spouseLanguageSpeaking && data.spouseLanguageListening && 
          data.spouseLanguageReading && data.spouseLanguageWriting) {
        // Check if all skills are at least CLB 4
        const isCLB4 = speakingCLB4Array.includes(data.spouseLanguageSpeaking) && 
                       listeningCLB4Array.includes(data.spouseLanguageListening) && 
                       readingCLB4Array.includes(data.spouseLanguageReading) && 
                       writingCLB4Array.includes(data.spouseLanguageWriting);
        
        if (isCLB4) {
          spouseLanguagePoints = 5;
        }
      }
    }
  }

  // Adaptability Factors (max 10 points) - Updated to match original logic
  let adaptabilityPoints = 0;
  if (data.canadianEducation === "yes") {
    adaptabilityPoints += fswpAdaptabilityPoints.canadian_education;
  }
  if (data.canadianWorkExperience === "1_year_or_more") {
    adaptabilityPoints += fswpAdaptabilityPoints.canadian_work_experience;
  }
  if (data.relativesInCanada === "yes") {
    adaptabilityPoints += fswpAdaptabilityPoints.relatives_in_canada;
  }

  // Calculate totals - Updated to match original structure
  const corePoints = totalLanguagePoints + educationPoints + workExperiencePoints + agePoints;
  const additionalPointsRaw = jobOfferPoints + canadianEducationPoints + canadianWorkExperiencePoints + 
                              spouseWorkExperiencePoints + spouseCanadianEducationPoints + spouseLanguagePoints;
  
  // Cap additional factors at 10 points maximum
  const additionalPoints = Math.min(additionalPointsRaw, 10);
  
  const totalPoints = corePoints + additionalPoints;

  console.log("📈 FSWP Score Breakdown:");
  console.log("  • Language Skills:", totalLanguagePoints, "points");
  console.log("  • Education:", educationPoints, "points");
  console.log("  • Work Experience:", workExperiencePoints, "points");
  console.log("  • Age:", agePoints, "points");
  console.log("  • Core Total:", corePoints, "points");
  console.log("  • Job Offer:", jobOfferPoints, "points");
  console.log("  • Canadian Education:", canadianEducationPoints, "points");
  console.log("  • Canadian Work Experience:", canadianWorkExperiencePoints, "points");
  console.log("  • Spouse Work Experience:", spouseWorkExperiencePoints, "points");
  console.log("  • Spouse Canadian Education:", spouseCanadianEducationPoints, "points");
  console.log("  • Spouse Language:", spouseLanguagePoints, "points");
  console.log("  • Adaptability Factors:", adaptabilityPoints, "points");
  console.log("  • Additional Factors (Raw):", additionalPointsRaw, "points");
  console.log("  • Additional Factors (Capped):", additionalPoints, "points");
  console.log("  • Total FSWP Score:", totalPoints, "points");

  return {
    total: totalPoints,
    breakdown: {
      language: totalLanguagePoints,
      languageBreakdown,
      secondLanguage: secondLanguagePoints,
      education: educationPoints,
      experience: workExperiencePoints,
      age: agePoints,
      jobOffer: jobOfferPoints,
      canadianEducation: canadianEducationPoints,
      canadianWorkExperience: canadianWorkExperiencePoints,
      spouseWorkExperience: spouseWorkExperiencePoints,
      spouseCanadianEducation: spouseCanadianEducationPoints,
      spouseLanguage: spouseLanguagePoints,
      adaptability: adaptabilityPoints,
      core: corePoints,
      additional: additionalPoints,
      additionalRaw: additionalPointsRaw
    }
  };
}
