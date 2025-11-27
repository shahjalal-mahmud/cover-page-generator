import React from "react";

const CreativeEleganceTemplate = ({ formData }) => {
  return (
    <div
      className="bg-white text-gray-800 mx-auto"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "25mm 20mm",
        boxSizing: "border-box",
        fontFamily: "'Montserrat', sans-serif",
        lineHeight: "1.5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden", // Ensure no overflow from decorative elements
      }}
    >
      {/* Top Left Decorative Element */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "150px",
          height: "150px",
          backgroundColor: "#C6F6D5", // Light green
          borderRadius: "50%",
          opacity: 0.7,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      ></div>

      {/* Bottom Right Decorative Element */}
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-70px",
          width: "200px",
          height: "150px",
          backgroundColor: "#0097b2", // Light blue-green
          borderRadius: "70%",
          opacity: 0.6,
          filter: "blur(50px)",
          zIndex: 0,
        }}
      ></div>

      {/* Main Content Wrapper */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* University Header */}
        <div className="text-center mb-10">
          {formData.universityLogo && (
            <img
              src={formData.universityLogo}
              alt="University Logo"
              className="h-28 mx-auto mb-4 object-contain"
            />
          )}
          {!formData.universityLogo && (
            <div
              className="h-28 w-28 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full"
              style={{
                border: "2px dashed #CBD5E0",
                color: "#A0AEC0",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              No Logo
            </div>
          )}

          <h1
            className="text-xl font-bold uppercase tracking-wide mb-2"
            style={{ color: "#6A1B9A", letterSpacing: "1.5px" }}
          >
            {formData.universityName ||
            "Northern University of Business & Technology, Khulna"}
          </h1>
          <h2
          className="text-xl font-semibold uppercase  text-gray-600"
            
            style={{ letterSpacing: "1px" }}
          >
            {formData.departmentName || "Department of [Your Department]"}
          </h2>
        </div>

        {/* Document Title Section */}
        <div className="text-center my-16">
          <div
            className="py-6 px-8 mx-auto"
            style={{
              backgroundColor: "#E0F2F7", // Light sky blue background
              borderRadius: "12px",
              maxWidth: "80%",
            }}
          >
            <h2
              className="text-4xl font-bold uppercase mb-3"
              style={{ color: "#34495E" }}
            >
              {formData.documentType || "Document Type"}
            </h2>
            <h3
              className="text-xl font-medium italic text-gray-700"
              style={{ color: "#556B8D" }}
            >
              {formData.topic || "Intriguing Topic or Subject Matter"}
            </h3>
          </div>
        </div>

        {/* Course Details */}
        <div className="text-center my-12 text-base">
          <div
            className="bg-gray-50 py-4 px-8 rounded-xl inline-block shadow-inner"
            style={{ border: "1px solid #E2E8F0" }}
          >
            <p className="mb-2">
              <span className="font-bold text-gray-700">Course Title:</span>{" "}
              {formData.courseTitle || "Advanced Studies in Modern Science"}
            </p>
            <p>
              <span className="font-bold text-gray-700">Course Code:</span>{" "}
              {formData.courseCode || "SCI 501"}
            </p>
          </div>
        </div>

        {/* Submitted By & Submitted To Sections */}
        <div className="mt-20 flex justify-around items-start gap-8">
          {/* Submitted By */}
          <div className="w-1/2">
            <div
              className="border-l-4 border-blue-500 rounded-lg p-6 bg-white shadow-lg"
              style={{ minHeight: "200px" }}
            >
              <h3 className="text-lg font-bold uppercase mb-4 pb-2 border-b-2 border-gray-200 text-blue-500">
                Submitted by
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-gray-600">Name:</span>{" "}
                  {formData.studentName || "Student's Full Name"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">ID:</span>{" "}
                  {formData.studentId || "123456789"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Department:</span>{" "}
                  {formData.studentDepartment || "Faculty of Innovation"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Section:</span>{" "}
                  {formData.section || "Alpha"}
                </p>
              </div>
            </div>
          </div>

          {/* Submitted To */}
          <div className="w-1/2">
            <div
              className="border-l-4 border-green-500 rounded-lg p-6 bg-white shadow-lg"
              style={{ minHeight: "200px" }}
            >
              <h3 className="text-lg font-bold uppercase mb-4 pb-2 border-b-2 border-gray-200 text-green-900">
                Submitted to
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-gray-600">Name:</span>{" "}
                  {formData.teacherName || "Professor [Teacher's Name]"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Position:</span>{" "}
                  {formData.teacherPosition || "Senior Lecturer"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Department:</span>{" "}
                  {formData.teacherDepartment || "Faculty of Innovation"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Date */}
      <div className="text-center mt-auto pt-10 border-t border-gray-200" style={{ position: "relative", zIndex: 1 }}>
        <p className="text-sm font-semibold text-gray-600">
          Date of Submission:{" "}
          {formData.submissionDate
            ? new Date(formData.submissionDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "dd Month YYYY"}
        </p>
      </div>
    </div>
  );
};

export { CreativeEleganceTemplate as template1 };