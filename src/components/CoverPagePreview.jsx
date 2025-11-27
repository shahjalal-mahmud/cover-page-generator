import { useRef, useEffect, useState } from 'react';
import { defaultTemplate } from '../templates/defaultTemplate.jsx';
import { template1 } from '../templates/template1.jsx';
import DownloadActions from './DownloadActions';
import { template1 as CreativeEleganceTemplate } from '../templates/CreativeEleganceTemplate.jsx';
import { template3 as AquaWaveTemplate } from '../templates/AquaWaveTemplate.jsx';
const CoverPagePreview = ({ formData, template = 'default' }) => {
  const previewRef = useRef();
  const containerRef = useRef();
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Template mapping
  const templates = {
    default: defaultTemplate,
   template1: CreativeEleganceTemplate,
   template3: AquaWaveTemplate
  };

  const SelectedTemplate = templates[template] || defaultTemplate;

  // Check if form has enough data to show preview
  const hasMinimumData = formData.studentName && formData.courseCode && formData.documentType;

  // Check mobile device and calculate scale
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - (mobile ? 24 : 32);
        const a4Width = 794;
        const newScale = Math.min((containerWidth - (mobile ? 20 : 40)) / a4Width, 1);
        setScale(Math.max(newScale, mobile ? 0.4 : 0.3));
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // A4 dimensions
  const a4Width = 794;
  const a4Height = 1123;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-3 sm:p-4 md:p-6">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mb-3 sm:mb-4">
          <h2 className="card-title text-base sm:text-lg md:text-xl">Preview</h2>
          <div className="badge badge-info badge-sm sm:badge-md">{template}</div>
        </div>

        {!hasMinimumData ? (
          <div className="alert alert-warning">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">Fill in the form to see preview</span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm opacity-70">Real-time preview of your cover page</p>
              <div className="text-xs opacity-60">
                Scale: {Math.round(scale * 100)}% {isMobile && '(Mobile)'}
              </div>
            </div>

            {/* Preview Container */}
            <div
              ref={containerRef}
              className="border-2 border-dashed border-base-300 rounded-lg bg-base-200 overflow-y-auto overflow-x-hidden"
              style={{
                maxHeight: isMobile ? '60vh' : '70vh',
                minHeight: isMobile ? '300px' : '400px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: isMobile ? '0.5rem' : '1rem'
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
                  filter: 'none',
                  WebkitFilter: 'none'
                }}
                className="transition-transform duration-200 print:shadow-none print:border-0"
              >
                <SelectedTemplate formData={formData} />
              </div>
            </div>

            {/* Scale Info */}
            <div className="flex flex-col xs:flex-row justify-between items-center gap-2 mt-3">
              <div className="text-xs text-base-content/50 bg-base-200 px-3 py-1 rounded-full">
                A4 Page • {a4Width} × {a4Height}px • {Math.round(scale * 100)}% scale
              </div>
              {isMobile && (
                <div className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">
                  Pinch to zoom for details
                </div>
              )}
            </div>

            {/* Preview Quality Notice */}
            <div className="alert alert-info mt-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-xs sm:text-sm">Preview shows exact colors and layout. Download for print-ready PDF.</span>
            </div>

            {/* Download Actions */}
            <div className="mt-3 sm:mt-4">
              <DownloadActions previewRef={previewRef} formData={formData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoverPagePreview;