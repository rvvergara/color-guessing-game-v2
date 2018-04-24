let isEasy = false; //when true the game is only for 3 boxes
let numberOfBoxes = 6;
let boxes = document.getElementsByClassName("boxes");
let hardBoxes = document.getElementsByClassName("hard");
let toGuess = document.getElementsByClassName("rgb");
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let boxRandom;
let chosenBox;
let clickToNew = document.getElementById("new");
let clickEasy = document.getElementById("easy");
let clickHard= document.getElementById("hard");
let message = document.getElementById("message");


//Functions to run when page loads
textToDisplayNewColor(); //gets invoked every page load and also when New Colors is clicked
boxRandomColors();//gets invoked every page load and when New Colors is clicked
makeRandomBoxNumber(); //run this function to place one random box per loading
createChosenBox();



//Event listeners:

// add event listeners to clickToNew button

clickToNew.addEventListener("click",refreshColors);
clickToNew.addEventListener("mouseenter",hover);
clickToNew.addEventListener("mouseleave",hover);

clickEasy.addEventListener("click",runEasy);
clickEasy.addEventListener("mouseenter",hover);
clickEasy.addEventListener("mouseleave",hover);

clickHard.addEventListener("click",runHard);
clickHard.addEventListener("mouseenter",hover);
clickHard.addEventListener("mouseleave",hover);

// add event listeners to individual boxes
for(let box of boxes){
    box.addEventListener("click",isWrong);
    box.addEventListener("click",isRight);
}

//FUNCTIONS:

//1. To generate ID of box to be the chosenBox
function makeRandomBoxNumber(){
    boxRandom = Math.round(Math.random()*numberOfBoxes+1);
    while(boxRandom>numberOfBoxes){
        boxRandom = Math.round(Math.random()*numberOfBoxes+1);}
    return boxRandom;
}

// 2. Choose chosenBox and make its background color the same as the one indicated in textToDisplayNewColor
function createChosenBox(){
    chosenBox = document.getElementById(boxRandom); //box that has the right color
    // to make chosenBox's background to be the color indicated in header
    chosenBox.style.background = "rgb("+Number(red.textContent)+","+Number(green.textContent)+","+Number(blue.textContent)+")";

}

//3. When 'NEW COLORS' is clicked
function refreshColors(){
    document.querySelector("header").style.background = "#1a72c9";
    textToDisplayNewColor();//new color to guess    
    makeRandomBoxNumber();//id of new chosenBox
    createChosenBox();//create new chosen box
    boxRandomColors();//generate new colors for included boxes
    message.textContent = "";
    clickToNew.textContent = "NEW COLOR";
}


//4. when the box clicked is not the right box
function isWrong(){
    if(this.style.background != chosenBox.style.background) {
        // this.classList.add("animateWrong");
        this.style.background = "none";
    }
    message.textContent = "Wrong box";
}

//5. when the right box is clicked
function isRight(){
    if(this == chosenBox){
        for(let box of boxes){
            box.style.background = chosenBox.style.background;
            document.querySelector("header").style.background = chosenBox.style.background;
            if(isEasy && box.className=="col-4 boxes hard"){
                box.style.background = "none";
            }
        }
        message.textContent = "You are correct!!";
        clickToNew.textContent = "Play Again?";
    }
}

// 6.function to create new color in the heading and effectively in the boxes
function textToDisplayNewColor(){
    for(let color of toGuess){
        color.textContent = Math.round(Math.random()*254+1);
    }
}

//7.function to generate colors for individual boxes but chosen box will have the colorToGuess background
function boxRandomColors(){
    for(let box of boxes){
        if(box != chosenBox){
            box.style.background="rgb("+Math.round(Math.random()*254+1)+","+Math.round(Math.random()*254+1)+","+Math.round(Math.random()*254+1)+")";
            if(isEasy==true && box.className == "col-4 boxes hard"){
                box.style.background = "none";
            }
        }
    }
}

//8. Function to handle click event in EASY
function runEasy(){
    if(isEasy == false){
        isEasy = true;
        numberOfBoxes = 3;
        refreshColors();
        this.classList.add("highlight");
        clickHard.classList.remove("highlight");
    }
}

//9. Function to handle click event in HARD

function runHard(){
    if(isEasy){
        isEasy = false;
        numberOfBoxes = 6;
        refreshColors();
        this.classList.add("highlight");
        clickEasy.classList.remove("highlight");
    }
}

//10. function for hovering over options
function hover(e){
    if(e.type == "mouseenter"){
        this.classList.add("hover");
    }else if(e.type == "mouseleave"){
        this.classList.remove("hover");
    }
}






