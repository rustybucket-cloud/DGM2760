//pick a random number between 1 and 16
let correctNumber = Math.floor(Math.random() * 15) + 1
console.log(`The correct number is ${correctNumber}`) 

let guessed = false
let totalGuesses = 0
let gamerGuess = 0

function evalGuess() {
   totalGuesses += 1 //increment total guesses
   gamerGuess = document.querySelector('#guess').value
   const feedback = document.querySelector('#feedback')

   if (gamerGuess == correctNumber) {
       feedback.innerText = 'You win!'
       giveAward(totalGuesses)
   } 
   else if(gamerGuess > correctNumber && gamerGuess < 16) {
        feedback.innerText = 'Too high, try again'
   }
   else if (gamerGuess < correctNumber && gamerGuess > 0) {
       feedback.innerText = 'Too low, try again'
   }
   else {
       feedback.innerText = 'Please select a number between 1 and 15 and try again'
   }

   document.querySelector('#attempts').innerText = totalGuesses
}

function giveAward(guesses) {
    let imagePath = '#'
    switch(guesses) {
        case 1:
        case 2:
        case 3:
            imagePath = './images/gold-medal.svg'
            break
        case 4: 
        case 5:
        case 6:
            imagePath = './images/silver-medal.svg'
            break
        case 7:
        case 8:
        case 9:
            imagePath = '.images/bronze-medal.svg'
            break
    }

    if ()
    const awardImage = document.createElement('img') //creates <img>
    const ribbon = document.querySelector('#ribbon')
    awardImage.setAttribute('src', imagePath)
    awardImage.classList.add('ribbon');
    ribbon.appendChild(awardImage);
}