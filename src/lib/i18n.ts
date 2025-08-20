import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      crs: "CRS Score Calculator",
      fswp: "Federal Skilled Worker Program",
      pre: "Pre-Assessment Form",
      
      // Common
      select: "Select...",
      calculate: "Calculate Your Score",
      totalScore: "Total Score",
      detailShow: "Show Details",
      detailHide: "Hide Details",
      category: "Category",
      points: "Points",
      
      // Personal Information
      maritalStatusQuestion: "What is your marital status?",
      spouseQuestion: "Is your spouse or common-law partner a citizen or permanent resident of Canada?",
      spouseMovingQuestion: "Will your spouse or common-law partner come with you to Canada?",
      ageQuestion: "How old are you?",
      
      // Education
      educationStatusQuestion: "What is your level of education?",
      caEducationStatusQuestion: "Have you earned a Canadian degree, diploma or certificate?",
      caEducationLevelStatusQuestion: "Choose the best answer to describe your Canadian education.",
      
      // Language
      languageQuestionFirst: "Which language test have you taken, or do you plan to take?",
      languageQuestionSecond: "Which language test have you taken, or are you considering, for your second foreign language?",
      languageQuestionSpouse: "Which language test have you taken, or do you plan to take?",
      speaking: "Speaking",
      listening: "Listening",
      reading: "Reading",
      writing: "Writing",
      
      // Work Experience
      caWorkExperience: "Canadian Work Experience (TEER 0, 1, 2, 3)",
      caWorkExperienceQuestion: "In the last ten years, how many years of paid skilled work experience have you gained in Canada?",
      foreignWorkExperience: "Foreign work experience (outside Canada work experience) (TEER 0, 1, 2, 3)",
      foreignWorkExperienceQuestion: "In the last 10 years, how many total years of foreign skilled work experience do you have?",
      
      // Additional Points
      additionalPoint: "Additional Points",
      additionalPointDescription: "Do you have a valid job offer supported by a Labour Market Impact Assessment (LMIA)?",
      nominationQuestion: "Do you have a nomination certificate from a province or territory?",
      lawPartnerStatusQuestion: "Do you or your spouse or common-law partner have at least one brother or sister living in Canada who is a citizen or permanent resident and who is at least 18 years old?",
      
      // Spouse Information
      spouseEducationQuestion: "What is the highest level of education for which your spouse or common-law partner's has?",
      spouseWorkStatus: "In the last ten years, how many years of skilled work experience in Canada does your spouse/common-law partner have?",
      spouseLanguageTestQuestion: "Did your spouse or common-law partner take a language test? If so, which one?",
      
      // Status Options
      single: "Single",
      married: "Married",
      commonLaw: "Common-law partner",
      divorced: "Divorced",
      widowed: "Widowed",
      yes: "Yes",
      no: "No",
      willAccompany: "Will accompany",
      willNotAccompany: "Will not accompany",
      
      // Education Levels
      lessThanSecondary: "Less than secondary school (high school)",
      secondaryDiploma: "Secondary diploma (high school graduation)",
      oneYearPostSecondary: "One-year degree, diploma or certificate from a university, college, trade or technical school, or other institute",
      twoYearPostSecondary: "Two-year program at a university, college, trade or technical school, or other institute",
      bachelorsDegree: "Bachelor's degree OR a three or more year program at a university, college, trade or technical school, or other institute",
      twoOrMoreCertificates: "Two or more certificates, diplomas, or degrees. One must be for a program of three or more years",
      mastersDegree: "Master's degree, OR professional degree needed to practice in a licensed profession",
      doctoralLevel: "Doctoral level university degree (Ph.D.)",
      
      // Language Tests
      ielts: "IELTS",
      celpip: "CELPIP",
      tef: "TEF Canada",
      tcf: "TCF Canada",
      
      // Work Experience
      noExperience: "No experience",
      lessThanOneYear: "Less than 1 year",
      oneYear: "1 year",
      twoYears: "2 years",
      threeYears: "3 years",
      fourYears: "4 years",
      fiveYears: "5 years or more",
      
      // NOC Levels
      noc0: "NOC TEER 0",
      noc1: "NOC TEER 1",
      noc2: "NOC TEER 2",
      noc3: "NOC TEER 3",
      
      // Express Entry Categories
      federalSkilledWorker: "Federal Skilled Worker Program",
      federalSkilledTrades: "Federal Skilled Trades Program",
      canadianExperienceClass: "Canadian Experience Class",
      programSpecific: "Program-specific Rounds (Such as PNP)",
      
      // Legal Disclaimer
      legalDisclaimer: "Legal Disclaimer",
      legalDisclaimerText: "This tool is for informational purposes only and should not be considered as legal advice. Immigration laws and regulations are subject to change. Please consult with a qualified immigration professional for personalized advice.",
      
      // Dashboard
      dashboard: "Dashboard",
      login: "Login",
      logout: "Logout",
      username: "Username",
      password: "Password",
      addEntry: "Add Entry",
      editEntry: "Edit Entry",
      deleteEntry: "Delete Entry",
      save: "Save",
      cancel: "Cancel",
      date: "Date",
      invitationNumber: "Invitation Number",
      crsScore: "CRS Score",
      category: "Category",
      subcategory: "Subcategory",
    }
  },
  tr: {
    translation: {
      // Navigation
      crs: "CRS Puan Hesaplayıcı",
      fswp: "Federal Nitelikli İşçi Programı",
      pre: "Ön Değerlendirme Formu",
      
      // Common
      select: "Seçiniz...",
      calculate: "Puanınızı Hesaplayın",
      totalScore: "Toplam Puan",
      detailShow: "Detayları Göster",
      detailHide: "Detayları Gizle",
      category: "Kategori",
      points: "Puanlar",
      
      // Personal Information
      maritalStatusQuestion: "Medeni durumunuz nedir?",
      spouseQuestion: "Eşiniz veya ortak yaşam partneriniz Kanada vatandaşı veya daimi ikametgahı mı?",
      spouseMovingQuestion: "Eşiniz veya ortak yaşam partneriniz sizinle Kanada'ya gelecek mi?",
      ageQuestion: "Kaç yaşındasınız?",
      
      // Education
      educationStatusQuestion: "Eğitim seviyeniz nedir?",
      caEducationStatusQuestion: "Kanada'da diploma, sertifika veya derece kazandınız mı?",
      caEducationLevelStatusQuestion: "Kanada eğitiminizi en iyi şekilde tanımlayan cevabı seçin.",
      
      // Language
      languageQuestionFirst: "Hangi dil sınavını aldınız veya almayı planlıyorsunuz?",
      languageQuestionSecond: "İkinci yabancı diliniz için hangi dil sınavını aldınız veya düşünüyorsunuz?",
      languageQuestionSpouse: "Hangi dil sınavını aldınız veya almayı planlıyorsunuz?",
      speaking: "Konuşma",
      listening: "Dinleme",
      reading: "Okuma",
      writing: "Yazma",
      
      // Work Experience
      caWorkExperience: "Kanada İş Deneyimi (TEER 0, 1, 2, 3)",
      caWorkExperienceQuestion: "Son on yılda Kanada'da kaç yıl ücretli nitelikli iş deneyimi kazandınız?",
      foreignWorkExperience: "Yabancı iş deneyimi (Kanada dışı iş deneyimi) (TEER 0, 1, 2, 3)",
      foreignWorkExperienceQuestion: "Son 10 yılda toplam kaç yıl yabancı nitelikli iş deneyiminiz var?",
      
      // Additional Points
      additionalPoint: "Ek Puanlar",
      additionalPointDescription: "İş Piyasası Etki Değerlendirmesi (LMIA) ile desteklenen geçerli bir iş teklifiniz var mı?",
      nominationQuestion: "Bir eyalet veya bölgeden adaylık sertifikanız var mı?",
      lawPartnerStatusQuestion: "Siz veya eşiniz/ortak yaşam partnerinizin Kanada'da yaşayan, en az 18 yaşında ve vatandaş veya daimi ikametgahı olan en az bir erkek veya kız kardeşi var mı?",
      
      // Spouse Information
      spouseEducationQuestion: "Eşinizin veya ortak yaşam partnerinizin en yüksek eğitim seviyesi nedir?",
      spouseWorkStatus: "Son on yılda eşinizin/ortak yaşam partnerinizin Kanada'da kaç yıl nitelikli iş deneyimi var?",
      spouseLanguageTestQuestion: "Eşiniz veya ortak yaşam partneriniz dil sınavı aldı mı? Eğer aldıysa, hangisi?",
      
      // Status Options
      single: "Bekar",
      married: "Evli",
      commonLaw: "Ortak yaşam partneri",
      divorced: "Boşanmış",
      widowed: "Dul",
      yes: "Evet",
      no: "Hayır",
      willAccompany: "Eşlik edecek",
      willNotAccompany: "Eşlik etmeyecek",
      
      // Education Levels
      lessThanSecondary: "Ortaokuldan daha az (lise)",
      secondaryDiploma: "Ortaokul diploması (lise mezuniyeti)",
      oneYearPostSecondary: "Bir yıllık üniversite, kolej, meslek veya teknik okul veya diğer enstitüden derece, diploma veya sertifika",
      twoYearPostSecondary: "Üniversite, kolej, meslek veya teknik okul veya diğer enstitüde iki yıllık program",
      bachelorsDegree: "Lisans derecesi VEYA üniversite, kolej, meslek veya teknik okul veya diğer enstitüde üç veya daha fazla yıllık program",
      twoOrMoreCertificates: "İki veya daha fazla sertifika, diploma veya derece. Biri üç veya daha fazla yıllık program için olmalı",
      mastersDegree: "Yüksek lisans derecesi VEYA lisanslı bir meslekte çalışmak için gerekli profesyonel derece",
      doctoralLevel: "Doktora seviyesi üniversite derecesi (Ph.D.)",
      
      // Language Tests
      ielts: "IELTS",
      celpip: "CELPIP",
      tef: "TEF Canada",
      tcf: "TCF Canada",
      
      // Work Experience
      noExperience: "Deneyim yok",
      lessThanOneYear: "1 yıldan az",
      oneYear: "1 yıl",
      twoYears: "2 yıl",
      threeYears: "3 yıl",
      fourYears: "4 yıl",
      fiveYears: "5 yıl veya daha fazla",
      
      // NOC Levels
      noc0: "NOC TEER 0",
      noc1: "NOC TEER 1",
      noc2: "NOC TEER 2",
      noc3: "NOC TEER 3",
      
      // Express Entry Categories
      federalSkilledWorker: "Federal Nitelikli İşçi Programı",
      federalSkilledTrades: "Federal Nitelikli Meslek Programı",
      canadianExperienceClass: "Kanada Deneyim Sınıfı",
      programSpecific: "Program-specific Rounds (Eyalet Aday Programları gibi)",
      
      // Legal Disclaimer
      legalDisclaimer: "Yasal Sorumluluk Reddi",
      legalDisclaimerText: "Bu araç sadece bilgilendirme amaçlıdır ve yasal tavsiye olarak değerlendirilmemelidir. Göçmenlik yasaları ve düzenlemeleri değişebilir. Kişiselleştirilmiş tavsiye için nitelikli bir göçmenlik uzmanına danışın.",
      
      // Dashboard
      dashboard: "Kontrol Paneli",
      login: "Giriş",
      logout: "Çıkış",
      username: "Kullanıcı Adı",
      password: "Şifre",
      addEntry: "Giriş Ekle",
      editEntry: "Giriş Düzenle",
      deleteEntry: "Giriş Sil",
      save: "Kaydet",
      cancel: "İptal",
      date: "Tarih",
      invitationNumber: "Davet Sayısı",
      crsScore: "CRS Puanı",
      category: "Kategori",
      subcategory: "Alt Kategori",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
