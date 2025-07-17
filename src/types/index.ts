// Core type definitions for the grade management system
export interface Student {
  id: string;
  name: string;
  npm: string; // Nomor Pokok Mahasiswa
  email: string;
}

export interface GradeComponent {
  id: string;
  name: 'Tugas' | 'UTS' | 'UAS' | 'Proyek' | 'Kuis';
  percentage: number;
  color: string;
}

export interface Chapter {
  id: string;
  name: string;
  weight: number; // Contribution weight for each component
}

export interface StudentGrade {
  studentId: string;
  componentId: string;
  chapterId: string;
  score: number;
  maxScore: number;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  semester: string;
  academicYear: string;
  studentCount: number;
  chapters: Chapter[];
  components: GradeComponent[];
  configurationComplete: boolean;
  studentsEnrolled: Student[];
}

export interface GradeCalculation {
  studentId: string;
  componentScores: {
    componentId: string;
    totalScore: number;
    maxScore: number;
    percentage: number;
  }[];
  finalGrade: number;
  letterGrade: string;
}

export interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  completedConfigurations: number;
  pendingGrades: number;
}