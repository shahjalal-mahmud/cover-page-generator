import React, { memo } from "react";
import { FiUser, FiSearch, FiCheck, FiAlertCircle, FiBook, FiAward } from "react-icons/fi";

const StudentInfoSection = memo(({ formData, setField, idError, isIdValidated, onIdChange }) => {
  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
          <FiUser className="text-base-100 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-base-content">Student Information 🎓</h3>
          <p className="text-sm text-base-content opacity-70">Enter your student details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content flex items-center gap-2">
              <FiAward className="text-primary" />
              Student ID
            </span>
          </label>
          <div className="relative group">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter 11-digit ID"
              className={`input input-lg w-full pl-12 px-4 transition-all duration-200 ${
                idError 
                  ? "input-error" 
                  : isIdValidated 
                  ? "input-success"
                  : "input-bordered"
              }`}
              value={formData.studentId || ""}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isIdValidated ? (
                <FiCheck className="text-success text-xl" />
              ) : idError ? (
                <FiAlertCircle className="text-error text-xl" />
              ) : (
                <FiSearch className="text-base-content opacity-40 text-xl group-hover:opacity-70 transition-colors" />
              )}
            </div>
          </div>
          <div className="label">
            {idError ? (
              <span className="label-text-alt text-error font-medium flex items-center gap-2">
                <FiAlertCircle className="text-sm" />
                {idError}
              </span>
            ) : formData.studentId ? (
              <span className="label-text-alt text-success font-medium flex items-center gap-2">
                <FiCheck className="text-sm" />
                {isIdValidated ? "ID validated successfully! 🎉" : "Type complete"}
              </span>
            ) : (
              <span className="label-text-alt text-base-content opacity-60">
                📝 11-digit student ID required
              </span>
            )}
          </div>
        </div>

        {/* Student Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content flex items-center gap-2">
              <FiUser className="text-secondary" />
              Student Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Full name (auto-filled or manual)"
            className="input input-lg w-full px-4 input-bordered"
            value={formData.studentName || ""}
            onChange={(e) => setField("studentName", e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-base-content opacity-60 flex items-center gap-1">
              {formData.studentName ? "✅ Name entered" : "👤 Enter your full name"}
            </span>
          </label>
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content flex items-center gap-2">
              <FiBook className="text-accent" />
              Department
            </span>
          </label>
          <input
            type="text"
            placeholder="Department"
            className="input input-lg w-full px-4 input-bordered"
            value={formData.studentDepartment || ""}
            onChange={(e) => setField("studentDepartment", e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-base-content opacity-60">
              🏛️ Your department
            </span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default StudentInfoSection;