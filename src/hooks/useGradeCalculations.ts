import { useMemo } from 'react';
import { useGradeStore } from '@/lib/store';
import { calculateFinalGrade } from '@/lib/utils';
import { GradeCalculation } from '@/types';

export function useGradeCalculations(classId?: string) {
  const { selectedClass, grades } = useGradeStore();
  const currentClass = selectedClass;

  const calculations = useMemo(() => {
    if (!currentClass) return [];

    const classGrades = grades.filter(grade => 
      currentClass.studentsEnrolled.some(student => student.id === grade.studentId)
    );

    return currentClass.studentsEnrolled.map(student => {
      const studentGrades = classGrades.filter(grade => grade.studentId === student.id);
      
      if (studentGrades.length === 0) {
        // Return empty calculation for students with no grades
        return {
          studentId: student.id,
          componentScores: currentClass.components.map(comp => ({
            componentId: comp.id,
            totalScore: 0,
            maxScore: 100,
            percentage: comp.percentage,
          })),
          finalGrade: 0,
          letterGrade: 'E',
        };
      }

      return calculateFinalGrade(studentGrades, currentClass.components, currentClass.chapters);
    });
  }, [currentClass, grades]);

  const classStats = useMemo(() => {
    if (calculations.length === 0) return null;

    const validGrades = calculations.filter(calc => calc.finalGrade > 0);
    const average = validGrades.length > 0 
      ? validGrades.reduce((sum, calc) => sum + calc.finalGrade, 0) / validGrades.length
      : 0;

    const gradeDistribution = calculations.reduce((dist, calc) => {
      const letter = calc.letterGrade;
      dist[letter] = (dist[letter] || 0) + 1;
      return dist;
    }, {} as Record<string, number>);

    return {
      average: Math.round(average * 100) / 100,
      highest: Math.max(...calculations.map(calc => calc.finalGrade)),
      lowest: Math.min(...validGrades.map(calc => calc.finalGrade)),
      distribution: gradeDistribution,
      totalStudents: calculations.length,
      gradedStudents: validGrades.length,
    };
  }, [calculations]);

  return {
    calculations,
    classStats,
  };
}