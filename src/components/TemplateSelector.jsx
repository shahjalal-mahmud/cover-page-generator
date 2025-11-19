const TemplateSelector = ({ currentTemplate, onTemplateChange }) => {
  const templates = [
    { id: "default", name: "Classic", desc: "Simple university layout" },
    { id: "template1", name: "Modern", desc: "Clean and stylish" },
    { id: "template2", name: "Minimal", desc: "Light & minimal UI" },
    { id: "template3", name: "Colorful", desc: "Vibrant design" },
  ];

  return (
    <div className="card bg-base-100 shadow-md mb-6">
      <div className="card-body">
        <h3 className="text-xl font-semibold mb-4">Choose Template</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((temp) => (
            <div
              key={temp.id}
              className={`border rounded-xl p-4 cursor-pointer transition
                ${currentTemplate === temp.id ? "border-primary bg-primary/10" : "border-base-300 hover:border-primary"}
              `}
              onClick={() => onTemplateChange(temp.id)}
            >
              <div className="font-bold">{temp.name}</div>
              <p className="text-xs opacity-70">{temp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;