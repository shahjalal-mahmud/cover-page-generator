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
    
    // Update body background for smooth theme transition
    if (theme === 'dark') {
      document.body.style.background = 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
    }
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
      
      // Smooth scroll to preview
      setTimeout(() => {
        const previewSection = document.getElementById('preview-section');
        if (previewSection) {
          previewSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);

      // Reset generating state
      setTimeout(() => {
        setIsGenerating(false);
      }, 500);
    };
  }

  return (
    <div 
      data-theme={theme}
      className="min-h-screen transition-colors duration-500"
    >
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