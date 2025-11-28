import React from "react";

const ActionButtons = ({ clearForm, validateAndGenerate }) => {
  return (
    <div className="card-actions justify-end gap-4 mt-6">
      <button
        className="btn btn-outline btn-wide"
        onClick={clearForm}
      >
        Clear Form
      </button>
    </div>
  );
};

export default ActionButtons;