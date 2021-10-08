const pizza = {
    crust: 'thin',
    toppings: ['pepperoni', 'cheese'],
    size: 'medium',
    buildPizza: function() {
        console.log("build time");
        const toppings = pizza.toppings.join(" and ")
        const message = `Built a ${pizza.size} ${pizza.crust} crust pizza with ${toppings}`;
        document.querySelector("#result").textContent = message;
        console.log(message);
    }
}

document.querySelector('#thin').addEventListener("click", () => pizza.crust = 'thin');
document.querySelector('#thick').addEventListener("click", () => pizza.crust = 'thick');
document.querySelector('#deep-dish').addEventListener("click", () => pizza.crust = 'deep dish');

document.querySelector('#pepperoni').addEventListener('click', () => {
    toppings('pepperoni')
})
document.querySelector('#onions').addEventListener('click', () => {
    toppings('onions')
})
document.querySelector('#pineapple').addEventListener('click', () => {
    toppings('pineapple')
})
document.querySelector('#sausage').addEventListener('click', () => {
    toppings('sausage')
})
function toppings(topping) {
    if (pizza.toppings.includes(topping)) {
        pizza.toppings = pizza.toppings.filter((item) => {
            return item !== topping;
        })
    }
    else {
        pizza.toppings.push(topping);
    }
    console.log(pizza.toppings);
}

document.querySelector('#buildPizza').addEventListener("click", pizza.buildPizza);