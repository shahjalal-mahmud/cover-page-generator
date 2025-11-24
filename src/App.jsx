import { useState } from 'react';
import HomePage from './pages/HomePage';
import { clearForm } from './utils/formHelpers';

function App() {
  const [formData, setFormData] = useState({
    // University Information
    universityName: 'Northern University of Business & Technology Khulna',
    universityLogo: 'https://i.ibb.co.com/9k8CXmWP/nubtk-logo.jpg',
    departmentName: 'Computer Science & Engineering',
    
    // Assignment Information
    documentType: 'Assignment',
    documentNumber: '01',
    topic: 'Analysis of Data Structures and Algorithms',
    courseTitle: 'Data Structures',
    courseCode: 'CSE 2201',
    
    // Submitted By
    studentName: 'Shahajalal Mahmud',
    studentId: '11230321539',
    studentDepartment: 'Computer Science & Engineering',
    section: '5C',
    
    // Submitted To
    teacherName: 'Shovon Mandal',
    teacherPosition: 'Lecturer',
    teacherDepartment: 'Computer Science & Engineering',
    
    // Date
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const [currentTemplate, setCurrentTemplate] = useState('default');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearForm = () => {
    setFormData(clearForm());
  };

  // Global function for generating cover preview
  if (typeof window !== 'undefined') {
    window.generateCoverPreview = (data) => {
      setIsGenerating(true);
      // Simulate generation process
      setTimeout(() => {
        setIsGenerating(false);
        // Scroll to preview section
        document.getElementById('preview-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 500);
    };
  }

  return (
    <HomePage
      formData={formData}
      currentTemplate={currentTemplate}
      isGenerating={isGenerating}
      onFormChange={handleFormChange}
      onTemplateChange={setCurrentTemplate}
      onClearForm={handleClearForm}
    />
  );
}

export default App;