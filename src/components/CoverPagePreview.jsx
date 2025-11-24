import { useRef, useEffect, useState } from 'react';
import { defaultTemplate } from '../templates/defaultTemplate.jsx';
import { template1 } from '../templates/template1.jsx';
import DownloadActions from './DownloadActions';

const CoverPagePreview = ({ formData, template = 'default' }) => {
  const previewRef = useRef();
  const containerRef = useRef();
  const [scale, setScale] = useState(1);

  // Template mapping
  const templates = {
    default: defaultTemplate,
    template1: template1
  };

  const SelectedTemplate = templates[template] || defaultTemplate;

  // Check if form has enough data to show preview
  const hasMinimumData = formData.studentName && formData.courseCode && formData.documentType;

  // Calculate scale to fit container
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 32; // accounting for padding
        const a4Width = 794; // A4 width at 96 DPI
        const newScale = Math.min((containerWidth - 40) / a4Width, 1); // Max scale 1, with some margin
        setScale(Math.max(newScale, 0.3)); // Minimum scale 0.3
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // A4 dimensions in pixels (at 96 DPI)
  const a4Width = 794;  // 210mm * (96/25.4) ≈ 794px
  const a4Height = 1123; // 297mm * (96/25.4) ≈ 1123px

  return (
    <div className="card bg-base-100 shadow-xl sticky top-4">
      <div className="card-body p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <h2 className="card-title text-lg md:text-xl">Preview</h2>
          <div className="badge badge-info badge-lg">{template}</div>
        </div>

        {!hasMinimumData ? (
          <div className="alert alert-warning">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm md:text-base">Fill in the form to see preview</span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <p className="text-xs md:text-sm opacity-70">Real-time preview of your cover page</p>
              <div className="text-xs opacity-60">
                Scale: {Math.round(scale * 100)}%
              </div>
            </div>

            {/* Preview Container */}
            <div
              ref={containerRef}
              className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-y-auto overflow-x-hidden"
              style={{
                maxHeight: 'calc(100vh - 200px)',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '1rem'
              }}
            >
              <div
                ref={previewRef}
                style={{
                  width: `${a4Width}px`,
                  minHeight: `${a4Height}px`,
                  background: "white",
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  border: '1px solid #e5e7eb',
                  display: 'block',
                  // Remove any color filtering or grayscale
                  filter: 'none',
                  WebkitFilter: 'none'
                }}
                className="transition-transform duration-200 print:shadow-none print:border-0"
              >
                {/* This will now display with all original colors */}
                <SelectedTemplate formData={formData} />
              </div>
            </div>

            {/* Scale Info for Mobile */}
            <div className="flex justify-center mt-3">
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                A4 Page • {a4Width} × {a4Height}px • {Math.round(scale * 100)}% scale
              </div>
            </div>

            {/* Preview Quality Notice */}
            <div className="alert alert-info mt-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">Preview shows exact colors and layout. Download for print-ready PDF.</span>
            </div>

            {/* Download Actions */}
            <div className="mt-4">
              <DownloadActions previewRef={previewRef} formData={formData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoverPagePreview;