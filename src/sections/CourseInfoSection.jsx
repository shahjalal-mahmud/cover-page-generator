import React from "react";
import { FiBookOpen } from "react-icons/fi";

const CourseInfoSection = ({
  formData,
  setField,
  sectionInput,
  selectedSemester,
  filteredCourses,
  selectedCourseCode,
  onSectionChange,
  onCourseSelect,
  setSelectedSemester,
  extractSemesterFromSection,
  semestersData
}) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FiBookOpen className="text-primary" /> Course Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Section Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Section</span>
            {sectionInput && (
              <span className="label-text-alt text-success">
                Auto-detected: Semester {extractSemesterFromSection(sectionInput)}
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="e.g. 5C, 1A"
            className="input input-bordered w-full"
            value={sectionInput}
            onChange={(e) => onSectionChange(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt opacity-60">Batch + Section (auto-detects semester)</span>
          </label>
        </div>

        {/* Semester Selector */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Semester</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semestersData.semesters?.map((sem) => (
              <option key={sem.semester} value={sem.semester}>
                {sem.semester}
              </option>
            ))}
          </select>
        </div>

        {/* Course Selector */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Course</span>
            {sectionInput && (
              <span className="label-text-alt text-info">
                Showing courses for {sectionInput}
              </span>
            )}
          </label>
          <select
            className="select select-bordered w-full"
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
                {sectionInput ? `No courses found for section ${sectionInput}` : "Enter section to see courses"}
              </option>
            )}
          </select>
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Course Title (auto-filled)"
          value={formData.courseTitle || ""}
          onChange={(e) => setField("courseTitle", e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Course Code (auto-filled)"
          value={formData.courseCode || ""}
          onChange={(e) => setField("courseCode", e.target.value)}
        />
      </div>
    </div>
  );
};

export default CourseInfoSection;