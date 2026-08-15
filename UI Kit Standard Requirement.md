# UI Kit Standard

Xây dựng **UI Kit Standard** – một nền tảng cho phép người dùng trực quan thiết lập và chuẩn hóa toàn bộ Design System của một website, bao gồm màu sắc, typography, spacing, grid/column, kích thước component, button, input, card, alert, badge, dropdown, table, modal, tab, pagination, icon library (Lucide, Material Icons, Heroicons...), sidebar, header, logo và vị trí logo, border radius, shadow, trạng thái hover/focus/active/disabled/loading/error/success, responsive breakpoint, layout, animation và các quy tắc UI khác; tất cả thay đổi phải được **preview trực tiếp theo từng component và trên giao diện website thực tế**, đồng thời hệ thống phải cho phép lưu, import/export và sau khi hoàn tất xuất ra một **file Design Specification có cấu trúc đầy đủ** chứa toàn bộ design token, màu sắc, kích thước, spacing, typography, component, variant, state, layout, responsive rule và các quy tắc **DO/DON'T**, để developer hoặc AI có thể sử dụng file này làm **Source of Truth khi vibe coding**, giúp AI không tự ý sáng tạo UI và đảm bảo toàn bộ sản phẩm được xây dựng nhất quán theo một UI Standard đã định nghĩa. Project được xây dựng bằng Html Css đơn thuần, thiết kế chuẩn mực.

Nội dung ý tưởng được viết thành tiếng anh như sau

# UI Kit Standard — Product & Development Specification

## 1. Product Overview

Build a web-based application called **UI Kit Standard**.

The purpose of this application is to solve a common problem with AI-assisted/vibe coding: developers can generate functional applications very quickly, but the resulting UI often looks generic, inconsistent, poorly spaced, visually unbalanced, or obviously AI-generated.

**UI Kit Standard** should act as a visual **Design System / UI Standard Generator**.

The user should be able to enter the application, configure the visual and structural rules of an entire website through a series of visual options, preview the result in real time, and finally export the complete configuration into a structured file.

The exported specification will become the **Source of Truth** for developers and AI coding agents.

The core concept is:

**Configure UI → Preview UI → Generate Design Specification → Give Specification to AI → AI builds the application according to the specification.**

The application should NOT simply be a page builder.

It should be a **Design System configuration and specification generator**.

---

# 2. Core User Flow

The main user flow should be:

1. User opens UI Kit Standard.
2. User creates a new UI Standard project.
3. User chooses a base visual theme.
4. User configures colors.
5. User configures typography.
6. User configures spacing and sizing.
7. User configures grid and responsive layout.
8. User configures buttons.
9. User configures inputs/forms.
10. User configures cards.
11. User configures alerts/notifications.
12. User configures badges/tags.
13. User chooses an icon system/library.
14. User configures sidebar/navigation.
15. User configures header/navigation.
16. User configures logo placement.
17. User configures dropdowns.
18. User configures tables.
19. User configures modals/dialogs.
20. User configures tabs.
21. User configures pagination.
22. User configures loading states.
23. User configures empty states.
24. User configures error/success/warning states.
25. User configures hover/focus/active/disabled states.
26. User configures border radius.
27. User configures shadows.
28. User configures component density.
29. User configures responsive behavior.
30. User previews the complete UI system.
31. User reviews all selected standards.
32. User exports the complete specification.
33. The exported file contains ALL design decisions in a structured format.

---

# 3. Main Application Structure

The application should have a professional dashboard-style interface.

Recommended structure:

- Left sidebar: configuration categories
- Main content: current configuration
- Right side or bottom panel: live preview
- Top navigation:
    - Project name
    - Save
    - Preview
    - Export
    - Import
    - Reset
    - Theme/mode toggle

Example navigation:

```
UI Kit Standard
│
├── Project
│
├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Sizing
│   ├── Grid
│   ├── Border Radius
│   ├── Shadows
│   └── Breakpoints
│
├── Components
│   ├── Buttons
│   ├── Inputs
│   ├── Select / Dropdown
│   ├── Cards
│   ├── Alerts
│   ├── Badges
│   ├── Tables
│   ├── Modal
│   ├── Tabs
│   ├── Pagination
│   ├── Tooltip
│   └── Loading
│
├── Navigation
│   ├── Header
│   ├── Sidebar
│   ├── Breadcrumb
│   └── Footer
│
├── Branding
│   ├── Logo
│   ├── Logo Position
│   └── Brand Colors
│
├── Layout
│   ├── Page Layout
│   ├── Container
│   ├── Grid
│   └── Responsive
│
├── States
│   ├── Hover
│   ├── Focus
│   ├── Active
│   ├── Disabled
│   ├── Loading
│   ├── Error
│   ├── Warning
│   └── Success
│
└── Export
```

---

# 4. Project Creation

When creating a project, ask for:

- Project name
- Project description
- Product type
    - SaaS
    - Dashboard
    - E-commerce
    - Admin system
    - Corporate website
    - Mobile application
    - Internal business system
    - Custom
- Primary platform
    - Web
    - Mobile
    - Responsive Web
- Default viewport
- Light / Dark / Both

After creation, generate a default Design System that the user can customize.

---

# 5. Color System

The color system should be one of the most important sections.

Allow the user to configure:

### Brand

- Primary
- Secondary
- Accent

### Semantic Colors

- Success
- Warning
- Error
- Info

### Neutral Colors

Generate or allow customization of:

- Background
- Surface
- Surface secondary
- Border
- Divider
- Text primary
- Text secondary
- Text tertiary
- Text disabled

### Color Scale

Support color scales such as:

```
50
100
200
300
400
500
600
700
800
900
950
```

Allow the user to select a base color and optionally generate the scale automatically.

For every color, display:

- Color preview
- HEX
- RGB
- HSL
- CSS variable name
- Semantic usage

Example:

```
Primary 500
#3B82F6

--color-primary-500
```

The system should clearly distinguish between:

**Raw color tokens**

and

**Semantic color tokens**.

Example:

```
blue-500
      ↓
primary
      ↓
button-primary-background
```

---

# 6. Typography

Allow the user to configure the complete typography system.

Include:

- Font family
- Heading font
- Body font
- Monospace font
- Font sizes
- Font weights
- Line heights
- Letter spacing

Recommended typography levels:

```
Display
H1
H2
H3
H4
H5
H6
Body Large
Body
Body Small
Caption
Label
Overline
```

For each typography token show:

- Font family
- Font size
- Font weight
- Line height
- Letter spacing

Example:

```
Heading H1
font-size: 36px
font-weight: 700
line-height: 1.2
letter-spacing: -0.02em
```

---

# 7. Spacing System

Do not allow arbitrary spacing everywhere.

Provide a standardized spacing scale.

Example:

```
0
2
4
6
8
12
16
20
24
32
40
48
64
80
96
128
```

Allow the user to select or customize the spacing scale.

Show where each spacing token is intended to be used:

- Component internal padding
- Component gap
- Section spacing
- Page spacing
- Grid gap
- Form spacing

---

# 8. Grid System

This is a critical feature.

Allow the user to configure:

- Number of columns
- Container width
- Maximum content width
- Minimum content width
- Gutter
- Column gap
- Page padding
- Section spacing

Presets:

- 4 columns
- 8 columns
- 12 columns
- 16 columns

Provide a visual grid preview.

The grid should be displayed as an overlay similar to a professional Figma layout grid.

Allow configuration for:

### Desktop

Example:

```
12 columns
Max width: 1440px
Gutter: 24px
Page padding: 32px
```

### Tablet

Example:

```
8 columns
Gutter: 20px
Page padding: 24px
```

### Mobile

Example:

```
4 columns
Gutter: 16px
Page padding: 16px
```

The user should be able to visually see how the grid affects the page.

---

# 9. Responsive Breakpoints

Allow users to configure:

- Mobile
- Tablet
- Desktop
- Large Desktop

Example:

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px - 1440px
Large Desktop: > 1440px
```

Allow custom breakpoint values.

For every major component, define responsive behavior.

Example:

```
Sidebar:
Desktop → expanded
Tablet → collapsed
Mobile → drawer
```

---

# 10. Border Radius

Provide standardized radius tokens:

```
None
XS
SM
MD
LG
XL
2XL
Full
```

Example:

```
radius-sm: 4px
radius-md: 8px
radius-lg: 12px
radius-xl: 16px
radius-full: 9999px
```

Allow the user to select a global radius style.

---

# 11. Shadow System

Provide shadow presets:

- None
- XS
- Small
- Medium
- Large
- XL
- Inner

Allow customization of:

- X
- Y
- Blur
- Spread
- Opacity

---

# 12. Button System

Create a visual configuration system for buttons.

Button variants:

- Primary
- Secondary
- Outline
- Ghost
- Destructive
- Link

Button sizes:

- XS
- Small
- Medium
- Large
- XL

Button states:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

Allow configuration of:

- Height
- Padding
- Border
- Radius
- Font size
- Font weight
- Icon size
- Icon position
- Gap
- Shadow

The preview should show all states side by side.

---

# 13. Input / Form System

Configure:

- Text input
- Search input
- Password input
- Select
- Checkbox
- Radio
- Switch
- Textarea
- Date picker

States:

- Default
- Hover
- Focus
- Filled
- Disabled
- Error
- Warning
- Success

Allow configuration of:

- Height
- Padding
- Border
- Radius
- Label spacing
- Helper text spacing
- Icon position
- Error message style

---

# 14. Card System

Provide several card styles.

Examples:

- Basic
- Elevated
- Outlined
- Filled
- Interactive
- Image card

Allow configuration of:

- Width
- Padding
- Radius
- Border
- Shadow
- Header
- Content spacing
- Footer
- Image ratio

Show multiple cards in the preview.

---

# 15. Alert System

The UI should support at least:

- Error
- Warning
- Info
- Success

And variants:

- Filled
- Outlined
- Standard

The visual structure should include:

- Icon
- Title
- Description
- Close button

Allow the user to configure:

- Colors
- Border
- Background
- Icon
- Padding
- Radius
- Typography

The interface should visually resemble a design-system matrix similar to the provided reference image.

---

# 16. Badge / Tag System

Support:

- Default
- Success
- Warning
- Error
- Info
- Neutral

Variants:

- Filled
- Outline
- Soft

Allow configuration of:

- Height
- Padding
- Radius
- Font size
- Icon
- Dot indicator

---

# 17. Icon System

Allow users to choose the icon library.

Example options:

- Lucide
- Heroicons
- Material Icons
- Font Awesome
- Custom

The selected icon library must be stored in the exported specification.

Allow configuration of:

- Default icon size
- Small icon size
- Large icon size
- Stroke width
- Icon color rules
- Icon alignment

Example:

```
Icon Library: Lucide
Default Size: 20px
Small: 16px
Large: 24px
Stroke Width: 2
```

---

# 18. Sidebar System

Allow users to choose from multiple sidebar layouts.

Examples:

### Style A

Expanded sidebar

### Style B

Collapsed icon sidebar

### Style C

Expandable sidebar

### Style D

Overlay drawer

### Style E

Floating sidebar

Allow configuration of:

- Width
- Collapsed width
- Position
- Background
- Border
- Shadow
- Logo position
- Menu spacing
- Icon size
- Active item style
- Hover style
- Selected item style

Also define sidebar behavior:

```
Desktop:
Expanded

Tablet:
Collapsed

Mobile:
Drawer
```

# 19. Header / Navbar

Allow configuration of:

- Logo position
- Navigation position
- Search position
- User profile position
- Notification position
- Menu button
- Header height
- Background
- Border
- Shadow

Logo positions:

- Left
- Center
- Sidebar
- Top
- Custom

---

# 20. Logo Configuration

Allow the user to configure:

- Logo position
- Logo width
- Logo height
- Mobile logo size
- Desktop logo size
- Logo spacing
- Light mode logo
- Dark mode logo

Allow uploading a logo.

---

# 21. Dropdown / Select

Configure:

- Width
- Height
- Radius
- Padding
- Menu spacing
- Item height
- Hover state
- Selected state
- Disabled state
- Icon
- Arrow
- Shadow
- Animation

---

# 22. Table System

Configure:

- Row height
- Header height
- Column spacing
- Cell padding
- Border
- Zebra rows
- Hover row
- Selected row
- Sort icon
- Pagination
- Empty state
- Loading state

Support density:

- Compact
- Comfortable
- Spacious

---

# 23. Modal / Dialog

Configure:

- Width
- Max width
- Padding
- Radius
- Shadow
- Overlay opacity
- Header
- Footer
- Close button
- Animation

Presets:

- Small
- Medium
- Large
- Full screen

---

# 24. Tabs

Support:

- Underline tabs
- Pill tabs
- Box tabs
- Segmented tabs

States:

- Default
- Hover
- Active
- Disabled

---

# 25. Pagination

Configure:

- Button size
- Gap
- Radius
- Active state
- Disabled state
- Previous/next icons
- Number of visible pages

---

# 26. Loading System

Configure:

- Spinner
- Skeleton
- Progress bar
- Button loading
- Page loading

Allow configuration of:

- Animation
- Size
- Color
- Speed

---

# 27. Empty State

Configure:

- Illustration
- Icon
- Title
- Description
- CTA
- Spacing

---

# 28. State System

Create a centralized state system.

Every component should support common states:

```
Default
Hover
Focus
Active
Selected
Disabled
Loading
Error
Warning
Success
```

The application should allow the user to define consistent behavior across components.

For example:

```
Global Hover:
opacity / background / border / shadow

Global Focus:
outline color / outline width / offset

Global Disabled:
opacity / cursor / background
```

---

# 29. Component Density

Allow the user to choose a global density:

- Compact
- Comfortable
- Spacious

This should influence:

- Button height
- Input height
- Table row height
- Card padding
- Sidebar spacing
- Form spacing

---

# 30. Animation / Motion

Allow configuration of:

- Animation enabled/disabled
- Duration
- Easing
- Hover transition
- Modal transition
- Dropdown transition
- Sidebar transition

Example:

```
Fast: 100ms
Normal: 200ms
Slow: 300ms
```

---

# 31. Dark Mode

Support:

- Light only
- Dark only
- Light + Dark

If Light + Dark is selected, allow configuration of separate semantic colors.

Do not simply invert colors.

The generated specification should contain both themes.

---

# 32. Live Preview

This is one of the most important features.

Every configuration change should immediately update a live preview.

The preview should contain realistic UI examples:

- Header
- Sidebar
- Dashboard
- Cards
- Buttons
- Forms
- Alerts
- Tables
- Dropdowns
- Modal
- Tabs
- Badges

The preview should demonstrate the selected Design System rather than simply showing isolated components.

Provide viewport presets:

- Desktop
- Tablet
- Mobile

Allow resizing the preview.

---

# 33. Design System Overview

Create an overview page showing the entire selected Design System.

Display:

```
Colors
Typography
Spacing
Grid
Components
Icons
Navigation
States
Responsive
Motion
```

Each category should show a summary.

Example:

```
Primary Color
#2563EB

Font
Inter

Grid
12 columns

Radius
8px

Icon Library
Lucide

Button
Medium / 40px

Sidebar
240px
```

# 34. Design Specification

The application must maintain one central structured Design Specification.

Every choice made by the user must be stored.

Do NOT store only the final visual appearance.

Store the actual design decisions.

Example:

```
{
  "project": {
    "name": "My Project",
    "platform": "responsive-web"
  },
  "colors": {},
  "typography": {},
  "spacing": {},
  "grid": {},
  "breakpoints": {},
  "components": {},
  "navigation": {},
  "branding": {},
  "states": {},
  "responsive": {},
  "motion": {}
}
```

The schema should be extensible.

---

# 35. Export

Provide an **Export Design Specification** button.

Supported formats:

### JSON

Primary format for AI/developer consumption.

### Markdown

Human-readable Design Specification.

### CSS Variables

Generate CSS custom properties.

Example:

```
:root {
  --color-primary-500: #2563EB;
  --color-background: #FFFFFF;
  --color-text-primary: #111827;
  --spacing-md: 16px;
  --radius-md: 8px;
}
```

### Tailwind Configuration

If practical, generate a Tailwind-compatible configuration.

### AI Design Prompt

Generate a Markdown prompt specifically designed to be given to an AI coding agent.

Example:

```
You are building a web application.

Follow the attached UI Kit Standard specification exactly.

Do not invent colors.
Do not invent spacing.
Do not introduce another icon library.
Do not create arbitrary component variants.

Use the following design tokens...
```

---

# 36. AI-Ready Specification

The exported specification should be designed specifically for AI coding.

It should clearly distinguish:

### MUST

Rules that the AI must follow.

### SHOULD

Recommended rules.

### MAY

Optional rules.

### DO NOT

Forbidden patterns.

Example:

```
MUST:
- Use 12-column desktop grid.
- Use Lucide icons.
- Use 8px radius.
- Use spacing tokens only.

DO NOT:
- Use arbitrary colors.
- Mix icon libraries.
- Create random border radius values.
- Use arbitrary spacing values.
- Introduce components not defined in the Design System without justification.
```

This is important because the final purpose of the product is to give AI a reliable UI standard.

---

# 37. Design Token Naming

Use consistent token naming.

Example:

```
color.primary.500
color.background.default
color.text.primary
color.text.secondary

spacing.xs
spacing.sm
spacing.md
spacing.lg
spacing.xl

radius.sm
radius.md
radius.lg

shadow.sm
shadow.md
shadow.lg

font.body
font.heading

component.button.height.md
component.button.radius
component.input.height
component.card.padding
```

The naming convention must be consistent across the entire application.

---

# 38. Import

Allow users to import an existing UI Kit Standard JSON file.

After import:

- Restore all settings
- Restore theme
- Restore component configuration
- Restore responsive configuration
- Restore project metadata

This allows the specification to be reused and versioned.

---

# 39. Versioning

Support Design System versions.

Example:

```
UI Kit Standard
Version 1.0.0
```

Allow users to create:

```
v1.0.0
v1.1.0
v2.0.0
```

The exported specification should include the version.

---

# 40. Validation

Before export, run a Design System validation.

Detect:

- Missing colors
- Missing typography
- Missing spacing
- Missing breakpoints
- Missing component states
- Inconsistent values
- Components using undefined tokens
- Duplicate values
- Invalid configuration

Display a score:

```
Design System Completeness
92%
```

Example:

```
✓ Color System
✓ Typography
✓ Grid
✓ Spacing
✓ Buttons
✓ Forms
⚠ Modal states incomplete
⚠ Mobile sidebar behavior missing
```

Do not prevent export unless there is a critical error.

---

# 41. Presets

Provide predefined starting presets.

Examples:

### Modern SaaS

Clean, minimal, rounded.

### Enterprise

Structured, compact, professional.

### Dashboard

Dense layout, strong information hierarchy.

### E-commerce

Card-focused, visual.

### Minimal

Minimal colors and spacing.

### Material-inspired

Material-style components.

### Custom

Start from blank/default configuration.

Presets should only be starting points. Users must be able to modify everything.

---

# 42. Important UX Principle

The interface itself must demonstrate the quality standard that the application is trying to create.

The application must NOT look like a generic AI-generated dashboard.

Use:

- Strong visual hierarchy
- Consistent spacing
- Professional typography
- Proper grid
- Carefully designed empty states
- Consistent component states
- Proper responsive behavior
- Clear interaction feedback
- No excessive gradients
- No unnecessary glassmorphism
- No random rounded cards
- No arbitrary colors
- No inconsistent spacing

The application itself should be an example of **good UI design**.

# 43. Reference Images

The provided reference images should be treated as visual inspiration for the Design System configuration interface.

Important visual concepts from the references include:

- Component matrices
- Different component variants displayed together
- Filled / Outlined / Standard variants
- Error / Warning / Info / Success variants
- Multiple button states
- Multiple avatar/icon/image sizes
- Visible grid and column guides
- Consistent spacing between components
- Design tokens represented visually
- Clear component state comparison

Do not blindly copy the reference images.

Use them as inspiration for creating a coherent and original UI Kit Standard experience.

---

# 44. Technical Architecture

Build the application using a clean, scalable architecture.

Recommended frontend:

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui or an equivalent accessible component foundation

Use reusable components.

Do NOT create every screen independently.

Create a centralized Design System configuration state.

Example conceptual structure:

```
src/
├── app/
├── components/
│   ├── foundations/
│   ├── components/
│   ├── navigation/
│   ├── preview/
│   └── export/
├── design-system/
│   ├── schema/
│   ├── tokens/
│   ├── presets/
│   ├── validators/
│   └── generators/
├── lib/
└── types/
```

---

# 45. State Management

All Design System configuration should have a centralized state.

The preview must consume this state.

The export generator must consume the same state.

The validator must consume the same state.

Avoid duplicating configuration logic.

Conceptually:

```
                 ┌──────────────┐
                 │ Design State │
                 └──────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
      Live Preview   Validator      Export
```

This ensures that the preview, validation, and exported specification always represent the same Design System.

---

# 46. Responsive Application

The UI Kit Standard application itself must be responsive.

Desktop:

- Full sidebar
- Configuration panel
- Large preview

Tablet:

- Collapsible navigation
- Smaller preview

Mobile:

- Drawer navigation
- Configuration sections stacked
- Preview optimized for mobile

---

# 47. Accessibility

Follow accessibility best practices.

Include:

- Keyboard navigation
- Focus states
- Accessible labels
- Semantic HTML
- Sufficient contrast
- ARIA where necessary
- Visible focus indicators

The generated Design System should also contain accessibility-related rules where applicable.

---

# 48. Performance

The application should feel fast.

Avoid unnecessary re-renders.

Use reusable components and memoization where appropriate.

Do not generate excessive DOM elements for the preview.

---

# 49. Final Product Goal

The final product should answer this problem:

> "Before I ask an AI to build my application, how can I define exactly what my UI should look like so that the AI does not randomly invent the design?"
> 

The answer is:

**UI Kit Standard.**

The user defines:

```
Visual Language
       ↓
Design Tokens
       ↓
Components
       ↓
Component States
       ↓
Layout Rules
       ↓
Responsive Rules
       ↓
Navigation Rules
       ↓
Brand Rules
       ↓
Design Specification
       ↓
AI Coding
```

The final exported specification should be detailed enough that another developer or AI coding agent can implement the UI without having to guess:

- Which colors to use
- Which fonts to use
- Which spacing to use
- Which grid to use
- Which icon library to use
- Which button style to use
- Which card style to use
- Which sidebar style to use
- Which component sizes to use
- Which border radius to use
- Which shadows to use
- Which states to support
- How components behave responsively
- How components should interact
- Which values are allowed
- Which values are prohibited

The ultimate principle is:

**The AI should implement the Design System, not invent the Design System.**

---

# 50. Development Priority

Do not attempt to build every feature simultaneously.

Implement in phases.

### Phase 1 — Foundation

- Project creation
- Colors
- Typography
- Spacing
- Grid
- Radius
- Shadows
- Breakpoints

### Phase 2 — Core Components

- Button
- Input
- Card
- Alert
- Badge
- Dropdown
- Icon

### Phase 3 — Layout

- Header
- Sidebar
- Navigation
- Logo
- Page layout

### Phase 4 — Advanced Components

- Table
- Modal
- Tabs
- Pagination
- Loading
- Empty states

### Phase 5 — Preview

Create a realistic dashboard/page preview that uses the configured Design System.

### Phase 6 — Export

Implement:

- JSON
- Markdown
- CSS variables
- AI prompt

### Phase 7 — Import & Versioning

- Import JSON
- Version
- Save
- Duplicate
- Reset

### Phase 8 — Validation

Implement Design System completeness and consistency validation.

---

# 51. Important Development Rule

Do not simplify the concept into a simple theme editor.

This application should be treated as a **Design System Engineering Tool**.

Every visual choice should ideally become a structured token or rule.

For example:

Do NOT only store:

```
Button looks blue.
```

Instead store:

```
{
  "component": "button",
  "variant": "primary",
  "size": "medium",
  "height": "40px",
  "paddingX": "16px",
  "radius": "8px",
  "background": "{color.primary.500}",
  "textColor": "{color.white}",
  "states": {
    "hover": {},
    "focus": {},
    "active": {},
    "disabled": {}
  }
}
```

The exported file must describe the **rules behind the UI**, not just its appearance.

---

# 52. Success Criteria

The project is considered successful when a user can:

1. Create a UI Standard.
2. Configure the major visual foundations.
3. Configure the major UI components.
4. Configure responsive behavior.
5. See the entire system in a live preview.
6. Review all design decisions.
7. Export a complete structured specification.
8. Give that specification to an AI coding agent.
9. Have the AI implement the application without inventing arbitrary UI decisions.

The most important success criterion is:

**A developer should be able to give the exported UI Kit Standard specification to an AI coding agent and significantly reduce the amount of UI guessing and generic AI-generated design.**