// console.log("I work")

let options = document.getElementsByClassName("option");
let choices = ["rock","paper","scissors"];
let winState = { rock:"scissors", paper:"rock",scissors:"paper"};
let battle_elem = document.getElementById("battle");
let reset_elem = document.getElementById("reset");
let aiScore = 0;
let score = 0;
let storage = window.localStorage;

if(storage.getItem("score")){
    score = storage.getItem("store");
}

let score_elem = document.getElementById("score");
let aiScore_elem = document.getElementById("aiScore");
score_elem.innerHTML = score;
aiScore_elem.innerHTML = aiScore;

for (let i = 0; i<options.length;i++){
    let option = options[i];
    // console.log(option);
    option.addEventListener("click", function () {
        this.classList.add("selected");
        disableOptions();
        battle(this);
    });
}


function battle (option) {
    // console.log(option);

    // The dataset property on the HTMLElement interface provides read/write access to all the custom data attributes (data-*) set on the element.

    // The name of a custom data attribute in HTML begins with data-. It must contain only letters, numbers and the following characters: dash (-), dot (.), colon (:), underscore (_) -- but NOT any ASCII capital letters (A to Z).

    let choice = option.dataset.choice;
    console.log(choice);  // Just to verify
    let aiChoice = choices[rand(2,0)];
    console.log(aiChoice);

    
    /*if(choice == winState[aiChoice]){ // If my choice is the same at what AI's choice beats
        console.log("AI Wins")
    }*/
    if(choice == aiChoice){
        console.log("Its a draw");
        option.classList.add("draw");
    } else if(aiChoice == winState[choice]){
        console.log("Player Wins");
        score++;
        score_elem.innerHTML = score;
        option.classList.add("winner");
        storage.setItem("score",score);
    } else {
        console.log("AI Wins");
        aiScore++;
        aiScore_elem.innerHTML = aiScore;
        option.classList.add("loser");
        storage.setItem("aiScore",aiScore);
    }
    displayChoices(choice, aiChoice);
}

function displayChoices(player,ai){
    let choice_elem = document.createElement("DIV");
    choice_elem.classList.add("aiChoice", ai);
    battle_elem.appendChild(choice_elem);
    reset_elem.classList.remove("hide");
}

function rand(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableOptions(){
    // Classlist allows us to modify the list of classes attached to an HTML element
    // Add, Remove, Toggle classes
    for(let i=0;i < options.length; i++){
        let option = options[i];
        if(!option.classList.contains("selected")){
            option.classList.add('disabled'); // Disable those who are not selected
        }
    }
}

reset_elem.addEventListener("click",reset);

function reset(){
    for(let i = 0;i<options.length;i++){
        let option = options[i];
        option.classList.remove("selected");
        option.classList.remove("disabled");
        option.classList.remove("winner");
        option.classList.remove("loser");
        option.classList.remove("draw");  
    }
    battle_elem.innerHTML ="<h3>AI Choice</h3>";
    reset_elem.classList.add("hide");
}