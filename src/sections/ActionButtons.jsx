import React, { memo } from "react";
import { FiRefreshCw, FiZap } from "react-icons/fi";

const ActionButtons = memo(({ clearForm, validateAndGenerate, isLoading }) => {
  return (
    <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-white/40 shadow-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black text-gray-800 mb-2">Ready to Go? 🚀</h3>
        <p className="text-gray-600">Generate your cover page or start fresh</p>
      </div>

      {/* Buttons Grid */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
        {/* Clear Button */}
        <button
          onClick={clearForm}
          className="group relative overflow-hidden px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
          disabled={isLoading}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <FiRefreshCw className={`text-2xl relative z-10 ${isLoading ? '' : 'group-hover:rotate-180'} transition-transform duration-500`} />
          <span className="relative z-10">Clear Form</span>
        </button>
        
        {/* Generate Button */}
        <button
          onClick={validateAndGenerate}
          disabled={isLoading}
          className="group relative overflow-hidden px-10 py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span className="relative z-10">Creating Magic...</span>
            </>
          ) : (
            <>
              <FiZap className="text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-300" /> 
              <span className="relative z-10">Generate Cover Page</span>
              <span className="text-2xl relative z-10 animate-bounce-subtle">✨</span>
            </>
          )}
        </button>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 animate-scale-in">
          <div className="flex items-center justify-center gap-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-purple-900 font-bold">
              Creating your beautiful cover page...
            </p>
          </div>
        </div>
      )}

      {/* Helper Text */}
      {!isLoading && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            <span className="text-xl">💡</span>
            Make sure all required fields are filled before generating
          </p>
        </div>
      )}
    </div>
  );
});

export default ActionButtons;