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
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      {/* Header with Theme Toggle */}
      <div className="bg-base-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                Cover Page Generator
              </h1>
              <p className="text-sm sm:text-base md:text-lg opacity-70">
                Create professional cover pages for your assignments and reports
              </p>
            </div>
            
            {/* Theme Toggle */}
            <label className="flex items-center cursor-pointer gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <input 
                type="checkbox" 
                className="toggle toggle-primary"
                checked={theme === 'dark'}
                onChange={onThemeToggle}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </label>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Form */}
          <div className="order-2 xl:order-1">
            <InputForm 
              formData={formData} 
              onFormChange={onFormChange}
              onClearForm={onClearForm}
            />
          </div>

          {/* Preview */}
          <div id="preview-section" className="order-1 xl:order-2">
            <CoverPagePreview 
              formData={formData} 
              template={currentTemplate}
            />
            
            {/* Generating Indicator */}
            {isGenerating && (
              <div className="card bg-base-100 shadow-xl mt-4 sm:mt-6">
                <div className="card-body py-4 sm:py-6">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <div className="loading loading-spinner loading-md sm:loading-lg text-primary"></div>
                    <span className="text-sm sm:text-base md:text-lg">Generating Preview...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 sm:mt-12 bg-base-100 rounded-lg p-4 sm:p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-3 sm:mb-4">💡 Quick Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <div className="badge badge-primary badge-sm mt-0.5">PDF</div>
              <span>Download high-quality PDF for printing</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-secondary badge-sm mt-0.5">PNG</div>
              <span>Get PNG image for digital submission</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-accent badge-sm mt-0.5">Share</div>
              <span>Share directly via Email or WhatsApp</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-info badge-sm mt-0.5">Preview</div>
              <span>Real-time preview with exact colors</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-success badge-sm mt-0.5">Templates</div>
              <span>Multiple professional templates</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-warning badge-sm mt-0.5">Responsive</div>
              <span>Works perfectly on all devices</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm opacity-60">
          <p>Cover Page Generator • Made for Students • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;