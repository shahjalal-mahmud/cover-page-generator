import React, { memo } from "react";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiHome } from "react-icons/fi";

const TeacherInfoSection = memo(({ formData, setField }) => {
  const hasTeacherInfo = formData.teacherName || formData.teacherPosition || formData.teacherDepartment;

  return (
    <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-white/40 shadow-xl">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <FiUser className="text-white text-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-800">Teacher Info</h3>
          <p className="text-sm text-gray-600">
            {hasTeacherInfo ? "Auto-filled from database ✨" : "Will be auto-filled 🎯"}
          </p>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiUser className="text-green-600" />
            Teacher Name
          </label>
          <input
            type="text"
            placeholder="Auto-filled after course selection"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
            value={formData.teacherName || ""}
            onChange={(e) => setField("teacherName", e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiBriefcase className="text-blue-600" />
            Designation
          </label>
          <input
            type="text"
            placeholder="Auto-filled (e.g., Lecturer, Professor)"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
            value={formData.teacherPosition || ""}
            onChange={(e) => setField("teacherPosition", e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiHome className="text-purple-600" />
            Department
          </label>
          <input
            type="text"
            placeholder="Auto-filled department"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
            value={formData.teacherDepartment || ""}
            onChange={(e) => setField("teacherDepartment", e.target.value)}
          />
        </div>
      </div>
      
      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiMail className="text-red-600" />
            Teacher Email <span className="text-xs font-normal text-gray-500">(Optional)</span>
          </label>
          <input
            type="email"
            placeholder="Auto-filled email (optional)"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300"
            value={formData.teacherEmail || ""}
            onChange={(e) => setField("teacherEmail", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiPhone className="text-orange-600" />
            Teacher Mobile <span className="text-xs font-normal text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Auto-filled mobile (optional)"
            className="w-full px-4 py-3 rounded-xl font-medium border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
            value={formData.teacherMobile || ""}
            onChange={(e) => setField("teacherMobile", e.target.value)}
          />
        </div>
      </div>

      {/* Info Banner */}
      {!hasTeacherInfo && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-orange-900 mb-1">Auto-Fill Coming!</p>
              <p className="text-sm text-orange-700">
                Select your section and course, and we'll automatically fill in your teacher's information.
              </p>
            </div>
          </div>
        </div>
      )}

      {hasTeacherInfo && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-scale-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-green-900 mb-1">Teacher Info Loaded!</p>
              <p className="text-sm text-green-700">
                Information has been automatically filled from our database. You can still edit if needed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default TeacherInfoSection;