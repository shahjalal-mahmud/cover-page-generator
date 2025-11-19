import { useRef } from 'react';
import { defaultTemplate } from '../templates/defaultTemplate.jsx';
import { template1 } from '../templates/template1.jsx';

const CoverPagePreview = ({ formData, template = 'default' }) => {
  const previewRef = useRef();

  // Template mapping
  const templates = {
    default: defaultTemplate,
    template1: template1
  };

  const SelectedTemplate = templates[template] || defaultTemplate;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Preview</h2>
        <p className="text-sm opacity-70">Template: {template}</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 overflow-auto">
          <div className="flex justify-center">
            <div ref={previewRef}>
              <SelectedTemplate formData={formData} />
            </div>
          </div>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Download PDF</button>
          <button className="btn btn-secondary">Print</button>
        </div>
      </div>
    </div>
  );
};

export default CoverPagePreview;