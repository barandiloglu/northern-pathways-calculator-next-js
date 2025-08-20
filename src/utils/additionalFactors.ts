import { CRSFormData } from "./calculateCRSScore";
import { languageScoreToPoints, languageScoreToPointsSingle, secondLanguageScoreToPoints } from "../data/crsOptions";

export function calculateAdditionalFactors(data: CRSFormData) {
  let nomination = 0;
  let job = 0;
  let sibling = 0;
  let canadianEducation = 0;
  let certificateOfQualification = 0;
  let frenchLanguage = 0;

  // ✅ Provincial Nomination
  if (data.provincialNomination === "yes") {
    nomination = 600;
  }

  // ✅ Job Offer
  if (data.jobOffer === "yes") {
    if (data.nocJobOffer === "teer0_00") {
      job = 200;
    } else if (
      ["teer0_other", "teer1", "teer2", "teer3"].includes(data.nocJobOffer)
    ) {
      job = 50;
    }
  }

  // ✅ Sibling in Canada
  if (data.siblingInCanada === "yes") {
    sibling = 15;
  }

  // ✅ Canadian post-secondary education
  const validCanadianCredentials = [
    "one_two_year_diploma_certificate",
    "degree_diploma_certificate_three_years_or_longer_masters_professional_doctoral"
  ];

  if (
    data.canadianEducationStudy === "yes" &&
    validCanadianCredentials.includes(data.canadianCredentialLevel)
  ) {
    canadianEducation = 15;
    console.log("✅ Additional Factor: Canadian post-secondary education → +15");
    console.log("🔍 DEBUG - Study in Canada:", data.canadianEducationStudy);
    console.log("🔍 DEBUG - Credential Level:", data.canadianCredentialLevel);
  }

  // ✅ Certificate of Qualification (Section C points)
  if (data.certificateOfQualification === "yes") {
    // This is handled in skill transferability for language combo
    // But we also need to add the base certificate points
    certificateOfQualification = 25; // Base points for certificate
  }

  // ✅ French Language Proficiency (NCLC points)
  
  // CLB level arrays based on original application but with correct TEF Canada scores
  const speakingCLB7Array = [
    // CELPIP-G
    "7", "8", "9", "10-12",
    // IELTS
    "6.5", "7.0", "7.5-9.0",
    // PTE Core
    "68-75", "76-83", "84-88", "89+",
    // TEF Canada (CORRECTED)
    "310-348", "349-370", "371-392", "393-450",
    // TCF Canada
    "10-11", "12-13", "14-15", "16-20"
  ];

  const listeningCLB7Array = [
    // CELPIP-G
    "7", "8", "9", "10-12",
    // IELTS
    "6.0-7.0", "7.5", "8.0", "8.5-9.0",
    // PTE Core
    "60-70", "71-81", "82-88", "89+",
    // TEF Canada (CORRECTED)
    "249-279", "280-297", "298-315", "316-360",
    // TCF Canada
    "458-502", "503-522", "523-548", "549-699"
  ];

  const readingCLB7Array = [
    // CELPIP-G
    "7", "8", "9", "10-12",
    // IELTS
    "6.0", "6.5", "7.0-7.5", "8.0-9.0",
    // PTE Core
    "60-68", "69-77", "78-87", "88+",
    // TEF Canada (CORRECTED)
    "207-232", "233-247", "248-262", "263-300",
    // TCF Canada
    "453-498", "499-523", "524-548", "549-699"
  ];

  const writingCLB7Array = [
    // CELPIP-G
    "7", "8", "9", "10-12",
    // IELTS
    "6.0", "6.5", "7.0", "7.5-9.0",
    // PTE Core
    "69-78", "79-87", "88-89", "90+",
    // TEF Canada (CORRECTED)
    "310-348", "349-370", "371-392", "393-450",
    // TCF Canada
    "10-11", "12-13", "14-15", "16-20"
  ];

  const speakingCLB5Array = [
    // CELPIP-G
    "5", "6",
    // IELTS
    "5.0", "5.5",
    // PTE Core
    "51-58", "59-67",
    // TEF Canada (CORRECTED)
    "226-270", "271-309",
    // TCF Canada
    "7-9", "6"
  ];

  const listeningCLB5Array = [
    // CELPIP-G
    "5", "6",
    // IELTS
    "5.0", "5.5",
    // PTE Core
    "39-49", "50-59",
    // TEF Canada (CORRECTED)
    "181-216", "217-248",
    // TCF Canada
    "369-397", "398-457"
  ];

  const readingCLB5Array = [
    // CELPIP-G
    "5", "6",
    // IELTS
    "4.0-4.5", "5.0-5.5",
    // PTE Core
    "42-50", "51-59",
    // TEF Canada (CORRECTED)
    "151-180", "181-206",
    // TCF Canada
    "375-405", "406-452"
  ];

  const writingCLB5Array = [
    // CELPIP-G
    "5", "6",
    // IELTS
    "5.0", "5.5",
    // PTE Core
    "51-59", "60-68",
    // TEF Canada (CORRECTED)
    "226-270", "271-309",
    // TCF Canada
    "7-9", "6"
  ];

  // Helper function to check if score meets CLB level
  const meetsCLB7 = (skill: string, score: string) => {
    if (!score) return false;
    
    switch (skill) {
      case "speaking":
        return speakingCLB7Array.includes(score);
      case "listening":
        return listeningCLB7Array.includes(score);
      case "reading":
        return readingCLB7Array.includes(score);
      case "writing":
        return writingCLB7Array.includes(score);
      default:
        return false;
    }
  };

  const meetsCLB5 = (skill: string, score: string) => {
    if (!score) return false;
    
    switch (skill) {
      case "speaking":
        return speakingCLB5Array.includes(score);
      case "listening":
        return listeningCLB5Array.includes(score);
      case "reading":
        return readingCLB5Array.includes(score);
      case "writing":
        return writingCLB5Array.includes(score);
      default:
        return false;
    }
  };

  // Check if French is first language (TEF Canada or TCF Canada)
  const isFrenchFirstLang = data.firstLangTest === "tef_canada" || data.firstLangTest === "tcf_canada";
  
  // Check if English is first language (CELPIP, IELTS, PTE)
  const isEnglishFirstLang = data.firstLangTest === "celpip_g" || data.firstLangTest === "ielts_g" || data.firstLangTest === "pte_core";
  
  // Check if French is second language
  const isFrenchSecondLang = data.secondLangTest === "tef_canada" || data.secondLangTest === "tcf_canada";
  
  // Check if English is second language
  const isEnglishSecondLang = data.secondLangTest === "celpip_g" || data.secondLangTest === "ielts_g" || data.secondLangTest === "pte_core";

  // French Language Points Calculation (based on original application logic)
  if (isFrenchFirstLang) {
    // French is first language
    if (
      meetsCLB7("speaking", data.firstLangSpeaking) &&
      meetsCLB7("listening", data.firstLangListening) &&
      meetsCLB7("reading", data.firstLangReading) &&
      meetsCLB7("writing", data.firstLangWriting)
    ) {
      if (isEnglishSecondLang) {
        // English as second language
        if (
          (meetsCLB5("speaking", data.secondLangSpeaking) || meetsCLB7("speaking", data.secondLangSpeaking)) &&
          (meetsCLB5("listening", data.secondLangListening) || meetsCLB7("listening", data.secondLangListening)) &&
          (meetsCLB5("reading", data.secondLangReading) || meetsCLB7("reading", data.secondLangReading)) &&
          (meetsCLB5("writing", data.secondLangWriting) || meetsCLB7("writing", data.secondLangWriting))
        ) {
          frenchLanguage = 50; // Higher points
        } else {
          frenchLanguage = 25; // Lower points
        }
      } else {
        frenchLanguage = 0; // No second language
      }
    }
  } else if (isEnglishFirstLang) {
    // English is first language
    if (isFrenchSecondLang) {
      // French as second language
      if (
        meetsCLB7("speaking", data.secondLangSpeaking) &&
        meetsCLB7("listening", data.secondLangListening) &&
        meetsCLB7("reading", data.secondLangReading) &&
        meetsCLB7("writing", data.secondLangWriting)
      ) {
        if (
          (meetsCLB5("speaking", data.firstLangSpeaking) || meetsCLB7("speaking", data.firstLangSpeaking)) &&
          (meetsCLB5("listening", data.firstLangListening) || meetsCLB7("listening", data.firstLangListening)) &&
          (meetsCLB5("reading", data.firstLangReading) || meetsCLB7("reading", data.firstLangReading)) &&
          (meetsCLB5("writing", data.firstLangWriting) || meetsCLB7("writing", data.firstLangWriting))
        ) {
          frenchLanguage = 50; // Higher points
        } else {
          frenchLanguage = 25; // Lower points
        }
      }
    }
  }

  console.log("🔍 French Language Debug:");
  console.log("  • First Language:", data.firstLangTest);
  console.log("  • Second Language:", data.secondLangTest);
  console.log("  • First Lang Scores:", { speaking: data.firstLangSpeaking, listening: data.firstLangListening, reading: data.firstLangReading, writing: data.firstLangWriting });
  console.log("  • Second Lang Scores:", { speaking: data.secondLangSpeaking, listening: data.secondLangListening, reading: data.secondLangReading, writing: data.secondLangWriting });
  console.log("  • First Lang CLB 7+:", { 
    speaking: meetsCLB7("speaking", data.firstLangSpeaking), 
    listening: meetsCLB7("listening", data.firstLangListening), 
    reading: meetsCLB7("reading", data.firstLangReading), 
    writing: meetsCLB7("writing", data.firstLangWriting) 
  });
  console.log("  • Second Lang CLB 7+:", { 
    speaking: meetsCLB7("speaking", data.secondLangSpeaking), 
    listening: meetsCLB7("listening", data.secondLangListening), 
    reading: meetsCLB7("reading", data.secondLangReading), 
    writing: meetsCLB7("writing", data.secondLangWriting) 
  });
  console.log("  • First Lang CLB 5+:", { 
    speaking: meetsCLB5("speaking", data.firstLangSpeaking) || meetsCLB7("speaking", data.firstLangSpeaking), 
    listening: meetsCLB5("listening", data.firstLangListening) || meetsCLB7("listening", data.firstLangListening), 
    reading: meetsCLB5("reading", data.firstLangReading) || meetsCLB7("reading", data.firstLangReading), 
    writing: meetsCLB5("writing", data.firstLangWriting) || meetsCLB7("writing", data.firstLangWriting) 
  });
  console.log("  • Second Lang CLB 5+:", { 
    speaking: meetsCLB5("speaking", data.secondLangSpeaking) || meetsCLB7("speaking", data.secondLangSpeaking), 
    listening: meetsCLB5("listening", data.secondLangListening) || meetsCLB7("listening", data.secondLangListening), 
    reading: meetsCLB5("reading", data.secondLangReading) || meetsCLB7("reading", data.secondLangReading), 
    writing: meetsCLB5("writing", data.secondLangWriting) || meetsCLB7("writing", data.secondLangWriting) 
  });
  console.log("  • French Language Points:", frenchLanguage);

  const total = nomination + job + sibling + canadianEducation + certificateOfQualification + frenchLanguage;

  return {
    total,
    breakdown: {
      nomination,
      job,
      sibling,
      canadianEducation,
      certificateOfQualification,
      frenchLanguage
    }
  };
}
