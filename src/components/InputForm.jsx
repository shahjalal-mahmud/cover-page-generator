/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useState, useCallback } from "react";
import studentsData from "../data/students/cse_students.json";
import semestersData from "../data/courses/cse_courses.json";
import assignmentsData from "../data/assign/cse_course_assign.json";
import teachersList from "../data/faculty/cse_faculty.json";

// Import redesigned components
import StudentInfoSection from "../sections/StudentInfoSection";
import CourseInfoSection from "../sections/CourseInfoSection";
import TeacherInfoSection from "../sections/TeacherInfoSection";
import DocumentDetailsSection from "../sections/DocumentDetailsSection";
import ActionButtons from "../sections/ActionButtons";

const docTypes = [
  "Assignment",
  "Lab Report",
  "Project",
  "Thesis",
  "Research Paper",
  "Presentation",
];

const normalizeCourseCode = (code) => code.replace(/\s+/g, "").toUpperCase();

const loadSavedStudentData = () => {
  try {
    const saved = localStorage.getItem('studentFormData');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading saved student data:', error);
    return null;
  }
};

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

  const setField = useCallback((field, value) => {
    onFormChange(field, value);
  }, [onFormChange]);

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

  const extractSemesterFromSection = (section) => {
    const match = section.match(/^(\d+)/);
    return match ? match[1] : null;
  };

  const detectedSemester = useMemo(() => {
    return extractSemesterFromSection(sectionInput);
  }, [sectionInput]);

  const semesterObj = useMemo(() => {
    if (!detectedSemester) return semestersData.semesters?.[0] || null;

    const matchingSemester = semestersData.semesters.find(sem =>
      sem.semester.includes(detectedSemester)
    );
    return matchingSemester || semestersData.semesters?.[0] || null;
  }, [detectedSemester]);

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
      const foundStudent = studentsData.students.find((student) => student.studentId === id);

      if (foundStudent) {
        setField("studentName", foundStudent.name);
        setField("studentDepartment", studentsData.department || "");
        setIdError("");
        setIsIdValidated(true);

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

  useEffect(() => {
    if (formData.studentId && formData.studentId.length === 11 &&
      formData.studentName && formData.studentDepartment && formData.section) {
      saveStudentData(formData);
    }
  }, [formData]);

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

    if (formData.studentId && formData.studentName && formData.studentDepartment && formData.section) {
      saveStudentData(formData);
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    if (typeof window?.generateCoverPreview === "function") {
      window.generateCoverPreview(formData);
    } else {
      alert("Form validated successfully - ready for cover generation!");
    }

    setIsLoading(false);
  };

  return (
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
  );
}