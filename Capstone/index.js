// create a new ingredient input
function addIngredient() {
    const newIngredientLabel = document.createElement("label")
    const newIngredientInput = document.createElement("input")
    newIngredientInput.classList.add("add-ingredient")
    newIngredientLabel.innerText = "Ingredient"
    newIngredientLabel.append(newIngredientInput)
    document.querySelector(".ingredients").append(newIngredientLabel)
}
document.querySelector('.create-new-ingredient').addEventListener("click", addIngredient)

// creates a new meal
function addMeal() {
    // get name of meal
    const mealName = document.querySelector('#mealName').value

    // get ingredients
    let ingredients = []
    document.querySelectorAll('.add-ingredient').forEach( ingredient => {
        ingredients.push(ingredient.value)
    })

    // if entries are valid
    if (mealName !== "" && ingredients[0] !== "") {
        let ingredientElements = ''
        ingredients.forEach( ingredient => {
            if (ingredient !== "") ingredientElements += `<li>${ingredient}</li>`
        })
        
        // add meal to meals
        const html = `
            <div>
                <h3>${mealName}</h3>
                <ul>
                    ${ingredientElements}
                </ul>
            </div>
        `
        document.querySelector(".meals").innerHTML += html

        // reset add a meal form
        document.querySelector('#mealName').value = ""
        document.querySelector('.ingredients').innerHTML = `
        <label>Ingredient
            <input type="text" class="add-ingredient">
        </label>
        `

        // remove tooltips
        document.querySelector('#mealNameToolTip').classList.remove("visible")
        document.querySelector('#ingredientToolTip').classList.remove("visible")
    }
    else {
        if (mealName === "") document.querySelector('#mealNameToolTip').classList.add("visible")
        if (ingredients[0] === "") document.querySelector('#ingredientToolTip').classList.add("visible")
    }
    
}
document.querySelector('#createMeal').addEventListener("click", addMeal)