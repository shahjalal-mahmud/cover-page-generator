import React from "react";

const TeacherInfoSection = ({ formData, setField }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Teacher Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Teacher Name (auto-filled)"
          className="input input-bordered w-full"
          value={formData.teacherName || ""}
          onChange={(e) => setField("teacherName", e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Designation (auto-filled)"
          className="input input-bordered w-full"
          value={formData.teacherPosition || ""}
          onChange={(e) => setField("teacherPosition", e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Department (auto-filled)"
          className="input input-bordered w-full"
          value={formData.teacherDepartment || ""}
          onChange={(e) => setField("teacherDepartment", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          placeholder="Teacher Email (auto-filled)"
          className="input input-bordered w-full"
          value={formData.teacherEmail || ""}
          onChange={(e) => setField("teacherEmail", e.target.value)}
        />
        <input
          type="text"
          placeholder="Teacher Mobile (auto-filled)"
          className="input input-bordered w-full"
          value={formData.teacherMobile || ""}
          onChange={(e) => setField("teacherMobile", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TeacherInfoSection;