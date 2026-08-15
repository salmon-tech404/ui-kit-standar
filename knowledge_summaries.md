# TỔNG HỢP KIẾN THỨC & QUY CHUẨN THIẾT KẾ UI/UX TỐI ƯU
### Nền Tảng Tri Thức Chuẩn Quốc Tế Cho Dự Án **UI Kit Standard**
*Được đúc kết và diễn giải chuyên sâu từ 5 cuốn sách kinh điển về UI/UX, Design Systems, Tâm lý học Hành vi và Kỹ nghệ AI.*

---

# MỤC LỤC TỔNG QUAN

- [PHẦN 1: TÓM TẮT & DIỄN GIẢI CHI TIẾT TỪNG CHƯƠNG CỦA 5 CUỐN SÁCH](#phần-1-tóm-tắt--diễn-giải-chi-tiết-từng-chương-của-5-cuốn-sách)
  - [1. Designing Interfaces (3rd Edition) — Jenifer Tidwell, Charles Brewer, Aynne Valencia](#1-designing-interfaces-3rd-edition--jenifer-tidwell-charles-brewer-aynne-valencia)
  - [2. Laws of UX (2nd Edition) — Jon Yablonski](#2-laws-of-ux-2nd-edition--jon-yablonski)
  - [3. Fixing Bad UX Designs — Lisandra Maioli](#3-fixing-bad-ux-designs--lisandra-maioli)
  - [4. Beyond Vibe Coding](#4-beyond-vibe-coding)
  - [5. Prompt Engineering for Generative AI — James Phoenix, Mike Taylor](#5-prompt-engineering-for-generative-ai--james-phoenix-mike-taylor)
- [PHẦN 2: BỘ QUY CHUẨN THIẾT KẾ TỐI ƯU CHO UI KIT STANDARD](#phần-2-bộ-quy-chuẩn-thiết-kế-tối-ưu-cho-ui-kit-standard)
  - [1. Quy Chuẩn Kích Thước & Chiều Cao Đồng Bộ (Vertical Rhythm & Control Sync)](#1-quy-chuẩn-kích-thước--chiều-cao-đồng-bộ-vertical-rhythm--control-sync)
  - [2. Quy Chuẩn Không Gian & Thang Spacing (8-Point Grid System)](#2-quy-chuẩn-không-gian--thang-spacing-8-point-grid-system)
  - [3. Quy Chuẩn Hình Học Bo Góc Đồng Tâm (Concentric Border Radius)](#3-quy-chuẩn-hình-học-bo-góc-đồng-tâm-concentric-border-radius)
  - [4. Quy Chuẩn Màu Sắc 3 Lớp & Độ Tương Phản WCAG 2.1](#4-quy-chuẩn-màu-sắc-3-lớp--độ-tương-phản-wcag-21)
  - [5. Ma Trận 6 Trạng Thái Bắt Buộc Của Component (State Matrix)](#5-ma-trận-6-trạng-thái-bắt-buộc-của-component-state-matrix)
  - [6. Quy Chuẩn Quản Trị Icon & Tài Nguyên (Asset Governance)](#6-quy-chuẩn-quản-trị-icon--tài-nguyên-asset-governance)
  - [7. Bộ Luật Thép Bất Biến Cho AI Vibe Coding (RFC 2119 Constraints)](#7-bộ-luật-thép-bất-biến-cho-ai-vibe-coding-rfc-2119-constraints)

---

# PHẦN 1: TÓM TẮT & DIỄN GIẢI CHI TIẾT TỪNG CHƯƠNG CỦA 5 CUỐN SÁCH

---

## 1. Designing Interfaces (3rd Edition) — Jenifer Tidwell, Charles Brewer, Aynne Valencia
> **Định vị:** Cuốn "Kinh thánh" về giải phẫu học Component, cấu trúc bố cục, nhịp điệu không gian và hệ thống Atomic Design.

### Chương 1: Designing for People (Thiết kế vì Con người)
* **Bản chất cốt lõi:** Giao diện người dùng là một cuộc đối thoại liên tục giữa người và máy.
* **Các đặc tính tâm lý học hành vi:**
  * *Safe Exploration (Khám phá an toàn):* Người dùng thích thử bấm vào các nút mới nếu họ biết họ có thể hoàn tác (Undo/Back/Cancel) mà không sợ hỏng dữ liệu.
  * *Satisficing (Thỏa hiệp chấp nhận được):* Người dùng không đọc toàn bộ trang web; họ lướt mắt (*scan*) tìm kiếm từ khóa hoặc nút bấm đầu tiên trông có vẻ phù hợp để nhấn ngay.
  * *Habituation (Thói quen hóa):* Khi thao tác lặp lại nhiều lần, người dùng làm theo phản xạ cơ bắp mà không cần nhìn kỹ (ví dụ: nút "Tiếp tục" luôn ở góc dưới bên phải).
  * *Spatial & Prospective Memory:* Trí nhớ không gian giúp người dùng nhớ vị trí của nút chức năng trên màn hình hơn là nhớ tên gọi của nó.

### Chương 2: Organizing the Content: IA & App Structure (Kiến trúc Thông tin & Cấu trúc Ứng dụng)
* **Nguyên tắc MECE (Mutually Exclusive, Collectively Exhaustive):** Các danh mục điều hướng phải tách bạch nhau hoàn toàn, không chồng chéo nhưng phải bao quát hết mọi trường hợp.
* **4 Kiểu Màn Hình Cơ Bản của Mọi Ứng Dụng:**
  1. *Overview (Tổng quan/Dashboard):* Hiển thị nhiều dữ liệu tóm tắt, thẻ chỉ số (KPI cards), biểu đồ và danh sách tổng thể.
  2. *Focus (Tập trung):* Hiển thị chi tiết sâu về 1 đối tượng duy nhất (ví dụ: Trang chi tiết sản phẩm, chi tiết hồ sơ).
  3. *Make (Công cụ kiến tạo/Editor):* Không gian làm việc có bảng màu, công cụ và vùng canvas (giống Figma, Photoshop, hoặc chính UI Kit Standard).
  4. *Do (Thực hiện tác vụ/Wizard):* Hướng dẫn người dùng qua một chuỗi các bước tuyến tính (Checkout, Onboarding).

### Chương 3: Getting Around: Navigation, Signposts & Wayfinding (Điều hướng & Định vị)
* **Phân lớp Điều hướng:**
  * *Global Navigation:* Thanh điều hướng chính (Header/Sidebar) xuất hiện xuyên suốt mọi trang.
  * *Utility Navigation:* Các công cụ phụ trợ (Chuyển Theme, Thông báo, Đổi ngôn ngữ, Tài khoản cá nhân).
  * *Breadcrumbs:* Biển chỉ đường giúp người dùng biết mình đang ở cấp độ sâu bao nhiêu trong cấu trúc website.
* **Quy tắc:** Giảm khoảng cách nhận thức; không tạo cấu trúc cây thư mục quá 3 tầng sâu ($Depth \le 3$).

### Chương 4: Layout of Screen Elements (Bố cục Thành phần Giao diện)
* **Ứng dụng 4 Định luật Gestalt:**
  * *Proximity (Gần gũi):* Các phần tử đặt gần nhau thì được coi là cùng một nhóm logic.
  * *Similarity (Đồng nhất):* Các phần tử có cùng màu sắc, kích thước và bo góc được xem là có cùng vai trò.
  * *Continuity (Liên tục):* Mắt người luôn đi theo các đường gióng thẳng hàng.
  * *Closure (Bao bọc):* Khung card hoặc đường viền phân tách các nhóm thông tin độc lập.
* **Progressive Disclosure (Tiết lộ thông tin lũy tiến):** Chỉ hiển thị những gì thiết yếu nhất; giấu các tùy chọn nâng cao sau nút "Xem thêm" hoặc "Advanced Settings" để tránh làm người dùng choáng ngợp.

### Chương 5: Visual Style and Aesthetics (Phong cách Thị giác & Thẩm mỹ)
* **Modular Typography Scale:** Cỡ chữ phải tăng theo tỷ lệ toán học chuẩn (Major Third 1.25 hoặc Perfect Fourth 1.333), ví dụ: 12px $\rightarrow$ 14px $\rightarrow$ 16px $\rightarrow$ 20px $\rightarrow$ 24px $\rightarrow$ 32px $\rightarrow$ 48px.
* **Quy tắc Phối màu 60 - 30 - 10:** 60% màu nền trung tính (Neutral background/surface), 30% màu cấu trúc (Text/Border), 10% màu nhấn thương hiệu (Primary accent/CTA).

### Chương 6: Mobile Interfaces (Giao diện Di động & Cảm ứng)
* **Touch Targets:** Vùng bấm trên màn hình cảm ứng tối thiểu phải từ **44px đến 48px** để tránh bấm nhầm.
* **Bottom Navigation:** Đặt các điều hướng quan trọng nhất ở cạnh đáy màn hình để ngón tay cái dễ dàng thao tác (Thumb zone).

### Chương 7: Lists of Things (Hiển thị Danh sách)
* **Quy tắc chọn mẫu hiển thị:**
  * Dùng **Table (Bảng)** khi cần so sánh các hàng dữ liệu có nhiều thuộc tính số học.
  * Dùng **Card Grid (Lưới thẻ)** khi mỗi mục có hình ảnh đại diện và thông tin thị giác quan trọng.
  * Luôn đi kèm **Phân trang chuẩn (Pagination)** hoặc **Infinite Scroll** kèm chỉ báo vị trí.

### Chương 8: Doing Things: Actions and Commands (Hành động & Nút bấm)
* **Hệ thống Nút bấm & Phân cấp (Button Hierarchy):**
  * *Primary:* 1 nút duy nhất nổi bật nhất màn hình (Filled).
  * *Secondary:* Nút hỗ trợ (Outlined hoặc Soft).
  * *Tertiary/Ghost:* Nút phụ trợ (Chỉ có chữ/icon).
  * *Destructive:* Nút xóa/hành động nguy hiểm (Màu đỏ cảnh báo).
* **Trạng thái bắt buộc:** Default, Hover, Active, Disabled, Loading.

### Chương 9: Showing Complex Data (Trình diễn Dữ liệu Phức tạp)
* **Faceted Search & Filtering:** Cho phép lọc đa chiều (kết hợp checkbox, slider giá, khoảng ngày).
* **Sorting:** Biểu tượng sắp xếp tăng/giảm rõ ràng ở đầu cột bảng.

### Chương 10: Getting Input from Users: Forms & Controls (Biểu mẫu & Ô nhập liệu)
* **Forgiving Format:** Hệ thống nên tự động chuẩn hóa định dạng (ví dụ: tự loại bỏ dấu cách trong số điện thoại).
* **Inline Validation:** Báo lỗi ngay cạnh ô input bị sai kèm theo hướng dẫn sửa cụ thể; không chỉ đổi màu đỏ mà phải có text giải thích.
* **Đồng bộ Chiều cao:** Chiều cao của Ô nhập liệu (Input), Hộp chọn (Select) và Nút bấm (Button) phải tuyệt đối bằng nhau.

### Chương 11: UI Systems and Atomic Design (Hệ thống UI & Thiết kế Nguyên tử)
* **Mô hình 5 Cấp độ:**
  1. *Atoms (Nguyên tử):* Màu sắc, Font chữ, Spacing, Border Radius, Icon.
  2. *Molecules (Phân tử):* Nút bấm (kết hợp text + icon + radius + color), Input search.
  3. *Organisms (Sinh vật):* Header, Sidebar, Card sản phẩm, Bảng dữ liệu.
  4. *Templates (Mẫu khung):* Layout tổng thể chưa có dữ liệu thật (Wireframe).
  5. *Pages (Trang hoàn chỉnh):* Giao diện hoàn chỉnh với dữ liệu thật.

### Chương 12: Beyond and Behind the Screen (Giao diện Tương lai)
* Xây dựng hệ thống UI có khả năng mở rộng, hỗ trợ theme linh hoạt, thích ứng với ngữ cảnh và sẵn sàng cho các công cụ tự động hóa.

---

## 2. Laws of UX (2nd Edition) — Jon Yablonski
> **Định vị:** Bộ luật tâm lý học thị giác xác lập các ràng buộc logic, giúp sản phẩm thân thiện với não bộ người dùng.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               12 ĐỊNH LUẬT TÂM LÝ HỌC UX                               │
├─────────────────────────┬──────────────────────────────────────────────────────────────┤
│ 1. Jakob's Law          │ Người dùng kỳ vọng sản phẩm vận hành giống các trang họ quen.│
│ 2. Fitts's Law          │ Mục tiêu bấm càng lớn và càng gần thì bấm càng nhanh và chuẩn│
│ 3. Miller's Law         │ Não người chỉ xử lý được 7 ± 2 cụm thông tin cùng lúc.       │
│ 4. Hick's Law           │ Càng nhiều lựa chọn thì thời gian ra quyết định càng lâu.    │
│ 5. Postel's Law         │ Hào phóng khi nhận dữ liệu, nhưng nghiêm ngặt khi xuất chuẩn.│
│ 6. Peak-End Rule        │ Người dùng chỉ nhớ điểm thăng hoa nhất và điểm kết thúc.     │
│ 7. Aesthetic-Usability  │ Giao diện đẹp khiến người dùng cảm thấy dễ dùng và đáng tin. │
│ 8. Von Restorff Effect  │ Phần tử khác biệt nhất (như nút Primary) sẽ được chú ý nhất. │
│ 9. Tesler's Law         │ Độ phức tạp không tự mất đi, hệ thống phải gánh thay user.   │
│ 10. Doherty Threshold   │ Tốc độ phản hồi < 400ms giữ cho người dùng không bị mất tập  │
│                         │ trung; nếu lâu hơn bắt buộc phải có Loading/Skeleton.        │
│ 11. Psychology & System │ Liên kết trực tiếp các định luật tâm lý vào Design Tokens.   │
│ 12. Ethics & Dark Pats  │ Tuyệt đối loại bỏ các bẫy giao diện (Dark Patterns).         │
└─────────────────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 3. Fixing Bad UX Designs — Lisandra Maioli
> **Định vị:** Cẩm nang phòng ngừa lỗi giao diện (Anti-Patterns), tiêu chuẩn tiếp cận WCAG 2.1 và bộ đo sức khỏe hệ thống.

* **Chương 1–4: Nhận diện Lỗi & Tối ưu Luồng Chuyển Đổi:**
  * *Lỗi cấm kỵ:* Quá nhiều nút bấm cùng một màu khiến người dùng không biết đâu là hành động chính; thiếu các khoảng trắng đệm (White space) làm giao diện ngột ngạt.
* **Chương 5: Sửa lỗi UI & Typography:**
  * Không dùng quá 2 font chữ trên một sản phẩm.
  * Cỡ chữ văn bản đọc (Body text) không bao giờ được nhỏ hơn `14px` (chuẩn web là `16px`).
  * Chiều cao dòng (*line-height*) phải đạt từ `1.4` đến `1.6` lần cỡ chữ để dễ đọc.
* **Chương 6: Tiêu chuẩn Tiếp cận Toàn diện (WCAG 2.1 Accessibility):**
  * **Tỷ lệ Tương phản Màu (Color Contrast Ratio):**
    - Đạt chuẩn **AA**: Tỷ lệ tối thiểu **4.5:1** cho văn bản thường, **3:1** cho văn bản lớn ($\ge 18px$ hoặc $\ge 14px$ in đậm) và các thành phần đồ họa tương tác.
    - Đạt chuẩn **AAA**: Tỷ lệ tối thiểu **7:1** cho văn bản thường.
  * **Focus Ring:** Bắt buộc có viền sáng rõ ràng (`outline: 2px solid`) khi người dùng điều hướng bằng bàn phím (Phím Tab).
* **Chương 9–11: Ma trận Trạng thái Hệ thống (State Inventory) & QA:**
  * Mọi thành phần tương tác bắt buộc phải có đầy đủ 6 trạng thái: **Default**, **Hover**, **Focus-Visible**, **Active**, **Disabled**, **Loading**.
  * Thiếu trạng thái Error hoặc Empty State bị coi là lỗi nghiêm trọng (Critical UX Flaw).
* **Chương 12: Khung Đo lường HEART:**
  * Đo lường tính ổn định và sự hài lòng qua: *Happiness, Engagement, Adoption, Retention, Task Success*.

---

## 4. Beyond Vibe Coding
> **Định vị:** Chuyển dịch từ "Vibe Coding ngẫu hứng, hên xui" sang "Kỹ nghệ Phần mềm có Kiểm soát và Hợp đồng Giao diện Chặt chẽ (Design Governance)".

* **Chương 1–2: Phổ Lập Trình AI & Nghệ Thuật Prompting Ràng Buộc:**
  * *Vibe Coding thuần túy:* Lập trình bằng lời nói tự do $\rightarrow$ Dễ dẫn đến việc AI tự chế màu sắc, tự chế khoảng cách, làm vỡ hệ thống giao diện.
  * *AI-Assisted Engineering:* Sử dụng tài liệu **Design Specification** đóng vai trò là "Bản hợp đồng" (Contract). AI chỉ được phép chọn trong danh mục Tokens và Components đã định nghĩa sẵn.
* **Chương 3: The 70% Problem (Bài toán 70%):**
  * AI có thể tạo ra 70% giao diện rất nhanh, nhưng 30% còn lại (giao diện nhất quán, responsive chuẩn, tương phản chuẩn, xử lý edge cases) sẽ thất bại nếu không có **Source of Truth**.
* **Chương 4–7: Xây dựng Web App với Hợp đồng UI vững chắc:**
  * Thiết lập ranh giới (Boundaries) rõ ràng giữa Design Tokens và Logic code.
* **Chương 8–11: Autonomous Agents & Tương lai Quản trị Thiết kế:**
  * Khi các Agent chạy ngầm (như Cursor, Claude, Windsurf) phát triển phần mềm, chúng cần một file định chuẩn duy nhất (`design-system.json` hoặc `design-spec.md`) để làm bộ quy tắc kiểm tra tự động (Linter).

---

## 5. Prompt Engineering for Generative AI — James Phoenix, Mike Taylor
> **Định vị:** Kỹ thuật cấu trúc Prompt và Định dạng Schema để AI hiểu 100% tài liệu Design Spec mà không bị ảo giác (Zero Hallucination).

* **Chương 1: 5 Nguyên Tắc Vàng của Prompt Engineering:**
  1. *Give Direction:* Gán vai trò cụ thể cho AI (*"Bạn là Senior Frontend Engineer tuân thủ nghiêm ngặt Design System"*).
  2. *Specify Format:* Yêu cầu định dạng xuất ra rõ ràng (JSON Schema, CSS Variables, Markdown Tables).
  3. *Provide Examples (Few-Shot):* Đưa ra các ví dụ cụ thể về cách dùng token đúng và sai.
  4. *Evaluate Quality:* Thiết lập tiêu chuẩn kiểm định (Pass/Fail criteria).
  5. *Divide Labor:* Tách biệt cấu hình: Tokens riêng $\rightarrow$ Components riêng $\rightarrow$ Layout riêng.
* **Chương 2–3: Cấu trúc Ràng buộc Kỹ thuật (RFC 2119 Standards):**
  * Sử dụng các từ khóa tối thượng trong bản đặc tả cho AI:
    - **MUST / SHALL:** Bắt buộc tuân thủ 100%.
    - **MUST NOT:** Nghiêm cấm tuyệt đối.
    - **SHOULD:** Khuyến nghị thực hiện.
    - **MAY:** Tùy chọn nếu cần.
* **Chương 4–6: Chain-of-Thought & ReAct Framework:**
  * Ép AI lập luận từng bước trước khi viết mã:
    *Bước 1: Tra cứu token màu $\rightarrow$ Bước 2: Tra cứu token chiều cao $\rightarrow$ Bước 3: Áp dụng bo góc $\rightarrow$ Bước 4: Kiểm tra trạng thái.*

---

# PHẦN 2: BỘ QUY CHUẨN THIẾT KẾ TỐI ƯU CHO UI KIT STANDARD

Dựa trên sự đúc kết từ 5 cuốn sách trên, đây là **Hệ Thống Tiêu Chuẩn Vàng Bất Biến (The Master Standard)** được tích hợp vào kiến trúc của **UI Kit Standard**:

---

## 1. Quy Chuẩn Kích Thước & Chiều Cao Đồng Bộ (Vertical Rhythm & Control Sync)
*(Đúc kết từ Designing Interfaces Ch. 8, 10 & Laws of UX - Fitts's Law)*

Tất cả các thành phần tương tác cùng hàng (Button, Input Text, Select Dropdown, Datepicker) **bắt buộc phải có chiều cao đồng bộ tuyệt đối**:

| Kích Thước Variant | Chiều Cao Chuẩn | Cỡ Chữ (Font Size) | Kích Thước Icon | Padding Ngang (X) | Ứng Dụng Thực Tế |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Small (SM)** | `32px` | `13px` | `16px` | `12px` | Bảng dữ liệu dày đặc, Toolbar, Badge action |
| **Medium (MD) ★** | `40px` | `14px` | `18px` | `16px` | **Chuẩn mặc định cho toàn bộ Web App & SaaS** |
| **Large (LG)** | `48px` | `16px` | `20px` | `20px` | Trang Landing Page, Form Hero, Mobile Touch |

---

## 2. Quy Chuẩn Không Gian & Thang Spacing (8-Point Grid System)
*(Đúc kết từ Laws of UX - Law of Proximity & Miller's Law)*

**CẤM TUYỆT ĐỐI các số lẻ ngẫu nhiên (như 7px, 9px, 13px, 17px).** Mọi khoảng cách lề (Margin), đệm (Padding), và khoảng cách giữa các phần tử (Gap) đều phải tuân theo thang đo bội số của 4 và 8:

```
Thang Spacing Chuẩn:
--space-0  : 0px
--space-1  : 4px   (Khoảng cách vi mô giữa Icon và Label nhỏ)
--space-2  : 8px   (Gap chuẩn giữa Icon và Chữ trong Button/Badge)
--space-3  : 12px  (Đệm trong của các component nhỏ)
--space-4  : 16px  (Khoảng cách chuẩn giữa các ô Form, Padding trong Card nhỏ)
--space-5  : 20px  (Padding chuẩn của Card Dashboard)
--space-6  : 24px  (Khoảng cách giữa các khối nội dung, Grid Gutter chuẩn)
--space-8  : 32px  (Khoảng cách giữa các Section trong trang)
--space-10 : 40px  (Khoảng cách lớn phân đoạn màn hình)
--space-12 : 48px  (Khoảng đệm đầu trang / Hero banner)
--space-16 : 64px  (Khoảng đệm phân cách các Section lớn trên Landing Page)
```

---

## 3. Quy Chuẩn Hình Học Bo Góc Đồng Tâm (Concentric Border Radius)
*(Đúc kết từ Designing Interfaces Ch. 4 & Gestalt Principles)*

Để các thành phần lồng nhau (Nested Elements) không bị méo mó quang học, hệ thống áp dụng công thức toán học:

$$\mathbf{R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})}$$

```
┌────────────────────────────────────────────────────────┐  ◄── Card Ngoài:
│ Card Container (Radius Outer = 16px, Padding = 16px)   │      Radius = 16px
│                                                        │
│   ┌────────────────────────────────────────────────┐   │  ◄── Khối/Ảnh Bên Trong:
│   │ Inner Box / Image                              │   │      Radius = 16px - 16px = 0px
│   │                                                │   │      (Hoặc tối thiểu theo token)
│   └────────────────────────────────────────────────┘   │
│                                                        │
│   [ Button Action: Radius = 8px ]                      │
└────────────────────────────────────────────────────────┘
```

* **Thang Radius Chuẩn Hóa:**
  * `radius-none`: `0px` (Phong cách Sharp / Brutalism)
  * `radius-sm`: `4px` (Bo nhẹ tinh tế cho Checkbox, Tag nhỏ)
  * `radius-md`: `8px` (**Chuẩn mặc định cho Button, Input, Dropdown**)
  * `radius-lg`: `12px` (Chuẩn mặc định cho Card, Dialog nhỏ)
  * `radius-xl`: `16px` (Chuẩn cho Modal, Floating Container)
  * `radius-full`: `9999px` (Dạng Pill cho Badge, Avatar, Switch)

---

## 4. Quy Chuẩn Màu Sắc 3 Lớp & Độ Tương Phản WCAG 2.1
*(Đúc kết từ Fixing Bad UX Designs Ch. 6 & Prompt Engineering)*

Hệ thống màu vận hành theo **Mô hình Đồ Thị 3 Tầng (3-Tier Token Graph)**:

```
[ TẦNG 1: PRIMITIVE TOKENS (Giá trị vật lý thô) ]
  • blue-500: #3B82F6 | blue-600: #2563EB | gray-100: #F3F4F6 | gray-900: #111827
                                  │
                                  ▼
[ TẦNG 2: SEMANTIC TOKENS (Ý nghĩa ngữ cảnh & Theme Light/Dark) ]
  • color-primary        : {blue-500} (Light) / {blue-400} (Dark)
  • color-surface        : #FFFFFF (Light) / #1E293B (Dark)
  • color-text-primary   : {gray-900} (Light) / #F8FAFC (Dark)
  • color-text-muted     : {gray-500} (Light) / #94A3B8 (Dark)
                                  │
                                  ▼
[ TẦNG 3: COMPONENT TOKENS (Gán trực tiếp vào thành phần) ]
  • button-primary-bg    : {color-primary}
  • button-primary-hover : {color-primary-hover}
  • input-border-focus   : {color-primary}
```

* **Tiêu Chuẩn Tương Phản WCAG 2.1 Bắt Buộc:**
  * Mọi cặp màu Text trên Background **bắt buộc phải đạt tỷ lệ $\ge 4.5:1$ (AA Pass)**.
  * Trạng thái Focus Ring **bắt buộc phải có độ tương phản $\ge 3.0:1$** so với nền xung quanh.

---

## 5. Ma Trận 6 Trạng Thái Bắt Buộc Của Component (State Matrix)
*(Đúc kết từ Fixing Bad UX Designs Ch. 10 & Laws of UX - Doherty Threshold)*

Mọi thành phần tương tác (Button, Input, Card item, Menu item) bắt buộc phải có đầy đủ 6 trạng thái để phản hồi hành vi người dùng:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                MA TRẬN TRẠNG THÁI CHUẨN                                │
├───────────────┬───────────────────────────────────┬────────────────────────────────────┤
│ TRẠNG THÁI    │ HÀNH VI THỊ GIÁC                  │ QUY TẮC KỸ THUẬT                   │
├───────────────┼───────────────────────────────────┼────────────────────────────────────┤
│ 1. Default    │ Giao diện tiêu chuẩn, sẵn sàng.   │ Border, Background, Text rõ ràng.  │
│ 2. Hover      │ Sáng lên/Tối đi 1 nấc, nhấc nhẹ.  │ Transition: all 150ms ease-out.    │
│ 3. Focus      │ Focus Ring sáng rõ 2px bao quanh. │ outline: 2px solid; offset: 2px.   │
│ 4. Active     │ Nhấn chìm xuống (Scale 0.98).     │ Transform scale hoặc đậm màu hơn.  │
│ 5. Disabled   │ Mờ đi, không cho click.           │ Opacity: 0.45; cursor: not-allowed;│
│ 6. Loading    │ Spinner xoay tròn hoặc Skeleton.  │ Giữ nguyên kích thước; ẩn nhãn.    │
└───────────────┴───────────────────────────────────┴────────────────────────────────────┘
```

---

## 6. Quy Chuẩn Quản Trị Icon & Tài Nguyên (Asset Governance)
*(Đúc kết từ Designing Interfaces Ch. 3 & Beyond Vibe Coding)*

* **Khóa Cứng Thư Viện (Single Library Lock):** Khi dự án chọn **Lucide Icons** (hoặc Heroicons/Material), toàn bộ hệ thống từ trang web demo đến code AI sinh ra **chỉ được phép dùng duy nhất thư viện đó**.
* **Chuẩn Hóa Khung Bao & Nét Vẽ (Optical Box Normalization):**
  * *Stroke Width:* Cố định `1.5px` (Thanh lịch) hoặc `2.0px` (Đậm nét).
  * *Bounding Box:* Khung vuông `16x16px` (cho Badge/Button SM), `20x20px` (cho Button MD/Body), `24x24px` (cho Header/Nav).

---

## 7. Bộ Luật Thép Bất Biến Cho AI Vibe Coding (RFC 2119 Constraints)
*(Đúc kết từ Beyond Vibe Coding & Prompt Engineering for GenAI)*

Đây là nội dung được tự động nhúng vào đầu file **`AI-DESIGN-SPEC.md`** khi người dùng bấm nút Export:

```markdown
### 🛑 QUY TẮC TUÂN THỦ TỐI THƯỢNG CHO AI (MUST FOLLOW RULES):

1. KHÔNG TỰ TẠO MÀU SẮC (NO ARBITRARY COLORS):
   - BẮT BUỘC (MUST): Chỉ sử dụng các biến màu đã định nghĩa trong :root (ví dụ: var(--color-primary-500)).
   - TUYỆT ĐỐI CẤM (MUST NOT): Không viết các mã màu HEX thô ngẫu nhiên như background: #4A90E2.

2. KHÔNG DÙNG SPACING SỐ LẺ (NO ARBITRARY SPACING):
   - BẮT BUỘC (MUST): Sử dụng thang đo khoảng cách var(--space-1) đến var(--space-16).
   - TUYỆT ĐỐI CẤM (MUST NOT): Không viết margin: 13px, padding: 17px, gap: 7px.

3. ĐỒNG BỘ CHIỀU CAO NÚT BẤM VÀ INPUT (CONTROLS HEIGHT SYNC):
   - BẮT BUỘC (MUST): Chiều cao của Button, Input và Select đặt cạnh nhau phải luôn bằng nhau (MD = 40px).

4. KHÓA CHẶT THƯ VIỆN ICON (ICON LIBRARY ENFORCEMENT):
   - BẮT BUỘC (MUST): Chỉ import icon từ thư viện đã chọn (ví dụ: lucide-react).
   - TUYỆT ĐỐI CẤM (MUST NOT): Không tự chế thẻ SVG thủ công hoặc trộn lẫn FontAwesome/Material.

5. BẮT BUỘC CÓ ĐỦ TRẠNG THÁI TƯƠNG TÁC (COMPLETE STATES):
   - BẮT BUỘC (MUST): Mọi button, input phải có đủ hiệu ứng Hover, Focus-visible (outline 2px), và Disabled.
```

---

### KẾT LUẬN
File tài liệu này là **kim chỉ nam toàn diện** kết hợp giữa **lý thuyết hàn lâm chuẩn mực** và **thực tiễn kỹ thuật công nghệ**. Mọi màn hình, tính năng và thuật toán của **UI Kit Standard** đều được xây dựng dựa trên nền móng tri thức vững chắc này.
