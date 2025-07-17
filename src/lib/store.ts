import { create } from 'zustand';
import { Class, Student, GradeComponent, StudentGrade, DashboardStats } from '@/types';
import { GRADE_COMPONENTS, SAMPLE_CHAPTERS } from './constants';
import { generateMockGrades } from './utils';

interface GradeStore {
  // State
  classes: Class[];
  selectedClass: Class | null;
  students: Student[];
  grades: StudentGrade[];
  dashboardStats: DashboardStats;
  loading: boolean;

  // Actions
  setSelectedClass: (classData: Class | null) => void;
  updateClassComponents: (classId: string, components: GradeComponent[]) => void;
  updateStudentGrade: (grade: StudentGrade) => void;
  initializeMockData: () => void;
  calculateDashboardStats: () => void;
}

// Generate mock students
const generateMockStudents = (count: number): Student[] => {
  const names = [
    'Ahmad Rizky Pratama', 'Siti Nurhaliza', 'Budi Santoso', 'Dewi Sartika',
    'Eko Prasetyo', 'Fitri Handayani', 'Galih Permana', 'Hani Ramadhani',
    'Indra Kurniawan', 'Jasmine Putri', 'Kevin Adiputra', 'Lestari Wulandari',
    'Muhammad Fauzi', 'Nina Safitri', 'Oscar Nugroho', 'Putri Maharani',
    'Qori Abdillah', 'Rina Septiani', 'Sandi Wijaya', 'Tina Marlina'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `student-${i + 1}`,
    name: names[i % names.length],
    npm: `A11.2023.${String(i + 1).padStart(5, '0')}`,
    email: `student${i + 1}@udinus.ac.id`,
  }));
};

// Generate mock classes
const generateMockClasses = (): Class[] => {
  const mockStudents = generateMockStudents(20);
  
  return [
    {
      id: 'class-1',
      name: 'Pemrograman Web',
      code: 'A11.54501',
      semester: 'Ganjil',
      academicYear: '2023/2024',
      studentCount: 18,
      chapters: SAMPLE_CHAPTERS,
      components: GRADE_COMPONENTS.map(comp => ({
        id: comp.id,
        name: comp.name,
        percentage: comp.defaultPercentage,
        color: comp.color,
      })),
      configurationComplete: true,
      studentsEnrolled: mockStudents.slice(0, 18),
    },
    {
      id: 'class-2',
      name: 'Basis Data',
      code: 'A11.54502',
      semester: 'Ganjil',
      academicYear: '2023/2024',
      studentCount: 20,
      chapters: SAMPLE_CHAPTERS,
      components: GRADE_COMPONENTS.map(comp => ({
        id: comp.id,
        name: comp.name,
        percentage: comp.defaultPercentage,
        color: comp.color,
      })),
      configurationComplete: false,
      studentsEnrolled: mockStudents,
    },
    {
      id: 'class-3',
      name: 'Algoritma dan Struktur Data',
      code: 'A11.54503',
      semester: 'Genap',
      academicYear: '2023/2024',
      studentCount: 15,
      chapters: SAMPLE_CHAPTERS,
      components: GRADE_COMPONENTS.map(comp => ({
        id: comp.id,
        name: comp.name,
        percentage: comp.defaultPercentage,
        color: comp.color,
      })),
      configurationComplete: true,
      studentsEnrolled: mockStudents.slice(0, 15),
    },
  ];
};

export const useGradeStore = create<GradeStore>((set, get) => ({
  // Initial state
  classes: [],
  selectedClass: null,
  students: [],
  grades: [],
  dashboardStats: {
    totalClasses: 0,
    totalStudents: 0,
    completedConfigurations: 0,
    pendingGrades: 0,
  },
  loading: false,

  // Actions
  setSelectedClass: (classData) => {
    set({ selectedClass: classData });
    if (classData) {
      set({ students: classData.studentsEnrolled });
    }
  },

  updateClassComponents: (classId, components) => {
    set(state => ({
      classes: state.classes.map(cls =>
        cls.id === classId
          ? { ...cls, components, configurationComplete: true }
          : cls
      ),
    }));
  },

  updateStudentGrade: (grade) => {
    set(state => ({
      grades: [
        ...state.grades.filter(
          g => !(g.studentId === grade.studentId && 
                 g.componentId === grade.componentId && 
                 g.chapterId === grade.chapterId)
        ),
        grade,
      ],
    }));
  },

  initializeMockData: () => {
    set({ loading: true });
    
    const mockClasses = generateMockClasses();
    const allStudents = mockClasses.flatMap(cls => cls.studentsEnrolled);
    
    // Generate mock grades for the first class (which is configured)
    const firstClass = mockClasses[0];
    const mockGrades = generateMockGrades(
      firstClass.studentsEnrolled,
      firstClass.components,
      firstClass.chapters
    );
    
    set({
      classes: mockClasses,
      students: allStudents,
      grades: mockGrades,
      loading: false,
    });
    
    // Calculate dashboard stats
    get().calculateDashboardStats();
  },

  calculateDashboardStats: () => {
    const { classes, students } = get();
    
    const stats: DashboardStats = {
      totalClasses: classes.length,
      totalStudents: students.length,
      completedConfigurations: classes.filter(cls => cls.configurationComplete).length,
      pendingGrades: classes.reduce((total, cls) => {
        return total + (cls.configurationComplete ? 0 : cls.studentCount);
      }, 0),
    };
    
    set({ dashboardStats: stats });
  },
}));