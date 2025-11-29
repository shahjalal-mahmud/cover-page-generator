import React from "react";
import { FiBookOpen, FiInfo, FiCalendar, FiChevronDown } from "react-icons/fi";

const CourseInfoSection = ({
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
    <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-md">
          <FiBookOpen className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Course Information 📖</h3>
          <p className="text-sm text-gray-600">Enter your course details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        {/* Section Input */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
              <FiCalendar className="text-blue-500" />
              Section
            </span>
            {sectionInput && detectedSemester && (
              <span className="label-text-alt text-green-500 text-sm font-medium flex items-center gap-1">
                ✅ Semester {detectedSemester} detected
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="e.g. 5C, 1A"
            className="input input-bordered w-full border-2 border-blue-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
            value={sectionInput}
            onChange={(e) => onSectionChange(e.target.value)}
          />
          <span className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            🎯 Batch + Section (auto-detects semester)
          </span>
          {sectionInput && !detectedSemester && (
            <span className="text-orange-500 text-xs mt-1 flex items-center gap-1">
              ⚠️ Could not detect semester
            </span>
          )}
        </div>

        {/* Semester Display */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiInfo className="text-purple-500" />
            Semester
          </label>
          <div className={`input w-full flex items-center justify-between rounded-xl px-4 py-3 border-2 transition-all duration-200 ${
            detectedSemester 
              ? "border-green-400 bg-green-50 text-green-700" 
              : "border-gray-200 bg-gray-50 text-gray-400"
          }`}>
            {detectedSemester ? (
              <span className="font-bold">Semester {detectedSemester}</span>
            ) : (
              <span>Enter section to detect</span>
            )}
            <FiInfo className="text-current" title="Automatically detected from section" />
          </div>
        </div>

        {/* Course Selector */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
              📚 Course
            </span>
            {sectionInput && (
              <span className="label-text-alt text-blue-500 text-sm font-medium">
                Showing for {sectionInput}
              </span>
            )}
          </label>
          <div className="relative">
            <select
              className="select w-full border-2 border-purple-200 bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl appearance-none transition-all duration-200 pr-10"
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
                    ? `No courses found for section ${sectionInput}`
                    : "Enter section to see courses"}
                </option>
              )}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Course Title</label>
          <input
            type="text"
            className="input input-bordered w-full border-2 border-blue-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
            placeholder="Course Title (auto-filled)"
            value={formData.courseTitle || ""}
            onChange={(e) => setField("courseTitle", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Course Code</label>
          <input
            type="text"
            className="input input-bordered w-full border-2 border-blue-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
            placeholder="Course Code (auto-filled)"
            value={formData.courseCode || ""}
            onChange={(e) => setField("courseCode", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfoSection;