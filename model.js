"use strict";

const EXERCISE_GRADES = [0, 0, 0, 0, 0, 0, 0, 0];
const MAX_POINTS = 100;
let ExamGrades = 0;
let presence = 0;


// 1. Method that allows controller - evaluate exercise with points
export function ExerciseGrade(index, points) {
    if (index >= 0 && index < EXERCISE_GRADES.length && points >= 0 && points <= MAX_POINTS) {
        EXERCISE_GRADES[index] = Number(points);
        ModelChanged();
    } else {
        return false
    }
}

// 2. Method that allows to evaluate the exam with points
export function ExercisePoints (points) {
    if (points >= 0 && points <= MAX_POINTS) {
        ExamGrades =  Number(points);
        ModelChanged();
    } else {
        return false;
    }
}

export function GetExamGrade () {
    return ExamGrades;
}

// 3. Method that allow to register the presence & if presence enough
export function CheckPresence(percent) {
    if (percent >= 0 && percent <= 100) {
        presence = Number(percent);
        ModelChanged();
    }
}

function EnoughPresence () {
    return presence >= 80;
}

//4. Method that checks if points are positiv
function CheckPoints (points) {
    return points > 50;
}

// 5. method for calculation exercise grade
export function ExerciseGrades () {
    let score = 0;
    let worstExercise = EXERCISE_GRADES[0];

    for (let i = 0; i < EXERCISE_GRADES.length; i++) {
        score += EXERCISE_GRADES[i];

        if (EXERCISE_GRADES[i] < worstExercise) {
            worstExercise = EXERCISE_GRADES[i];
        }
    }

    score = score - worstExercise;

    let maxScore = (EXERCISE_GRADES.length - 1) * MAX_POINTS;
    let ExerciseGrades = (score / maxScore) * 100;

    return ExerciseGrades;
}

// 6. method for calculation the overall grade
export function OverallGrade () {
    let ExerciseGrade = ExerciseGrades();
    let OverallGrade = (ExerciseGrade * 0.6) + (ExamGrades * 0.4);

    return OverallGrade;
}

// 7. method that checks if enough exercise is positive

function EnoughExercisesPositive() {
    let PositiveExercise = 0;

    for (let i = 0; i < EXERCISE_GRADES.length; i++) {
        if (CheckPoints(EXERCISE_GRADES[i])) {
            PositiveExercise++;
        }
    }

    return PositiveExercise >= 6;
}

//8. method that return the final grade
export function FinalGrade () {
    let ExerciseGrade = ExerciseGrades();
    let OverallGrades = OverallGrade();

    if (
        CheckPoints(ExerciseGrade) === false ||
        CheckPoints(ExamGrades) === false ||
        EnoughExercisesPositive() === false ||
        EnoughPresence() === false
    ) {
        return "Nicht Genügend";
    }

    if (OverallGrades <= 50) {
        return "Nicht Genügend";
    } else if (OverallGrades <= 61) {
        return "Genügend";
    } else if (OverallGrades <= 74) {
        return "Befriedigend";
    } else if (OverallGrades <= 86) {
        return "Gut";
    } else {
        return "Sehr gut";
    }
}

// 9. disptach custom event when model change
function ModelChanged() {
    document.dispatchEvent(new CustomEvent("GradesChanged"));
}

// 10. Find worst/lowest Exercise
export function GetWorstExercise() {
    let WorstExercise = EXERCISE_GRADES[0];
    let WorstExerciseIndex = 0;

    for (let i = 0; i < EXERCISE_GRADES.length; i++) {
        if (EXERCISE_GRADES[i] < WorstExercise) {
            WorstExercise = EXERCISE_GRADES[i];
            WorstExerciseIndex = i;
        }
    }
    return WorstExerciseIndex;
}

//11. reasons why grade negative
export function GetNegativeReasons() {
    let NegativeReasons = [];
    let ExerciseGrade = ExerciseGrades();

    if(CheckPoints(ExerciseGrade) === false) {
        NegativeReasons.push("Übungsnote ist nicht positiv.");
    }
    if(CheckPoints(ExamGrades) === false) {
        NegativeReasons.push("Klausurnote ist nicht positiv.");
    }

    if(EnoughExercisesPositive() === false) {
        NegativeReasons.push("Nicht genug Übungen sind positiv.");
    }

    if(EnoughPresence() === false) {
        NegativeReasons.push("Anwesenheit ist unter 80%.");
    }

    return NegativeReasons;

}