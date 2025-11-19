export const template1 = (formData) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-12 min-h-[297mm] w-[210mm] mx-auto shadow-2xl rounded-lg">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{formData.universityName}</h1>
        <h2 className="text-xl opacity-90">{formData.departmentName}</h2>
      </div>

      {/* Main Content */}
      <div className="text-center mb-16">
        <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-bold text-gray-700">
            {formData.documentType} {formData.documentNumber}
          </h3>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {formData.topic}
        </h2>
        <div className="flex justify-center gap-8 mt-6 text-lg">
          <span className="bg-blue-100 px-4 py-2 rounded">
            {formData.courseTitle}
          </span>
          <span className="bg-green-100 px-4 py-2 rounded">
            {formData.courseCode}
          </span>
        </div>
      </div>

      {/* Submission Info */}
      <div className="grid grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h4 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">
            Submitted By
          </h4>
          <div className="space-y-2 text-gray-700">
            <p>👤 {formData.studentName}</p>
            <p>🆔 {formData.studentId}</p>
            <p>🏛️ {formData.studentDepartment}</p>
            <p>📚 Section {formData.section}</p>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2">
            Submitted To
          </h4>
          <div className="space-y-2 text-gray-700">
            <p>👨‍🏫 {formData.teacherName}</p>
            <p>💼 {formData.teacherPosition}</p>
            <p>🏛️ {formData.teacherDepartment}</p>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="text-center mt-8 pt-6 border-t border-gray-300">
        <p className="text-lg font-semibold text-gray-600">
          📅 Submitted on: {new Date(formData.submissionDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};