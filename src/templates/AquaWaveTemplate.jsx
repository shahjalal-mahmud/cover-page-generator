import React from "react";

const AquaWaveTemplate = ({ formData }) => {
  return (
    <div
      className="bg-white text-gray-800 mx-auto"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "0", // Padding will be handled by internal sections
        boxSizing: "border-box",
        fontFamily: "'Roboto', sans-serif", // A clean, sans-serif font
        lineHeight: "1.4",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden", // Important for wave elements
      }}
    >
      {/* Top Wave Element */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "200px", // Adjust height as needed
          backgroundColor: "#C6F6D5", // Light green for the top wave
          clipPath: "ellipse(80% 50% at 0% 0%)", // Example for a wavy shape
          opacity: 0.8,
          transform: "rotate(-10deg) scaleX(1.2)", // Slight rotation and scale
          transformOrigin: "top left",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "-30px",
          left: "-50px",
          width: "300px",
          height: "300px",
          backgroundColor: "#A0E7F5", // Lighter blue for overlapping wave
          borderRadius: "50%",
          opacity: 0.7,
          filter: "blur(30px)",
          zIndex: 1,
        }}
      ></div>
       <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          width: "80px",
          height: "80px",
          backgroundColor: "#ADD8E6", // Light Blue for small circle
          borderRadius: "50%",
          opacity: 0.8,
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "200px",
          width: "120px",
          height: "120px",
          backgroundColor: "#ADD8E6", // Light Blue for small circle
          borderRadius: "50%",
          opacity: 0.8,
          zIndex: 1,
          filter: "blur(15px)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "200px",
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 0% 100%)", // More complex shape for the blue wave
          backgroundColor: "#B2EBF2", // Sky Blue
          opacity: 0.7,
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "200px",
          clipPath: "polygon(0 0, 100% 0, 100% 40%, 0% 80%)", // Darker blue wave
          backgroundColor: "#81D4FA", // Light Blue
          opacity: 0.6,
          zIndex: 0,
        }}
      ></div>

      {/* Main content wrapper with padding */}
      <div style={{ padding: "30mm 20mm", position: "relative", zIndex: 2 }}>
        {/* University Header */}
        <div className="text-center mb-12">
          {formData.universityLogo && (
            <img
              src={formData.universityLogo || "https://i.ibb.co.com/9k8CXmWP/nubtk-logo.jpg"}
              alt="University Logo"
              className="h-24 mx-auto mb-2 object-contain"
            />
          )}
          <h1
            className="text-lg font-bold uppercase text-gray-700 mb-1"
            style={{ color: "#3F51B5" }} // Darker blue for university name
          >
            {formData.universityName ||
              "Northern University of Business and Technology Khulna"}
          </h1>
          <h2 className="text-md font-semibold text-gray-600">
            {formData.departmentName ||
              "Department of Computer Science and Engineering"}
          </h2>
        </div>

        {/* Document Type and Topic */}
        <div className="text-center my-16">
          <h2 className="text-4xl font-extrabold uppercase mb-4" style={{ color: "#00796B" }}>
            {formData.documentType || "Lab Report"}
          </h2>
          <h3 className="text-lg font-medium italic text-gray-700 leading-relaxed">
            {formData.topic ||
              "Bisection, Secant, Regula Falsi, Newton-Raphson, Gauss Jordan, Gauss Elimination Methods"}
          </h3>
        </div>

        {/* Course Details */}
        <div className="text-center my-12">
          <p className="text-base font-semibold text-gray-700 mb-1">
            Course Title:{" "}
            <span className="font-normal">
              {formData.courseTitle || "Numerical method I Lab"}
            </span>
          </p>
          <p className="text-base font-semibold text-gray-700">
            Course Code:{" "}
            <span className="font-normal">
              {formData.courseCode || "CSE 2214"}
            </span>
          </p>
        </div>

        {/* Submitted By & Submitted To Sections */}
        <div className="mt-20 flex justify-between items-start text-sm">
          {/* Submitted By */}
          <div className="w-[48%] text-center">
            <h3
              className="text-md font-bold uppercase text-gray-700 mb-4 pb-2"
              style={{ borderBottom: "2px dotted #9E9E9E" }}
            >
              Submitted By
            </h3>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {formData.studentName || "Preota Saha"}
              </p>
              <p>
                <span className="font-semibold">ID:</span>{" "}
                {formData.studentId || "11230321538"}
              </p>
              <p>
                <span className="font-semibold">Section:</span>{" "}
                {formData.section || "4J"}
              </p>
              <p>{formData.studentEmail || "sahapreota@gmail.com"}</p>
              <p>
                <span className="font-semibold">Department of CSE, NUBTK</span>
              </p>
            </div>
          </div>

          {/* Submitted To */}
          <div className="w-[48%] text-center">
            <h3
              className="text-md font-bold uppercase text-gray-700 mb-4 pb-2"
              style={{ borderBottom: "2px dotted #9E9E9E" }}
            >
              Submitted To
            </h3>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {formData.teacherName || "Anindya Nag [AN]"}
              </p>
              <p>
                <span className="font-semibold">Position:</span>{" "}
                {formData.teacherPosition || "Lecturer,"}
              </p>
              <p>{formData.teacherDepartment || "Northern University of"}</p>
              <p>{"Business and Technology"}</p>
              <p>{"Khulna"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Date */}
      <div className="text-center mt-auto pt-8 text-sm" style={{ position: "relative", zIndex: 2 }}>
        <p className="font-semibold text-gray-700">
          Date of Submission:{" "}
          {formData.submissionDate
            ? new Date(formData.submissionDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "DD Month YYYY"}
        </p>
      </div>

      {/* Bottom Wave Element */}
      <div
        style={{
          position: "absolute",
          bottom: "-50px", // Adjust to bring it further down if needed
          left: "0",
          width: "100%",
          height: "250px", // Adjust height as needed
          backgroundColor: "#81D4FA", // Light Blue
          clipPath: "ellipse(120% 60% at 50% 100%)", // Create a more pronounced bottom wave
          opacity: 0.7,
          transform: "rotate(5deg) scaleX(1.2)",
          transformOrigin: "bottom right",
          zIndex: 0,
        }}
      ></div>
       <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "-30px",
          width: "200px",
          height: "200px",
          backgroundColor: "#4FC3F7", // Medium Blue
          borderRadius: "50%",
          opacity: 0.6,
          filter: "blur(40px)",
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "100px",
          width: "100px",
          height: "100px",
          backgroundColor: "#B2EBF2", // Sky Blue
          borderRadius: "50%",
          opacity: 0.8,
          filter: "blur(10px)",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
};

export { AquaWaveTemplate as template3 }; // Export with 'template3' alias