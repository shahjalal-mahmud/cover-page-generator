import React from "react";
import { FiCalendar, FiFileText, FiEdit3, FiClock } from "react-icons/fi";

const DocumentDetailsSection = ({ formData, setField, customDocType, onDocTypeChange, docTypes }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center shadow-md">
          <FiFileText className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Document Details 📄</h3>
          <p className="text-sm text-gray-600">Finalize your cover page details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Type */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiEdit3 className="text-orange-500" />
            Document Type
          </label>
          <input
            list="doc-types"
            className="input input-bordered w-full border-2 border-orange-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-200"
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

        {/* Title (Optional) */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiFileText className="text-purple-500" />
            Title <span className="text-sm font-normal opacity-60">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Cover page title (optional)"
            className="input input-bordered w-full border-2 border-orange-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-200"
            value={formData.topic || ""}
            onChange={(e) => setField("topic", e.target.value)}
          />
        </div>

        {/* Submission Date */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700 flex items-center gap-2">
            <FiClock className="text-green-500" />
            Submission Date
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              className="input input-bordered flex-1 border-2 border-orange-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-200"
              value={formData.submissionDate || ""}
              onChange={(e) => setField("submissionDate", e.target.value)}
            />
            <button
              className="btn btn-outline border-2 border-green-400 text-green-600 hover:bg-green-400 hover:border-green-400 hover:text-white rounded-xl transition-all duration-200 shadow-sm"
              onClick={() => setField("submissionDate", new Date().toISOString().split("T")[0])}
            >
              Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsSection;