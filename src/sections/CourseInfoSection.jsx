import React from "react";
import { FiBookOpen, FiInfo } from "react-icons/fi";

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
    <div className="bg-base-200 p-6 rounded-2xl shadow-md mb-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-5 flex items-center gap-3 text-primary">
        <FiBookOpen /> Course Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
        {/* Section Input */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-medium">Section</span>
            {sectionInput && detectedSemester && (
              <span className="label-text-alt text-success text-sm">
                Semester {detectedSemester} detected
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="e.g. 5C, 1A"
            className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={sectionInput}
            onChange={(e) => onSectionChange(e.target.value)}
          />
          <span className="text-xs text-gray-500 mt-1 block">
            Batch + Section (auto-detects semester)
          </span>
          {sectionInput && !detectedSemester && (
            <span className="text-warning text-xs mt-1 block">Could not detect semester</span>
          )}
        </div>

        {/* Semester Display */}
        <div className="form-control">
          <label className="label font-medium">Semester</label>
          <div className="input input-bordered w-full bg-base-100 flex items-center justify-between rounded-lg px-3 py-2">
            {detectedSemester ? (
              <span className="text-success font-medium">Semester {detectedSemester}</span>
            ) : (
              <span className="text-gray-400">Enter section to detect</span>
            )}
            <FiInfo className="text-gray-400" title="Automatically detected from section" />
          </div>
        </div>

        {/* Course Selector */}
        <div className="form-control relative">
          <label className="label flex justify-between items-center">
            <span className="label-text font-medium">Course</span>
            {sectionInput && (
              <span className="label-text-alt text-info text-sm">
                Showing for {sectionInput}
              </span>
            )}
          </label>
          <select
            className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
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
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <input
          type="text"
          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="Course Title (auto-filled)"
          value={formData.courseTitle || ""}
          onChange={(e) => setField("courseTitle", e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="Course Code (auto-filled)"
          value={formData.courseCode || ""}
          onChange={(e) => setField("courseCode", e.target.value)}
        />
      </div>
    </div>
  );
};

export default CourseInfoSection;