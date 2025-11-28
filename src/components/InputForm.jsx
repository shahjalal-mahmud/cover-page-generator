/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useState, useCallback } from "react";
import studentsData from "../data/students/cse_students.json";
import semestersData from "../data/courses/cse_courses.json";
import assignmentsData from "../data/assign/cse_course_assign.json";
import teachersList from "../data/faculty/cse_faculty.json";

// Import components
import StudentInfoSection from "../sections/StudentInfoSection";
import CourseInfoSection from "../sections/CourseInfoSection";
import TeacherInfoSection from "../sections/TeacherInfoSection";
import DocumentDetailsSection from "../sections/DocumentDetailsSection";
import ActionButtons from "../sections/ActionButtons";
import { FiBookOpen, FiZap, FiLayout } from "react-icons/fi";

const docTypes = [
  "Assignment",
  "Lab Report",
  "Project",
  "Thesis",
  "Research Paper",
  "Presentation",
];

const normalizeCourseCode = (code) => code.replace(/\s+/g, "").toUpperCase();

// Load saved student data from localStorage
const loadSavedStudentData = () => {
  try {
    const saved = localStorage.getItem('studentFormData');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading saved student data:', error);
    return null;
  }
};

// Save student data to localStorage
const saveStudentData = (data) => {
  try {
    const studentData = {
      studentId: data.studentId,
      studentName: data.studentName,
      studentDepartment: data.studentDepartment,
      section: data.section
    };
    localStorage.setItem('studentFormData', JSON.stringify(studentData));
  } catch (error) {
    console.error('Error saving student data:', error);
  }
};

// Clear saved student data
const clearSavedStudentData = () => {
  try {
    localStorage.removeItem('studentFormData');
  } catch (error) {
    console.error('Error clearing saved student data:', error);
  }
};

export default function FastInputForm({ formData, onFormChange }) {
  const [idError, setIdError] = useState("");
  const [sectionInput, setSectionInput] = useState(formData.section || "");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState(formData.courseCode || "");
  const [isIdValidated, setIsIdValidated] = useState(false);
  const [customDocType, setCustomDocType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false);

  // Wrap setField in useCallback to avoid dependency issues
  const setField = useCallback((field, value) => {
    onFormChange(field, value);
  }, [onFormChange]);

  // Load saved student data on component mount
  useEffect(() => {
    const savedData = loadSavedStudentData();
    if (savedData && !hasLoadedSavedData) {
      setField("studentId", savedData.studentId || "");
      setField("studentName", savedData.studentName || "");
      setField("studentDepartment", savedData.studentDepartment || studentsData.department || "");
      setField("section", savedData.section || "");
      setSectionInput(savedData.section || "");
      setHasLoadedSavedData(true);
    }
  }, [setField, hasLoadedSavedData]);

  // Extract semester number from section (e.g., "5C" -> "5")
  const extractSemesterFromSection = (section) => {
    const match = section.match(/^(\d+)/);
    return match ? match[1] : null;
  };

  // Get detected semester from section
  const detectedSemester = useMemo(() => {
    return extractSemesterFromSection(sectionInput);
  }, [sectionInput]);

  // Get semester data based on detected semester
  const semesterObj = useMemo(() => {
    if (!detectedSemester) return semestersData.semesters?.[0] || null;
    
    const matchingSemester = semestersData.semesters.find(sem => 
      sem.semester.includes(detectedSemester)
    );
    return matchingSemester || semestersData.semesters?.[0] || null;
  }, [detectedSemester]);

  // Build available courses
  useEffect(() => {
    if (!semesterObj) return;
    const courses = (semesterObj.courses || []).map((c) => ({
      code: c.course_code.trim(),
      codeNormalized: normalizeCourseCode(c.course_code),
      title: c.course_title,
      credit: c.credit,
      dept: c.dept,
    }));
    setAvailableCourses(prev => {
      const newCourses = JSON.stringify(courses);
      const prevCourses = JSON.stringify(prev);
      return newCourses === prevCourses ? prev : courses;
    });
  }, [semesterObj]);

  // Filter courses by section
  useEffect(() => {
    const sec = (sectionInput || "").trim().toUpperCase();
    
    if (!sec) {
      setFilteredCourses(prev => {
        const newCourses = JSON.stringify(availableCourses);
        const prevCourses = JSON.stringify(prev);
        return newCourses === prevCourses ? prev : availableCourses;
      });
      return;
    }

    const sectionCourses = availableCourses.filter(course => {
      const courseAssignment = assignmentsData.find(assignment => 
        assignment.section === sec && 
        normalizeCourseCode(assignment.courseCode) === course.codeNormalized
      );
      return courseAssignment !== undefined;
    });

    setFilteredCourses(prev => {
      const newCourses = JSON.stringify(sectionCourses);
      const prevCourses = JSON.stringify(prev);
      return newCourses === prevCourses ? prev : sectionCourses;
    });
  }, [sectionInput, availableCourses]);

  // Student ID handling - auto-fill from JSON data
  useEffect(() => {
    const id = (formData.studentId || "").trim();
    
    if (!id) {
      setIdError(prev => prev !== "" ? "" : prev);
      setIsIdValidated(prev => prev !== false ? false : prev);
      return;
    }

    if (!/^\d{0,11}$/.test(id)) {
      setIdError("Only digits allowed (max 11).");
      setIsIdValidated(false);
      return;
    }

    if (id.length < 11) {
      setIdError("Student ID must be 11 digits.");
      setIsIdValidated(false);
      return;
    }

    if (id.length === 11) {
      // Find student in JSON data
      const foundStudent = studentsData.students.find((student) => student.studentId === id);
      
      if (foundStudent) {
        // Auto-fill name and department
        setField("studentName", foundStudent.name);
        setField("studentDepartment", studentsData.department || "");
        setIdError("");
        setIsIdValidated(true);
        
        // Save to localStorage when we have complete student data
        if (formData.section && formData.studentName && formData.studentDepartment) {
          saveStudentData({
            studentId: id,
            studentName: foundStudent.name,
            studentDepartment: studentsData.department || "",
            section: formData.section
          });
        }
      } else {
        setField("studentName", "");
        setField("studentDepartment", studentsData.department || "");
        setIdError("ID not found in database - please enter name manually.");
        setIsIdValidated(true);
      }
    }
  }, [formData.studentId, formData.section, formData.studentName, formData.studentDepartment, setField]);

  // Auto-fill teacher info when course is selected
  useEffect(() => {
    const code = (selectedCourseCode || "").trim();
    if (!code) return;

    const course = availableCourses.find(
      (it) => normalizeCourseCode(it.code) === normalizeCourseCode(code) || it.code === code
    );
    
    if (course) {
      setField("courseCode", course.code);
      setField("courseTitle", course.title);
    }

    const codeNorm = normalizeCourseCode(course?.code || code);
    const sec = (sectionInput || "").trim().toUpperCase();
    
    let teacherAcronym = null;

    if (Array.isArray(assignmentsData)) {
      const assignment = assignmentsData.find(assign => 
        assign.section === sec && 
        normalizeCourseCode(assign.courseCode) === codeNorm
      );
      
      if (assignment) {
        teacherAcronym = assignment.teacherAcronym;
      }
    }

    if (teacherAcronym) {
      const teacher = teachersList.find((t) => 
        (t.acronym || "").toUpperCase() === teacherAcronym.toUpperCase()
      );
      
      if (teacher) {
        setField("teacherName", teacher.name || teacherAcronym);
        setField("teacherDepartment", teacher.department || "");
        setField("teacherPosition", teacher.designation || "");
        setField("teacherMobile", teacher.mobile || "");
        setField("teacherEmail", teacher.email || "");
      } else {
        setField("teacherName", teacherAcronym);
        setField("teacherDepartment", "");
        setField("teacherPosition", "");
        setField("teacherMobile", "");
        setField("teacherEmail", "");
      }
    } else {
      setField("teacherName", "");
      setField("teacherDepartment", "");
      setField("teacherPosition", "");
      setField("teacherMobile", "");
      setField("teacherEmail", "");
    }
  }, [selectedCourseCode, availableCourses, sectionInput, setField]);

  // Save student data when section changes (if we have complete info)
  useEffect(() => {
    if (formData.studentId && formData.studentId.length === 11 && 
        formData.studentName && formData.studentDepartment && formData.section) {
      saveStudentData(formData);
    }
  }, [formData.studentId, formData.studentName, formData.studentDepartment, formData.section]);

  // Event handlers
  const onIdChange = (raw) => {
    const v = raw.replace(/\D/g, "");
    if (v.length > 11) return;
    setField("studentId", v);
  };

  const onSectionChange = (raw) => {
    const v = raw.trim().toUpperCase();
    setSectionInput(v);
    setField("section", v);
  };

  const onCourseSelect = (value) => {
    setSelectedCourseCode(value);
  };

  const onDocTypeChange = (value) => {
    setField("documentType", value);
    setCustomDocType(value);
  };

  const clearForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setField("studentId", "");
      setField("studentName", "");
      setField("studentDepartment", studentsData.department || "");
      setField("section", "");
      setSectionInput("");
      setSelectedCourseCode("");
      setField("courseTitle", "");
      setField("courseCode", "");
      setField("teacherName", "");
      setField("teacherPosition", "");
      setField("teacherEmail", "");
      setField("teacherMobile", "");
      setField("documentType", "");
      setField("topic", "");
      setField("submissionDate", new Date().toISOString().split("T")[0]);
      setCustomDocType("");
      setIdError("");
      setIsIdValidated(false);
      clearSavedStudentData();
      setHasLoadedSavedData(false);
      setIsLoading(false);
    }, 300);
  };

  const validateAndGenerate = async () => {
    setIsLoading(true);
    
    const errors = [];
    if (!formData.studentId || formData.studentId.length !== 11) errors.push("Valid Student ID required (11 digits).");
    if (!formData.studentName || !formData.studentName.trim()) errors.push("Student name required.");
    if (!formData.courseCode) errors.push("Select course.");
    if (!formData.documentType) errors.push("Select document type.");

    if (errors.length) {
      setIsLoading(false);
      alert("Please fix the following:\n" + errors.join("\n"));
      return;
    }

    // Save final data before generation
    if (formData.studentId && formData.studentName && formData.studentDepartment && formData.section) {
      saveStudentData(formData);
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    if (typeof window?.generateCoverPreview === "function") {
      window.generateCoverPreview(formData);
    } else {
      alert("Form validated successfully - ready for cover generation!");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="card bg-base-100 shadow-2xl w-full border border-base-300">
      <div className="card-body p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <FiBookOpen className="text-2xl text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-accent text-accent-content text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  NEW
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Cover Page Generator
              </h1>
              <p className="text-base-content/70 mt-2">Create professional cover pages in seconds</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="badge badge-primary badge-lg gap-1">
              <FiZap className="text-sm" />
              Fast & Easy
            </div>
            <div className="badge badge-secondary badge-lg gap-1">
              <FiLayout className="text-sm" />
              Responsive
            </div>
            <div className="badge badge-accent badge-lg">
              Auto-fill
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="steps steps-horizontal w-full mb-8">
          <div className="step step-primary">Student</div>
          <div className="step step-primary">Course</div>
          <div className="step">Teacher</div>
          <div className="step">Document</div>
          <div className="step">Generate</div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          <StudentInfoSection
            formData={formData}
            setField={setField}
            idError={idError}
            isIdValidated={isIdValidated}
            onIdChange={onIdChange}
            onSectionChange={onSectionChange}
          />

          <CourseInfoSection
            formData={formData}
            setField={setField}
            sectionInput={sectionInput}
            filteredCourses={filteredCourses}
            selectedCourseCode={selectedCourseCode}
            onSectionChange={onSectionChange}
            onCourseSelect={onCourseSelect}
            extractSemesterFromSection={extractSemesterFromSection}
            semestersData={semestersData}
          />

          <TeacherInfoSection
            formData={formData}
            setField={setField}
          />

          <DocumentDetailsSection
            formData={formData}
            setField={setField}
            customDocType={customDocType}
            onDocTypeChange={onDocTypeChange}
            docTypes={docTypes}
          />

          <ActionButtons
            clearForm={clearForm}
            validateAndGenerate={validateAndGenerate}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}