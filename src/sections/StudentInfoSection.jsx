import React from "react";
import { FiUser, FiSearch } from "react-icons/fi";

const StudentInfoSection = ({ formData, setField, idError, isIdValidated, onIdChange }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FiUser className="text-primary" /> Student Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Student ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Student ID</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter 11-digit ID"
              className={`input input-bordered w-full pl-10 ${idError ? "input-error" : ""}`}
              value={formData.studentId || ""}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          {idError && (
            <label className="label">
              <span className="label-text-alt text-error">{idError}</span>
            </label>
          )}
          {!idError && formData.studentId && (
            <label className="label">
              <span className="label-text-alt text-success">
                {isIdValidated ? "ID validated" : "Type complete ID"}
              </span>
            </label>
          )}
        </div>

        {/* Student Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Student Name</span>
          </label>
          <input
            type="text"
            placeholder="Full name (auto-filled or manual)"
            className="input input-bordered w-full"
            value={formData.studentName || ""}
            onChange={(e) => setField("studentName", e.target.value)}
          />
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Department</span>
          </label>
          <input
            type="text"
            placeholder="Department"
            className="input input-bordered w-full"
            value={formData.studentDepartment || ""}
            onChange={(e) => setField("studentDepartment", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentInfoSection;