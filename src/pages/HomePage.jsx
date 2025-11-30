import React, { useState, useRef } from 'react';
import InputForm from '../components/InputForm';
import CoverPagePreview from '../components/CoverPagePreview';
import TemplateSelector from '../components/TemplateSelector';
import DownloadActions from '../components/DownloadActions';
import Navbar from '../components/Navbar';
import QuickTips from '../components/QuickTips';
import Footer from '../components/Footer';

const HomePage = ({
  formData,
  currentTemplate,
  isGenerating,
  theme,
  onThemeToggle,
  onFormChange,
  onTemplateChange,
  onClearForm
}) => {
  const [activeTab, setActiveTab] = useState('input'); // 'input' or 'preview'
  const previewRef = useRef(); // Add this ref for DownloadActions

  // Use data-theme attribute on the root div for DaisyUI theme support
  return (
    <div
      data-theme={theme === 'dark' ? 'dark' : 'light'}
      className="min-h-screen relative overflow-hidden transition-all duration-700 font-sans"
    >
      {/* 🌟 Soft Gradient Background with Floating Blobs */}
      <div className="absolute inset-0 bg-base-100/30 backdrop-blur-3xl" />
      <div className={`
        absolute -top-32 -left-32 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob
        ${theme === 'dark' ? 'bg-pink-700' : 'bg-pink-300'}
      `} />
      <div className={`
        absolute -bottom-16 -right-16 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000
        ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-300'}
      `} />
      <div className={`
        absolute top-1/4 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000
        ${theme === 'dark' ? 'bg-yellow-700' : 'bg-yellow-300'}
      `} />

      {/* 🚀 Header: Super Modern and Cute */}
      <Navbar theme={theme} onThemeToggle={onThemeToggle} />

      <main className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">

        {/* Template Selector Section */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content/80 mb-2">
              <span className="text-secondary">Choose</span> Your Vibe 🎨
            </h2>
            <p className="text-base-content/70 text-lg">Select a template to craft your perfect academic cover.</p>
          </div>
          <TemplateSelector
            currentTemplate={currentTemplate}
            onTemplateChange={onTemplateChange}
          />
        </section>

        {/* Beautiful Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-base-200/50 backdrop-blur-lg rounded-2xl p-2 border border-base-300/50 shadow-lg">
            <div className="flex space-x-2">
              {/* Input Form Tab */}
              <button
                onClick={() => setActiveTab('input')}
                className={`
                  relative px-6 py-3 rounded-xl font-semibold transition-all duration-500 flex items-center gap-3
                  ${activeTab === 'input'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105'
                    : 'bg-transparent text-base-content/70 hover:text-base-content hover:bg-base-300/30'
                  }
                `}
              >
                <span className="text-lg">📝</span>
                Input Form
                {activeTab === 'input' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                )}
              </button>

              {/* Preview Tab */}
              <button
                onClick={() => setActiveTab('preview')}
                className={`
                  relative px-6 py-3 rounded-xl font-semibold transition-all duration-500 flex items-center gap-3
                  ${activeTab === 'preview'
                    ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-lg transform scale-105'
                    : 'bg-transparent text-base-content/70 hover:text-base-content hover:bg-base-300/30'
                  }
                `}
              >
                <span className="text-lg">👁️</span>
                Live Preview
                {activeTab === 'preview' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content with Smooth Animations */}
        <div className="relative">
          {/* Input Form Tab Content */}
          <div className={`
            transition-all duration-700 ease-in-out transform
            ${activeTab === 'input'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'absolute opacity-0 translate-y-8 scale-95 pointer-events-none'
            }
          `}>
            <div className="max-w-4xl mx-auto">
              <div className="card bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl w-full border border-purple-200 rounded-3xl overflow-hidden">
                <div className="card-body p-4 md:p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Fill Your Details
                    </h2>
                    <p className="text-gray-600 mt-2">Enter your information to create the perfect cover page</p>
                  </div>

                  <InputForm
                    formData={formData}
                    onFormChange={onFormChange}
                    onClearForm={onClearForm}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Tab Content */}
          <div className={`
            transition-all duration-700 ease-in-out transform
            ${activeTab === 'preview'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'absolute opacity-0 translate-y-8 scale-95 pointer-events-none'
            }
          `}>
            <div className="max-w-6xl mx-auto">
              <div className="card w-full p-4 sm:p-6 rounded-3xl shadow-2xl transition-all duration-500
                            bg-base-100/50 backdrop-blur-xl border border-secondary/20
                            transform hover:shadow-secondary/30 dark:hover:shadow-primary/30">
                {/* Preview Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Live Preview
                  </h2>
                  <p className="text-gray-600 mt-2">See your cover page come to life in real-time ✨</p>
                </div>

                <CoverPagePreview
                  formData={formData}
                  template={currentTemplate}
                  previewRef={previewRef} // Pass the ref to CoverPagePreview
                />

                {/* Enhanced Generating Indicator with Soft Glow Animation (Glassmorphism) */}
                {isGenerating && (
                  <div className="card absolute inset-0 bg-base-100/80 backdrop-blur-xl border border-primary/30 shadow-2xl rounded-3xl transition-opacity duration-300">
                    <div className="card-body items-center justify-center p-8">
                      <div className="relative">
                        <div className="loading loading-ring loading-lg text-primary"></div>
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-secondary rounded-full opacity-50 blur-xl animate-pulse-slow"></div>
                        </div>
                        <span className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce text-base-content">
                          ✍️
                        </span>
                      </div>
                      <div className="text-center mt-6">
                        <p className="font-extrabold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-text-glow">
                          Crafting Your Masterpiece...
                        </p>
                        <p className="text-sm opacity-70 mt-1">Almost there, just a little pookie magic!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Switch Hint */}
        <div className="text-center mt-6">
          <p className="text-base-content/60 text-sm flex items-center justify-center gap-2">
            <span className="animate-pulse">💡</span>
            Switch between tabs to {activeTab === 'input' ? 'see your preview' : 'edit your information'}
          </p>
        </div>

        {/* 📥 Download & Share Section - Added before Quick Tips */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Download & Share 🚀
              </span>
            </h3>
            <p className="text-lg text-base-content/70">Get your cover page in multiple formats and share it easily!</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="card bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl w-full border border-green-200 rounded-3xl overflow-hidden">
              <div className="card-body p-6 md:p-8">
                <DownloadActions 
                  previewRef={previewRef} 
                  formData={formData}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 💖 Rebuilt Quick Tips & Features Section (Cuter Cards) */}
        <QuickTips />

        {/* 🎀 Enhanced Footer: With Prominent Company Branding */}
        <Footer />

        {/* Global Styles for Custom Animations (Tailwind utility classes) */}
        <style jsx global>{`
          /* Custom Keyframes for the Blob Animation */
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          /* Custom Keyframes for Soft Glow */
          @keyframes text-glow {
            0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 105, 180, 0.3); }
            50% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(100, 100, 255, 0.5); }
            100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 105, 180, 0.3); }
          }
          .animate-text-glow {
            animation: text-glow 4s ease-in-out infinite;
          }

          /* Custom Keyframes for Slow Spin */
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 15s linear infinite;
          }
          
          /* Custom Keyframes for Subtle Bounce */
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
          }
          
          /* Custom Keyframes for Icon Wiggle */
          @keyframes wiggle {
            0%, 7% {
              transform: rotateZ(0);
            }
            15% {
              transform: rotateZ(-5deg);
            }
            20% {
              transform: rotateZ(5deg);
            }
            25% {
              transform: rotateZ(-3deg);
            }
            30% {
              transform: rotateZ(3deg);
            }
            35% {
              transform: rotateZ(0);
            }
            100% {
              transform: rotateZ(0);
            }
          }
          .animate-wiggle {
            animation: wiggle 10s infinite;
          }
          
          /* Custom Keyframes for Pulse Slow */
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }
        `}</style>

      </main>
    </div>
  );
};

export default HomePage;