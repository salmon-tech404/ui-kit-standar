# UI Kit Standard --- Sidebar & Design System Specification

## 1. Mục đích của tài liệu

Tài liệu này giải thích ý nghĩa của toàn bộ các nhóm và mục con trong
sidebar của **UI Kit Standard / Design System Builder**.

Mục tiêu của hệ thống không chỉ là chỉnh màu sắc hoặc tạo component. Hệ
thống phải có khả năng mô tả toàn bộ quy tắc thiết kế của một website
để:

-   Designer có thể định nghĩa Design System một cách trực quan.
-   Developer có thể sử dụng Design System như một specification thống
    nhất.
-   AI có thể đọc Design Specification và biết chính xác UI nào được
    phép sử dụng.
-   AI không tự ý tạo màu, spacing, radius, shadow, component hoặc
    pattern ngoài Standard.
-   Mọi thay đổi đều có thể preview trực tiếp.
-   Toàn bộ cấu hình có thể lưu, import/export và xuất thành Design
    Specification.

------------------------------------------------------------------------

# 2. Cấu trúc tổng thể của Sidebar

Sidebar nên được tổ chức thành các tầng lớn:

``` text
PROJECT & THEME

FOUNDATIONS
├── Colors
├── Typography
├── Spacing & Sizing
├── Radius & Shadow
├── Icons
├── Breakpoints
├── Motion
├── Z-Index
└── Accessibility

COMPONENTS
├── Actions
├── Forms
├── Data Display
├── Feedback
├── Overlays
├── Navigation
└── Layout

PATTERNS
├── Page Templates
├── Sections
└── Use Cases

BRAND & ASSETS
├── Logo & Brand
├── Icon Library
├── Illustrations
└── Images

SYSTEM & OUTPUT
├── Design Tokens
├── Rules & Guidelines
├── AI Instructions
├── Import / Export
└── Design Specification
```

Cấu trúc này chia Design System thành 5 tầng:

1.  **Project & Theme** --- thông tin và chế độ hoạt động của project.
2.  **Foundations** --- các nguyên tắc cơ bản tạo nên UI.
3.  **Components** --- các building block có thể tái sử dụng.
4.  **Patterns** --- cách kết hợp component thành các giao diện thực tế.
5.  **Brand & Assets / System & Output** --- nhận diện thương hiệu, tài
    nguyên và các quy tắc để developer/AI sử dụng.

------------------------------------------------------------------------

# 3. PROJECT & THEME

## Ý nghĩa

Đây là nơi định nghĩa phạm vi và context của Design System.

Nó trả lời:

> "Design System này thuộc project nào và website có những theme nào?"

## Nội dung nên có

### Project Information

Thông tin cơ bản:

-   Project name
-   Description
-   Version
-   Design System version
-   Author
-   Created date
-   Last updated
-   Token naming convention
-   CSS variable prefix

Ví dụ:

``` text
Project: Veltrix
Design System: Veltrix UI Standard
Version: 1.0.0
Token prefix: --vx-
```

### Theme

Định nghĩa các theme mà website hỗ trợ:

-   Light
-   Dark
-   High Contrast
-   Custom theme

Có thể cấu hình:

-   Theme mặc định
-   Cho phép user chuyển theme hay không
-   Theme theo system preference
-   Token riêng của từng theme

Ví dụ:

``` text
Default theme: Light
Dark mode: Enabled
System preference: Supported
```

### Vì sao AI cần phần này?

AI phải biết:

``` text
Website hỗ trợ Light + Dark.
Không được hard-code màu trắng/đen.
Phải sử dụng semantic tokens.
```

------------------------------------------------------------------------

# 4. FOUNDATIONS

Foundations là nền móng của toàn bộ Design System.

Nếu Component là "viên gạch", Foundations là "quy chuẩn để tạo ra viên
gạch".

------------------------------------------------------------------------

# 5. COLORS

## Ý nghĩa

Định nghĩa toàn bộ hệ thống màu của website.

Không nên chỉ lưu:

``` text
Primary = #6366F1
```

mà phải phân biệt giữa:

-   Primitive color
-   Semantic color
-   Component color
-   Theme-specific color

------------------------------------------------------------------------

## 5.1 Color Categories

### All

Hiển thị toàn bộ color token.

Dùng để xem tổng quan hệ thống màu.

### Semantic

Màu có ý nghĩa theo ngữ cảnh:

``` text
Primary
Success
Warning
Error
Info
```

Ví dụ:

``` text
color-success
color-error
color-warning
```

AI nên ưu tiên semantic token thay vì tự chọn HEX.

### Neutral

Hệ thống màu trung tính:

``` text
Gray 50
Gray 100
Gray 200
...
Gray 900
Gray 950
```

Thường dùng cho:

-   Background
-   Text
-   Border
-   Surface
-   Divider

### Custom

Các màu riêng của project không thuộc bộ mặc định.

Ví dụ:

``` text
Brand Purple
Enterprise Gold
Marketing Accent
```

Custom color phải được khai báo rõ ràng để AI không tự tạo thêm màu mới.

------------------------------------------------------------------------

# 6. COLOR SUBGROUPS

## Brand Colors

Đây là màu nhận diện thương hiệu.

Ví dụ:

``` text
Primary
Primary Hover
Primary Active
Primary Focus
Secondary
Accent
```

Dùng cho:

-   Button
-   Link
-   Logo
-   Highlight
-   CTA
-   Selected state

------------------------------------------------------------------------

## Semantic Colors

Màu biểu thị trạng thái hoặc ý nghĩa.

``` text
Success
Warning
Error
Info
```

Ví dụ:

``` text
Success → hành động thành công
Warning → cảnh báo
Error → lỗi
Info → thông tin
```

Không nên dùng màu đỏ chỉ vì "trông đẹp". AI phải hiểu `Error` là token
có ngữ nghĩa.

------------------------------------------------------------------------

## Neutral Colors

Dùng cho các thành phần không mang ý nghĩa trạng thái:

``` text
Gray 50
Gray 100
Gray 200
...
Gray 900
```

Ví dụ:

-   Border
-   Divider
-   Text secondary
-   Disabled background
-   Surface
-   Background

------------------------------------------------------------------------

## Background Colors

Định nghĩa các lớp nền:

``` text
Background
Background muted
Background subtle
Surface
Surface elevated
Surface overlay
```

Điều này giúp AI biết sự khác nhau giữa:

``` text
page background
card background
modal background
sidebar background
```

------------------------------------------------------------------------

## Text / Foreground Colors

Định nghĩa màu chữ:

``` text
Foreground
Foreground muted
Foreground subtle
Foreground disabled
Foreground inverse
```

Mục tiêu là tránh việc AI tự chọn:

``` css
color: #666;
```

mà phải dùng token:

``` css
color: var(--color-text-muted);
```

------------------------------------------------------------------------

## Border Colors

Định nghĩa:

``` text
Border subtle
Border default
Border strong
Border focus
Border error
```

Giúp thống nhất border giữa Input, Card, Table, Modal, Sidebar...

------------------------------------------------------------------------

# 7. TYPOGRAPHY

## Ý nghĩa

Định nghĩa cách website hiển thị chữ.

Không chỉ là font-size.

------------------------------------------------------------------------

## Font Family

Định nghĩa:

-   Primary font
-   Secondary font
-   Monospace font
-   Fallback font

Ví dụ:

``` text
Sans: Geist
Mono: Geist Mono
```

------------------------------------------------------------------------

## Font Weight

Ví dụ:

``` text
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

AI không được tự tạo `650` nếu Standard không định nghĩa.

------------------------------------------------------------------------

## Font Size

Có thể xây dựng scale:

``` text
xs
sm
md
lg
xl
2xl
3xl
4xl
```

------------------------------------------------------------------------

## Line Height

Định nghĩa:

``` text
Tight
Normal
Relaxed
```

Hoặc theo giá trị cụ thể.

------------------------------------------------------------------------

## Letter Spacing

Định nghĩa tracking cho:

-   Heading
-   Body
-   Label
-   Caption
-   Button

------------------------------------------------------------------------

## Typography Styles

Nên có semantic styles:

``` text
Display
H1
H2
H3
H4
Body Large
Body
Body Small
Label
Caption
Code
```

AI chỉ cần biết:

> "Heading của website sử dụng H2 token."

thay vì tự đoán font-size.

------------------------------------------------------------------------

# 8. SPACING & SIZING

## Ý nghĩa

Định nghĩa hệ thống kích thước và khoảng cách.

------------------------------------------------------------------------

## Spacing Scale

Ví dụ:

``` text
0
1
2
3
4
6
8
12
16
24
32
48
64
```

Có thể map sang:

``` text
xs
sm
md
lg
xl
2xl
```

------------------------------------------------------------------------

## Component Sizing

Định nghĩa kích thước chuẩn:

``` text
Input height
Button height
Select height
Icon Button size
Avatar size
Checkbox size
```

Ví dụ:

``` text
Button SM = 32px
Button MD = 36px
Button LG = 40px
```

------------------------------------------------------------------------

## Container Width

Định nghĩa:

``` text
sm
md
lg
xl
2xl
full
```

Ví dụ:

``` text
Desktop container = 1200px
```

------------------------------------------------------------------------

## Icon Size

Ví dụ:

``` text
xs = 12px
sm = 16px
md = 20px
lg = 24px
xl = 32px
```

------------------------------------------------------------------------

# 9. RADIUS & SHADOW

## Radius

Định nghĩa border radius:

``` text
none
sm
md
lg
xl
full
```

Ví dụ:

``` text
Button = radius-md
Card = radius-lg
Avatar = radius-full
```

AI không được tự ý tạo:

``` text
13px
17px
22px
```

nếu những giá trị này không tồn tại trong token.

------------------------------------------------------------------------

## Shadow

Định nghĩa:

``` text
none
xs
sm
md
lg
xl
2xl
```

Có thể thêm semantic:

``` text
Card shadow
Dropdown shadow
Modal shadow
Floating shadow
```

------------------------------------------------------------------------

# 10. ICONS

## Ý nghĩa

Định nghĩa quy chuẩn sử dụng icon.

Cấu hình:

-   Icon library
-   Default icon size
-   Stroke width
-   Icon color
-   Icon alignment
-   Icon spacing
-   Icon naming convention

Ví dụ:

``` text
Library: Lucide
Size: 20px
Stroke: 1.5
```

AI phải sử dụng icon từ library đã chọn thay vì tự vẽ SVG.

------------------------------------------------------------------------

# 11. BREAKPOINTS

## Ý nghĩa

Định nghĩa responsive system.

Ví dụ:

``` text
xs: 0
sm: 640
md: 768
lg: 1024
xl: 1280
2xl: 1536
```

Nhưng breakpoint chỉ là một phần.

Cần định nghĩa behavior:

``` text
Sidebar:
Desktop → expanded
Tablet → collapsed
Mobile → drawer
```

``` text
Grid:
Desktop → 4 columns
Tablet → 2 columns
Mobile → 1 column
```

AI cần biết cả **breakpoint + behavior**.

------------------------------------------------------------------------

# 12. MOTION

## Ý nghĩa

Định nghĩa animation system.

------------------------------------------------------------------------

## Duration

``` text
Instant
Fast
Normal
Slow
```

Ví dụ:

``` text
Fast = 100ms
Normal = 200ms
Slow = 300ms
```

------------------------------------------------------------------------

## Easing

``` text
ease-in
ease-out
ease-in-out
linear
```

------------------------------------------------------------------------

## Motion Rules

Định nghĩa animation cho:

-   Hover
-   Focus
-   Dropdown
-   Modal
-   Drawer
-   Tooltip
-   Accordion
-   Page transition

------------------------------------------------------------------------

## Reduced Motion

Định nghĩa behavior khi user bật:

``` text
prefers-reduced-motion
```

AI không được tạo animation mạnh nếu hệ thống yêu cầu giảm motion.

------------------------------------------------------------------------

# 13. Z-INDEX

## Ý nghĩa

Quản lý thứ tự lớp của UI.

Ví dụ:

``` text
base
dropdown
sticky
header
popover
modal
toast
tooltip
```

Ví dụ:

``` text
dropdown = 1000
modal = 2000
toast = 3000
tooltip = 4000
```

Điều này tránh tình trạng AI tự đặt:

``` css
z-index: 99999;
```

------------------------------------------------------------------------

# 14. ACCESSIBILITY

## Ý nghĩa

Định nghĩa accessibility standard.

------------------------------------------------------------------------

## Focus

Cấu hình:

-   Focus ring
-   Focus color
-   Focus width
-   Focus offset

------------------------------------------------------------------------

## Keyboard

Định nghĩa:

``` text
Tab
Shift + Tab
Enter
Space
Escape
Arrow keys
```

------------------------------------------------------------------------

## Contrast

Kiểm tra:

``` text
WCAG AA
WCAG AAA
```

------------------------------------------------------------------------

## Screen Reader

Định nghĩa:

-   Accessible label
-   Hidden text
-   ARIA requirements
-   Landmark requirements

------------------------------------------------------------------------

## Reduced Motion

Quy tắc cho người dùng nhạy cảm với animation.

------------------------------------------------------------------------

# 15. COMPONENTS

Components là các building block thực tế được sử dụng để xây website.

Mỗi component nên có:

``` text
Anatomy
Variants
Sizes
States
Properties
Behavior
Accessibility
Usage
DO / DON'T
```

------------------------------------------------------------------------

# 16. ACTIONS

## Button

Cấu hình:

``` text
Variants
Primary
Secondary
Outline
Ghost
Destructive
Link

Sizes
XS
SM
MD
LG
XL

States
Default
Hover
Focus
Active
Disabled
Loading
```

Có thể thêm:

-   Icon position
-   Full width
-   Loading spinner
-   Button group

------------------------------------------------------------------------

## Icon Button

Button chỉ chứa icon.

Cần định nghĩa:

-   Size
-   Icon size
-   Tooltip requirement
-   Accessible label
-   States

------------------------------------------------------------------------

## Button Group

Định nghĩa cách nhiều button được nhóm:

``` text
spacing
radius merging
orientation
responsive behavior
```

------------------------------------------------------------------------

# 17. FORMS

## Input

Cần định nghĩa:

``` text
Size
Variant
Placeholder
Label
Description
Error
Success
Disabled
Readonly
Loading
Focus
```

------------------------------------------------------------------------

## Textarea

Ngoài các state trên:

-   Min height
-   Max height
-   Resize behavior

------------------------------------------------------------------------

## Select

Định nghĩa:

-   Trigger
-   Dropdown
-   Option
-   Selected state
-   Disabled option
-   Search
-   Multi-select

------------------------------------------------------------------------

## Checkbox

Định nghĩa:

-   Checked
-   Unchecked
-   Indeterminate
-   Disabled
-   Error
-   Focus

------------------------------------------------------------------------

## Radio

Định nghĩa:

-   Group
-   Selected
-   Unselected
-   Disabled
-   Error

------------------------------------------------------------------------

## Switch

Định nghĩa:

-   On
-   Off
-   Disabled
-   Loading

------------------------------------------------------------------------

## Date Picker

Định nghĩa:

-   Calendar
-   Selected date
-   Range
-   Disabled date
-   Today
-   Navigation
-   Localization

------------------------------------------------------------------------

# 18. DATA DISPLAY

## Card

Định nghĩa:

``` text
Header
Body
Footer
Media
Action
```

và:

-   Padding
-   Radius
-   Shadow
-   Border
-   Hover

------------------------------------------------------------------------

## Badge

Ví dụ:

``` text
Default
Success
Warning
Error
Info
```

------------------------------------------------------------------------

## Avatar

Định nghĩa:

-   Size
-   Image
-   Initials
-   Fallback
-   Status indicator

------------------------------------------------------------------------

## Table

Định nghĩa:

-   Header
-   Row
-   Cell
-   Sorting
-   Filtering
-   Pagination
-   Selection
-   Empty state
-   Loading
-   Error
-   Responsive behavior

------------------------------------------------------------------------

## List

Định nghĩa:

-   Item spacing
-   Divider
-   Icon
-   Action
-   Selected state

------------------------------------------------------------------------

## Empty State

Định nghĩa:

-   Illustration
-   Title
-   Description
-   Primary action
-   Secondary action

------------------------------------------------------------------------

# 19. FEEDBACK

## Alert

Các loại:

``` text
Info
Success
Warning
Error
```

------------------------------------------------------------------------

## Toast

Định nghĩa:

-   Position
-   Duration
-   Queue
-   Close behavior
-   Action
-   Severity

------------------------------------------------------------------------

## Progress

Các loại:

``` text
Linear
Circular
Determinate
Indeterminate
```

------------------------------------------------------------------------

## Skeleton

Định nghĩa:

-   Shape
-   Animation
-   Duration
-   Loading structure

------------------------------------------------------------------------

## Spinner

Định nghĩa:

-   Size
-   Stroke
-   Animation
-   Usage

------------------------------------------------------------------------

# 20. OVERLAYS

## Modal / Dialog

Định nghĩa:

-   Width
-   Header
-   Body
-   Footer
-   Close button
-   Backdrop
-   Animation
-   Escape behavior
-   Focus trap

------------------------------------------------------------------------

## Drawer

Định nghĩa:

``` text
Left
Right
Top
Bottom
```

và:

-   Width
-   Backdrop
-   Animation
-   Mobile behavior

------------------------------------------------------------------------

## Dropdown / Popover

Định nghĩa:

-   Trigger
-   Position
-   Offset
-   Alignment
-   Animation
-   Keyboard navigation

------------------------------------------------------------------------

## Tooltip

Định nghĩa:

-   Delay
-   Position
-   Max width
-   Trigger
-   Accessibility

------------------------------------------------------------------------

# 21. NAVIGATION

## Header

Định nghĩa:

-   Height
-   Logo position
-   Navigation
-   Actions
-   User menu
-   Mobile behavior
-   Sticky behavior

------------------------------------------------------------------------

## Sidebar

Định nghĩa:

-   Width
-   Collapsed width
-   Header
-   Logo
-   Navigation item
-   Active item
-   Group
-   Footer
-   Mobile drawer
-   Breakpoint

------------------------------------------------------------------------

## Breadcrumb

Định nghĩa:

-   Separator
-   Item
-   Current page
-   Truncation

------------------------------------------------------------------------

## Tabs

Định nghĩa:

-   Horizontal / vertical
-   Active state
-   Disabled
-   Icon
-   Overflow
-   Mobile behavior

------------------------------------------------------------------------

## Pagination

Định nghĩa:

-   Page size
-   Current page
-   Previous / next
-   First / last
-   Ellipsis
-   Mobile behavior

------------------------------------------------------------------------

## Stepper

Định nghĩa:

-   Step
-   Active
-   Completed
-   Error
-   Disabled
-   Orientation

------------------------------------------------------------------------

# 22. LAYOUT

## Container

Định nghĩa:

-   Max width
-   Padding
-   Responsive behavior

------------------------------------------------------------------------

## Grid

Định nghĩa:

-   Columns
-   Gap
-   Rows
-   Responsive behavior

------------------------------------------------------------------------

## Flex / Stack

Định nghĩa:

-   Direction
-   Gap
-   Alignment
-   Justification
-   Wrap

------------------------------------------------------------------------

## Page Layout

Định nghĩa cấu trúc tổng thể:

``` text
Header
Sidebar
Main
Footer
```

Ví dụ:

``` text
Desktop:
Header 64px
Sidebar 240px
Main fluid

Mobile:
Header 56px
Sidebar → Drawer
Main → full width
```

------------------------------------------------------------------------

# 23. PATTERNS

Patterns là tầng nằm giữa Component và Page.

Component trả lời:

> "Cái này trông như thế nào?"

Pattern trả lời:

> "Các component này được kết hợp với nhau như thế nào?"

------------------------------------------------------------------------

# 24. PAGE TEMPLATES

Các cấu trúc trang hoàn chỉnh.

Ví dụ:

``` text
Dashboard
Settings
Authentication
Profile
Pricing
Documentation
Admin
Landing Page
```

Một Page Template có thể quy định:

``` text
Header
Sidebar
Content
Grid
Cards
Table
Footer
```

------------------------------------------------------------------------

# 25. SECTIONS

Các section có thể tái sử dụng:

``` text
Hero
Features
Pricing
Testimonials
FAQ
CTA
Footer
Stats
Data table
```

Mục đích là giúp AI không phải tự thiết kế section từ đầu.

------------------------------------------------------------------------

# 26. USE CASES

Đây là các luồng UI theo nghiệp vụ.

Ví dụ:

``` text
Login
Register
Forgot password
Create item
Edit item
Delete item
Search
Filter
Upload
Checkout
Confirmation
Error recovery
```

Use Case mô tả:

``` text
User action
→ UI state
→ Feedback
→ Success
→ Error
```

Đây là thông tin rất quan trọng để AI xây UX đúng.

------------------------------------------------------------------------

# 27. BRAND & ASSETS

## Logo & Brand

Định nghĩa:

-   Primary logo
-   Dark logo
-   Light logo
-   Symbol
-   Wordmark
-   Favicon
-   Minimum size
-   Clear space
-   Placement
-   Background restrictions

Ví dụ:

``` text
Header logo → left
Sidebar logo → top
Footer logo → center
```

AI không được tự ý thay đổi vị trí logo.

------------------------------------------------------------------------

# 28. ICON LIBRARY

Định nghĩa:

``` text
Library
Version
Default size
Stroke
Color
Naming
Usage rules
```

Ví dụ:

``` text
Lucide
20px
1.5 stroke
```

Có thể lưu mapping:

``` text
Search → Search
Settings → Settings
Delete → Trash2
```

AI sẽ sử dụng icon đúng tên thay vì tạo icon gần giống.

------------------------------------------------------------------------

# 29. ILLUSTRATIONS

Định nghĩa:

-   Illustration style
-   Stroke
-   Color
-   Aspect ratio
-   Usage
-   Empty state illustrations
-   Error illustrations

Ví dụ:

``` text
Style: Minimal line illustration
Primary color: Brand Primary
```

------------------------------------------------------------------------

# 30. IMAGES

Định nghĩa:

-   Image aspect ratio
-   Border radius
-   Object fit
-   Image sizes
-   Thumbnail sizes
-   Avatar crop
-   Responsive image behavior

------------------------------------------------------------------------

# 31. SYSTEM & OUTPUT

Đây là phần đặc biệt quan trọng vì nó biến UI Builder thành một hệ thống
có thể phục vụ Developer và AI.

------------------------------------------------------------------------

# 32. DESIGN TOKENS

Design Token là dữ liệu nền tảng của Design System.

Ví dụ:

``` json
{
  "color": {
    "primary": "#6366F1"
  },
  "spacing": {
    "md": "16px"
  },
  "radius": {
    "md": "8px"
  }
}
```

Token nên được chia thành:

``` text
Primitive Tokens
Semantic Tokens
Component Tokens
```

Ví dụ:

``` text
blue-500
↓
color-primary
↓
button-primary-background
```

------------------------------------------------------------------------

# 33. RULES & GUIDELINES

Đây là các quy tắc sử dụng Design System.

Ví dụ:

``` text
Use semantic colors.
Do not use arbitrary HEX values.
Use spacing tokens only.
Do not create custom shadows.
Use approved icon library.
Use existing button variants.
```

Có thể chia:

``` text
General Rules
Color Rules
Typography Rules
Spacing Rules
Component Rules
Layout Rules
Responsive Rules
Accessibility Rules
```

------------------------------------------------------------------------

# 34. AI INSTRUCTIONS

Đây là phần dành trực tiếp cho AI.

Nó có thể chứa:

## Allowed

``` text
Use existing components.
Use defined tokens.
Use approved icons.
Follow responsive rules.
Follow accessibility requirements.
```

## Forbidden

``` text
Do not invent colors.
Do not invent spacing.
Do not create new radius values.
Do not create custom components when an existing component exists.
Do not use an unapproved icon library.
Do not override design tokens without permission.
```

## Priority

Có thể định nghĩa thứ tự ưu tiên:

``` text
1. Design System Rules
2. Component Rules
3. Pattern Rules
4. Page Requirements
5. User Request
```

Điều này giúp AI xử lý xung đột.

------------------------------------------------------------------------

# 35. IMPORT / EXPORT

Cho phép:

``` text
Import JSON
Export JSON
Import Theme
Export Theme
Import Design Tokens
Export Design Tokens
```

Có thể hỗ trợ:

``` text
JSON
CSS Variables
Tailwind config
SCSS variables
Design Specification Markdown
```

------------------------------------------------------------------------

# 36. DESIGN SPECIFICATION

Đây là output cuối cùng.

Hệ thống nên xuất một tài liệu có cấu trúc như:

``` text
1. Project Overview
2. Theme
3. Color System
4. Typography
5. Spacing
6. Sizing
7. Radius
8. Shadow
9. Icons
10. Breakpoints
11. Motion
12. Accessibility
13. Components
14. Patterns
15. Layout
16. Navigation
17. Brand
18. Responsive Rules
19. Usage Rules
20. DO / DON'T
21. AI Instructions
22. Design Tokens
```

Tài liệu này phải có khả năng trở thành:

> **Single Source of Truth cho Developer và AI.**

------------------------------------------------------------------------

# 37. Một Component Specification chuẩn nên chứa gì?

Ví dụ Button:

``` text
Button

Purpose:
Primary action component.

Variants:
- Primary
- Secondary
- Outline
- Ghost
- Destructive

Sizes:
- SM
- MD
- LG

States:
- Default
- Hover
- Focus
- Active
- Disabled
- Loading

Tokens:
- Background
- Foreground
- Border
- Radius
- Padding
- Height
- Font
- Icon size
- Gap

Behavior:
- Hover transition: 150ms
- Focus ring: 2px
- Loading disables interaction

Accessibility:
- Keyboard accessible
- Visible focus
- Accessible label required for icon-only button

DO:
- Use existing variants.
- Use token-based spacing.

DON'T:
- Create custom button colors.
- Create arbitrary dimensions.
```

Đây chính là level thông tin mà AI cần.

------------------------------------------------------------------------

# 38. Mối quan hệ giữa các tầng

Một Design System tốt không nên là một danh sách rời rạc.

Quan hệ nên là:

``` text
FOUNDATION
    ↓
TOKENS
    ↓
COMPONENT
    ↓
PATTERN
    ↓
PAGE
    ↓
USER FLOW
```

Ví dụ:

``` text
Primary Color
      ↓
color.primary
      ↓
Button.Primary
      ↓
Search Form
      ↓
Search Page
      ↓
Search Use Case
```

Khi thay đổi Primary Color, hệ thống phải biết component nào và pattern
nào bị ảnh hưởng.

------------------------------------------------------------------------

# 39. Điều quan trọng nhất đối với AI

Design System không nên chỉ lưu:

``` text
Button = purple
```

Mà phải lưu:

``` text
Button.Primary.background = color.primary
Button.Primary.foreground = color.primary.foreground
Button.Primary.radius = radius.md
Button.Primary.height = control.md
Button.Primary.paddingX = spacing.4
Button.Primary.font = typography.label
Button.Primary.hover = color.primary.hover
Button.Primary.focus = color.focus
```

Như vậy AI có thể **suy luận từ token và rule**, thay vì tự sáng tạo.

------------------------------------------------------------------------

# 40. Kết luận

Sidebar của UI Kit Standard nên được xem như một **cây tri thức của toàn
bộ Design System**, không phải chỉ là menu điều hướng.

Cấu trúc đề xuất:

``` text
PROJECT & THEME

FOUNDATIONS
├── Colors
├── Typography
├── Spacing & Sizing
├── Radius & Shadow
├── Icons
├── Breakpoints
├── Motion
├── Z-Index
└── Accessibility

COMPONENTS
├── Actions
├── Forms
├── Data Display
├── Feedback
├── Overlays
├── Navigation
└── Layout

PATTERNS
├── Page Templates
├── Sections
└── Use Cases

BRAND & ASSETS
├── Logo & Brand
├── Icon Library
├── Illustrations
└── Images

SYSTEM & OUTPUT
├── Design Tokens
├── Rules & Guidelines
├── AI Instructions
├── Import / Export
└── Design Specification
```

Nếu triển khai đúng cấu trúc này, hệ thống sẽ không còn đơn thuần là
**Theme Builder**.

Nó sẽ trở thành một:

> **Design System Builder + UI Governance + AI Source of Truth**

và đây mới là hướng phù hợp với mục tiêu **Vibe Coding nhưng AI không
được tự ý sáng tạo UI**.
