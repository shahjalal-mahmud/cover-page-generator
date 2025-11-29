import React, { memo } from "react";
import { FiCalendar, FiFileText, FiEdit3, FiClock } from "react-icons/fi";

const DocumentDetailsSection = memo(({ formData, setField, customDocType, onDocTypeChange, docTypes }) => {
  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-warning to-error rounded-xl flex items-center justify-center shadow-md">
          <FiFileText className="text-base-100 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-base-content">Document Details 📄</h3>
          <p className="text-sm text-base-content opacity-70">Finalize your cover page details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Type */}
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiEdit3 className="text-warning" />
            Document Type
          </label>
          <input
            list="doc-types"
            className="input input-bordered w-full px-4"
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
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiFileText className="text-primary" />
            Title <span className="text-sm font-normal opacity-60">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Cover page title (optional)"
            className="input input-bordered w-full px-4"
            value={formData.topic || ""}
            onChange={(e) => setField("topic", e.target.value)}
          />
        </div>

        {/* Submission Date */}
        <div className="form-control">
          <label className="label font-semibold text-base-content flex items-center gap-2">
            <FiClock className="text-success" />
            Submission Date
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              className="input input-bordered flex-1 px-4"
              value={formData.submissionDate || ""}
              onChange={(e) => setField("submissionDate", e.target.value)}
            />
            <button
              className="btn btn-outline btn-success rounded-xl transition-all duration-200 shadow-sm"
              onClick={() => setField("submissionDate", new Date().toISOString().split("T")[0])}
            >
              Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DocumentDetailsSection;