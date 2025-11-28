import React from "react";
import { FiUser, FiSearch, FiCheck, FiAlertCircle } from "react-icons/fi";

const StudentInfoSection = ({ formData, setField, idError, isIdValidated, onIdChange }) => {
  return (
    <div className="bg-gradient-to-br from-base-200 to-base-300 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <FiUser className="text-primary text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-base-content">Student Information</h3>
          <p className="text-sm text-base-content/60">Enter your student details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Student ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content/80">Student ID</span>
          </label>
          <div className="relative group">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter 11-digit ID"
              className={`input input-lg input-bordered w-full pl-12 transition-all duration-200 group-hover:border-primary/50 ${
                idError ? "input-error border-2" : isIdValidated ? "input-success border-2" : ""
              }`}
              value={formData.studentId || ""}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isIdValidated ? (
                <FiCheck className="text-success text-lg" />
              ) : idError ? (
                <FiAlertCircle className="text-error text-lg" />
              ) : (
                <FiSearch className="text-base-content/40 text-lg group-hover:text-primary transition-colors" />
              )}
            </div>
          </div>
          <div className="label">
            {idError ? (
              <span className="label-text-alt text-error font-medium flex items-center gap-1">
                <FiAlertCircle className="text-sm" />
                {idError}
              </span>
            ) : formData.studentId ? (
              <span className="label-text-alt text-success font-medium flex items-center gap-1">
                <FiCheck className="text-sm" />
                {isIdValidated ? "ID validated successfully!" : "Type complete"}
              </span>
            ) : (
              <span className="label-text-alt text-base-content/50">
                11-digit student ID required
              </span>
            )}
          </div>
        </div>

        {/* Student Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content/80">Student Name</span>
          </label>
          <input
            type="text"
            placeholder="Full name (auto-filled or manual)"
            className="input input-lg input-bordered w-full transition-all duration-200 hover:border-primary/50 focus:border-primary"
            value={formData.studentName || ""}
            onChange={(e) => setField("studentName", e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-base-content/50">
              {formData.studentName ? "✓ Name entered" : "Enter your full name"}
            </span>
          </label>
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content/80">Department</span>
          </label>
          <input
            type="text"
            placeholder="Department"
            className="input input-lg input-bordered w-full transition-all duration-200 hover:border-primary/50 focus:border-primary"
            value={formData.studentDepartment || ""}
            onChange={(e) => setField("studentDepartment", e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-base-content/50">
              Your department
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoSection;