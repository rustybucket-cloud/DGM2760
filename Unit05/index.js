// Create an array with 4 trees listed
const trees = ['oak', 'Pine', 'aspen', 'Bald Cypress']
const displayResults = document.querySelector('#displayResults')
const messageElement = document.querySelector('#messages')
let messageList = ''

//displays an error message
const errorElement = document.querySelector('#error')
let errorMessage = ''
const addErrorMessage = (error) => {
        errorMessage += `${error} </br>`
        errorElement.innerHTML = errorMessage;
}

// Display the list of trees inside the displayResults div
const listTrees = () => {
    let treeList = ''
    trees.forEach(tree => {
        treeList += `${tree} <br>`
    })
    displayResults.innerHTML = `${treeList} <span>${trees.length} elements long</span`
}

listTrees()

//add a redwood to the last line
document.querySelector('#addRedwood').onclick = () => {
    trees.push('redwood')
    listTrees()
}

//add a pear to the first line
document.querySelector('#addPear').onclick = () => {
    trees.unshift('pear')
    listTrees()
}

//remove the first tree
document.querySelector('#removeFirst').onclick = () => {
    if (trees.length > 0) {
        trees.shift()
        listTrees()
    }
    else {
        addErrorMessage('There are no trees to remove.')
    }
}

//remove the second tree
document.querySelector('#removeSecond').onclick = () => {
    if (trees.length > 1) {
        trees.splice(1, 1)
        listTrees()
    }
    else if (trees.length === 1) {
        addErrorMessage('There is only one tree.')
    }
    else {
        addErrorMessage('There are no trees to remove.')
    }
}

//remove the last tree
document.querySelector('#removeLast').onclick = () => {
    if (trees.length > 0) {
        trees.pop()
        listTrees()
    }
    else {
        addErrorMessage('There are no trees to remove.')
    }
}

//sort trees A-Z
document.querySelector('#sortAZ').onclick = () => {
    trees.sort( (a,b) => {
        if (a.toLowerCase() > b.toLowerCase()) return 1; //if value a in lowercase is greater than b in lowercase, return 1 
        else if (a.toLowerCase() < b.toLowerCase()) return -1; //if value a in lowercase is greater than b in lowercase, return 1 
        else return 0; //if they are equal return 0
    })
    listTrees()
}

//make all the trees lowecase
document.querySelector('#makeLower').onclick = () => {
    trees.forEach((tree, index) => {
        trees[index] = tree.toLowerCase()
    }, trees)
    listTrees()
}

//display element three
document.querySelector('#getNumberThree').onclick = () => {
    if (trees.length >= 3) {
        const message = trees[2]
        const article = (message[0].toLowerCase() === 'a') ? 'an' : 'a'; 
        messageList += `The third tree is ${article} ${message} </br>`
        messageElement.innerHTML = messageList;
    }
    else {
        addErrorMessage('There are less than three trees.')
    }
}

//display element four
document.querySelector('#getNumberFour').onclick = () => {
    if (trees.length >= 4) {
        const message = trees[3]
        const article = (message[0].toLowerCase() === 'a') ? 'an' : 'a'; 
        messageList += `The fourth tree is ${article} ${message} </br>`
        messageElement.innerHTML = messageList;
    }
    else {
        addErrorMessage('There are less than four trees.')
    }
}