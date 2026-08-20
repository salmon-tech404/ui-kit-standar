# UI Kit Standard — Live Preview / Demo Website Specification

> Mục tiêu: biến canvas demo hiện tại (1 landing page tĩnh) thành 1 **production-ready SaaS application preview** đầy đủ — nơi user thấy chính xác Design System sẽ trông ra sao khi áp dụng vào 1 website thật, và AI có thể đọc để hiểu không chỉ token mà cả usage rules, hierarchy, và interaction behavior.

---

## 🆕 Phần mới bổ sung ở bản này (chưa có trong các bản trước)

- Chart/Graph token standard (cho Dashboard)
- Notification Preferences page
- CSV/Bulk Import mapping flow
- Accessibility Settings panel (user-facing, khác Accessibility Foundation)
- Generic Multi-step Wizard pattern (tái sử dụng, khác Onboarding cụ thể)
- Nested Sidebar Navigation (group có thể expand/collapse, không chỉ flat list)
- Language/Locale Switcher
- Token Change Comparison/Diff View (liên quan versioning XML)
- Duplicate/Clone action pattern
- Help & Support Widget (contextual help, chat bubble)
- Print-friendly Invoice layout

---

## 1. Application Shell & Navigation

- **Public Nav** (marketing site) — Logo, menu ngang, CTA button, mobile hamburger.
- **App Shell** (dashboard) — Sidebar + Topbar kết hợp:
  - Sidebar: **Nested Navigation** — nhóm menu có thể expand/collapse (không chỉ flat list phẳng), icon + label, active state, badge số (vd "Inbox 12").
  - Sidebar collapse/expand toàn bộ (mini-rail icon-only ↔ full width), trạng thái pin/unpin.
  - Topbar: Breadcrumb, Global Search, Notification Bell, **Language/Locale Switcher**, Theme toggle (Light/Dark/System), Avatar + User Menu.
  - **Organization/Workspace Switcher** — dropdown góc trên trái, avatar tổ chức, nút "+ Tạo workspace mới".
- **Footer đầy đủ** — multi-column (Product/Company/Legal/Social), copyright, không chỉ 1 dòng.
- Responsive: Sidebar → Drawer trên mobile, Topbar rút gọn, Bottom nav (tùy chọn) cho mobile app-like experience.

## 2. Marketing/Public Page Sections (đã có — giữ nguyên)

Navbar, Hero, CTA, Comparison Card, Feature Grid (3-6 card lặp), Pricing Table (3 card + Button trong context khác nhau), Testimonials/Stats, Footer.

## 3. Dashboard & Data Display

- **Statistics Cards** — số liệu lớn + trend indicator (↑12% màu Success / ↓5% màu Error).
- **Chart/Graph Standards** (mới) — Line/Bar/Area/Donut/Pie chart, màu sắc **bắt buộc lấy từ Design Token** (không hard-code hex riêng cho chart), legend style, tooltip on hover khớp token chung, empty-data state riêng cho chart.
- **Data Table** — sort, filter, Badge trạng thái, Avatar, action menu mỗi row, **Sticky Header + Footer Totals**, responsive (card layout trên mobile).
- **Search & Filter** — filter chip có thể xóa từng cái, "Clear all filters", filter panel dạng Drawer trên mobile.
- **Pagination** vs **Infinite Scroll** vs **Load More** — định nghĩa rõ khi nào dùng loại nào.
- **Recent Activity / Activity Feed** — timeline dạng feed, icon theo loại hành động.
- **Master-Detail Split View** — layout 2 cột (list trái/chi tiết phải).
- **Global Search Results Page** — trang kết quả đầy đủ, filter theo loại (Project/File/Member).

## 4. Forms & Inputs

Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, Date Picker, File Upload/Dropzone, Input Group — đầy đủ state Default/Focus/Error/Success/Disabled/Loading.

- **Form Validation** — inline error message, error summary ở đầu form cho form dài.
- **Two-column vs Single-column layout** — quy tắc khi nào dùng layout nào theo độ dài form.
- **Multi-step Wizard (generic, tái sử dụng)** — khác Onboarding cụ thể: Stepper header + Back/Next + "Lưu nháp" + validate từng bước trước khi next.
- **CSV/Bulk Import Flow** (mới) — Upload file → map cột (source column → target field) → preview data → xác nhận import → kết quả (X thành công / Y lỗi).
- **Inline Editing** — click cell/text → thành Input tại chỗ, Enter lưu, Esc hủy.

## 5. Button System

Primary/Secondary/Outline/Ghost/Destructive/Link × XS/SM/MD/LG/XL, Icon Button, Loading Button — đầy đủ state.

- Quy tắc: mỗi màn hình chỉ 1 Primary; Destructive luôn kèm Confirmation.
- **Duplicate/Clone action** — pattern nút phổ biến trong CRUD, khác Edit/Delete (icon riêng, không mở form mà tạo bản sao ngay).

## 6. Feedback & Notification Family

- **Alert** (inline, cố định) — Info/Success/Warning/Error, có/không Dismiss, có/không action button.
- **Toast** (tạm thời, góc màn hình) — Success/Error/Warning/Info/Loading/Action, duration khác nhau theo loại, stacking behavior, **Optimistic UI + Undo Toast**.
- **Notification Bell + Unread Badge → Notification Center** (dropdown/panel) — đã đọc/chưa đọc, "Đánh dấu tất cả đã đọc".
- **Notification Preferences page** (mới) — Settings sub-page: bảng toggle theo kênh (Email/Push/In-app) × loại thông báo (Mentions/Updates/Billing...).
- Progress Bar, Circular Progress, Spinner, Skeleton.
- **Empty State** (phân loại theo nguyên nhân: chưa có data / không có quyền / lần đầu dùng — mỗi loại illustration+message khác nhau), **Error State**, **Loading State**.

## 7. Overlays & Floating UI

Tooltip (Top/Bottom/Left/Right, auto-flip), Popover, Dropdown Menu, Context Menu (right-click), Command Menu (Cmd/Ctrl+K), Modal/Dialog, **Confirmation Dialog** (2 nút, không có X), **Destructive Dialog**, Drawer/Sheet.

- **Nguyên tắc kỹ thuật:** dùng library cho positioning/accessibility (Floating UI hoặc Radix UI), styling (màu/radius/shadow/spacing/animation) điều khiển hoàn toàn bởi Design Token — không hard-code riêng từng component.

## 8. Display & Identity Components

Badge, Tag, Chip, Avatar, **Avatar Group**, User Menu, Card variations (Profile/Pricing/Content), Accordion, Collapsible, Stepper, Timeline, Calendar, File List, Code Block + Copy Button, Status Indicator, Rating, Slider.

## 9. SaaS-Specific Pages

Onboarding flow (welcome → wizard → checklist), Billing & Subscription (bảng gói, payment method, invoice history), **Print-friendly Invoice layout** (mới — tách riêng CSS cho in ấn/PDF export), Usage & Quota Dashboard (progress bar credit, đổi màu theo % dùng), Team/Member Management (role, trạng thái mời), API Keys page, Integrations/Webhooks grid, Audit Log, Error Pages (404/500/403/Maintenance), Feature Gating/Upgrade Prompt (overlay khóa + CTA nâng cấp).

- **Accessibility Settings panel** (mới) — trang riêng cho user tự chỉnh: font size, reduce motion, high contrast — khác Accessibility Foundation (dành cho dev/AI), đây là control dành cho end-user.
- **Token Change Comparison/Diff View** (mới) — vì XML có versioning: màn hình so sánh "trước/sau" khi đổi token (đặc biệt hữu ích khi user chỉnh Primary Color, xem trực quan cái gì bị ảnh hưởng).

## 10. Advanced Interaction Patterns (hành vi, không phải component tĩnh)

Bulk Selection + Action Toolbar nổi, Drag & Drop Reorder (ghost state, drop zone), Real-time Presence Indicator (avatar stack).

## 11. Edge States (hay bị bỏ quên nhất)

Session Timeout Warning, Offline/Connection Lost banner, Empty Search Results (khác Empty State thường), Partial Error State (1 phần lỗi/1 phần OK), Stale Data Indicator (refetch ngầm), Rate Limited/Locked Account banner.

## 12. Specialized Widgets

Cookie Consent Banner, What's New/Changelog Panel, Feedback Widget (nút nổi), **Help & Support Widget** (mới — contextual help icon cạnh field khó hiểu, chat bubble góc màn hình mở support chat), Password Strength Indicator + Social Login buttons, Multi-Factor Auth (OTP 6 số), Keyboard Shortcuts Modal (bấm `?`).

---

## 13. Cấu trúc hiển thị đề xuất (không nhồi tất cả vào 1 trang cuộn dài)

```
Page Template Switcher (tab chuyển đổi, dùng chung 1 bộ token):
[ Landing ] [ Dashboard ] [ Data/Table Page ] [ Settings ] [ Billing ]
[ Auth (Login/Register/MFA) ] [ Onboarding ] [ Error Pages ]
```

- Mỗi "hành vi nâng cao" (Bulk Select, Undo Toast, Drag&Drop, Session Timeout...) nên có **nút demo riêng** để user chủ động kích hoạt xem, không cố định hiển thị tĩnh — vì bản chất là hành vi, không phải hình ảnh.
- **Kitchen Sink** — khu vực riêng (toggle ẩn/hiện) liệt kê toàn bộ biến thể Button/Badge/Input theo ma trận variant × size × state, để user thấy hết 1 lần không cần suy luận qua page mẫu.
- Toàn bộ Preview phải phản ứng real-time khi đổi token: đổi Primary Color → Button/Link/Active Nav/Badge/Progress/Focus Ring đổi theo; đổi Radius → Button/Input/Card/Dialog/Dropdown/Alert đồng bộ; đổi Light/Dark → toàn Preview chuyển theo.
