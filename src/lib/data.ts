// Types for the immigration assessment data
export interface ExpressEntryDetail {
  _id: string;
  date: string;
  invitationNumber: number;
  CRS: number;
  subcategory?: string;
}

export interface ExpressEntryCategory {
  value: number;
  category: string;
  details: ExpressEntryDetail[];
}

export interface LanguageTestPoints {
  speaking: { score: string; points: number }[];
  listening: { score: string; points: number }[];
  reading: { score: string; points: number }[];
  writing: { score: string; points: number }[];
}

export interface AssessmentForm {
  // Personal Information
  maritalStatus: string;
  spouseStatus: string;
  spouseMoving: string;
  age: number;
  
  // Education
  educationLevel: string;
  caEducation: string;
  caEducationLevel: string;
  
  // Language
  firstLanguageTest: string;
  firstLanguageScores: {
    speaking: string;
    listening: string;
    reading: string;
    writing: string;
  };
  secondLanguageTest: string;
  secondLanguageScores: {
    speaking: string;
    listening: string;
    reading: string;
    writing: string;
  };
  
  // Work Experience
  caWorkExperience: string;
  foreignWorkExperience: string;
  
  // Additional Points
  jobOffer: string;
  jobOfferNOC: string;
  nomination: string;
  siblings: string;
  
  // Spouse Information
  spouseEducation: string;
  spouseWorkExperience: string;
  spouseLanguageTest: string;
  spouseLanguageScores: {
    speaking: string;
    listening: string;
    reading: string;
    writing: string;
  };
}

// Hardcoded Express Entry data
export const expressEntryData: ExpressEntryCategory[] = [
  {
    value: 1,
    category: "Federal Skilled Worker Program",
    details: [
      {
        _id: "1",
        date: "December 18, 2024",
        invitationNumber: 1000,
        CRS: 542
      },
      {
        _id: "2",
        date: "December 4, 2024",
        invitationNumber: 1000,
        CRS: 561
      },
      {
        _id: "3",
        date: "November 20, 2024",
        invitationNumber: 1000,
        CRS: 472
      }
    ]
  },
  {
    value: 2,
    category: "Federal Skilled Trades Program",
    details: [
      {
        _id: "4",
        date: "December 18, 2024",
        invitationNumber: 1000,
        CRS: 425
      },
      {
        _id: "5",
        date: "December 4, 2024",
        invitationNumber: 1000,
        CRS: 439
      }
    ]
  },
  {
    value: 3,
    category: "Canadian Experience Class",
    details: [
      {
        _id: "6",
        date: "December 18, 2024",
        invitationNumber: 1000,
        CRS: 481
      },
      {
        _id: "7",
        date: "December 4, 2024",
        invitationNumber: 1000,
        CRS: 496
      }
    ]
  },
  {
    value: 4,
    category: "Program-specific Rounds (Such as PNP)",
    details: [
      {
        _id: "8",
        date: "December 18, 2024",
        invitationNumber: 1000,
        CRS: 698,
        subcategory: "Provincial Nominee Program"
      },
      {
        _id: "9",
        date: "December 4, 2024",
        invitationNumber: 1000,
        CRS: 711,
        subcategory: "Provincial Nominee Program"
      }
    ]
  }
];

// Language test options
export const languageTestOptions = [
  { value: "ielts", label: "IELTS" },
  { value: "celpip", label: "CELPIP" },
  { value: "tef", label: "TEF Canada" },
  { value: "tcf", label: "TCF Canada" }
];

// Marital status options
export const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "commonLaw", label: "Common-law partner" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" }
];

// Education level options
export const educationLevelOptions = [
  { value: "lessThanSecondary", label: "Less than secondary school (high school)" },
  { value: "secondaryDiploma", label: "Secondary diploma (high school graduation)" },
  { value: "oneYearPostSecondary", label: "One-year degree, diploma or certificate from a university, college, trade or technical school, or other institute" },
  { value: "twoYearPostSecondary", label: "Two-year program at a university, college, trade or technical school, or other institute" },
  { value: "bachelorsDegree", label: "Bachelor's degree OR a three or more year program at a university, college, trade or technical school, or other institute" },
  { value: "twoOrMoreCertificates", label: "Two or more certificates, diplomas, or degrees. One must be for a program of three or more years" },
  { value: "mastersDegree", label: "Master's degree, OR professional degree needed to practice in a licensed profession" },
  { value: "doctoralLevel", label: "Doctoral level university degree (Ph.D.)" }
];

// Work experience options
export const workExperienceOptions = [
  { value: "noExperience", label: "No experience" },
  { value: "lessThanOneYear", label: "Less than 1 year" },
  { value: "oneYear", label: "1 year" },
  { value: "twoYears", label: "2 years" },
  { value: "threeYears", label: "3 years" },
  { value: "fourYears", label: "4 years" },
  { value: "fiveYears", label: "5 years or more" }
];

// NOC level options
export const nocLevelOptions = [
  { value: "noc0", label: "NOC TEER 0" },
  { value: "noc1", label: "NOC TEER 1" },
  { value: "noc2", label: "NOC TEER 2" },
  { value: "noc3", label: "NOC TEER 3" }
];

// Language test points data
export const languageTestPoints: Record<string, LanguageTestPoints> = {
  ielts: {
    speaking: [
      { score: "6.0", points: 9 },
      { score: "6.5", points: 20 },
      { score: "7.0", points: 22 },
      { score: "7.5", points: 24 },
      { score: "8.0", points: 26 },
      { score: "8.5", points: 28 },
      { score: "9.0", points: 30 }
    ],
    listening: [
      { score: "6.0", points: 9 },
      { score: "6.5", points: 20 },
      { score: "7.0", points: 22 },
      { score: "7.5", points: 24 },
      { score: "8.0", points: 26 },
      { score: "8.5", points: 28 },
      { score: "9.0", points: 30 }
    ],
    reading: [
      { score: "6.0", points: 9 },
      { score: "6.5", points: 20 },
      { score: "7.0", points: 22 },
      { score: "7.5", points: 24 },
      { score: "8.0", points: 26 },
      { score: "8.5", points: 28 },
      { score: "9.0", points: 30 }
    ],
    writing: [
      { score: "6.0", points: 9 },
      { score: "6.5", points: 20 },
      { score: "7.0", points: 22 },
      { score: "7.5", points: 24 },
      { score: "8.0", points: 26 },
      { score: "8.5", points: 28 },
      { score: "9.0", points: 30 }
    ]
  },
  celpip: {
    speaking: [
      { score: "7", points: 9 },
      { score: "8", points: 20 },
      { score: "9", points: 22 },
      { score: "10", points: 24 },
      { score: "11", points: 26 },
      { score: "12", points: 28 }
    ],
    listening: [
      { score: "7", points: 9 },
      { score: "8", points: 20 },
      { score: "9", points: 22 },
      { score: "10", points: 24 },
      { score: "11", points: 26 },
      { score: "12", points: 28 }
    ],
    reading: [
      { score: "7", points: 9 },
      { score: "8", points: 20 },
      { score: "9", points: 22 },
      { score: "10", points: 24 },
      { score: "11", points: 26 },
      { score: "12", points: 28 }
    ],
    writing: [
      { score: "7", points: 9 },
      { score: "8", points: 20 },
      { score: "9", points: 22 },
      { score: "10", points: 24 },
      { score: "11", points: 26 },
      { score: "12", points: 28 }
    ]
  }
};

// Age points mapping
export const agePoints: Record<number, number> = {
  17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110,
  26: 110, 27: 110, 28: 110, 29: 110, 30: 105, 31: 99, 32: 94, 33: 88, 34: 83,
  35: 77, 36: 72, 37: 66, 38: 61, 39: 55, 40: 50, 41: 39, 42: 28, 43: 17, 44: 6, 45: 0
};

// Education points mapping
export const educationPoints: Record<string, number> = {
  lessThanSecondary: 0,
  secondaryDiploma: 30,
  oneYearPostSecondary: 90,
  twoYearPostSecondary: 98,
  bachelorsDegree: 120,
  twoOrMoreCertificates: 128,
  mastersDegree: 135,
  doctoralLevel: 150
};

// Canadian work experience points
export const caWorkExperiencePoints: Record<string, number> = {
  noExperience: 0,
  lessThanOneYear: 0,
  oneYear: 40,
  twoYears: 53,
  threeYears: 64,
  fourYears: 72,
  fiveYears: 80
};

// Foreign work experience points
export const foreignWorkExperiencePoints: Record<string, number> = {
  none: 0,
  oneYear: 25,
  twoYears: 25,
  threeYearsOrMore: 25
};

// Spouse education points
export const spouseEducationPoints: Record<string, number> = {
  lessThanSecondary: 0,
  secondaryDiploma: 2,
  oneYearPostSecondary: 6,
  twoYearPostSecondary: 6,
  bachelorsDegree: 8,
  twoOrMoreCertificates: 9,
  mastersDegree: 10,
  doctoralLevel: 10
};

// Spouse work experience points
export const spouseWorkExperiencePoints: Record<string, number> = {
  noExperience: 0,
  lessThanOneYear: 0,
  oneYear: 5,
  twoYears: 7,
  threeYears: 8,
  fourYears: 9,
  fiveYears: 10
};
