# 📄 Cover Page Generator
### Smart Academic Cover Page Automation for University Students

A problem-driven, frontend-only system that eliminates repetitive form filling and generates personalized academic cover pages using real university data.

---

## 🚀 Why This Project Exists
In many universities, students repeatedly generate cover pages for assignments and lab reports by manually providing the same information every time — **name, ID, course, section, teacher** — often resulting in generic designs and wasted time.

This project was built to solve that exact real-world problem. Instead of asking students to fill long forms, the system:
* **Minimizes** required input.
* **Automatically completes** missing information.
* **Generates** professional, personalized cover pages instantly.
* Works entirely **without backend access** or official university APIs.

---

## 🧠 Key Idea & Problem-Solving Approach
The biggest challenge was data availability. Since the university does not provide student databases or teacher APIs, the solution was engineered using publicly available academic documents:

| Data Needed | Source | Solution |
| :--- | :--- | :--- |
| **Student Name & ID** | Semester due list PDFs | Extracted → converted to JSON |
| **Courses per Section** | Course registration PDFs | Structured → mapped by section |
| **Teacher Information** | Class routine PDFs | Acronym matching → teacher directory JSON |

All data is pre-processed, stored as **JSON**, and loaded dynamically in a fully frontend-based system.

---

## ✨ What Makes This Project Different

### ✅ Minimal Input UX
Students only enter:
1. **Student ID**
2. **Section**
3. **Course**
*Everything else is auto-filled.*

### ✅ Smart Auto-Detection
* **Student name & department** auto-filled from ID.
* **Semester** auto-detected from section.
* **Courses** filtered dynamically by section.
* **Teacher details** auto-matched using routine + acronym mapping.

### ✅ Design Flexibility
* Multiple cover page themes.
* Export as **PDF or JPG**.
* Direct print support.

### ✅ Scalable by Design
Adding a new department requires only uploading JSON data—no business logic or UI changes are needed.

---

## 🖥️ Tech Stack
* **Frontend:** HTML, CSS, JavaScript
* **Build Tool:** Vite
* **Data Layer:** JSON-based structured datasets
* **Design Assets:** Canva-inspired layouts
* **Exports:** PDF & Image rendering

> **Note:** No backend. No database. No external APIs.

---

## 📸 Project Preview
*(Add screenshots or a GIF here showing ID input → auto-fill → generated cover page)*

---

## ⚙️ Installation & Local Setup

### Prerequisites
* Node.js (LTS recommended)
* npm or Yarn

### Setup Steps
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/shahjalal-mahmud/cover-page-generator.git](https://github.com/shahjalal-mahmud/cover-page-generator.git)
   cd cover-page-generator

2.  **Navigate to the Project Directory:**

    ```bash
    cd cover-page-generator
    ```

3.  **Install Dependencies:**

    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

4.  **Run the Development Server:**

    This will start the application in development mode, typically accessible at `http://localhost:5173/`.

    Using npm:
    ```bash
    npm run dev
    ```
    Or using Yarn:
    ```bash
    yarn dev
    ```

5.  **Build for Production (Optional):**

    To create an optimized production build of the application:

    Using npm:
    ```bash
    npm run build
    ```
    Or using Yarn:
    ```bash
    yarn build
    ```
    The build artifacts will be placed in the `dist` directory.

## 🧪 How It Works (User Flow)
1. **Enter Student ID:** System auto-fills Name and Department.
2. **Select Section:** Semester is auto-detected and Courses are filtered dynamically.
3. **Select Course:** Teacher details are auto-filled.
4. **Choose a theme:** Select your preferred layout.
5. **Download:** Export as PDF/JPG or print instantly.

## 🛣️ Future Improvements
* 🎨 More cover page themes
* 💾 Local design save & reuse
* ☁️ Optional cloud storage
* 📱 Improved mobile UX
* 🧩 Support for additional departments

## 🤝 Contribution Guidelines
Contributions are welcome, especially for new themes, data expansion, and UI/UX enhancements.

1. `git checkout -b feature/your-feature-name`
2. Follow ESLint rules.
3. Write clear commit messages.
4. Open a detailed pull request.

## ⚖️ License
This project currently has no open-source license. All rights reserved by the contributors. Commercial use or redistribution requires explicit permission.

### Main Contributors
* **Shahajalal Mahmud**
* **Preota Saha**

For licensing or collaboration inquiries, please contact the contributors.

---

## ❤️ Final Note
This project was not built for marks, monetization, or trends. It was built from observing a real problem, working within constraints, and caring about the student experience.

**Tools evolve. Problem-solving mindset doesn’t.**
