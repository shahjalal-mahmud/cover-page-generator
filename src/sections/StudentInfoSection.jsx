import React, { memo } from "react";
import { FiUser, FiSearch, FiCheck, FiAlertCircle, FiBook, FiAward } from "react-icons/fi";

const StudentInfoSection = memo(({ formData, setField, idError, isIdValidated, onIdChange }) => {
  return (
    <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-white/40 shadow-xl">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <FiUser className="text-white text-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-800">Student Info</h3>
          <p className="text-sm text-gray-600">Just 3 simple fields! ⚡</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-gray-700 flex items-center gap-2">
              <FiAward className="text-purple-600" />
              Student ID
            </span>
          </label>
          <div className="relative group">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter 11-digit ID"
              className={`
                w-full px-4 py-4 pl-12 rounded-xl font-semibold text-lg
                transition-all duration-300 border-2
                focus:outline-none focus:ring-4
                ${idError 
                  ? "border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-500" 
                  : isIdValidated 
                  ? "border-green-300 bg-green-50 focus:ring-green-100 focus:border-green-500"
                  : "border-gray-200 bg-white focus:ring-purple-100 focus:border-purple-500"
                }
              `}
              value={formData.studentId || ""}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isIdValidated ? (
                <FiCheck className="text-green-600 text-2xl animate-scale-in" />
              ) : idError ? (
                <FiAlertCircle className="text-red-600 text-2xl animate-scale-in" />
              ) : (
                <FiSearch className="text-gray-400 text-2xl group-hover:text-purple-600 transition-colors" />
              )}
            </div>
          </div>
          <div className="label min-h-[2rem]">
            {idError ? (
              <span className="label-text-alt text-red-600 font-semibold flex items-center gap-2">
                <FiAlertCircle className="text-sm" />
                {idError}
              </span>
            ) : formData.studentId ? (
              <span className="label-text-alt text-green-600 font-semibold flex items-center gap-2">
                <FiCheck className="text-sm" />
                {isIdValidated ? "ID found! ✨" : `${formData.studentId.length}/11 digits`}
              </span>
            ) : (
              <span className="label-text-alt text-gray-500">
                📝 Enter your 11-digit ID
              </span>
            )}
          </div>
        </div>

        {/* Student Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-gray-700 flex items-center gap-2">
              <FiUser className="text-pink-600" />
              Student Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all duration-300"
            value={formData.studentName || ""}
            onChange={(e) => setField("studentName", e.target.value)}
          />
          <label className="label min-h-[2rem]">
            <span className="label-text-alt text-gray-500 flex items-center gap-1">
              {formData.studentName ? "✅ Looking good!" : "👤 Enter your name"}
            </span>
          </label>
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-gray-700 flex items-center gap-2">
              <FiBook className="text-blue-600" />
              Department
            </span>
          </label>
          <input
            type="text"
            placeholder="Your department"
            className="w-full px-4 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
            value={formData.studentDepartment || ""}
            onChange={(e) => setField("studentDepartment", e.target.value)}
          />
          <label className="label min-h-[2rem]">
            <span className="label-text-alt text-gray-500">
              🏛️ CSE, EEE, BBA, etc.
            </span>
          </label>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-purple-900">Your Progress</span>
          <span className="text-sm font-bold text-purple-600">
            {[formData.studentId?.length === 11, formData.studentName, formData.studentDepartment].filter(Boolean).length}/3 fields
          </span>
        </div>
        <div className="w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
            style={{ 
              width: `${([formData.studentId?.length === 11, formData.studentName, formData.studentDepartment].filter(Boolean).length / 3) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default StudentInfoSection;