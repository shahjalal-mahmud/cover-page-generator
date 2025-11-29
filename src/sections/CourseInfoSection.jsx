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
    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-accent to-info rounded-xl flex items-center justify-center shadow-md">
          <FiBookOpen className="text-base-100 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-base-content">Course Information 📖</h3>
          <p className="text-sm text-base-content opacity-70">Enter your course details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        {/* Section Input */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-semibold text-base-content flex items-center gap-2">
              <FiCalendar className="text-info" />
              Section
            </span>
            {sectionInput && detectedSemester && (
              <span className="label-text-alt text-success text-sm font-medium flex items-center gap-1">
                ✅ Semester {detectedSemester} detected
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="e.g. 5C, 1A"
            className="input input-bordered w-full px-4"
            value={sectionInput}
            onChange={(e) => onSectionChange(e.target.value)}
          />
          <span className="text-xs text-base-content opacity-60 mt-2 flex items-center gap-1">
            🎯 Batch + Section (auto-detects semester)
          </span>
          {sectionInput && !detectedSemester && (
            <span className="text-warning text-xs mt-1 flex items-center gap-1">
              ⚠️ Could not detect semester
            </span>
          )}
        </div>

        {/* Semester Display */}
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiInfo className="text-primary" />
            Semester
          </label>
          <div className={`input w-full flex items-center justify-between px-4 py-3 ${
            detectedSemester 
              ? "input-success" 
              : "bg-base-200 text-base-content opacity-60"
          }`}>
            {detectedSemester ? (
              <span className="font-bold">Semester {detectedSemester}</span>
            ) : (
              <span>Enter section to detect</span>
            )}
            <FiInfo className="text-current opacity-60" title="Automatically detected from section" />
          </div>
        </div>

        {/* Course Selector */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-semibold text-base-content flex items-center gap-2">
              📚 Course
            </span>
            {sectionInput && (
              <span className="label-text-alt text-info text-sm font-medium">
                Showing for {sectionInput}
              </span>
            )}
          </label>
          <div className="relative">
            <select
              className="select select-bordered w-full px-4 pr-10 appearance-none"
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
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="form-control">
          <label className="label font-semibold text-base-content">Course Title</label>
          <input
            type="text"
            className="input input-bordered w-full px-4"
            placeholder="Course Title (auto-filled)"
            value={formData.courseTitle || ""}
            onChange={(e) => setField("courseTitle", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-base-content">Course Code</label>
          <input
            type="text"
            className="input input-bordered w-full px-4"
            placeholder="Course Code (auto-filled)"
            value={formData.courseCode || ""}
            onChange={(e) => setField("courseCode", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});

export default CourseInfoSection;