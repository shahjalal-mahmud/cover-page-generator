import { useState } from "react";
import { FiGrid, FiBookOpen, FiUser, FiUsers, FiCalendar } from "react-icons/fi";

const InputForm = ({ formData, onFormChange }) => {
  const [activeSection, setActiveSection] = useState("university");

  const handleInput = (field, value) => onFormChange(field, value);

  const sections = [
    { id: "university", label: "University", icon: <FiGrid /> },
    { id: "document", label: "Document", icon: <FiBookOpen /> },
    { id: "student", label: "Student", icon: <FiUser /> },
    { id: "teacher", label: "Teacher", icon: <FiUsers /> },
    { id: "date", label: "Date", icon: <FiCalendar /> },
  ];

  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold">Cover Page Builder</h2>
        <p className="text-sm opacity-70 mb-4">
          Fill the fields to automatically generate your cover page.
        </p>

        {/* SECTION NAVIGATION */}
        <div className="flex flex-wrap gap-2 mb-5">
          {sections.map((sec) => (
            <button
              key={sec.id}
              className={`btn btn-sm flex items-center gap-2 ${
                activeSection === sec.id ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setActiveSection(sec.id)}
            >
              {sec.icon} {sec.label}
            </button>
          ))}
        </div>

        {/* FORM SECTIONS */}
        <div className="space-y-4">
          {/* University */}
          {activeSection === "university" && (
            <div className="grid gap-4">
              <h3 className="text-lg font-bold border-b pb-2">University Information</h3>

              <input
                type="text"
                placeholder="University Name"
                className="input input-bordered"
                value={formData.universityName}
                onChange={(e) => handleInput("universityName", e.target.value)}
              />

              <input
                type="text"
                placeholder="Department Name"
                className="input input-bordered"
                value={formData.departmentName}
                onChange={(e) => handleInput("departmentName", e.target.value)}
              />

              <input
                type="url"
                placeholder="Logo URL (optional)"
                className="input input-bordered"
                value={formData.universityLogo}
                onChange={(e) => handleInput("universityLogo", e.target.value)}
              />
            </div>
          )}

          {/* Document */}
          {activeSection === "document" && (
            <div className="grid gap-4">
              <h3 className="text-lg font-bold border-b pb-2">Document Information</h3>

              <select
                className="select select-bordered"
                value={formData.documentType}
                onChange={(e) => handleInput("documentType", e.target.value)}
              >
                <option>Assignment</option>
                <option>Lab Report</option>
                <option>Project Report</option>
                <option>Thesis</option>
                <option>Research Paper</option>
                <option>Case Study</option>
                <option>Presentation</option>
              </select>

              <input
                type="text"
                placeholder="Document Number"
                className="input input-bordered"
                value={formData.documentNumber}
                onChange={(e) => handleInput("documentNumber", e.target.value)}
              />

              <textarea
                placeholder="Topic / Title"
                className="textarea textarea-bordered h-24"
                value={formData.topic}
                onChange={(e) => handleInput("topic", e.target.value)}
              ></textarea>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  className="input input-bordered"
                  value={formData.courseTitle}
                  onChange={(e) => handleInput("courseTitle", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Course Code"
                  className="input input-bordered"
                  value={formData.courseCode}
                  onChange={(e) => handleInput("courseCode", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Student */}
          {activeSection === "student" && (
            <div className="grid gap-4">
              <h3 className="text-lg font-bold border-b pb-2">Student Information</h3>

              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                value={formData.studentName}
                onChange={(e) => handleInput("studentName", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Student ID"
                  className="input input-bordered"
                  value={formData.studentId}
                  onChange={(e) => handleInput("studentId", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Section"
                  className="input input-bordered"
                  value={formData.section}
                  onChange={(e) => handleInput("section", e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Student Department"
                className="input input-bordered"
                value={formData.studentDepartment}
                onChange={(e) => handleInput("studentDepartment", e.target.value)}
              />
            </div>
          )}

          {/* Teacher */}
          {activeSection === "teacher" && (
            <div className="grid gap-4">
              <h3 className="text-lg font-bold border-b pb-2">Teacher Information</h3>

              <input
                type="text"
                placeholder="Teacher Name"
                className="input input-bordered"
                value={formData.teacherName}
                onChange={(e) => handleInput("teacherName", e.target.value)}
              />

              <select
                className="select select-bordered"
                value={formData.teacherPosition}
                onChange={(e) => handleInput("teacherPosition", e.target.value)}
              >
                <option>Lecturer</option>
                <option>Assistant Professor</option>
                <option>Associate Professor</option>
                <option>Professor</option>
                <option>Dr.</option>
              </select>

              <input
                type="text"
                placeholder="Teacher Department"
                className="input input-bordered"
                value={formData.teacherDepartment}
                onChange={(e) => handleInput("teacherDepartment", e.target.value)}
              />
            </div>
          )}

          {/* Date */}
          {activeSection === "date" && (
            <div className="grid gap-4">
              <h3 className="text-lg font-bold border-b pb-2">Submission Date</h3>

              <input
                type="date"
                className="input input-bordered"
                value={formData.submissionDate}
                onChange={(e) => handleInput("submissionDate", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() =>
                    handleInput("submissionDate", new Date().toISOString().split("T")[0])
                  }
                >
                  Today
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    const d = new Date();
                    d.setDate(d.getDate() + 1);
                    handleInput("submissionDate", d.toISOString().split("T")[0]);
                  }}
                >
                  Tomorrow
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-6">
          <button className="btn btn-ghost">Clear Form</button>
          <button className="btn btn-primary">Save Template</button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;