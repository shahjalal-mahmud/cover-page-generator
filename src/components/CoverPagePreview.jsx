import { useRef, useEffect, useState } from 'react';
import { defaultTemplate } from '../templates/defaultTemplate.jsx';
import { template1 as CreativeEleganceTemplate } from '../templates/CreativeEleganceTemplate.jsx';
import { template3 as AquaWaveTemplate } from '../templates/AquaWaveTemplate.jsx';
import DownloadActions from './DownloadActions';

const CoverPagePreview = ({ formData, template = 'default' }) => {
  const previewRef = useRef();
  const containerRef = useRef();

  // State for scaling and fit mode
  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState('fill'); // 'fit', 'fill', 'custom'
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
    
    // Reset to default fill mode and scale
    setFitMode('fill');
    setManualScale(1);
    
    // Wait for the reset to take effect
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Force a re-render and wait for layout to stabilize
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
        // Fit: entire page visible, no scrolling (use minimum scale)
        const widthScale = containerWidth / a4Width;
        const heightScale = containerHeight / a4Height;
        newScale = Math.min(widthScale, heightScale);
      } else if (fitMode === 'fill') {
        // Fill: fills the container completely, may crop edges (use maximum scale)
        const widthScale = containerWidth / a4Width;
        const heightScale = containerHeight / a4Height;
        newScale = Math.max(widthScale, heightScale);
      } else if (fitMode === 'custom') {
        // Custom: use manual scale
        newScale = manualScale;
      }

      setScale(newScale);
    };

    // Fullscreen state listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(calculateScale, 100); 
    };

    calculateScale();
    
    // Use ResizeObserver for the container
    const ro = new ResizeObserver(calculateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    
    // Add event listeners
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

  // Fullscreen Mode Toggle
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  // Handle fit mode change
  const handleFitModeChange = (mode) => {
    setFitMode(mode);
    if (mode !== 'custom') {
      setManualScale(1);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-base-100">
      {/* COMPACT HEADER */}
      <div className="flex-shrink-0 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 border-b border-base-300 bg-base-100">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
            {template.replace("template", "Template ")}
          </h2>
        </div>
      </div>
      
      {/* NO DATA STATE */}
      {!hasMinimumData ? (
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          <div className="alert alert-info shadow-lg max-w-md w-full">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">Minimum Data Required</h3>
                <p className="text-xs opacity-80 mt-1">Please enter Student Name, Course Code, and Document Type to see the preview.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* COMPACT ZOOM CONTROLS WITH FIT MODE DROPDOWN */}
          <div className="flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between gap-2 border-b border-base-300 bg-base-200/40">
            {/* Zoom Controls */}
            <div className="join">
              <button 
                onClick={zoomOut} 
                className="join-item btn btn-xs sm:btn-sm btn-ghost hover:bg-base-300" 
                disabled={scale <= minZoom}
                aria-label="Zoom Out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <button 
                onClick={zoomIn} 
                className="join-item btn btn-xs sm:btn-sm btn-ghost hover:bg-base-300" 
                disabled={scale >= maxZoom}
                aria-label="Zoom In"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
              <button 
                onClick={resetZoom} 
                className="join-item btn btn-xs sm:btn-sm btn-ghost hover:bg-base-300" 
                disabled={fitMode === 'fill' && manualScale === 1}
                aria-label="Reset Zoom"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.01M4 4h5m-.01 0L3 9m11 7l-5 5m5-5v5m0-5h5" />
                </svg>
              </button>
            </div>

            {/* Fit Mode Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-xs sm:btn-sm btn-ghost hover:bg-base-300 gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-bold text-primary">
                  {fitMode === 'fit' ? '📐 Fit' : fitMode === 'fill' ? '📏 Fill' : `${Math.round(scale * 100)}%`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-40 sm:w-48 border border-base-300 mt-1">
                <li>
                  <button 
                    onClick={() => handleFitModeChange('fit')}
                    className={`text-xs sm:text-sm ${fitMode === 'fit' ? 'active bg-primary text-primary-content' : ''}`}
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
                    className={`text-xs sm:text-sm ${fitMode === 'fill' ? 'active bg-primary text-primary-content' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5 5" />
                    </svg>
                    Fill (Cover)
                  </button>
                </li>
                <div className="divider my-1"></div>
                <li className="menu-title">
                  <span className="text-xs opacity-60">
                    {Math.round(scale * 100)}% {fitMode === 'custom' ? '(Custom)' : ''}
                  </span>
                </li>
              </ul>
            </div>

            {/* Reset Indicator */}
            {isResetting && (
              <div className="flex items-center gap-2 text-info text-xs">
                <div className="loading loading-spinner loading-xs"></div>
                Resetting...
              </div>
            )}
          </div>

          {/* PREVIEW CONTAINER - NO SCROLLING */}
          <div
            ref={containerRef}
            className="flex-1 bg-base-300 flex items-center justify-center overflow-hidden"
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
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                transformOrigin: "center center",
                flexShrink: 0,
              }}
              className="transition-transform duration-300 ease-out print:shadow-none print:border-0"
            >
              <SelectedTemplate formData={formData} />
            </div>
          </div>

          {/* COMPACT FOOTER / ACTIONS */}
          <div className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-3 border-t border-base-300 bg-base-100">
            <DownloadActions 
              previewRef={previewRef} 
              formData={formData} 
              resetPreview={resetPreview}
              isResetting={isResetting}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CoverPagePreview;