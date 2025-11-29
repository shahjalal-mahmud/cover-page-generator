import React, { memo } from "react";
import { FiRefreshCw, FiDownload, FiZap } from "react-icons/fi";

const ActionButtons = memo(({ clearForm, validateAndGenerate, isLoading }) => {
  return (
    <div className="bg-base-200 p-6 rounded-2xl border border-base-300 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={clearForm}
          className="btn btn-outline btn-primary rounded-xl px-8 py-3 font-semibold transition-all duration-200 shadow-sm flex items-center gap-2 w-full sm:w-auto"
          disabled={isLoading}
        >
          <FiRefreshCw className="text-lg" />
          Clear Form
        </button>
        
        <button
          onClick={validateAndGenerate}
          disabled={isLoading}
          className="btn btn-primary rounded-xl px-8 py-3 font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <div className="loading loading-spinner loading-sm"></div>
              Generating...
            </>
          ) : (
            <>
              <FiZap className="text-lg" /> 
              Generate Cover Page 🎨
            </>
          )}
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center mt-4">
          <p className="text-base-content opacity-70 flex items-center justify-center gap-2">
            <FiDownload className="animate-bounce" />
            Creating your beautiful cover page...
          </p>
        </div>
      )}
    </div>
  );
});

export default ActionButtons;