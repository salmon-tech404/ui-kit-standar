# Codebase Index & AI Crawler Direct Sitemap

> **Note for AI Reviewers & Crawlers (Claude, ChatGPT, Cursor):**
> GitHub's server-side `robots.txt` disallows crawling directory trees (`/*/tree/*`).
> Use this file to directly navigate and read any file in the repository without crawling restrictions.

---

## 📁 Complete File Tree & Direct Navigation Links

### 🖥️ Frontend Architecture (`frontend/src/`)

* **Entrypoint & Shell:**
  * [`frontend/src/main.tsx`](frontend/src/main.tsx) — Main React 18 DOM mount point.
  * [`frontend/src/App.tsx`](frontend/src/App.tsx) — App orchestrator managing 4-pane studio and modal dialogs.
  * [`frontend/src/index.css`](frontend/src/index.css) — Core Tailwind styling and design system base tokens.
  * [`frontend/vite.config.ts`](frontend/vite.config.ts) — Vite build configuration with `/api` proxy.

* **Zustand Global State Stores (`frontend/src/store/`):**
  * [`frontend/src/store/useDesignStore.ts`](frontend/src/store/useDesignStore.ts) — Master 6-tier design tokens, custom RFC rule builder, completeness health score, and dynamic CSS injector.
  * [`frontend/src/store/useProjectStore.ts`](frontend/src/store/useProjectStore.ts) — Multi-tenant project synchronization with MongoDB.
  * [`frontend/src/store/useAuthStore.ts`](frontend/src/store/useAuthStore.ts) — In-memory JWT access token management and auth state.

* **4-Pane Studio Components (`frontend/src/components/studio/`):**
  * [`frontend/src/components/studio/Topbar.tsx`](frontend/src/components/studio/Topbar.tsx) — Top bar with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`), Health score badge, DeepSeek AI credits, and settings button.
  * [`frontend/src/components/studio/MasterRail.tsx`](frontend/src/components/studio/MasterRail.tsx) — **Pane 1**: 6 Master Tiers (Project & Theme, Foundations, Components, Patterns, Brand, System).
  * [`frontend/src/components/studio/SubConfigPanel.tsx`](frontend/src/components/studio/SubConfigPanel.tsx) — **Pane 2**: Slide-out drawer with dedicated subpanels for Colors (with Text/Layers), Typography (Responsive), Spacing (Gaps), Icons, Breakpoints, Motion, Accessibility, Button 5-Variants, and Patterns.
  * [`frontend/src/components/studio/LiveCanvas.tsx`](frontend/src/components/studio/LiveCanvas.tsx) — **Pane 3**: Real-time stress-test canvas with click-to-inspect and auto-fit scaling.
  * [`frontend/src/components/studio/DeepInspector.tsx`](frontend/src/components/studio/DeepInspector.tsx) — **Pane 4**: Polymorphic Inspector Engine with Live Component Preview, DO/DON'T guidelines tab, XML fragment preview, and Impact Tracing.

* **Modal Dialogs (`frontend/src/components/modals/`):**
  * [`frontend/src/components/modals/SettingsModal.tsx`](frontend/src/components/modals/SettingsModal.tsx) — RFC 2119 Custom Rule Builder, Token Namespace Prefix, and Completeness Health Audit checklist.
  * [`frontend/src/components/modals/XmlExportModal.tsx`](frontend/src/components/modals/XmlExportModal.tsx) — Multi-Format Exporter (Master XML, W3C JSON Tokens, Tailwind Config, CSS Variables).
  * [`frontend/src/components/modals/AiGenerateModal.tsx`](frontend/src/components/modals/AiGenerateModal.tsx) — DeepSeek AI theme prompt generator with credit tracker.
  * [`frontend/src/components/dashboard/ProjectDashboard.tsx`](frontend/src/components/dashboard/ProjectDashboard.tsx) — Multi-project manager.
  * [`frontend/src/components/auth/AuthModal.tsx`](frontend/src/components/auth/AuthModal.tsx) — Authentication modal (Register/Login).

* **Color Engine & Utilities (`frontend/src/utils/`):**
  * [`frontend/src/utils/colorEngine.ts`](frontend/src/utils/colorEngine.ts) — OKLCH/HSL color math, 11 perceptual shades generator (50 to 950), and WCAG 2.1 contrast evaluator.

* **API Clients (`frontend/src/api/`):**
  * [`frontend/src/api/axiosClient.ts`](frontend/src/api/axiosClient.ts) — Axios instance with automatic 401 token refresh interceptor.
  * [`frontend/src/api/authApi.ts`](frontend/src/api/authApi.ts) — Auth endpoints (login, register, refresh, logout).
  * [`frontend/src/api/projectApi.ts`](frontend/src/api/projectApi.ts) — Project CRUD endpoints.
  * [`frontend/src/api/aiApi.ts`](frontend/src/api/aiApi.ts) — DeepSeek AI theme generation endpoint.
  * [`frontend/src/api/exportApi.ts`](frontend/src/api/exportApi.ts) — XML export and download endpoints.

---

### 🖥️ Backend Architecture (`backend/src/`)

* **Server & Entrypoint:**
  * [`backend/src/server.ts`](backend/src/server.ts) — Express server setup with CORS, cookie-parser, and rate limiters.
  * [`backend/src/config/db.ts`](backend/src/config/db.ts) — Resilient Mongoose MongoDB connection.

* **Security Models (`backend/src/models/`):**
  * [`backend/src/models/User.model.ts`](backend/src/models/User.model.ts) — User schema with bcrypt password hashing, credit balance, and refresh token family array.
  * [`backend/src/models/Project.model.ts`](backend/src/models/Project.model.ts) — IDOR-immune Project schema with compound index `{ userId: 1, _id: 1 }`.
  * [`backend/src/models/ExportHistory.model.ts`](backend/src/models/ExportHistory.model.ts) — Export logging and quota tracking schema.

* **Middlewares & Security Guardrails (`backend/src/middlewares/`):**
  * [`backend/src/middlewares/auth.middleware.ts`](backend/src/middlewares/auth.middleware.ts) — JWT authentication guard.
  * [`backend/src/middlewares/creditGuard.middleware.ts`](backend/src/middlewares/creditGuard.middleware.ts) — Atomic `$inc: { credits: -1 }` operation preventing credit bleeding.
  * [`backend/src/middlewares/exportQuotaGuard.middleware.ts`](backend/src/middlewares/exportQuotaGuard.middleware.ts) — Tier-based export rate limiter.
  * [`backend/src/middlewares/validate.middleware.ts`](backend/src/middlewares/validate.middleware.ts) — Generic Zod request schema validator.
  * [`backend/src/middlewares/rateLimiter.middleware.ts`](backend/src/middlewares/rateLimiter.middleware.ts) — DDoS & brute-force protection.

* **Services (`backend/src/services/`):**
  * [`backend/src/services/xmlExportService.ts`](backend/src/services/xmlExportService.ts) — Master XML generator using `xmlbuilder2` with auto-escaping to eliminate XML/Prompt injection.
  * [`backend/src/services/ai/AIProviderRegistry.ts`](backend/src/services/ai/AIProviderRegistry.ts) — AI Registry with fallback strategy, Zod output validation, and MD5 prompt caching.
  * [`backend/src/services/ai/providers/DeepSeekProvider.ts`](backend/src/services/ai/providers/DeepSeekProvider.ts) — DeepSeek-V3 API integration.
  * [`backend/src/services/projectService.ts`](backend/src/services/projectService.ts) — Scoped project operations strictly bound to `userId`.

* **Controllers & Routes (`backend/src/controllers/` & `backend/src/routes/`):**
  * [`backend/src/controllers/auth.controller.ts`](backend/src/controllers/auth.controller.ts) & [`backend/src/routes/auth.routes.ts`](backend/src/routes/auth.routes.ts)
  * [`backend/src/controllers/project.controller.ts`](backend/src/controllers/project.controller.ts) & [`backend/src/routes/project.routes.ts`](backend/src/routes/project.routes.ts)
  * [`backend/src/controllers/ai.controller.ts`](backend/src/controllers/ai.controller.ts) & [`backend/src/routes/ai.routes.ts`](backend/src/routes/ai.routes.ts)
  * [`backend/src/controllers/export.controller.ts`](backend/src/controllers/export.controller.ts) & [`backend/src/routes/export.routes.ts`](backend/src/routes/export.routes.ts)
