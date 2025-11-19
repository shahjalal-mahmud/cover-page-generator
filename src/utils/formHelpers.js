// Utility functions for form handling
export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.universityName.trim()) {
    errors.universityName = 'University name is required';
  }
  
  if (!formData.departmentName.trim()) {
    errors.departmentName = 'Department name is required';
  }
  
  if (!formData.studentName.trim()) {
    errors.studentName = 'Student name is required';
  }
  
  if (!formData.studentId.trim()) {
    errors.studentId = 'Student ID is required';
  }
  
  if (!formData.teacherName.trim()) {
    errors.teacherName = "Teacher's name is required";
  }
  
  if (!formData.topic.trim()) {
    errors.topic = 'Topic is required';
  }
  
  return errors;
};

export const clearForm = () => {
  return {
    universityName: '',
    universityLogo: '',
    departmentName: '',
    documentType: 'Assignment',
    documentNumber: '',
    topic: '',
    courseTitle: '',
    courseCode: '',
    studentName: '',
    studentId: '',
    studentDepartment: '',
    section: '',
    teacherName: '',
    teacherPosition: 'Lecturer',
    teacherDepartment: '',
    submissionDate: new Date().toISOString().split('T')[0]
  };
};