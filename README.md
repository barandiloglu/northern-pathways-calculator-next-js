# 🍁 Northern Pathways - Immigration Assessment Tools

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, user-friendly web application that provides comprehensive immigration assessment tools for Canada's Express Entry system. Built with Next.js 15 and featuring advanced calculators for CRS (Comprehensive Ranking System) and FSWP (Federal Skilled Worker Program) scores.

## ✨ Features

### 🧮 **Advanced Score Calculators**
- **CRS Calculator**: Complete Comprehensive Ranking System score assessment
- **FSWP Calculator**: Federal Skilled Worker Program eligibility evaluation
- **Real-time Calculations**: Instant score updates as users input their information
- **Detailed Breakdowns**: Section-by-section score analysis with improvement suggestions

### 🎯 **Intelligent User Experience**
- **Smart Form Navigation**: Intuitive section-by-section form completion
- **Missing Fields Detection**: Interactive modal showing exactly what needs to be completed
- **One-Click Navigation**: Direct jump to incomplete sections with visual highlighting
- **Progress Tracking**: Real-time form completion percentage and field counting

### 📊 **Express Entry Integration**
- **Latest Draw Results**: Real-time Express Entry draw data and statistics
- **Score Comparison**: Compare your score against recent draw requirements
- **Trend Analysis**: Historical draw data visualization
- **Eligibility Insights**: Personalized recommendations based on your profile

### 🌐 **Modern Architecture**
- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for enhanced user interactions
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🚀 Tech Stack

### **Frontend Framework**
- **[Next.js 15.4.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static type checking

### **Styling & UI**
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[Framer Motion 12.23.12](https://www.framer.com/motion/)** - Animation library

### **State Management & Utils**
- **[Class Variance Authority](https://github.com/joe-bell/cva)** - Component variant utilities
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Tailwind class merging

### **Internationalization**
- **[i18next](https://www.i18next.com/)** - Internationalization framework
- **[react-i18next](https://react.i18next.com/)** - React integration for i18n
- **[i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)** - Language detection

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

## 📦 Installation

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/northern-pathways-nextjs.git
   cd northern-pathways-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
northern-pathways-nextjs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── calculator/         # General calculator page
│   │   ├── crs-calculator/     # CRS score calculator
│   │   ├── fswp-calculator/    # FSWP score calculator
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/             # Reusable React components
│   │   ├── client-wrapper.tsx  # Client-side wrapper
│   │   ├── draws-modal.tsx     # Express Entry draws modal
│   │   ├── footer.tsx          # Site footer
│   │   ├── header.tsx          # Site header
│   │   ├── i18n-provider.tsx   # Internationalization provider
│   │   ├── latest-draws.tsx    # Latest draws component
│   │   └── theme-provider.tsx  # Theme management
│   ├── data/                   # Static data and configurations
│   │   └── crsOptions.ts       # CRS calculator options
│   ├── lib/                    # Utility libraries
│   │   ├── data.ts            # Data fetching utilities
│   │   ├── draw-data-fetcher.ts # Express Entry data fetcher
│   │   ├── i18n.ts            # Internationalization config
│   │   └── utils.ts           # General utilities
│   └── utils/                  # Calculator logic
│       ├── additionalFactors.ts
│       ├── calculateCRSScore.ts
│       ├── calculateFSWPScore.ts
│       ├── coreHumanCapital.ts
│       ├── skillTransferability.ts
│       └── spouseFactors.ts
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.ts             # Next.js configuration
```

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server
- **`npm run lint`** - Run ESLint for code quality

## 🎨 Key Features Breakdown

### CRS Calculator
- Comprehensive scoring for all Express Entry factors
- Age, education, language skills, work experience
- Spouse/partner factors and additional points
- Provincial nomination and job offer calculations
- Real-time score updates and validation

### FSWP Calculator  
- Federal Skilled Worker Program eligibility assessment
- Language proficiency requirements
- Educational credential evaluation
- Work experience validation
- Adaptability factors scoring

### User Experience Enhancements
- **Smart Navigation**: Section-by-section completion with progress tracking
- **Missing Fields Modal**: Interactive popup showing incomplete sections
- **Visual Feedback**: Smooth animations and hover effects
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: Keyboard navigation and screen reader support

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Government of Canada](https://www.canada.ca/) for immigration program information
- [Express Entry](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html) official documentation
- [Vercel](https://vercel.com/) for deployment platform
- All contributors who have helped improve this project

## 📞 Support

For support, email baran@frameflow.ca or create an issue in this repository.

---

**Built with ❤️ for aspiring Canadian immigrants**
