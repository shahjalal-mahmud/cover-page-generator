import { useRef } from 'react';
import { defaultTemplate } from '../templates/defaultTemplate.jsx';
import { template1 } from '../templates/template1.jsx';
import DownloadActions from './DownloadActions';

const CoverPagePreview = ({ formData, template = 'default' }) => {
  const previewRef = useRef();

  // Template mapping
  const templates = {
    default: defaultTemplate,
    template1: template1
  };

  const SelectedTemplate = templates[template] || defaultTemplate;

  // Check if form has enough data to show preview
  const hasMinimumData = formData.studentName && formData.courseCode && formData.documentType;

  return (
    <div className="card bg-base-100 shadow-xl sticky top-4">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Preview</h2>
          <div className="badge badge-info">{template}</div>
        </div>

        {!hasMinimumData ? (
          <div className="alert alert-warning">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Fill in the form to see preview</span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm opacity-70 mb-4">Real-time preview of your cover page</p>

            {/* Preview Container */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 overflow-auto max-h-[500px]">
              <div className="flex justify-center">
                <div
                  ref={previewRef}
                  style={{
                    width: "794px",     // A4 width at 96 DPI
                    minHeight: "1123px", // A4 height
                    background: "white",
                    padding: "0",
                  }}
                >
                  <SelectedTemplate formData={formData} />
                </div>
              </div>
            </div>

            {/* Download Actions */}
            <DownloadActions previewRef={previewRef} formData={formData} />
          </>
        )}
      </div>
    </div>
  );
};

export default CoverPagePreview;