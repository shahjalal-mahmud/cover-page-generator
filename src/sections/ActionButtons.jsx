import React from "react";
// Replaced FiSparkles with FiZap
import { FiRefreshCw, FiDownload, FiZap } from "react-icons/fi";

const ActionButtons = ({ clearForm, validateAndGenerate, isLoading }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={clearForm}
          className="btn btn-outline border-2 border-purple-400 text-purple-600 hover:bg-purple-400 hover:border-purple-400 hover:text-white rounded-xl px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm flex items-center gap-2 w-full sm:w-auto"
          disabled={isLoading}
        >
          <FiRefreshCw className="text-lg" />
          Clear Form
        </button>
        
        <button
          onClick={validateAndGenerate}
          disabled={isLoading}
          className="btn bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white rounded-xl px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <div className="loading loading-spinner loading-sm"></div>
              Generating...
            </>
          ) : (
            <>
              {/* Use FiZap (Lightning/Energy icon) */}
              <FiZap className="text-lg" /> 
              Generate Cover Page 🎨
            </>
          )}
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center mt-4">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <FiDownload className="animate-bounce" />
            Creating your beautiful cover page...
          </p>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;