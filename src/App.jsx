import { useState } from 'react';
import InputForm from './components/InputForm';
import CoverPagePreview from './components/CoverPagePreview';
import TemplateSelector from './components/TemplateSelector';

function App() {
  const [formData, setFormData] = useState({
    // University Information
    universityName: 'University of Example',
    universityLogo: '',
    departmentName: 'Computer Science & Engineering',
    
    // Assignment Information
    documentType: 'Assignment',
    documentNumber: '01',
    topic: 'Sample Assignment Topic',
    courseTitle: 'Data Structures',
    courseCode: 'CSE-201',
    
    // Submitted By
    studentName: 'John Doe',
    studentId: '202300001',
    studentDepartment: 'Computer Science & Engineering',
    section: 'A',
    
    // Submitted To
    teacherName: 'Dr. Sarah Smith',
    teacherPosition: 'Professor',
    teacherDepartment: 'Computer Science & Engineering',
    
    // Date
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const [currentTemplate, setCurrentTemplate] = useState('default');

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          onTemplateChange={setCurrentTemplate}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div>
            <InputForm 
              formData={formData} 
              onFormChange={handleFormChange} 
            />
          </div>

          {/* Preview */}
          <div>
            <CoverPagePreview 
              formData={formData} 
              template={currentTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;