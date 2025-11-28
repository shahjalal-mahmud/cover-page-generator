import InputForm from '../components/InputForm';
import CoverPagePreview from '../components/CoverPagePreview';
import TemplateSelector from '../components/TemplateSelector';

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 transition-all duration-500">
      {/* Enhanced Header */}
      <div className="bg-base-100/80 backdrop-blur-lg shadow-lg border-b border-base-300 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                Cover Page Generator
              </h1>
            </div>
            
            {/* Modern Theme Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm opacity-70">
                <span className={`transition-all duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`}>
                  Light
                </span>
                <button 
                  onClick={onThemeToggle}
                  className="relative w-14 h-7 rounded-full bg-gradient-to-r from-primary to-secondary p-1 transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  aria-label="Toggle theme"
                >
                  <div 
                    className={`absolute top-1 w-5 h-5 bg-base-100 rounded-full shadow-lg transform transition-all duration-500 ${
                      theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  >
                    <div className="flex items-center justify-center h-full">
                      {theme === 'dark' ? (
                        <span className="text-xs">🌙</span>
                      ) : (
                        <span className="text-xs">☀️</span>
                      )}
                    </div>
                  </div>
                </button>
                <span className={`transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-50'}`}>
                  Dark
                </span>
              </div>
              
              {/* Mobile Theme Toggle */}
              <button 
                onClick={onThemeToggle}
                className="sm:hidden btn btn-circle btn-ghost btn-sm border border-base-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <span className="text-lg">🌙</span>
                ) : (
                  <span className="text-lg">☀️</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Template Selector */}
        <div className="mb-6 sm:mb-8">
          <TemplateSelector 
            currentTemplate={currentTemplate}
            onTemplateChange={onTemplateChange}
          />
        </div>

        {/* Main Content - Mobile: Form first, then Preview */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Form - Always first on mobile */}
          <div className="order-1">
            <InputForm 
              formData={formData} 
              onFormChange={onFormChange}
              onClearForm={onClearForm}
            />
          </div>

          {/* Preview - After form on mobile, right side on desktop */}
          <div id="preview-section" className="order-2 xl:order-2">
            <CoverPagePreview 
              formData={formData} 
              template={currentTemplate}
            />
            
            {/* Enhanced Generating Indicator */}
            {isGenerating && (
              <div className="card bg-base-100/80 backdrop-blur-md border border-primary/20 shadow-xl mt-6">
                <div className="card-body py-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="loading loading-spinner loading-lg text-primary"></div>
                      <div className="absolute inset-0 loading loading-spinner loading-lg text-secondary opacity-70 animate-pulse"></div>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Crafting Your Cover Page
                      </p>
                      <p className="text-sm opacity-70 mt-1">This will just take a moment...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Quick Tips Section */}
        <div className="mt-8 sm:mt-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🚀 Quick Tips & Features
            </h3>
            <p className="opacity-70 mt-2">Make the most out of your cover page creation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Tip 1 */}
            <div className="card bg-base-100/80 backdrop-blur-md border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">High-Quality PDF</h4>
                    <p className="text-sm opacity-70 mt-1">Download print-ready PDF with perfect formatting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="card bg-base-100/80 backdrop-blur-md border border-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-2xl">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">PNG Export</h4>
                    <p className="text-sm opacity-70 mt-1">Get crisp PNG images for digital submissions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="card bg-base-100/80 backdrop-blur-md border border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-2xl">
                    <span className="text-2xl">📤</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Easy Sharing</h4>
                    <p className="text-sm opacity-70 mt-1">Share directly via Email, WhatsApp, or social media</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 4 */}
            <div className="card bg-base-100/80 backdrop-blur-md border border-info/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-info/10 p-3 rounded-2xl">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Live Preview</h4>
                    <p className="text-sm opacity-70 mt-1">Real-time preview with exact colors and layout</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 5 */}
            <div className="card bg-base-100/80 backdrop-blur-md border border-success/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-success/10 p-3 rounded-2xl">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Multiple Templates</h4>
                    <p className="text-sm opacity-70 mt-1">Choose from various professional designs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 6 */}
            <div className="card bg-base-100/80 backdrop-blur-md border border-warning/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-warning/10 p-3 rounded-2xl">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Fully Responsive</h4>
                    <p className="text-sm opacity-70 mt-1">Perfect experience on all devices and screens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-12 pt-8 border-t border-base-300">
          <div className="text-center">
            <p className="text-sm opacity-70 mb-2">
              Cover Page Generator • Made with ❤️ for Students Worldwide
            </p>
            <p className="text-xs opacity-50">
              © {new Date().getFullYear()} • Professional Academic Tools
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;