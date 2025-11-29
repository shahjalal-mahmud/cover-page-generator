import React from "react";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiHome } from "react-icons/fi";

const TeacherInfoSection = ({ formData, setField }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-md">
          <FiUser className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Teacher Information 👨‍🏫</h3>
          <p className="text-sm text-gray-600">Teacher details (auto-filled)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiUser className="text-green-500" />
            Teacher Name
          </label>
          <input
            type="text"
            placeholder="Teacher Name (auto-filled)"
            className="input input-bordered w-full border-2 border-green-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 rounded-xl transition-all duration-200"
            value={formData.teacherName || ""}
            onChange={(e) => setField("teacherName", e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiBriefcase className="text-blue-500" />
            Designation
          </label>
          <input
            type="text"
            placeholder="Designation (auto-filled)"
            className="input input-bordered w-full border-2 border-green-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 rounded-xl transition-all duration-200"
            value={formData.teacherPosition || ""}
            onChange={(e) => setField("teacherPosition", e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiHome className="text-purple-500" />
            Department
          </label>
          <input
            type="text"
            placeholder="Department (auto-filled)"
            className="input input-bordered w-full border-2 border-green-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 rounded-xl transition-all duration-200"
            value={formData.teacherDepartment || ""}
            onChange={(e) => setField("teacherDepartment", e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiMail className="text-red-500" />
            Teacher Email
          </label>
          <input
            type="email"
            placeholder="Teacher Email (auto-filled)"
            className="input input-bordered w-full border-2 border-green-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 rounded-xl transition-all duration-200"
            value={formData.teacherEmail || ""}
            onChange={(e) => setField("teacherEmail", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiPhone className="text-orange-500" />
            Teacher Mobile
          </label>
          <input
            type="text"
            placeholder="Teacher Mobile (auto-filled)"
            className="input input-bordered w-full border-2 border-green-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 rounded-xl transition-all duration-200"
            value={formData.teacherMobile || ""}
            onChange={(e) => setField("teacherMobile", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherInfoSection;