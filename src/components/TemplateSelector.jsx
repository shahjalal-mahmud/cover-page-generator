const TemplateSelector = ({ currentTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'default', name: 'Classic', description: 'Professional academic style' },
    { id: 'template1', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'template2', name: 'Minimal', description: 'Simple and elegant' },
    { id: 'template3', name: 'Colorful', description: 'Vibrant and eye-catching' }
  ];

  return (
    <div className="card bg-base-100 shadow-md mb-6">
      <div className="card-body">
        <h3 className="card-title">Choose Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map(template => (
            <div
              key={template.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                currentTemplate === template.id
                  ? 'border-primary bg-primary/10'
                  : 'border-base-300 hover:border-primary/50'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              <div className="font-semibold">{template.name}</div>
              <div className="text-sm opacity-70">{template.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;