const question = {
    stem: "Who is buried in Grant's Tomb?",
    option1: "Tom",
    option2: "Grant",
    option3: "Jordan",
    option4: "Steve",
    correct: 2,
    display: () => {
        document.querySelector('#stem').textContent = question.stem
        document.querySelector('#answer1').textContent = question.option1
        document.querySelector('#answer2').textContent = question.option2
        document.querySelector('#answer3').textContent = question.option3
        document.querySelector('#answer4').textContent = question.option4
        //display the question option here
    },
    check: (userChoice) => {
         if (userChoice === question.correct) {
            document.querySelector('#feedback').textContent = 'You are Correct!'
        }
        else {
            document.querySelector('#feedback').textContent = 'Try Again'
        }
    }
}
document.querySelector('#answer1').addEventListener('click', () => question.check(1))
document.querySelector('#answer2').addEventListener('click', () => question.check(2))
document.querySelector('#answer3').addEventListener('click', () => question.check(3))
document.querySelector('#answer4').addEventListener('click', () => question.check(4))

//give each question answer an even listener that clears the class 'selected' from each answer, then gives the 'selected' class to the clicked on answer, turning it purple
const answers = document.querySelectorAll('.answer');
answers.forEach( answer => {
    answer.addEventListener('click', () => {
        answers.forEach( x => x.classList.remove('selected'))
        answer.classList.add('selected');
    })
})

question.display()