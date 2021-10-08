const pizza = {
    crust: 'thin',
    toppings: ['pepperoni', 'cheese'],
    size: 'medium',
    selectToppings: function(topping) {
        if (pizza.toppings.includes(topping)) {
            pizza.toppings = pizza.toppings.filter((item) => {
                return item !== topping;
            })
        }
        else {
            pizza.toppings.push(topping);
        }
    },
    buildPizza: function() {
        const toppings = pizza.toppings.join(" and ")
        const message = `Built a ${pizza.size} ${pizza.crust} crust pizza with ${toppings}`;
        document.querySelector("#result").textContent = message;
        console.log(message);
    },
    shoppingList: function() {
        let flour = 1;
        if (pizza.crust === 'thick') flour += 2;
        else if (pizza.crust === 'deep dish') flour += 1;

        if (pizza.size === 'large') flour += 1;
        else if (pizza.crust === 'small') flour -= .5

        if (flour === 1) {
            flour = '1 lb';
        }
        else {
            flour = flour + ' lbs';
        }

        let toppings = pizza.toppings.join(", 1lb of ");
        
        document.querySelector('#shoppingList').textContent = `Shopping list: ${flour} of flower, 1lb of ${toppings}`;
    }
}

document.querySelector('#thin').addEventListener("click", () => pizza.crust = 'thin');
document.querySelector('#thick').addEventListener("click", () => pizza.crust = 'thick');
document.querySelector('#deep-dish').addEventListener("click", () => pizza.crust = 'deep dish');

document.querySelector('#pepperoni').addEventListener('click', () => {
    pizza.selectToppings('pepperoni')
})
document.querySelector('#onions').addEventListener('click', () => {
    pizza.selectToppings('onions')
})
document.querySelector('#pineapple').addEventListener('click', () => {
    pizza.selectToppings('pineapple')
})
document.querySelector('#sausage').addEventListener('click', () => {
    pizza.selectToppings('sausage')
})

document.querySelector('#buildPizza').addEventListener("click", pizza.buildPizza);
document.querySelector('#shoppingListButton').addEventListener('click', pizza.shoppingList);