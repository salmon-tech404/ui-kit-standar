# UI Kit Standard — Studio & Master XML Specification Generator

> **Production-grade Design System Studio & AI-Ready Master XML Generator for Precise Vibe Coding.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![DeepSeek](https://img.shields.io/badge/AI_Engine-DeepSeek_V3-0066FF?logo=openai&logoColor=white)](https://deepseek.com/)

---

## 🎯 Overview & Philosophy

Modern web development with AI coding assistants (Cursor, Claude 3.7, GitHub Copilot) often suffers from **inconsistent visual output**: mismatched border-radii, uncalibrated spacing scales, arbitrary raw HEX colors, and broken interactive component states.

**UI Kit Standard** solves this by bridging visual design systems and AI vibe coding:
1. **Calibrate Visually:** Configure brand colors, 11 perceptual OKLCH shades, 8pt spacing scales, typography hierarchies, and concentric border-radii in a dynamic 4-Pane Studio.
2. **Export Master XML (`.xml`):** Generate a deterministic, machine-readable XML specification with **RFC 2119 Directives (`MUST`, `MUST_NOT`)** that feeds directly into Cursor (`.cursorrules`) or LLM system prompts to enforce 100% mathematical consistency in generated code.

---

## 🚀 Key Features

* **Master XML Specification Generator (`xmlbuilder2`):**
  * Immune to XML & Prompt Injections with strict auto-entity escaping.
  * Encapsulates `<ai_directives>`, `<foundations>`, `<components>` with 6-state interactive matrices, and `<guidelines>` (`<do>` / `<dont>`).
* **Multi-Tenant SaaS Architecture:**
  * Strict database tenant isolation with MongoDB compound indexes (`{ userId: 1, _id: 1 }`) to eliminate IDOR vulnerabilities.
  * Atomic credit deduction guardrail (`creditGuard.middleware.ts`).
  * Monthly export quota tracking with rate limiting.
* **Security-First Authentication:**
  * **Short-lived Access Token (15m)** kept strictly in **In-Memory Zustand State** (never exposed in `localStorage`).
  * **Refresh Token (7d)** in `httpOnly; Secure; SameSite=Strict` cookies with automatic token family rotation and reuse detection.
* **DeepSeek AI Theme Engine:**
  * Direct integration with `deepseek-chat` (DeepSeek-V3) via structured JSON mode for cost-effective, intelligent design system generation (~$0.00005 per generation).
  * Strict **Zod Output Validation Guardrail** verifying schema fidelity before saving to the database.
  * **24-hour Prompt Hash Caching (MD5)** to prevent redundant LLM API calls.
* **4-Pane Nuxt-Inspired Studio:**
  * **Pane 1 (Master Rail):** 8 Foundation & Component standard groups with collapsible slim-rail mode.
  * **Pane 2 (Sub-Config Drawer):** Slide-out drawer with quick filter pills (`[All]`, `[Semantic]`, `[Neutral]`, `[Custom]`) and auto-close on canvas click.
  * **Pane 3 (Live Canvas):** Interactive website layout stress-testing all controls (MD = 40px), Blueprint Wireframe mode, and live click-to-inspect token mapping.
  * **Pane 4 (Deep Inspector):** 2D visual color picker, 11 computed perceptual shades (50–950), and **WCAG 2.1 Contrast Ratio Meter (AA / AAA)**.
* **Tailwind CSS Standard Responsive Breakpoints:**
  * Full breakpoint switcher: `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)`, `2xl (1536px)`.
  * Real-time auto-fit scaling (`scale(availableWidth / targetWidth)`) ensuring the preview never clips on narrower screens.

---

## 📐 Master XML Output Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ui_kit_specification version="1.0.0" project="Fintech SaaS" generated_at="2026-08-16T00:00:00.000Z">
  <ai_directives>
    <role>Senior Frontend Architect &amp; Design Systems Engineer</role>
    <strict_rules>
      <rule id="R01" priority="MUST_NOT">Do not write raw hex colors. All colors MUST resolve to defined CSS variables.</rule>
      <rule id="R02" priority="MUST_NOT">Do not use arbitrary spacing. MUST use the 8-point spacing scale.</rule>
      <rule id="R03" priority="MUST">Buttons, Inputs, and Dropdowns on the same row MUST have identical control heights (MD = 40px).</rule>
      <rule id="R04" priority="MUST">Nested containers MUST obey concentric radius formula: R_inner = max(0, R_outer - Padding).</rule>
      <rule id="R05" priority="MUST">Import icons ONLY from "lucide-react" with stroke-width: 1.5.</rule>
    </strict_rules>
  </ai_directives>
  <foundations>
    <colors>
      <brand>
        <color name="primary" hex="#6366F1" hover="#4F46E5" css_var="--color-primary" />
        <color name="secondary" hex="#EC4899" css_var="--color-secondary" />
        <color name="accent" hex="#10B981" css_var="--color-accent" />
      </brand>
      <semantic>
        <color name="success" hex="#10B981" css_var="--color-success" />
        <color name="warning" hex="#F59E0B" css_var="--color-warning" />
        <color name="error" hex="#EF4444" css_var="--color-error" />
      </semantic>
    </colors>
    <radius>
      <token name="radius-md" value="8px" is_default="true" />
      <token name="radius-lg" value="12px" />
    </radius>
  </foundations>
</ui_kit_specification>
```

---

## 🛠️ Project Structure

```
ui-kit-standar/
├── 📁 backend/                       # Express + TypeScript + Mongoose API Server
│   ├── src/
│   │   ├── config/                   # MongoDB resilient connection
│   │   ├── models/                   # User, Project, ExportHistory
│   │   ├── schemas/                  # Zod request & response schemas
│   │   ├── middlewares/              # auth, creditGuard, quotaGuard, rateLimiter
│   │   ├── services/
│   │   │   ├── ai/                   # AI Provider Registry & DeepSeek/OpenAI/Gemini/Claude
│   │   │   ├── xmlExportService.ts   # Secure XML builder (xmlbuilder2)
│   │   │   └── projectService.ts     # IDOR-protected project operations
│   │   ├── controllers/              # Auth, Project, AI, Export controllers
│   │   └── server.ts                 # Express entrypoint
│   ├── tests/                        # Vitest suite (XML Injection test, etc.)
│   └── package.json
│
└── 📁 frontend/                      # Vite + React 18 + Tailwind Studio
    ├── src/
    │   ├── api/                      # Axios client with auto 401 refresh interceptor
    │   ├── store/                    # Zustand stores (Auth, Design, Projects)
    │   ├── utils/                    # ColorEngine (OKLCH, 11 shades, WCAG 2.1)
    │   ├── components/
    │   │   ├── studio/               # Topbar, MasterRail, SubConfigPanel, LiveCanvas, DeepInspector
    │   │   ├── modals/               # XmlExportModal, AiGenerateModal
    │   │   ├── dashboard/            # ProjectDashboard
    │   │   └── auth/                 # AuthModal
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

---

## ⚡ Quickstart Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ or v20+)
* [MongoDB](https://www.mongodb.com/) (Local instance or free MongoDB Atlas URI)
* [DeepSeek API Key](https://platform.deepseek.com/) *(optional for AI generation)*

---

### 1. Setup Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Configure `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ui_kit_standard_db?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_super_secret_access_key_32chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_32chars
DEEPSEEK_API_KEY=sk-your-deepseek-api-key
```

Backend will run on **`http://localhost:5000`**.

---

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend Studio will run on **`http://localhost:5173`**.

---

## 🧪 Testing

Run backend security and XML generation tests:
```bash
cd backend
npm test
```

Run frontend color engine & WCAG contrast calculation tests:
```bash
cd frontend
npm test
```

---

## 📄 License

MIT License. Designed with mathematical precision for the modern AI engineering era.
