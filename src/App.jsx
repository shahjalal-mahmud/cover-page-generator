import { useState } from "react";
import HomePage from "./pages/HomePage";
import { clearForm } from "./utils/formHelpers";

function App() {
  const [formData, setFormData] = useState({
    universityName: "Northern University of Business & Technology Khulna",
    universityLogo: "/logo/nubtk-logo.jpeg",
    departmentName: "Computer Science & Engineering",

    documentType: "Assignment",
    documentNumber: "",
    topic: "",
    courseTitle: "Data Structures",
    courseCode: "CSE 2201",

    studentName: "Shahajalal Mahmud",
    studentId: "11230321539",
    studentDepartment: "Computer Science & Engineering",
    section: "5C",

    teacherName: "Shovon Mandal",
    teacherPosition: "Lecturer",
    teacherDepartment: "Computer Science & Engineering",

    submissionDate: new Date().toISOString().split("T")[0],
  });

  const [currentTemplate, setCurrentTemplate] = useState("default");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearForm = () => {
    setFormData(clearForm());
  };

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-500">
      <HomePage
        formData={formData}
        currentTemplate={currentTemplate}
        isGenerating={isGenerating}
        onFormChange={handleFormChange}
        onTemplateChange={setCurrentTemplate}
        onClearForm={handleClearForm}
      />
    </div>
  );
}

export default App;
