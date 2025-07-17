import { LETTER_GRADES } from './constants';
import { GradeCalculation, StudentGrade, GradeComponent, Chapter } from '@/types';

export function calculateLetterGrade(score: number): string {
  const grade = LETTER_GRADES.find(g => score >= g.min);
  return grade?.letter || 'E';
}

export function calculateGPA(score: number): number {
  const grade = LETTER_GRADES.find(g => score >= g.min);
  return grade?.gpa || 0.0;
}

export function calculateFinalGrade(
  studentGrades: StudentGrade[],
  components: GradeComponent[],
  chapters: Chapter[]
): GradeCalculation {
  const studentId = studentGrades[0]?.studentId || '';
  const componentScores = components.map(component => {
    // Calculate weighted score for this component across all chapters
    let totalWeightedScore = 0;
    let totalMaxWeightedScore = 0;

    chapters.forEach(chapter => {
      const grade = studentGrades.find(
        g => g.componentId === component.id && g.chapterId === chapter.id
      );
      
      if (grade) {
        const normalizedScore = (grade.score / grade.maxScore) * 100;
        totalWeightedScore += normalizedScore * chapter.weight;
        totalMaxWeightedScore += 100 * chapter.weight;
      }
    });

    return {
      componentId: component.id,
      totalScore: totalWeightedScore,
      maxScore: totalMaxWeightedScore,
      percentage: component.percentage,
    };
  });

  // Calculate final grade based on component percentages
  const finalGrade = componentScores.reduce((total, comp) => {
    const componentScore = (comp.totalScore / comp.maxScore) * 100;
    return total + (componentScore * comp.percentage / 100);
  }, 0);

  return {
    studentId,
    componentScores,
    finalGrade: Math.round(finalGrade * 100) / 100,
    letterGrade: calculateLetterGrade(finalGrade),
  };
}

export function generateMockGrades(
  students: { id: string }[],
  components: GradeComponent[],
  chapters: Chapter[]
): StudentGrade[] {
  const grades: StudentGrade[] = [];
  
  students.forEach(student => {
    components.forEach(component => {
      chapters.forEach(chapter => {
        // Generate realistic grade distributions
        const baseScore = 70 + Math.random() * 25; // Base score between 70-95
        const variance = (Math.random() - 0.5) * 20; // Variance of ±10
        const finalScore = Math.max(0, Math.min(100, baseScore + variance));
        
        grades.push({
          studentId: student.id,
          componentId: component.id,
          chapterId: chapter.id,
          score: Math.round(finalScore),
          maxScore: 100,
        });
      });
    });
  });
  
  return grades;
}

export function formatPercentage(value: number): string {
  return `${value}%`;
}

export function validateComponentPercentages(components: { percentage: number }[]): boolean {
  const total = components.reduce((sum, comp) => sum + comp.percentage, 0);
  return Math.abs(total - 100) < 0.01; // Allow for floating point precision
}