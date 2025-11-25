import React from "react";

const BlueWaveTemplate = ({ formData }) => {
  return (
    <div
      className="mx-auto text-black relative"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "25mm 20mm",
        boxSizing: "border-box",
        fontFamily: "'Times New Roman', serif",
        lineHeight: "1.5",
        backgroundColor: "#ffffff"
      }}
    >

      {/* University Logo */}
      <div className="text-center mb-6">
        <img
          src={
            formData.universityLogo ||
            "https://i.ibb.co.com/9k8CXmWP/nubtk-logo.jpg"
          }
          alt="University Logo"
          style={{
            height: "112px",
            margin: "0 auto 16px auto"
          }}
        />
      </div>

      {/* University Info */}
      <div className="text-center mb-8">
        <h2 style={{
          fontSize: "18px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "8px"
        }}>
          {formData.universityName ||
            "Northern University of Business and Technology Khulna"}
        </h2>

        <p style={{
          fontSize: "16px",
          fontWeight: "600"
        }}>
          {formData.departmentName ||
            "Department of Computer Science and Engineering"}
        </p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-10">
        <h1 style={{
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "underline",
          marginBottom: "8px"
        }}>
          {formData.documentType || "Lab Report"}
        </h1>

        <p style={{
          fontSize: "16px",
          fontWeight: "500",
          fontStyle: "italic"
        }}>
          {formData.topic ||
            "Bisection, Secant, Regula Falsi, Newton-Raphson, Gauss Jordan, Gauss Elimination Methods"}
        </p>
      </div>

      {/* Course Details */}
      <div className="text-center mb-12" style={{ fontSize: "14px" }}>
        <p style={{ marginBottom: "4px" }}>
          <b>Course Title:</b>{" "}
          {formData.courseTitle || "Numerical method I Lab"}
        </p>
        <p>
          <b>Course Code:</b> {formData.courseCode || "CSE 2214"}
        </p>
      </div>

      {/* Submitted Sections */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        marginTop: "48px"
      }}>
        {/* Submitted By */}
        <div style={{ width: "48%", fontSize: "14px" }}>
          <h3 style={{
            fontWeight: "bold",
            marginBottom: "12px",
            textAlign: "center",
            textDecoration: "underline"
          }}>
            Submitted By
          </h3>
          <p><b>Name:</b> {formData.studentName || "Anindya Nag [AN]"}</p>
          <p><b>ID:</b> {formData.studentId || "11230321538"}</p>
          <p><b>Section:</b> {formData.section || "4J"}</p>
          <p style={{ lineHeight: "1.2", marginTop: "8px" }}>
            <b>Email:</b> {formData.email || "sahaproota@gmail.com"}
          </p>
          <p>
            <b>Department:</b>{" "}
            {formData.studentDepartment || "Department of Computer Science and Engineering"}
          </p>
        </div>

        {/* Submitted To */}
        <div style={{ width: "48%", fontSize: "14px" }}>
          <h3 style={{
            fontWeight: "bold",
            marginBottom: "12px",
            textAlign: "center",
            textDecoration: "underline"
          }}>
            Submitted To
          </h3>
          <p><b>Name:</b> {formData.teacherName || "Lecturer Name"}</p>
          <p><b>Position:</b> {formData.teacherPosition || "Lecturer"}</p>
          <p>
            <b>Department:</b>{" "}
            {formData.teacherDepartment ||
              "Department of Computer Science and Engineering"}
          </p>
        </div>
      </div>

      {/* Submission Date */}
      <div className="text-center mt-20" style={{ fontSize: "14px" }}>
        <p>
          <b>Date of Submission:</b>{" "}
          {formData.submissionDate
            ? new Date(formData.submissionDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "25 November 2025"}
        </p>
      </div>
    </div>
  );
};

export default BlueWaveTemplate;