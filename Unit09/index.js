function duplicateMenu() {
    // get anchor elements from top menu
    const topList = document.querySelectorAll('ul#primaryNavigation li a')
    const listText = document.querySelectorAll('ul#primaryNavigation li')

    //create the new list items
    const newList = document.createElement('ul')

    topList.forEach( (menuItem, i) => {
        let newLi = document.createElement('li')
        let newLink = document.createElement('a')
        newLink.setAttribute('href', menuItem.getAttribute('href'))
        newLink.textContent = listText[i].textContent
        newLi.appendChild(newLink)
        newList.appendChild(newLi)
    })

    document.querySelector('#smallNavArea').appendChild(newList)
}
duplicateMenu()