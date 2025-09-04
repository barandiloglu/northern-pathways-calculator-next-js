import { calculateCoreHumanCapital } from "./coreHumanCapital";
import { calculateSkillTransferability } from "./skillTransferability";
import { calculateAdditionalFactors } from "./additionalFactors";
import { calculateSpouseFactors } from "./spouseFactors";

export interface CRSFormData {
  maritalStatus: string;
  partnerStatus: string;
  movingStatus: string;
  age: string;
  educationLevel: string;
  canadianEducationStudy: string;
  canadianCredentialLevel: string;
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
  canadianWorkExperience: string;
  foreignWorkExperience: string;
  certificateOfQualification: string;
  provincialNomination: string;
  jobOffer: string;
  nocJobOffer: string;
  siblingInCanada: string;
  spouseEducationLevel: string;
  spouseCanadianWorkExperience: string;
  spouseLangTest: string;
  spouseLangSpeaking: string;
  spouseLangListening: string;
  spouseLangReading: string;
  spouseLangWriting: string;
}

export function calculateCRSScore(data: CRSFormData) {
  const { total: core, breakdown: coreBreakdown } = calculateCoreHumanCapital(data);
  const { total: transfer, breakdown: transferBreakdown } = calculateSkillTransferability(data);
  const { total: additional, breakdown: additionalBreakdown } = calculateAdditionalFactors(data);
  const { total: spouse, breakdown: spouseBreakdown } = calculateSpouseFactors(data);

  const total = core + transfer + additional + spouse;

  // Detailed Console Output
  console.log("🔍 CRS Score Breakdown:");
  console.log("➤ Core Human Capital:", core);
  console.log("    • Age Points:", coreBreakdown.age || 0);
  console.log("    • Education Points:", coreBreakdown.education || 0);
  console.log("    • First Language Points:", coreBreakdown.firstLang || 0);
  console.log("    • Second Language Points:", coreBreakdown.secondLang || 0);
  console.log("    • Canadian Work Exp Points:", coreBreakdown.canadianExp || 0);

  console.log("➤ Spouse Factors:", spouse);
  console.log("    • Spouse Education Points:", spouseBreakdown.education || 0);
  console.log("    • Spouse Work Exp Points:", spouseBreakdown.work || 0);
  console.log("    • Spouse Language Points:", spouseBreakdown.language || 0);

  console.log("➤ Skill Transferability:", transfer);
  console.log("    • Education + Language Combo:", transferBreakdown.eduLang || 0);
  console.log("    • Education + Canadian Work Combo:", transferBreakdown.eduCanExp || 0);
  console.log("    • Part 1 Total (capped at 50):", Math.min(50, (transferBreakdown.eduLang || 0) + (transferBreakdown.eduCanExp || 0)));
  console.log("    • Foreign Exp + Language Combo:", transferBreakdown.foreignLang || 0);
  console.log("    • Foreign + Canadian Work Combo:", transferBreakdown.foreignCanExp || 0);
  console.log("    • Part 2 Total (capped at 50):", Math.min(50, (transferBreakdown.foreignLang || 0) + (transferBreakdown.foreignCanExp || 0)));
  console.log("    • Certificate of Qualification Combo:", transferBreakdown.certCombo || 0);

  console.log("➤ Additional Factors:", additional);
  console.log("    • Canadian Education:", additionalBreakdown.canadianEducation || 0);
  console.log("    • Provincial Nomination:", additionalBreakdown.nomination || 0);
  console.log("    • Job Offer:", additionalBreakdown.job || 0);
  console.log("    • Sibling in Canada:", additionalBreakdown.sibling || 0);
  console.log("    • French Language Proficiency:", additionalBreakdown.frenchLanguage || 0);

  console.log("🎯 TOTAL CRS Score:", total);

  return {
    total,
    breakdown: {
      core,
      transfer,
      additional,
      spouse,
      coreBreakdown,
      transferBreakdown,
      additionalBreakdown,
      spouseBreakdown,
    },
  };
}
