import React, { memo } from "react";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiHome } from "react-icons/fi";

const TeacherInfoSection = memo(({ formData, setField }) => {
  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-success to-info rounded-xl flex items-center justify-center shadow-md">
          <FiUser className="text-base-100 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-base-content">Teacher Information 👨‍🏫</h3>
          <p className="text-sm text-base-content opacity-70">Teacher details (auto-filled)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiUser className="text-success" />
            Teacher Name
          </label>
          <input
            type="text"
            placeholder="Teacher Name (auto-filled)"
            className="input input-bordered w-full px-4"
            value={formData.teacherName || ""}
            onChange={(e) => setField("teacherName", e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiBriefcase className="text-info" />
            Designation
          </label>
          <input
            type="text"
            placeholder="Designation (auto-filled)"
            className="input input-bordered w-full px-4"
            value={formData.teacherPosition || ""}
            onChange={(e) => setField("teacherPosition", e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiHome className="text-primary" />
            Department
          </label>
          <input
            type="text"
            placeholder="Department (auto-filled)"
            className="input input-bordered w-full px-4"
            value={formData.teacherDepartment || ""}
            onChange={(e) => setField("teacherDepartment", e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiMail className="text-error" />
            Teacher Email
          </label>
          <input
            type="email"
            placeholder="Teacher Email (auto-filled)"
            className="input input-bordered w-full px-4"
            value={formData.teacherEmail || ""}
            onChange={(e) => setField("teacherEmail", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiPhone className="text-warning" />
            Teacher Mobile
          </label>
          <input
            type="text"
            placeholder="Teacher Mobile (auto-filled)"
            className="input input-bordered w-full px-4"
            value={formData.teacherMobile || ""}
            onChange={(e) => setField("teacherMobile", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});

export default TeacherInfoSection;