// create a new ingredient input
function addIngredient() {
    // the html of the ingredient and quantity inputs
    const ingredientHTML = document.querySelector(".ingredient").innerHTML
    // clone inputs
    const div = document.createElement("div")
    div.classList.add("ingredient")
    div.innerHTML = ingredientHTML
    document.querySelector(".ingredients").append(div)
}
document.querySelector('.create-new-ingredient').addEventListener("click", addIngredient)

// open and close add meal form
function toggleAddMeal({currentTarget}) {
    // hide and show add meal form
    if (currentTarget.id === "toggleAddMeal") document.querySelector(".add-meal-content").classList.toggle("hidden")
    else if (currentTarget.id === "toggleNutritionGoals") document.querySelector(".nutrition-inputs").classList.toggle("hidden")

    // toggle icon between up and down
    currentTarget.classList.toggle("open")
}
document.querySelectorAll("i").forEach( item => item.addEventListener("click", toggleAddMeal))

// makes units tooltip visible or hidden
function showTooltip({currentTarget}) {
    const tooltip = document.querySelector('.tooltip')
    // if icon has tooltip-visible class
    if (currentTarget.classList.contains("tooltip-visible")) {
        currentTarget.classList.remove("tooltip-visible")
        tooltip.classList.remove("tooltip-visible")
    }
    else {
        currentTarget.classList.add("tooltip-visible")
        tooltip.classList.add("tooltip-visible")
    }
}
document.querySelector('.fa-question-circle').addEventListener('click', showTooltip)

const dailyTotals = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0
}
const dailyGoals = {
    calories: 2000,
    proteins: 100,
    fats: 22,
    carbs: 300
}
// creates a new meal
async function addMeal() {
    // make meals visible
    document.querySelector(".meals").classList.remove("hidden")

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
    if (mealName !== "Select One" && ingredients[0] !== "") {
        // show loading indicator
        document.querySelector(".loading").classList.remove("hidden")
        document.querySelector("#loadingError").style.display = "none";

        const data = await getNutritionData(ingredients)
        if (data === "error") {
            document.querySelector(".loading").classList.add("hidden")
            document.querySelector("#loadingError").style.display = "block";
            return
        }

        // conversions from selected units
        const unitConversions = {
            slices: .38,
            oz: .03,
            cups: 2.4,
            grams: .01
        }
        let nutrition = {
            calory_count: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0
        }
        
        // calculate nutrition data totals
        data.forEach((ingredient, i) => {
            const { calories, fat_total_g, protein_g, carbohydrates_total_g, fiber_g, sugar_g } = ingredient
            const quantity = ingredients[i].quantity
            const unit = unitConversions[ingredients[i].unit]
            nutrition.calory_count += calories * quantity * unit //* (quantity * unit)
            nutrition.protein += protein_g * quantity * unit
            nutrition.carbs += carbohydrates_total_g * quantity * unit
            nutrition.fat += fat_total_g * quantity * unit
            nutrition.fiber += fiber_g * quantity * unit
            nutrition.sugar += sugar_g * quantity * unit
        })
        
        
        let ingredientElements = ''
        ingredients.forEach( ingredient => {
            if (ingredient !== "") ingredientElements += `
            <div>
                <li>${ingredient.ingredient}</li>
                <li>${ingredient.quantity} ${ingredient.unit}</li>  
            </div>`
        })
        const { calory_count, protein, carbs, fat, fiber, sugar } = nutrition
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
                            <li>${Math.floor(calory_count)}</li>  
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
                        <div>
                            <li>Sugar</li>
                            <li>${Math.floor(sugar)}</li>  
                        </div>
                        <div>
                            <li>Fiber</li>
                            <li>${Math.floor(fiber)}</li>  
                        </div>
                    </ul>
                </div>
            </div>
        `
        document.querySelector(".meal-content").innerHTML += html

        // add to daily totals
        dailyTotals.calories += Math.floor(calory_count)
        dailyTotals.proteins += Math.floor(protein)
        dailyTotals.fats += Math.floor(fat)
        dailyTotals.carbs += Math.floor(carbs)
        // change daily total p and graph
        document.querySelector("#daily-calory-count").innerText = dailyTotals.calories
        document.querySelector(".calories-total").style.width = `${(dailyTotals.calories / dailyGoals.calories) * 100}%`
        document.querySelector("#daily-proteins-count").innerText = dailyTotals.proteins
        document.querySelector(".proteins-total").style.width = `${(dailyTotals.proteins / dailyGoals.proteins) * 100}%`
        document.querySelector("#daily-fats-count").innerText = dailyTotals.fats
        document.querySelector(".fats-total").style.width = `${(dailyTotals.fats / dailyGoals.fats) * 100}%`
        document.querySelector("#daily-carbs-count").innerText = dailyTotals.carbs
        document.querySelector(".carbs-total").style.width = `${(dailyTotals.carbs / dailyGoals.carbs) * 100}%`

        // reset add a meal form
        document.querySelector('#mealName').value = "Select One"
        const ingredientHTML = document.querySelector(".ingredient").innerHTML
        document.querySelector('.ingredients').innerHTML = `
        <div class="ingredient">
            ${ingredientHTML}
        </div>
        `

        // remove tooltips
        document.querySelector('#mealNameToolTip').classList.remove("visible")
        document.querySelector('#ingredientToolTip').classList.remove("visible")

        // hide loading indicator
        document.querySelector(".loading").classList.add("hidden")
    }
    else {
        if (mealName === "") document.querySelector('#mealNameToolTip').classList.add("visible")
        if (ingredients[0] === "") document.querySelector('#ingredientToolTip').classList.add("visible")
    }
    
}
document.querySelector('#createMeal').addEventListener("click", addMeal)

// adjust daily nutrition goals and adjust graph
function setDailyGoals() {
    dailyGoals.calories = document.querySelector("#calories-input").value
    dailyGoals.proteins = document.querySelector("#proteins-input").value
    dailyGoals.fats = document.querySelector("#fats-input").value
    dailyGoals.carbs = document.querySelector("#carbs-input").value

    document.querySelector("#calories-goal").innerText = dailyGoals.calories
    document.querySelector(".calories-total").style.width = `${(dailyTotals.calories / dailyGoals.calories) * 100}%`
    document.querySelector("#proteins-goal").innerText = dailyGoals.proteins
    document.querySelector(".proteins-total").style.width = `${(dailyTotals.proteins / dailyGoals.proteins) * 100}%`
    document.querySelector("#fats-goal").innerText = dailyGoals.fats
    document.querySelector(".fats-total").style.width = `${(dailyTotals.fats / dailyGoals.fats) * 100}%`
    document.querySelector("#carbs-goal").innerText = dailyGoals.carbs
    document.querySelector(".carbs-total").style.width = `${(dailyTotals.carbs / dailyGoals.carbs) * 100}%`
}
document.querySelector("#setNutritionGoals").addEventListener("click", setDailyGoals)

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
            const controller = new AbortController()
            const { signal } = controller
            fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${ingredientList}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
                    "x-rapidapi-key": "c90b245b31msh46b59787848177ap15892cjsne103b05ba7a8"
                }
            }, { signal })
            .then( response => response.json())
            .then(data => {
                if (data.length !== 0) {
                    data.forEach((ingredient, i) => {
                        const { calories, fat_total_g, protein_g, carbohydrates_total_g, fiber_g, sugar_g } = ingredient
                        let name = ingredients[i].ingredient
                        nutrition.push({name, calories, fat_total_g, protein_g, carbohydrates_total_g, fiber_g, sugar_g})
                    })
                    resolve(nutrition)
                }
            })

            // end api call if call takes too long
            setTimeout(() => {
                controller.abort()
                resolve("error")
            }, 3000)
        })
        return data
    }
    catch (err) {
        console.log("hey")
        return "error"
    }
}