import React from "react";

const DefaultTemplate = ({ formData }) => {
  return (
    <div
      className="bg-white text-black mx-auto p-0"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        boxSizing: "border-box",
        fontFamily: "'Times New Roman', Times, serif",
        lineHeight: "1.4"
      }}
    >
      {/* University Header */}
      <div className="text-center mb-8">
        <img
          src={formData.universityLogo || "https://i.ibb.co.com/9k8CXmWP/nubtk-logo.jpg"}
          alt="University Logo"
          className="h-32 mx-auto mb-4"
        />

        {/* University Name */}
        <h1
          className="text-xl font-bold uppercase tracking-wide mb-2"
          style={{ color: "#6A1B9A" }}
        >
          {formData.universityName ||
            "Northern University of Business & Technology, Khulna"}
        </h1>

        {/* Department Name */}
        <h2
          className="text-lg font-semibold uppercase tracking-wide"
          style={{ color: "#2C5530" }}
        >
          {formData.departmentName ||
            "Department of Computer Science & Engineering"}
        </h2>
      </div>

      {/* Document Title Section */}
      <div className="text-center my-12">
        <div className="border-b-2 border-t-2 border-gray-400 py-4 mx-8">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-3">
            {formData.documentType || "Assignment"}
          </h2>
          <h3 className="text-base font-medium italic text-gray-700">
            {formData.topic || "Linear Differential Equations with Constant Coefficients"}
          </h3>
        </div>
      </div>

      {/* Course Details */}
      <div className="text-center my-10 text-sm">
        <div className="bg-gray-50 py-3 px-6 rounded-lg inline-block">
          <p className="mb-1">
            <span className="font-bold">Course Title:</span>{" "}
            {formData.courseTitle ||
              "Mathematics III: Differential Equation & Fourier Analysis"}
          </p>
          <p>
            <span className="font-bold">Course Code:</span>{" "}
            {formData.courseCode || "MATH 2103"}
          </p>
        </div>
      </div>

      {/* Submitted By & Submitted To Sections */}
      <div className="mt-16 space-y-8">
        {/* Submitted By */}
        <div className="flex justify-between items-start">
          <div className="w-[48%]">
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-wide mb-4 pb-2 border-b-2 border-gray-300 text-center">
                Submitted by
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Name:</span> {formData.studentName || "Md Shahajalal Mahmud"}</p>
                <p><span className="font-semibold">ID:</span> {formData.studentId || "11230321539"}</p>
                <p><span className="font-semibold">Department:</span> {formData.studentDepartment || "Department of Computer Science & Engineering"}</p>
                <p><span className="font-semibold">Section:</span> {formData.section || "3J"}</p>
                <p className="text-xs italic mt-3">Northern University of Business & Technology Khulna</p>
              </div>
            </div>
          </div>

          {/* Submitted To */}
          <div className="w-[48%]">
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-wide mb-4 pb-2 border-b-2 border-gray-300 text-center">
                Submitted to
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Name:</span> {formData.teacherName || "G.M. Mamun Al Imran"}</p>
                <p><span className="font-semibold">Position:</span> {formData.teacherPosition || "Lecturer"}</p>
                <p><span className="font-semibold">Department:</span> {formData.teacherDepartment || "Department of Computer Science & Engineering"}</p>
                <p className="text-xs italic mt-3">Northern University of Business & Technology Khulna</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Date */}
      <div className="text-center mt-20 pt-6 border-t border-gray-300">
        <p className="text-sm font-semibold text-gray-700">
          Date of Submission:{" "}
          {formData.submissionDate
            ? new Date(formData.submissionDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })
            : "09 February 2025"}
        </p>
      </div>
    </div>
  );
};

export { DefaultTemplate as defaultTemplate };