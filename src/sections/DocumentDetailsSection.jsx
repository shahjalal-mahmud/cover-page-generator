import React from "react";
import { FiCalendar } from "react-icons/fi";

const DocumentDetailsSection = ({ formData, setField, customDocType, onDocTypeChange, docTypes }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FiCalendar className="text-primary" /> Document Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Document Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Document Type</span>
          </label>
          <input
            list="doc-types"
            className="input input-bordered w-full"
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
          <label className="label">
            <span className="label-text font-medium">
              Title <span className="text-sm opacity-60">(Optional)</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Cover page title (optional)"
            className="input input-bordered w-full"
            value={formData.topic || ""}
            onChange={(e) => setField("topic", e.target.value)}
          />
        </div>

        {/* Submission Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Submission Date</span>
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className="input input-bordered flex-1"
              value={formData.submissionDate || ""}
              onChange={(e) => setField("submissionDate", e.target.value)}
            />
            <button
              className="btn btn-outline btn-sm"
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