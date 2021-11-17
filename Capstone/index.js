// create a new ingredient input
function addIngredient() {
    const div = document.createElement("div")
    div.classList.add("ingredient")
    const html = `
        <label>Ingredient
            <input type="text" class="add-ingredient">
        </label>
        <label for="quantity">Quantity
            <span>
                <input type="text" class="quantity">
                <select class="quantity-unit">
                    <option value="cups">Cups</option>
                    <option value="oz">Oz</option>
                    <option value="slices">Slices</option>
                    <option value="grams">Grams</option>
                    <option value="each>Each</option>
                </select>
            </span>
        </label> 
    `
    div.innerHTML = html
    document.querySelector(".ingredients").append(div)
}
document.querySelector('.create-new-ingredient').addEventListener("click", addIngredient)

// creates a new meal
async function addMeal() {
    // get name of meal
    const mealName = document.querySelector('#mealName').value

    // get ingredients, quantities, and units
    let ingredients = []
    document.querySelectorAll('.add-ingredient').forEach( ingredient => {
        ingredients.push({ingredient: ingredient.value})
    })
    const quantities = document.querySelectorAll('.quantity')
    const units = document.querySelectorAll('.quantity-unit')
    for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].quantity = quantities[i].value
        ingredients[i].unit = units[i].value
    }

    // if entries are valid
    if (mealName !== "" && ingredients[0] !== "") {
        const data = await getNutritionData(ingredients)

        let calories = 0
        let protein = 0
        let carbs = 0
        let fat = 0
        data.forEach((ingredient, i) => {
            calories += ingredient.calories * ingredients[i].quantity
            protein += ingredient.protein * ingredients[i].quantity
            carbs += ingredient.carbs * ingredients[i].quantity
            fat += ingredient.fat * ingredients[i].quantity
        })

        let ingredientElements = ''
        ingredients.forEach( ingredient => {
            if (ingredient !== "") ingredientElements += `
            <div>
                <li>${ingredient.ingredient}</li>
                <li>${ingredient.quantity} ${ingredient.unit}</li>  
            </div>`
        })
        
        // add meal to meals
        const html = `
            <div class="meal">
                <h3>${mealName}</h3>
                <div class="meal-ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        ${ingredientElements}
                    </ul>
                </div>
                <div class="meal-nutrition-data">
                    <h4>Nutrition</h4>
                    <ul class="nutrition">
                        <div>
                            <li>Calories</li>
                            <li>${Math.floor(calories)}</li>  
                        </div>
                        <div>
                            <li>Protein</li>
                            <li>${Math.floor(protein)}</li>  
                        </div>
                        <div>
                            <li>Carbs</li>
                            <li>${Math.floor(carbs)}</li>  
                        </div>
                        <div>
                            <li>Fat</li>
                            <li>${Math.floor(fat)}</li>  
                        </div>
                    </ul>
                </div>
            </div>
        `
        document.querySelector(".meal-content").innerHTML += html

        // reset add a meal form
        document.querySelector('#mealName').value = "Select One"
        document.querySelector('.ingredients').innerHTML = `
        <div class="ingredient">
            <label>Ingredient
                <input type="text" class="add-ingredient">
            </label>
            <label for="quantity">Quantity
                <span>
                    <input type="text" class="quantity">
                        <select class="quantity-unit">
                            <option value="cups">Cups</option>
                            <option value="oz">Oz</option>
                            <option value="slices">Slices</option>
                            <option value="grams">Grams</option>
                    </select>
                </span>
            </label> 
        </div>
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

// get nutrition data from api
async function getNutritionData(ingredients) {
    // arrange data to be sent to api
    let ingredientList = ''
    ingredients.forEach( (ingredient, i) => {
        if (i !== ingredients.length - 1) ingredientList += `${ingredient.ingredient} and `
        else ingredientList += ingredient.ingredient
    })
    // send query
    try {
        const data = new Promise((resolve, reject) => {
            let nutrition = []
            fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${ingredientList}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
                    "x-rapidapi-key": "c90b245b31msh46b59787848177ap15892cjsne103b05ba7a8"
                }
            })
            .then( response => response.json())
            .then(data => {
                if (data.length !== 0) {
                    data.forEach((ingredient, i) => {
                        let name = ingredients[i].ingredient
                        let calories = ingredient.calories
                        let fat = ingredient.fat_total_g
                        let protein = ingredient.protein_g
                        let carbs = ingredient.carbohydrates_total_g
                        nutrition.push({name, calories, fat, protein, carbs})
                    })
                    resolve(nutrition)
                }
                else {
                    reject("There was an error")
                }
            })
        })
        return data
    }
    catch (err) {
        console.log(err)
        return data
    }
}