import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { clearForm } from './utils/formHelpers';

function App() {
  const [formData, setFormData] = useState({
    // University Information
    universityName: 'Northern University of Business & Technology Khulna',
    universityLogo: '/logo/nubtk-logo.jpeg',
    departmentName: 'Computer Science & Engineering',
    
    // Assignment Information
    documentType: 'Assignment',
    documentNumber: '',
    topic: '',
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
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
      setTimeout(() => {
        setIsGenerating(false);
        document.getElementById('preview-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 500);
    };
  }

  return (
    <div data-theme={theme}>
      <HomePage
        formData={formData}
        currentTemplate={currentTemplate}
        isGenerating={isGenerating}
        theme={theme}
        onThemeToggle={toggleTheme}
        onFormChange={handleFormChange}
        onTemplateChange={setCurrentTemplate}
        onClearForm={handleClearForm}
      />
    </div>
  );
}

export default App;