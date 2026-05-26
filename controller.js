"use strict";

// 1. import functions from model
import {
    ExerciseGrade,
    ExercisePoints,
    CheckPresence,
    ExerciseGrades,
    OverallGrade,
    FinalGrade,
    GetExamGrade,
    GetWorstExercise,
    GetNegativeReasons,
} from "./model.js";

//2. import functions from view
import {
    CreatePoints,
    CreatePresence,
    ShowResult,
    ShowDroppedExercise
} from "./view.js";

//3. get html
const EXAM_CONTAINER = document.getElementById("Exam");
const PRESENCE_CONTAINER = document.getElementById("Presence");
const EXERCISE_CONTAINER = document.getElementById("Exercise");

// 4. create input fields
let ExamInput = CreatePoints("Klausur (%)", "Exam");
let PresenceInput = CreatePresence ();
let ExerciseInputs = [];

for (let i = 0; i < 8; i++) {
    let ExerciseInput = CreatePoints("Übung " + (i + 1), "Exercise" + i);
    ExerciseInputs.push(ExerciseInput);
}

// 5. add input fields to html
EXAM_CONTAINER.appendChild(ExamInput);
PRESENCE_CONTAINER.appendChild(PresenceInput);

for (let i = 0; i < ExerciseInputs.length; i++) {
    EXERCISE_CONTAINER.appendChild(ExerciseInputs[i]);
}

// 6. Add event listeners to input fields
ExamInput.addEventListener("change", UpdateExam);
PresenceInput.addEventListener("change", UpdatePresence);

for (let i = 0; i < ExerciseInputs.length; i++) {
    ExerciseInputs[i].addEventListener("change", UpdateExercise);
}

// 7. Update result
function UpdateResult() {
    let CurrentExerciseGrade = ExerciseGrades();
    let CurrentExamGrade = GetExamGrade();
    let CurrentOverallGrade = OverallGrade();
    let CurrentFinalGrade = FinalGrade();
    let NegativeReasons = GetNegativeReasons();

    ShowResult(CurrentExerciseGrade, CurrentExamGrade, CurrentOverallGrade, CurrentFinalGrade, NegativeReasons);
    ShowWorstExercise();
}

//8. update exam
function UpdateExam(event) {
    ExercisePoints(event.target.value);
}

//9. update presence
function UpdatePresence(event) {
    CheckPresence(event.target.value);
}

// 10. update exercise
function UpdateExercise(event) {
    let ExerciseIndex = Number(event.target.name.replace ("Exercise", ""));
    ExerciseGrade(ExerciseIndex, event.target.value);
}

// 11. show result from start
UpdateResult();

//12. react custom event from model
document.addEventListener("GradesChanged", UpdateResult);


//13. show worst exercise
function ShowWorstExercise() {
    RemoveWorstExercise();

    let WorstExerciseIndex = GetWorstExercise();
    ShowDroppedExercise(ExerciseInputs[WorstExerciseIndex]);
}

// 14. remove old worst exercise marks
function RemoveWorstExercise() {
    for (let i = 0; i < ExerciseInputs.length; i++) {
        ExerciseInputs[i].classList.remove("dropped");
    }
}
