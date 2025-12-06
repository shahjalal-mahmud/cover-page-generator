// utils/formHelpers.js
export const clearForm = () => {
  return {
    universityName: '',
    universityLogo: '',
    departmentName: '',
    documentType: '',
    documentNumber: '',
    topic: '',
    courseTitle: '',
    courseCode: '',
    studentName: '',
    studentId: '',
    studentDepartment: '',
    section: '',
    teacherName: '',
    teacherPosition: '',
    teacherDepartment: '',
    submissionDate: new Date().toISOString().split('T')[0]
  };
};

export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.studentName?.trim()) {
    errors.studentName = 'Student name is required';
  }
  
  if (!formData.studentId?.trim()) {
    errors.studentId = 'Student ID is required';
  }
  
  if (!formData.courseCode?.trim()) {
    errors.courseCode = 'Course code is required';
  }
  
  if (!formData.documentType?.trim()) {
    errors.documentType = 'Document type is required';
  }
  
  return errors;
};