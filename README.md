# Azadi 79 — India's Freedom Struggle Interactive Journey

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3.0-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-61dafb?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Google_Gen_AI-FF9933?logo=google" alt="Google Generative AI" />
</p>

<p align="center">
  <strong>Experience the story of India's independence from 1857 to 1947.</strong><br/>
  An immersive, modern web experience featuring an interactive timeline, 100 freedom fighter profiles, and an AI-powered guide.
</p>

---

## 🎯 Overview

**Azadi 79** is a cutting-edge, single-page web application built with **Next.js 16** and **Tailwind CSS 4**. It commemorates India's 79th Independence Day by bringing the freedom struggle to life through interactive storytelling, rich historical data, and modern web technologies.

### 🚀 Live Demo

> 🌐 [https://azadi-79.vercel.app](https://azadi-79.vercel.app)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Interactive Timeline** | Explore key events from 1757 to 1947 that shaped India's independence |
| 👥 **Freedom Fighters Archive** | Browse detailed profiles of 100+ freedom fighters across 7 categories |
| 🤖 **Ask Bharat — AI Guide** | Chat with an AI assistant powered by Google Generative AI to learn about India's history |
| 🎨 **Modern UI/UX** | Responsive design with custom components, animations, and smooth transitions |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile devices |
| ♿ **Accessible** | Semantic HTML, skip-links, and ARIA-compliant components |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) + PostCSS
- **AI:** [Google Generative AI SDK](https://ai.google.dev/) (`@google/genai`)
- **Utilities:** `clsx`, `tailwind-merge`

---

## 📂 Project Structure

```
azadi-79/
├── src/
│   ├── app/
│   │   ├── api/ask/route.ts      # AI chat API endpoint
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                   # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── Modal.tsx
│   │   ├── hero/HeroSection.tsx
│   │   ├── timeline/TimelineSection.tsx
│   │   ├── fighters/
│   │   │   ├── CategoriesSection.tsx
│   │   │   └── FightersSection.tsx
│   │   ├── ask-bharat/AskBharatSection.tsx
│   │   ├── shared/IndependenceSection.tsx
│   │   └── tribute/TributeSection.tsx
│   ├── data/
│   │   ├── fighters.json         # 100+ freedom fighter profiles
│   │   └── categories.json       # 7 movement categories
│   └── lib/utils.ts
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (or yarn/pnpm/bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/azadi-79.git
cd azadi-79

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GOOGLE_API_KEY to .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_API_KEY=your_google_generative_ai_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with webpack |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Design System

The project uses a custom design system built on **Tailwind CSS 4** with:

- **Typography:** Inter (body), Poppins (headings), Playfair Display (quotes)
- **Color Palette:** Saffron (#FF9933), White, Green (#138808), Ashoka Chakra Blue (#000080)
- **Component Library:** Custom shadcn/ui-inspired primitives

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- Icons from various open-source libraries
- Historical data sourced from public domain and Wikipedia
- Fonts: Google Fonts (Inter, Poppins, Playfair Display)

---

<p align="center">
  <strong>Jai Hind 🇮🇳</strong><br/>
  <em>"Give me blood, and I shall give you freedom." — Subhas Chandra Bose</em>
</p>
