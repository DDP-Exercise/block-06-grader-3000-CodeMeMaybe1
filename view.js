"use strict";

const RESULT = document.getElementById("Result");

// 1. method for points input field
export function CreatePoints (labelText, inputName) {
    let label = document.createElement("label");
    label.textContent = labelText;

    let input = document.createElement("input");
    input.type = "number";
    input.name = inputName;
    input.min = "0";
    input.max = "100";
    input.value = "0";

    label.appendChild(input);

    return label;
}

// 2. method for presence input field
export function CreatePresence() {
    let label = document.createElement("label");
    label.textContent = "Anwesenheit (%)";

    let input = document.createElement("input");
    input.type = "number";
    input.name = "Presence";
    input.min = "0";
    input.max = "100";
    input.value = "0";

    label.appendChild(input);

    return label;
}

//3. method that shows the result in HTML
export function ShowResult (ExerciseGrade, ExamGrade, OverallGrade, FinalGrade, NegativeReasons) {
    RESULT.innerHTML = "";

    let ExerciseResult = document.createElement("p");
    ExerciseResult.textContent = "Übungsnote: " + Math.round(ExerciseGrade) + "%";

    let ExamResult = document.createElement("p");
    ExamResult.textContent = "Klausurnote: " + Math.round(ExamGrade) + "%";

    let OverallResult = document.createElement("p");
    OverallResult.textContent = "Gesamtnote: " + Math.round(OverallGrade) + "%";

    let FinalResult = document.createElement("p");
    FinalResult.textContent = "Endnote: " + FinalGrade;

     if(FinalGrade === "Nicht Genügend") {
         ShowNegativeResult(FinalResult);
     } else {
         ShowPositiveResult(FinalResult);
     }

    RESULT.appendChild(ExerciseResult);
    RESULT.appendChild(ExamResult);
    RESULT.appendChild(OverallResult);
    RESULT.appendChild(FinalResult);

    for(let i = 0; i < NegativeReasons.length; i++) {
        let Reason = document.createElement("p");
        Reason.textContent = NegativeReasons[i];
        ShowNegativeResult(Reason);
        RESULT.appendChild(Reason);
    }
}

//4. method that higlights negative grade
export function ShowNegativeResult (element) {
    element.classList.add("negative");
}

//5. method that highlights positive grade
export function ShowPositiveResult(element) {
    element.classList.add("positive");
}

//6 method that highlights dropped exercise
export function ShowDroppedExercise (element) {
    element.classList.add("dropped");
}

