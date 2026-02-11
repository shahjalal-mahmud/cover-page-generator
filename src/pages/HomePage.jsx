import React, { useState, useRef } from 'react';
import InputForm from '../components/InputForm';
import CoverPagePreview from '../components/CoverPagePreview';
import TemplateSelector from '../components/TemplateSelector';
import DownloadActions from '../components/DownloadActions';
import Navbar from '../components/Navbar';
import QuickTips from '../components/QuickTips';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';

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
  const [activeTab, setActiveTab] = useState('input');
  const previewRef = useRef();

  return (
    <div
      data-theme={theme === 'dark' ? 'dark' : 'light'}
      className="min-h-screen relative overflow-hidden transition-all duration-500 font-sans"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <Navbar theme={theme} onThemeToggle={onThemeToggle} />

      <main className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 text-white drop-shadow-2xl">
            Create Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Cover Page
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-6 drop-shadow-lg">
            Generate professional academic cover pages in seconds. Just fill in 3 simple fields and you're done! ⚡
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white">30s</div>
              <div className="text-xs text-white/80">Generation Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-white/80">Fields to Fill</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-white/80">Free Forever</div>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <section className="mb-12">
          <TemplateSelector
            currentTemplate={currentTemplate}
            onTemplateChange={onTemplateChange}
          />
        </section>

        {/* Modern Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-1.5 border border-white/20 shadow-2xl">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('input')}
                className={`
                  relative px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300
                  ${activeTab === 'input'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xl">✏️</span>
                  Fill Details
                </span>
              </button>

              <button
                onClick={() => setActiveTab('preview')}
                className={`
                  relative px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300
                  ${activeTab === 'preview'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xl">👁️</span>
                  Preview
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Input Form Tab */}
          <div className={`
            transition-all duration-500 ease-out
            ${activeTab === 'input'
              ? 'opacity-100 translate-y-0 scale-100 relative'
              : 'opacity-0 translate-y-8 scale-95 absolute inset-0 pointer-events-none'
            }
          `}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/40 overflow-hidden">
                <div className="p-6 md:p-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
                      <span className="text-4xl">📝</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Your Information
                    </h2>
                    <p className="text-gray-600">Just 3 simple fields to fill - that's it!</p>
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

          {/* Preview Tab */}
          <div className={`
            transition-all duration-500 ease-out
            ${activeTab === 'preview'
              ? 'opacity-100 translate-y-0 scale-100 relative'
              : 'opacity-0 translate-y-8 scale-95 absolute inset-0 pointer-events-none'
            }
          `}>
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/40 overflow-hidden">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl shadow-lg mb-4">
                      <span className="text-4xl">✨</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      Your Cover Page
                    </h2>
                    <p className="text-gray-600">Looking good! Ready to download?</p>
                  </div>

                  <CoverPagePreview
                    formData={formData}
                    template={currentTemplate}
                    previewRef={previewRef}
                  />

                  {isGenerating && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl flex items-center justify-center z-50">
                      <div className="text-center">
                        <div className="relative inline-block mb-6">
                          <div className="w-24 h-24 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                          <span className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
                            ✨
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                          Creating Your Masterpiece...
                        </h3>
                        <p className="text-gray-600">Just a moment!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tip */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl animate-bounce">💡</span>
            <p className="text-white text-sm font-medium">
              {activeTab === 'input' ? 'Fill in your details to see the magic happen!' : 'Love it? Download in multiple formats!'}
            </p>
          </div>
        </div>

        {/* Download Section */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg">
              Download & Share 🚀
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Get your cover page in PDF or PNG format, or share it directly with your friends!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/40 overflow-hidden">
              <div className="p-6 md:p-10">
                <DownloadActions 
                  previewRef={previewRef} 
                  formData={formData}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <QuickTips />

        {/* Footer */}
        <Footer />
      </main>

      {/* Feedback Button */}
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