import { useRef, useEffect, useState } from 'react';
import { defaultTemplate } from '../templates/defaultTemplate.jsx';
import { template1 as CreativeEleganceTemplate } from '../templates/CreativeEleganceTemplate.jsx';
import { template3 as AquaWaveTemplate } from '../templates/AquaWaveTemplate.jsx';

const CoverPagePreview = ({ formData, template = 'default', previewRef }) => {
  const containerRef = useRef();

  // State for scaling and fit mode
  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState('fill');
  const [manualScale, setManualScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Template mapping
  const templates = {
    default: defaultTemplate,
    template1: CreativeEleganceTemplate,
    template3: AquaWaveTemplate
  };

  const SelectedTemplate = templates[template] || defaultTemplate;

  // Minimum required data
  const hasMinimumData =
    formData.studentName && formData.courseCode && formData.documentType;

  // A4 Dimensions (96 DPI)
  const a4Width = 794;
  const a4Height = 1123;

  // Reset preview to default state
  const resetPreview = async () => {
    setIsResetting(true);
    setFitMode('fill');
    setManualScale(1);
    await new Promise(resolve => setTimeout(resolve, 300));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 100));
    setIsResetting(false);
    return true;
  };

  // Calculate scale based on fit mode
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      let newScale = 1;

      if (fitMode === 'fit') {
        const widthScale = containerWidth / a4Width;
        const heightScale = containerHeight / a4Height;
        newScale = Math.min(widthScale, heightScale);
      } else if (fitMode === 'fill') {
        const widthScale = containerWidth / a4Width;
        const heightScale = containerHeight / a4Height;
        newScale = Math.max(widthScale, heightScale);
      } else if (fitMode === 'custom') {
        newScale = manualScale;
      }

      setScale(newScale);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(calculateScale, 100); 
    };

    calculateScale();
    
    const ro = new ResizeObserver(calculateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", calculateScale);

    return () => {
      ro.disconnect();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("resize", calculateScale);
    };
  }, [fitMode, manualScale, a4Width, a4Height]);

  // Manual Zoom Controls
  const zoomStep = 0.1;
  const maxZoom = 3;
  const minZoom = 0.3;

  const zoomIn = () => {
    setFitMode('custom');
    setManualScale(prev => Math.min(prev + zoomStep, maxZoom));
  };

  const zoomOut = () => {
    setFitMode('custom');
    setManualScale(prev => Math.max(prev - zoomStep, minZoom));
  };

  const resetZoom = () => {
    setFitMode('fill');
    setManualScale(1);
  };

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const handleFitModeChange = (mode) => {
    setFitMode(mode);
    if (mode !== 'custom') {
      setManualScale(1);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-2xl border-2 border-white/20">
      {/* Modern Header */}
      <div className="flex-shrink-0 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center shadow-lg">
              <span className="text-xl">👁️</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Live Preview
              </h2>
              <p className="text-xs text-white/70">
                {template.replace("template", "Template ").replace("default", "Classic")}
              </p>
            </div>
          </div>
          
          {/* Quick scale indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
            <span className="text-xs font-bold text-white">{Math.round(scale * 100)}%</span>
          </div>
        </div>
      </div>
      
      {/* NO DATA STATE */}
      {!hasMinimumData ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-4">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Data Yet</h3>
            <p className="text-white/70 text-sm">
              Fill in <strong>Student Name</strong>, <strong>Course Code</strong>, and <strong>Document Type</strong> to see your cover page preview.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Modern Zoom Controls */}
          <div className="flex-shrink-0 px-3 py-2 bg-white/5 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between gap-3">
              {/* Zoom buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={zoomOut} 
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 disabled:opacity-30" 
                  disabled={scale <= minZoom}
                  aria-label="Zoom Out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                
                <button 
                  onClick={zoomIn} 
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 disabled:opacity-30" 
                  disabled={scale >= maxZoom}
                  aria-label="Zoom In"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
                
                <button 
                  onClick={resetZoom} 
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 disabled:opacity-30" 
                  disabled={fitMode === 'fill' && manualScale === 1}
                  aria-label="Reset Zoom"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.01M4 4h5m-.01 0L3 9m11 7l-5 5m5-5v5m0-5h5" />
                  </svg>
                </button>
              </div>

              {/* Fit Mode Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm bg-white/10 hover:bg-white/20 border-white/20 text-white normal-case gap-2">
                  <span className="font-bold text-xs">
                    {fitMode === 'fit' ? '📐 Fit' : fitMode === 'fill' ? '📏 Fill' : `${Math.round(scale * 100)}%`}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-xl w-48 border border-gray-200 mt-2">
                  <li>
                    <button 
                      onClick={() => handleFitModeChange('fit')}
                      className={`text-sm ${fitMode === 'fit' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-700'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      Fit (No Scroll)
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleFitModeChange('fill')}
                      className={`text-sm ${fitMode === 'fill' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-700'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5 5" />
                      </svg>
                      Fill (Cover)
                    </button>
                  </li>
                  <div className="divider my-1"></div>
                  <li className="text-center">
                    <span className="text-xs text-gray-500">
                      {Math.round(scale * 100)}% {fitMode === 'custom' ? '(Custom)' : ''}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Reset Indicator */}
              {isResetting && (
                <div className="flex items-center gap-2 text-white text-xs bg-white/10 px-3 py-1.5 rounded-full">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW CONTAINER */}
          <div
            ref={containerRef}
            className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden p-4"
            style={{ minHeight: 0 }}
          >
            {/* A4 CANVAS */}
            <div
              ref={previewRef}
              style={{
                width: `${a4Width}px`,
                height: `${a4Height}px`,
                transform: `scale(${scale})`,
                background: "white",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                transformOrigin: "center center",
                flexShrink: 0,
              }}
              className="transition-transform duration-300 ease-out print:shadow-none print:border-0 rounded-lg overflow-hidden"
            >
              <SelectedTemplate formData={formData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoverPagePreview;