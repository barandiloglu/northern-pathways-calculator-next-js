export const yesNoOptions = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

export const maritalStatusOptions = [
  { value: "never_married", label: "Never Married / Single" },
  { value: "married", label: "Married" },
  { value: "common_law", label: "Common-Law" },
  { value: "divorced_separated", label: "Divorced / Separated" },
  { value: "widowed", label: "Widowed" },
  { value: "annulled_marriage", label: "Annulled Marriage" },
];

export const ageOptions = [
  { value: "17_less", label: "17 years or less" },
  { value: "18", label: "18 years" },
  { value: "19", label: "19 years" },
  { value: "20_29", label: "20 to 29 years" },
  { value: "30", label: "30 years" },
  { value: "31", label: "31 years" },
  { value: "32", label: "32 years" },
  { value: "33", label: "33 years" },
  { value: "34", label: "34 years" },
  { value: "35", label: "35 years" },
  { value: "36", label: "36 years" },
  { value: "37", label: "37 years" },
  { value: "38", label: "38 years" },
  { value: "39", label: "39 years" },
  { value: "40", label: "40 years" },
  { value: "41", label: "41 years" },
  { value: "42", label: "42 years" },
  { value: "43", label: "43 years" },
  { value: "44", label: "44 years" },
  { value: "45_more", label: "45 years or more" },
];

export const educationLevelOptions = [
  { value: "none", label: "None, or less than secondary (high school)" },
  { value: "secondary", label: "Secondary diploma (high school graduation)" },
  {
    value: "one_year_post_secondary",
    label: "One-year program at a university, college, trade or technical school, or other institute",
  },
  {
    value: "two_year_post_secondary",
    label: "Two-year program at a university, college, trade or technical school, or other institute",
  },
  {
    value: "bachelor",
    label: "Bachelor's degree OR a three or more year program at a university, college, trade or technical school, or other institute",
  },
  {
    value: "two_or_more_post_secondary",
    label: "Two or more certificates, diplomas, or degrees. One must be for a program of three or more years",
  },
  {
    value: "masters",
    label: "Master's degree, OR professional degree needed to practice in a licensed profession (e.g., MD, DDS, DVM, LLB, JD, OD)",
  },
  { value: "doctoral", label: "Doctoral level university degree (PhD)" },
];

export const canadianCredentialLevelOptions = [
  {
    value: "one_two_year_diploma_certificate",
    label: "One or two-year diploma or certificate",
  },
  {
    value: "degree_diploma_certificate_three_years_or_longer_masters_professional_doctoral",
    label: "Degree, diploma or certificate of three years or longer, or a Master's, professional or doctoral degree",
  },
];

export const allLanguageTestTypes = [
  {
    value: "celpip_g",
    label: "CELPIP-General (English)",
    language: "english",
    keyEquivalentInPointsData: "option1",
  },
  {
    value: "ielts_g",
    label: "IELTS General Training (English)",
    language: "english",
    keyEquivalentInPointsData: "option2",
  },
  {
    value: "pte_core",
    label: "PTE Core (English)",
    language: "english",
    keyEquivalentInPointsData: "option3",
  },
  {
    value: "tef_canada",
    label: "TEF Canada (French)",
    language: "french",
    keyEquivalentInPointsData: "option4",
  },
  {
    value: "tcf_canada",
    label: "TCF Canada (French)",
    language: "french",
    keyEquivalentInPointsData: "option5",
  },
];

export const firstLanguageTestOptions = [
  { value: "", label: "Select a language test" },
  ...allLanguageTestTypes,
];

export const getSecondLangTestOptions = (firstTestValue: string) => {
  const firstLangDetails = allLanguageTestTypes.find(
    (opt) => opt.value === firstTestValue
  );
  if (!firstLangDetails)
    return [
      { value: "", label: "Select a language test" },
      { value: "none_or_not_applicable", label: "None / Not Applicable" },
    ];
  const firstLangType = firstLangDetails.language;
  let availableOptions: typeof allLanguageTestTypes = [];
  if (firstLangType === "english")
    availableOptions = allLanguageTestTypes.filter(
      (opt) => opt.language === "french"
    );
  else if (firstLangType === "french")
    availableOptions = allLanguageTestTypes.filter(
      (opt) => opt.language === "english"
    );
  return [
    { value: "", label: "Select a language test" },
    ...availableOptions,
    { value: "none_or_not_applicable", label: "None / Not Applicable" },
  ];
};

export const getSpouseLangTestOptions = () => {
  return [
    ...allLanguageTestTypes,
    { value: "none_or_not_applicable", label: "None / Not Applicable" },
  ];
};

export const celpipScores = {
  speaking: [
    { value: "10-12", label: "10-12" },
    { value: "9", label: "9" },
    { value: "8", label: "8" },
    { value: "7", label: "7" },
    { value: "6", label: "6" },
    { value: "5", label: "5" },
    { value: "4", label: "4" },
    { value: "M 0-3", label: "M (0-3)" },
  ],
  listening: [
    { value: "10-12", label: "10-12" },
    { value: "9", label: "9" },
    { value: "8", label: "8" },
    { value: "7", label: "7" },
    { value: "6", label: "6" },
    { value: "5", label: "5" },
    { value: "4", label: "4" },
    { value: "M 0-3", label: "M (0-3)" },
  ],
  reading: [
    { value: "10-12", label: "10-12" },
    { value: "9", label: "9" },
    { value: "8", label: "8" },
    { value: "7", label: "7" },
    { value: "6", label: "6" },
    { value: "5", label: "5" },
    { value: "4", label: "4" },
    { value: "M 0-3", label: "M (0-3)" },
  ],
  writing: [
    { value: "10-12", label: "10-12" },
    { value: "9", label: "9" },
    { value: "8", label: "8" },
    { value: "7", label: "7" },
    { value: "6", label: "6" },
    { value: "5", label: "5" },
    { value: "4", label: "4" },
    { value: "M 0-3", label: "M (0-3)" },
  ],
};

export const ieltsScores = {
  speaking: [
    { value: "7.5-9.0", label: "7.5-9.0" },
    { value: "7.0", label: "7.0" },
    { value: "6.5", label: "6.5" },
    { value: "6.0", label: "6.0" },
    { value: "5.5", label: "5.5" },
    { value: "5.0", label: "5.0" },
    { value: "4.0-4.5", label: "4.0-4.5" },
    { value: "0-3.5", label: "0-3.5" },
  ],
  listening: [
    { value: "8.5-9.0", label: "8.5-9.0" },
    { value: "8.0", label: "8.0" },
    { value: "7.5", label: "7.5" },
    { value: "6.0-7.0", label: "6.0-7.0" },
    { value: "5.5", label: "5.5" },
    { value: "5.0", label: "5.0" },
    { value: "4.5", label: "4.5" },
    { value: "0-4.0", label: "0-4.0" },
  ],
  reading: [
    { value: "8.0-9.0", label: "8.0-9.0" },
    { value: "7.0-7.5", label: "7.0-7.5" },
    { value: "6.5", label: "6.5" },
    { value: "6.0", label: "6.0" },
    { value: "5.0-5.5", label: "5.0-5.5" },
    { value: "4.0-4.5", label: "4.0-4.5" },
    { value: "3.5", label: "3.5" },
    { value: "0-3.0", label: "0-3.0" },
  ],
  writing: [
    { value: "7.5-9.0", label: "7.5-9.0" },
    { value: "7.0", label: "7.0" },
    { value: "6.5", label: "6.5" },
    { value: "6.0", label: "6.0" },
    { value: "5.5", label: "5.5" },
    { value: "5.0", label: "5.0" },
    { value: "4.0-4.5", label: "4.0-4.5" },
    { value: "0-3.5", label: "0-3.5" },
  ],
};

export const pteScoresData = celpipScores;

export const tefCanadaScores = {
  speaking: [
    { value: "393-450", label: "393-450" },
    { value: "371-392", label: "371-392" },
    { value: "349-370", label: "349-370" },
    { value: "310-348", label: "310-348" },
    { value: "271-309", label: "271-309" },
    { value: "226-270", label: "226-270" },
    { value: "181-225", label: "181-225" },
    { value: "0-180", label: "0-180" },
  ],
  listening: [
    { value: "316-360", label: "316-360" },
    { value: "298-315", label: "298-315" },
    { value: "280-297", label: "280-297" },
    { value: "249-279", label: "249-279" },
    { value: "217-248", label: "217-248" },
    { value: "181-216", label: "181-216" },
    { value: "145-180", label: "145-180" },
    { value: "0-144", label: "0-144" },
  ],
  reading: [
    { value: "263-300", label: "263-300" },
    { value: "248-262", label: "248-262" },
    { value: "233-247", label: "233-247" },
    { value: "207-232", label: "207-232" },
    { value: "181-206", label: "181-206" },
    { value: "151-180", label: "151-180" },
    { value: "121-150", label: "121-150" },
    { value: "0-120", label: "0-120" },
  ],
  writing: [
    { value: "393-450", label: "393-450" },
    { value: "371-392", label: "371-392" },
    { value: "349-370", label: "349-370" },
    { value: "310-348", label: "310-348" },
    { value: "271-309", label: "271-309" },
    { value: "226-270", label: "226-270" },
    { value: "181-225", label: "181-225" },
    { value: "0-180", label: "0-180" },
  ],
};

export const tcfCanadaScores = {
  speaking: [
    { value: "16-20", label: "16-20" },
    { value: "14-15", label: "14-15" },
    { value: "12-13", label: "12-13" },
    { value: "10-11", label: "10-11" },
    { value: "7-9", label: "7-9" },
    { value: "6", label: "6" },
    { value: "4-5", label: "4-5" },
    { value: "0-3", label: "0-3" },
  ],
  listening: [
    { value: "549-699", label: "549-699" },
    { value: "523-548", label: "523-548" },
    { value: "503-522", label: "503-522" },
    { value: "458-502", label: "458-502" },
    { value: "398-457", label: "398-457" },
    { value: "369-397", label: "369-397" },
    { value: "331-368", label: "331-368" },
    { value: "0-330", label: "0-330" },
  ],
  reading: [
    { value: "549-699", label: "549-699" },
    { value: "524-548", label: "524-548" },
    { value: "499-523", label: "499-523" },
    { value: "453-498", label: "453-498" },
    { value: "406-452", label: "406-452" },
    { value: "375-405", label: "375-405" },
    { value: "342-374", label: "342-374" },
    { value: "0-341", label: "0-341" },
  ],
  writing: [
    { value: "16-20", label: "16-20" },
    { value: "14-15", label: "14-15" },
    { value: "12-13", label: "12-13" },
    { value: "10-11", label: "10-11" },
    { value: "7-9", label: "7-9" },
    { value: "6", label: "6" },
    { value: "4-5", label: "4-5" },
    { value: "0-3", label: "0-3" },
  ],
};

// Language score to CRS points mapping for SINGLE applicants (higher points)
export const languageScoreToPointsSingle = {
  // CELPIP-G scoring for single applicants (option1 in original)
  celpip_g: {
    speaking: {
      "10-12": 34, "9": 31, "8": 23, "7": 17, "6": 9, "5": 6, "4": 6, "M 0-3": 0
    },
    listening: {
      "10-12": 34, "9": 31, "8": 23, "7": 17, "6": 9, "5": 6, "4": 6, "M 0-3": 0
    },
    reading: {
      "10-12": 34, "9": 31, "8": 23, "7": 17, "6": 9, "5": 6, "4": 6, "M 0-3": 0
    },
    writing: {
      "10-12": 34, "9": 31, "8": 23, "7": 17, "6": 9, "5": 6, "4": 6, "M 0-3": 0
    }
  },
  // IELTS General Training scoring (option2 in original)
  ielts_g: {
    speaking: {
      "7.5-9.0": 32, "7.0": 29, "6.5": 22, "6.0": 16, "5.5": 8, "5.0": 6, "4.0-4.5": 6, "0-3.5": 0
    },
    listening: {
      "8.5-9.0": 32, "8.0": 29, "7.5": 22, "6.0-7.0": 16, "5.5": 8, "5.0": 6, "4.5": 6, "0-4.0": 0
    },
    reading: {
      "8.0-9.0": 32, "7.0-7.5": 29, "6.5": 22, "6.0": 16, "5.0-5.5": 8, "4.0-4.5": 6, "3.5": 6, "0-3.0": 0
    },
    writing: {
      "7.5-9.0": 32, "7.0": 29, "6.5": 22, "6.0": 16, "5.5": 8, "5.0": 6, "4.0-4.5": 6, "0-3.5": 0
    }
  },
  // PTE Core scoring (option3 in original)
  pte_core: {
    speaking: {
      "89+": 32, "84-88": 29, "76-83": 22, "68-75": 16, "59-67": 8, "51-58": 6, "42-50": 6, "0-41": 0
    },
    listening: {
      "89+": 32, "82-88": 29, "71-81": 22, "60-70": 16, "50-59": 8, "39-49": 6, "28-38": 6, "0-27": 0
    },
    reading: {
      "88+": 32, "78-87": 29, "69-77": 22, "60-68": 16, "51-59": 8, "42-50": 6, "33-41": 6, "0-32": 0
    },
    writing: {
      "90+": 32, "88-89": 29, "79-87": 22, "69-78": 16, "60-68": 8, "51-59": 6, "41-50": 6, "0-40": 0
    }
  },
  // TEF Canada scoring (option4 in original)
  tef_canada: {
    speaking: {
      "393-450": 34, "371-392": 31, "349-370": 23, "310-348": 17, "271-309": 9, "226-270": 6, "181-225": 6, "0-180": 0
    },
    listening: {
      "316-360": 34, "298-315": 31, "280-297": 23, "249-279": 17, "217-248": 9, "181-216": 6, "145-180": 6, "0-144": 0
    },
    reading: {
      "263-300": 34, "248-262": 31, "233-247": 23, "207-232": 17, "181-206": 9, "151-180": 6, "121-150": 6, "0-120": 0
    },
    writing: {
      "393-450": 34, "371-392": 31, "349-370": 23, "310-348": 17, "271-309": 9, "226-270": 6, "181-225": 6, "0-180": 0
    }
  },
  // TCF Canada scoring (option5 in original)
  tcf_canada: {
    speaking: {
      "16-20": 32, "14-15": 29, "12-13": 22, "10-11": 16, "7-9": 8, "6": 6, "4-5": 6, "0-3": 0
    },
    listening: {
      "549-699": 32, "523-548": 29, "503-522": 22, "458-502": 16, "398-457": 8, "369-397": 6, "331-368": 6, "0-330": 0
    },
    reading: {
      "549-699": 32, "524-548": 29, "499-523": 22, "453-498": 16, "406-452": 8, "375-405": 6, "342-374": 6, "0-341": 0
    },
    writing: {
      "16-20": 32, "14-15": 29, "12-13": 22, "10-11": 16, "7-9": 8, "6": 6, "4-5": 6, "0-3": 0
    }
  }
};

// Language score to CRS points mapping for MARRIED/COMMON-LAW applicants (lower points)
export const languageScoreToPoints = {
  // CELPIP-G scoring for married/common-law applicants (option1 in original)
  celpip_g: {
    speaking: {
      "10-12": 32, "9": 29, "8": 22, "7": 16, "6": 8, "5": 6, "4": 6, "M 0-3": 0
    },
    listening: {
      "10-12": 32, "9": 29, "8": 22, "7": 16, "6": 8, "5": 6, "4": 6, "M 0-3": 0
    },
    reading: {
      "10-12": 32, "9": 29, "8": 22, "7": 16, "6": 8, "5": 6, "4": 6, "M 0-3": 0
    },
    writing: {
      "10-12": 32, "9": 29, "8": 22, "7": 16, "6": 8, "5": 6, "4": 6, "M 0-3": 0
    }
  },
  // IELTS General Training scoring for married/common-law applicants (option2 in original)
  ielts_g: {
    speaking: {
      "7.5-9.0": 32, "7.0": 29, "6.5": 22, "6.0": 16, "5.5": 8, "5.0": 6, "4.0-4.5": 6, "0-3.5": 0
    },
    listening: {
      "8.5-9.0": 32, "8.0": 29, "7.5": 22, "6.0-7.0": 16, "5.5": 8, "5.0": 6, "4.5": 6, "0-4.0": 0
    },
    reading: {
      "8.0-9.0": 32, "7.0-7.5": 29, "6.5": 22, "6.0": 16, "5.0-5.5": 8, "4.0-4.5": 6, "3.5": 6, "0-3.0": 0
    },
    writing: {
      "7.5-9.0": 32, "7.0": 29, "6.5": 22, "6.0": 16, "5.5": 8, "5.0": 6, "4.0-4.5": 6, "0-3.5": 0
    }
  },
  // PTE Core scoring for married/common-law applicants (option3 in original)
  pte_core: {
    speaking: {
      "89+": 32, "84-88": 29, "76-83": 22, "68-75": 16, "59-67": 8, "51-58": 6, "42-50": 6, "0-41": 0
    },
    listening: {
      "89+": 32, "82-88": 29, "71-81": 22, "60-70": 16, "50-59": 8, "39-49": 6, "28-38": 6, "0-27": 0
    },
    reading: {
      "88+": 32, "78-87": 29, "69-77": 22, "60-68": 16, "51-59": 8, "42-50": 6, "33-41": 6, "0-32": 0
    },
    writing: {
      "90+": 32, "88-89": 29, "79-87": 22, "69-78": 16, "60-68": 8, "51-59": 6, "41-50": 6, "0-40": 0
    }
  },
  // TEF Canada scoring for married/common-law applicants (option4 in original)
  tef_canada: {
    speaking: {
      "393-450": 32, "371-392": 29, "349-370": 22, "310-348": 16, "271-309": 8, "226-270": 6, "181-225": 6, "0-180": 0
    },
    listening: {
      "316-360": 32, "298-315": 29, "280-297": 22, "249-279": 16, "217-248": 8, "181-216": 6, "145-180": 6, "0-144": 0
    },
    reading: {
      "263-300": 32, "248-262": 29, "233-247": 22, "207-232": 16, "181-206": 8, "151-180": 6, "121-150": 6, "0-120": 0
    },
    writing: {
      "393-450": 32, "371-392": 29, "349-370": 22, "310-348": 16, "271-309": 8, "226-270": 6, "181-225": 6, "0-180": 0
    }
  },
  // TCF Canada scoring for married/common-law applicants (option5 in original)
  tcf_canada: {
    speaking: {
      "16-20": 32, "14-15": 29, "12-13": 22, "10-11": 16, "7-9": 8, "6": 6, "4-5": 6, "0-3": 0
    },
    listening: {
      "549-699": 32, "523-548": 29, "503-522": 22, "458-502": 16, "398-457": 8, "369-397": 6, "331-368": 6, "0-330": 0
    },
    reading: {
      "549-699": 32, "524-548": 29, "499-523": 22, "453-498": 16, "406-452": 8, "375-405": 6, "342-374": 6, "0-341": 0
    },
    writing: {
      "16-20": 32, "14-15": 29, "12-13": 22, "10-11": 16, "7-9": 8, "6": 6, "4-5": 6, "0-3": 0
    }
  }
};

// Second language scoring (reduced points)
export const secondLanguageScoreToPoints = {
  celpip_g: {
    speaking: { "10-12": 6, "9": 6, "8": 3, "7": 3, "6": 1, "5": 1, "4": 0, "M 0-3": 0 },
    listening: { "10-12": 6, "9": 6, "8": 3, "7": 3, "6": 1, "5": 1, "4": 0, "M 0-3": 0 },
    reading: { "10-12": 6, "9": 6, "8": 3, "7": 3, "6": 1, "5": 1, "4": 0, "M 0-3": 0 },
    writing: { "10-12": 6, "9": 6, "8": 3, "7": 3, "6": 1, "5": 1, "4": 0, "M 0-3": 0 }
  },
  ielts_g: {
    speaking: { "7.5-9.0": 6, "7.0": 6, "6.5": 3, "6.0": 3, "5.5": 1, "5.0": 1, "4.0-4.5": 0, "0-3.5": 0 },
    listening: { "8.5-9.0": 6, "8.0": 6, "7.5": 3, "6.0-7.0": 3, "5.5": 1, "5.0": 1, "4.5": 0, "0-4.0": 0 },
    reading: { "8.0-9.0": 6, "7.0-7.5": 6, "6.5": 3, "6.0": 3, "5.0-5.5": 1, "4.0-4.5": 1, "3.5": 0, "0-3.0": 0 },
    writing: { "7.5-9.0": 6, "7.0": 6, "6.5": 3, "6.0": 3, "5.5": 1, "5.0": 1, "4.0-4.5": 0, "0-3.5": 0 }
  },
  pte_core: {
    speaking: { "89+": 6, "84-88": 6, "76-83": 3, "68-75": 3, "59-67": 1, "51-58": 1, "42-50": 0, "0-41": 0 },
    listening: { "89+": 6, "82-88": 6, "71-81": 3, "60-70": 3, "50-59": 1, "39-49": 1, "28-38": 0, "0-27": 0 },
    reading: { "88+": 6, "78-87": 6, "69-77": 3, "60-68": 3, "51-59": 1, "42-50": 1, "33-41": 0, "0-32": 0 },
    writing: { "90+": 6, "88-89": 6, "79-87": 3, "69-78": 3, "60-68": 1, "51-59": 1, "41-50": 0, "0-40": 0 }
  },
  tef_canada: {
    speaking: { "393-450": 6, "371-392": 6, "349-370": 3, "310-348": 3, "271-309": 1, "226-270": 1, "181-225": 0, "0-180": 0 },
    listening: { "316-360": 6, "298-315": 6, "280-297": 3, "249-279": 3, "217-248": 1, "181-216": 1, "145-180": 0, "0-144": 0 },
    reading: { "263-300": 6, "248-262": 6, "233-247": 3, "207-232": 3, "181-206": 1, "151-180": 1, "121-150": 0, "0-120": 0 },
    writing: { "393-450": 6, "371-392": 6, "349-370": 3, "310-348": 3, "271-309": 1, "226-270": 1, "181-225": 0, "0-180": 0 }
  },
  tcf_canada: {
    speaking: { "16-20": 6, "14-15": 6, "12-13": 3, "10-11": 3, "7-9": 1, "6": 1, "4-5": 0, "0-3": 0 },
    listening: { "549-699": 6, "523-548": 6, "503-522": 3, "458-502": 3, "398-457": 1, "369-397": 1, "331-368": 0, "0-330": 0 },
    reading: { "549-699": 6, "524-548": 6, "499-523": 3, "453-498": 3, "406-452": 1, "375-405": 1, "342-374": 0, "0-341": 0 },
    writing: { "16-20": 6, "14-15": 6, "12-13": 3, "10-11": 3, "7-9": 1, "6": 1, "4-5": 0, "0-3": 0 }
  }
};

export const getLanguageScoreOptions = (testType: string, skill: string) => {
  if (!testType || !skill)
    return [{ value: "", label: "Select points" }];
  switch (testType) {
    case "celpip_g":
      return [{ value: "", label: "Select points" }, ...(celpipScores[skill as keyof typeof celpipScores] || [])];
    case "pte_core":
      return [{ value: "", label: "Select points" }, ...(pteScoresData[skill as keyof typeof pteScoresData] || [])];
    case "ielts_g":
      return [{ value: "", label: "Select points" }, ...(ieltsScores[skill as keyof typeof ieltsScores] || [])];
    case "tef_canada":
      return [{ value: "", label: "Select points" }, ...(tefCanadaScores[skill as keyof typeof tefCanadaScores] || [])];
    case "tcf_canada":
      return [{ value: "", label: "Select points" }, ...(tcfCanadaScores[skill as keyof typeof tcfCanadaScores] || [])];
    default:
      return [{ value: "", label: "Select points" }];
  }
};

export const workExperienceOptions = [
  { value: "none", label: "None or less than a year" },
  { value: "1_year", label: "1 year" },
  { value: "2_years", label: "2 years" },
  { value: "3_years", label: "3 years" },
  { value: "4_years", label: "4 years" },
  { value: "5_years_or_more", label: "5 years or more" },
];

export const nocTeerOptions = [
  { value: "teer0_00", label: "TEER 0 (Major Group 00)" },
  { value: "teer0_other", label: "TEER 0 (Other than MG 00)" },
  { value: "teer1", label: "TEER 1" },
  { value: "teer2", label: "TEER 2" },
  { value: "teer3", label: "TEER 3" },
];
