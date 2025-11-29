import React from "react";
import { FiUser, FiSearch, FiCheck, FiAlertCircle, FiBook, FiAward } from "react-icons/fi";

const StudentInfoSection = ({ formData, setField, idError, isIdValidated, onIdChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md">
          <FiUser className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Student Information 🎓</h3>
          <p className="text-sm text-gray-600">Enter your student details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
              <FiAward className="text-purple-500" />
              Student ID
            </span>
          </label>
          <div className="relative group">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter 11-digit ID"
              className={`input input-lg w-full pl-12 transition-all duration-200 border-2 ${
                idError 
                  ? "border-red-400 bg-red-50 focus:border-red-500" 
                  : isIdValidated 
                  ? "border-green-400 bg-green-50 focus:border-green-500"
                  : "border-purple-200 focus:border-purple-400 bg-white"
              } rounded-xl focus:ring-2 focus:ring-purple-200`}
              value={formData.studentId || ""}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isIdValidated ? (
                <FiCheck className="text-green-500 text-xl" />
              ) : idError ? (
                <FiAlertCircle className="text-red-500 text-xl" />
              ) : (
                <FiSearch className="text-gray-400 text-xl group-hover:text-purple-500 transition-colors" />
              )}
            </div>
          </div>
          <div className="label">
            {idError ? (
              <span className="label-text-alt text-red-500 font-medium flex items-center gap-2 animate-pulse">
                <FiAlertCircle className="text-sm" />
                {idError}
              </span>
            ) : formData.studentId ? (
              <span className="label-text-alt text-green-500 font-medium flex items-center gap-2">
                <FiCheck className="text-sm" />
                {isIdValidated ? "ID validated successfully! 🎉" : "Type complete"}
              </span>
            ) : (
              <span className="label-text-alt text-gray-500">
                📝 11-digit student ID required
              </span>
            )}
          </div>
        </div>

        {/* Student Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
              <FiUser className="text-pink-500" />
              Student Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Full name (auto-filled or manual)"
            className="input input-lg w-full border-2 border-purple-200 bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
            value={formData.studentName || ""}
            onChange={(e) => setField("studentName", e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-gray-500 flex items-center gap-1">
              {formData.studentName ? "✅ Name entered" : "👤 Enter your full name"}
            </span>
          </label>
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
              <FiBook className="text-blue-500" />
              Department
            </span>
          </label>
          <input
            type="text"
            placeholder="Department"
            className="input input-lg w-full border-2 border-purple-200 bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
            value={formData.studentDepartment || ""}
            onChange={(e) => setField("studentDepartment", e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-gray-500">
              🏛️ Your department
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoSection;