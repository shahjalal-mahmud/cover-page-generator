import React from 'react';

const DefaultTemplate = ({ formData }) => {
  return (
    <div className="bg-white text-gray-800 p-8 min-h-[297mm] w-[210mm] mx-auto shadow-2xl">
      {/* University Header */}
      <div className="text-center border-b-2 border-blue-600 pb-4 mb-8">
        {formData.universityLogo && (
          <img 
            src={formData.universityLogo} 
            alt="University Logo" 
            className="h-20 mx-auto mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          {formData.universityName}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          {formData.departmentName}
        </h2>
      </div>

      {/* Document Title */}
      <div className="text-center my-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {formData.documentType} {formData.documentNumber}
        </h3>
        <h4 className="text-lg font-semibold text-gray-600 mb-4">
          on
        </h4>
        <h2 className="text-3xl font-bold text-blue-700">
          {formData.topic}
        </h2>
      </div>

      {/* Course Information */}
      <div className="text-center my-12">
        <p className="text-lg text-gray-700">
          <strong>Course Title:</strong> {formData.courseTitle}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Course Code:</strong> {formData.courseCode}
        </p>
      </div>

      {/* Submission Details */}
      <div className="grid grid-cols-2 gap-8 mt-16">
        {/* Submitted By */}
        <div>
          <h5 className="text-xl font-bold border-b-2 border-green-600 pb-2 mb-4 text-green-700">
            Submitted By
          </h5>
          <div className="space-y-2">
            <p><strong>Name:</strong> {formData.studentName}</p>
            <p><strong>ID:</strong> {formData.studentId}</p>
            <p><strong>Department:</strong> {formData.studentDepartment}</p>
            <p><strong>Section:</strong> {formData.section}</p>
          </div>
        </div>

        {/* Submitted To */}
        <div>
          <h5 className="text-xl font-bold border-b-2 border-purple-600 pb-2 mb-4 text-purple-700">
            Submitted To
          </h5>
          <div className="space-y-2">
            <p><strong>Name:</strong> {formData.teacherName}</p>
            <p><strong>Position:</strong> {formData.teacherPosition}</p>
            <p><strong>Department:</strong> {formData.teacherDepartment}</p>
          </div>
        </div>
      </div>

      {/* Submission Date */}
      <div className="text-center mt-16 pt-8 border-t-2 border-gray-300">
        <p className="text-lg font-semibold">
          Submission Date: {new Date(formData.submissionDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export { DefaultTemplate as defaultTemplate };