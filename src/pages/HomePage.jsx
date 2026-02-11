import React, { useState, useRef } from "react";
import InputForm from "../components/InputForm";
import CoverPagePreview from "../components/CoverPagePreview";
import TemplateSelector from "../components/TemplateSelector";
import DownloadActions from "../components/DownloadActions";
import Navbar from "../components/Navbar";
import QuickTips from "../components/QuickTips";
import Footer from "../components/Footer";
import FeedbackForm from "../components/FeedbackForm";

const HomePage = ({
  formData,
  currentTemplate,
  isGenerating,
  onFormChange,
  onTemplateChange,
  onClearForm,
}) => {
  const [activeTab, setActiveTab] = useState("input");
  const previewRef = useRef();

  return (
    <div
      className="min-h-screen relative overflow-hidden font-sans text-white"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 50%, #111827 100%)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Navbar />

      <main className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        {/* Hero */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4">
            Create Your Perfect
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Cover Page
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Generate professional academic cover pages in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["30s", "3", "100%"].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10"
              >
                <div className="text-2xl font-bold">{item}</div>
                <div className="text-xs text-gray-400">
                  {i === 0
                    ? "Generation Time"
                    : i === 1
                    ? "Fields to Fill"
                    : "Free Forever"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template */}
        <section className="mb-12">
          <TemplateSelector
            currentTemplate={currentTemplate}
            onTemplateChange={onTemplateChange}
          />
        </section>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-full p-1.5 border border-white/10 shadow-2xl">
            <div className="flex gap-2">
              {["input", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {tab === "input" ? "✏️ Fill Details" : "👁️ Preview"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {/* Input */}
          {activeTab === "input" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
                <div className="p-6 md:p-10">
                  <InputForm
                    formData={formData}
                    onFormChange={onFormChange}
                    onClearForm={onClearForm}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {activeTab === "preview" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden relative">
                <div className="p-6">
                  <CoverPagePreview
                    formData={formData}
                    template={currentTemplate}
                    previewRef={previewRef}
                  />

                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50">
                      <div className="text-center">
                        <div className="w-20 h-20 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <p className="text-lg font-semibold text-indigo-300">
                          Creating Your Cover...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Download */}
        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-6 md:p-10">
                <DownloadActions
                  previewRef={previewRef}
                  formData={formData}
                />
              </div>
            </div>
          </div>
        </section>

        <QuickTips />
        <Footer />
      </main>

      <FeedbackForm />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
