import React, { memo } from "react";
import { FiBookOpen, FiInfo, FiCalendar, FiChevronDown } from "react-icons/fi";

const CourseInfoSection = memo(({
  formData,
  setField,
  sectionInput,
  filteredCourses,
  selectedCourseCode,
  onSectionChange,
  onCourseSelect,
  extractSemesterFromSection
}) => {
  const detectedSemester = extractSemesterFromSection(sectionInput);

  return (
    <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-white/40 shadow-xl">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
          <FiBookOpen className="text-white text-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-800">Course Info</h3>
          <p className="text-sm text-gray-600">Select your course details 📚</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        {/* Section Input */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-bold text-gray-700 flex items-center gap-2">
              <FiCalendar className="text-blue-600" />
              Section
            </span>
            {sectionInput && detectedSemester && (
              <span className="label-text-alt text-green-600 text-xs font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                ✅ Sem {detectedSemester}
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="e.g. 5C, 1A"
            className="w-full px-4 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 uppercase"
            value={sectionInput}
            onChange={(e) => onSectionChange(e.target.value)}
          />
          <span className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            🎯 Format: Semester + Section (e.g., 5C)
          </span>
          {sectionInput && !detectedSemester && (
            <span className="text-orange-600 text-xs mt-1 flex items-center gap-1 font-semibold">
              ⚠️ Could not detect semester
            </span>
          )}
        </div>

        {/* Semester Display */}
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiInfo className="text-purple-600" />
            Detected Semester
          </label>
          <div className={`w-full px-4 py-4 rounded-xl font-bold text-lg flex items-center justify-between transition-all duration-300 ${
            detectedSemester 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-700" 
              : "bg-gray-100 border-2 border-gray-200 text-gray-400"
          }`}>
            {detectedSemester ? (
              <span className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Semester {detectedSemester}
              </span>
            ) : (
              <span>Enter section first</span>
            )}
            <FiInfo className="text-current opacity-60" title="Automatically detected" />
          </div>
        </div>

        {/* Course Selector */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-bold text-gray-700 flex items-center gap-2">
              📚 Course
            </span>
            {sectionInput && (
              <span className="label-text-alt text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                For {sectionInput}
              </span>
            )}
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-4 pr-10 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer"
              value={selectedCourseCode || ""}
              onChange={(e) => onCourseSelect(e.target.value)}
            >
              <option value="">— Select Course —</option>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} — {course.title}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {sectionInput
                    ? `No courses for ${sectionInput}`
                    : "Enter section to see courses"}
                </option>
              )}
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xl" />
          </div>
          {filteredCourses.length > 0 && (
            <span className="text-xs text-gray-500 mt-2">
              💡 {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
            </span>
          )}
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="form-control">
          <label className="label font-bold text-gray-700">Course Title</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
            placeholder="Auto-filled when you select course"
            value={formData.courseTitle || ""}
            onChange={(e) => setField("courseTitle", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label font-bold text-gray-700">Course Code</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
            placeholder="Auto-filled when you select course"
            value={formData.courseCode || ""}
            onChange={(e) => setField("courseCode", e.target.value)}
          />
        </div>
      </div>

      {/* Info Banner */}
      {selectedCourseCode && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 animate-scale-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-bold text-blue-900 mb-1">Course Selected!</p>
              <p className="text-sm text-blue-700">
                Teacher information will be auto-filled in the next section.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default CourseInfoSection;