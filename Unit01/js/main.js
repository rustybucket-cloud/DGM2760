document.querySelector("header h1").innerText = "Sam's Smoothie Shack"

document.querySelector("header h2").innerText = "Healthy and Delicious!"

const date = new Date()
document.querySelector('#date').innerText = `Today is ${date.toLocaleDateString()}`;

let userName = prompt("What is your name?")
if (userName === null || userName === '') {
    userName = 'friend';
}
document.querySelector("#greeting").innerText = `Hello ${userName}, welcome to our shake shake!`;
