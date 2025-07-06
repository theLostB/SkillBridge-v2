# 🚀 SkillBridge - AI-Powered Career Roadmap Generator

![SkillBridge](https://img.shields.io/badge/SkillBridge-AI%20Career%20Guidance-purple)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4)

> **Live Site:** [SkillBridge](https://skillbridgeee.netlify.app)

**SkillBridge** is a fully frontend-based AI tool that generates a **custom learning roadmap** tailored to your background, skills, and goals. Whether you're switching careers or upskilling, it creates a **6–12 month actionable plan** using the power of AI.

This project was built for **Sonoma Hacks 4.0** Hackathon 

Developed with ❤️ by [Rishaank Gupta](https://github.com/theLostB)

---

## ✨ Features

### 🎯 Multi-Step Personalized Assessment
- Takes in age, education, skills, interests, learning style
- Understands goals, availability, and budget
- Purely client-side — no login or backend

### 🤖 AI-Powered Roadmap Generation
- Powered by **DeepSeek Chat v3** via **OpenRouter API**
- Structured 6–12 month roadmap with:
  - Skills to learn
  - Resources to follow
  - Project suggestions

### 📄 Export & Share
- Professional PDF download
- Web Share API integration
- Roadmap saved in localStorage for reuse

### ⚡ Smart UX
- Smooth transitions and progress tracking
- Cooldown timer for regeneration
- Interactive, responsive, and visually polished

---

## 🛠️ Tech Stack

| Technology        | Use                               |
|------------------|------------------------------------|
| React + TypeScript | Main frontend logic               |
| Tailwind CSS     | Styling and responsive layout      |
| Shadcn/ui + Lucide | UI components and icons          |
| Vite             | Build tool                         |
| OpenRouter API   | AI roadmap generation              |
| Web APIs         | PDF, share, and localStorage usage |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx
│   ├── MultiStepForm.tsx
│   ├── RoadmapDisplay.tsx
│   ├── ui/
│   └── LoadingButton.tsx
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── services/
│   └── openRouterService.ts
├── hooks/
│   └── use-toast.ts
└── lib/
    └── utils.ts
```

---

## 🧪 Run Locally

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/theLostB/SkillBridge-v2.git
cd SkillBridge-v2

npm install
# or
yarn install

npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔧 Configuration

1. Create a `.env` file
2. Add your OpenRouter API key:

```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

3. Restart the dev server.

---

## 🧠 AI Prompt Engineering

- Detailed prompt with user profile
- Structured formatting (headings, steps, recommendations)
- Markdown parsing
- Retry + error handling built-in

---

## 🎨 Design System

- **Gradient Themes:** Purple-Pink, Blue-Violet
- **Typography:** Bold headers, clean readable body
- **Layout:** Mobile-first, print-ready
- **Animations:** Smooth, subtle transitions

---

## 📱 Responsive Design

- ✅ Mobile Ready  
- ✅ Tablet Optimized  
- ✅ Desktop Layout  
- ✅ PDF Export Friendly

---

## 🔐 Privacy First

- No login required  
- No backend or DB used  
- Everything stored client-side  
- Only AI prompt goes to OpenRouter API

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| API not working | Check API key in `.env` |
| Roadmap not generating | Wait 5 minutes or refresh |
| PDF not downloading | Enable pop-ups in browser |
| Build errors | Ensure Node 18+ and reinstall deps |

---

## 🤝 Contributing

1. Fork the repo  
2. Create your branch  
3. Make changes  
4. Test thoroughly  
5. Submit a PR 🚀

---

## 📄 License

This project is MIT Licensed.  
Use it freely with attribution.

---

## 🌐 Connect with Me

- **GitHub:** [@theLostB](https://github.com/theLostB)  
- **LinkedIn:** [@thelostboy231](https://linkedin.com/in/thelostboy231)  
- **Instagram:** [@the_lost_boy_231](https://instagram.com/the_lost_boy_231)  
- **Medium:** [@thelostboy231](https://medium.com/@thelostboy231)

---

## 🏁 Project Info

> 🧠 **Project Name:** SkillBridge  
> 🌐 **Live URL:** [SkillBridge Live Demo](https://skillbridgeee.netlify.app)  
> 👨‍💻 **Created By:** [Rishaank Gupta](https://github.com/theLostB)  
> 🧪 **Built For:** [Sonoma Hacks 4.0](https://sonoma-hacks4.devpost.com)  

---

Made with 💙 by **Rishaank Gupta**
