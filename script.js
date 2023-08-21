// Build a simple quiz app that has a question and 4 answers you can click

const body = document.querySelector("body"),
    questionDiv = document.querySelector("#questionDiv"),
    answerDiv = document.querySelector("#answerDiv"),
    prevNextDiv = document.querySelector("#previousNext"),
    prevButton = document.querySelector("#previous"),
    nextButton = document.querySelector("#next"),
    submit = document.querySelector("#submit"),
    appendedWarning = document.createElement('p'),
    appendedCongrats = document.createElement('p'),
    appendedSorry = document.createElement('p'),
    appendResults = document.querySelector('#userAnswers'),
    userResults = {};
let index = 0, 
    flag = false,
    submitted = false;

appendedWarning.textContent = "Please answer all questions before submitting.";
appendedSorry.textContent = "Sorry, one or more answers are incorrect.";
appendedCongrats.textContent = "Your answers are correct!";

const questions = [
    "What is the main programming language used in web browsers?",
    "When was JavaScript created?",
    "What is CSS used for?",
    "Is Java the same as JavaScript?",
    "What popular operating system has its own mascot, Tux the penguin?"
];

const answers = [
    ["Python", "Java", "JavaScript", "C++"],
    ["1995", "1990", "1993", "2000"],
    ["Functionality", "Databases", "Servers", "Styling"],
    ["Yes", "No","Trick Question","No Idea"],
    ["Windows", "macOS", "Linux", "Unix"]
];

const key = {
    'Q. 1':3,
    'Q. 2':1,
    'Q. 3':4,
    'Q. 4':2,
    'Q. 5':3
};

const makeQuestion = index => {
    questionDiv.append(`Question ${index+1}: ${questions[index]}`);
    for (let i=0; i<4; i++) {
        const div = document.createElement('div');
        const btn = document.createElement('button');
        let answerNum = i;
        answerDiv.append(div);
        div.append(++answerNum + ')');
        div.append(btn);
        btn.innerText = answers[index][i];
        btn.addEventListener('click', function () {
            recordAnswer(index, i);
        });
    }
}

const recordAnswer = (index, i) => {
    userResults[`Q. ${++index}`] = ++i;
    appendResults.textContent = `Your Answers: ${JSON.stringify(userResults).slice(1,-1)}`;
}

const prevQuestion = () => {
    questionDiv.innerText = '';
    answerDiv.innerText = '';
    if (index > 0) {
        index--;
    }
    if (flag) {
        document.body.removeChild(appendedWarning);
        flag = false;
    }
    makeQuestion(index);
}

const nextQuestion = () => {
    questionDiv.innerText = '';
    answerDiv.innerText = '';
    if (index < answers.length-1) {
        index++;
    }
    if (flag) {
        document.body.removeChild(appendedWarning);
        flag = false;
    }
    makeQuestion(index);
}

const getResult = () => {
    if (!submitted) {
        if (Object.keys(userResults).length === Object.keys(key).length) {
            if (JSON.stringify(key) === JSON.stringify(userResults)) {
                document.body.appendChild(appendedCongrats);
            } else {
                document.body.appendChild(appendedSorry);
            }
            document.body.append(`Answer Key: ${JSON.stringify(key).slice(1,-1)}`);
        } else {
            document.body.appendChild(appendedWarning);
            flag = true;
        }
        submitted = true;
    }
}

makeQuestion(index);
prevButton.addEventListener('click', prevQuestion);
nextButton.addEventListener('click', nextQuestion);
submit.addEventListener('click', getResult);