import React, { memo } from "react";
import { FiCalendar, FiFileText, FiEdit3, FiClock } from "react-icons/fi";

const DocumentDetailsSection = memo(({ formData, setField, customDocType, onDocTypeChange, docTypes }) => {
  return (
    <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-white/40 shadow-xl">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
          <FiFileText className="text-white text-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-800">Document Details</h3>
          <p className="text-sm text-gray-600">Final touches for your cover page 📄</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Type */}
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiEdit3 className="text-orange-600" />
            Document Type
          </label>
          <div className="relative">
            <input
              list="doc-types"
              className="w-full px-4 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
              value={formData.documentType || customDocType}
              onChange={(e) => onDocTypeChange(e.target.value)}
              placeholder="Select or type..."
            />
            <datalist id="doc-types">
              {docTypes.map((type) => (
                <option key={type} value={type} />
              ))}
            </datalist>
          </div>
          <span className="text-xs text-gray-500 mt-2">
            💼 Assignment, Lab Report, Project, etc.
          </span>
        </div>

        {/* Title (Optional) */}
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiFileText className="text-purple-600" />
            Title <span className="text-xs font-normal text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="E.g., Binary Search Trees"
            className="w-full px-4 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
            value={formData.topic || ""}
            onChange={(e) => setField("topic", e.target.value)}
          />
          <span className="text-xs text-gray-500 mt-2">
            📝 Specific topic or title (optional)
          </span>
        </div>

        {/* Submission Date */}
        <div className="form-control">
          <label className="label font-bold text-gray-700 flex items-center gap-2">
            <FiClock className="text-green-600" />
            Submission Date
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              className="flex-1 px-4 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
              value={formData.submissionDate || ""}
              onChange={(e) => setField("submissionDate", e.target.value)}
            />
          </div>
          <span className="text-xs text-gray-500 mt-2">
            📅 When you need to submit
          </span>
        </div>
      </div>

      {/* Completion Status */}
      <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-purple-900 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Document Details Status
          </span>
          <span className="text-sm font-bold text-purple-600">
            {[formData.documentType, formData.submissionDate].filter(Boolean).length}/2 required
          </span>
        </div>
        <div className="w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
            style={{ 
              width: `${([formData.documentType, formData.submissionDate].filter(Boolean).length / 2) * 100}%` 
            }}
          />
        </div>
        <p className="text-xs text-purple-700 mt-2">
          {formData.documentType && formData.submissionDate 
            ? "✅ All set! You're ready to generate your cover page." 
            : "⏳ Fill required fields to continue"}
        </p>
      </div>
    </div>
  );
});

export default DocumentDetailsSection;