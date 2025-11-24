import InputForm from '../components/InputForm';
import CoverPagePreview from '../components/CoverPagePreview';
import TemplateSelector from '../components/TemplateSelector';

const HomePage = ({
  formData,
  currentTemplate,
  isGenerating,
  onFormChange,
  onTemplateChange,
  onClearForm
}) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Cover Page Generator
          </h1>
          <p className="text-lg opacity-70">
            Create professional cover pages for your assignments and reports
          </p>
        </div>

        {/* Template Selector */}
        <TemplateSelector 
          currentTemplate={currentTemplate}
          onTemplateChange={onTemplateChange}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div>
            <InputForm 
              formData={formData} 
              onFormChange={onFormChange}
              onClearForm={onClearForm}
            />
          </div>

          {/* Preview */}
          <div id="preview-section">
            <CoverPagePreview 
              formData={formData} 
              template={currentTemplate}
            />
            
            {/* Generating Indicator */}
            {isGenerating && (
              <div className="card bg-base-100 shadow-xl mt-4">
                <div className="card-body">
                  <div className="flex items-center justify-center gap-4">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <span className="text-lg">Generating Preview...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-base-100 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">💡 Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="badge badge-primary badge-sm mt-1">PDF</div>
              <span>Download high-quality PDF for printing</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-secondary badge-sm mt-1">PNG</div>
              <span>Get PNG image for digital submission</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="badge badge-accent badge-sm mt-1">Share</div>
              <span>Share directly via Email or WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;