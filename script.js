const gameContainer = document.getElementById("game");
const guess = document.getElementById("guess");
const reset = document.getElementById("reset");
let firstcard; 
let secondcard;
let hasFlippedCard = false;
let lockboard = false;
let count = 0;
let correctcount = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
 
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const Divup = document.createElement("div");
    const Divdown = document.createElement("div");
    
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, 'memoryCard');
    Divup.setAttribute('id', 'up');
    Divdown.setAttribute('id', 'down');
    newDiv.setAttribute('data-framework', color);
    newDiv.append(Divup);
    newDiv.append(Divdown);
    
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    
  }
}



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (lockboard) return;
  if (event.target === firstcard) return;
  event.target.classList.add('flip');
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstcard = event.target;
  } else{
    hasFlippedCard = false;
    secondcard = event.target;

    if (firstcard.dataset.framework === secondcard.dataset.framework){
      count +=1;
      correctcount +=2;
      guess.innerHTML = count;
      console.log(count);
      firstcard.removeEventListener('click', handleCardClick);
      secondcard.removeEventListener('click', handleCardClick);
    } else {
        lockboard = true;
        count +=1;
        guess.innerHTML = count;
        setTimeout(function(){
        firstcard.style.backgroundColor = "";
        secondcard.style.backgroundColor = "";
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        lockboard = false;
        firstcard = null;
        secondcard = null;
    },1500);
    }
  
  
  }
  setTimeout(() => {
    if (correctcount === COLORS.length) alert("game over!");
  },2000);
  
}

reset.addEventListener('click', function(e){
  count = 0;
  guess.innerHTML = count;
  gameContainer.innerHTML = '';
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
})

// when the DOM loads
createDivsForColors(shuffledColors);
