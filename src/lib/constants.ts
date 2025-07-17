export const GRADE_COMPONENTS = [
  { id: 'tugas', name: 'Tugas', color: '#1976d2', defaultPercentage: 20 },
  { id: 'uts', name: 'UTS', color: '#388e3c', defaultPercentage: 25 },
  { id: 'uas', name: 'UAS', color: '#f57c00', defaultPercentage: 30 },
  { id: 'proyek', name: 'Proyek', color: '#7b1fa2', defaultPercentage: 15 },
  { id: 'kuis', name: 'Kuis', color: '#c62828', defaultPercentage: 10 },
] as const;

export const LETTER_GRADES = [
  { min: 85, letter: 'A', gpa: 4.0 },
  { min: 80, letter: 'A-', gpa: 3.7 },
  { min: 75, letter: 'B+', gpa: 3.3 },
  { min: 70, letter: 'B', gpa: 3.0 },
  { min: 65, letter: 'B-', gpa: 2.7 },
  { min: 60, letter: 'C+', gpa: 2.3 },
  { min: 55, letter: 'C', gpa: 2.0 },
  { min: 50, letter: 'C-', gpa: 1.7 },
  { min: 45, letter: 'D+', gpa: 1.3 },
  { min: 40, letter: 'D', gpa: 1.0 },
  { min: 0, letter: 'E', gpa: 0.0 },
];

export const SAMPLE_CHAPTERS = [
  { id: 'bab1', name: 'Konsep Dasar Pemrograman', weight: 0.2 },
  { id: 'bab2', name: 'Struktur Data dan Algoritma', weight: 0.25 },
  { id: 'bab3', name: 'Object-Oriented Programming', weight: 0.2 },
  { id: 'bab4', name: 'Database Management', weight: 0.2 },
  { id: 'bab5', name: 'Web Development', weight: 0.15 },
];