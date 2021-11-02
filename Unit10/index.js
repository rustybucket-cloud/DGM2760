const hotelOptions = document.querySelectorAll('.hotelOptions button')
//handle each button click, give clicked button active class
hotelOptions.forEach( option => {
    option.addEventListener('click', (e) => { //remove active class from all buttons then add active class to clicked button
        hotelOptions.forEach( button => button.classList.remove('active'))
        option.classList.add('active')
        document.querySelector('#hotelInfo').classList.remove('hidden')
        hotelInfo(e.currentTarget) //changes displayed info
    })
})

//fetches the data from hotels.json file
let hotelData = {} //object that will hold json data
async function getHotelData() {
    try { //fetch data
        const response = await fetch("./hotels.json")
        return await response.json()
    }
    catch (err) {
        console.error(err)
    }
}
getHotelData().then(data => hotelData = data)

//changes the selected hotel and displayed data
let selectedHotel;
function hotelInfo(target) {
    const hotelChoice = hotelData.hotels //array with each hotel's data
    const hotelId = target.id //id of clicked item
    const hotel = hotelChoice.find( hotel => hotel.id === hotelId) //finds hotel from json data with the same id as the clicked element
    selectedHotel = hotel; //allows selected hotel to be used outside of function
    
    //changes displayed info to hotel's
    document.querySelector('#hotelName').innerText = hotel.name
    document.querySelector('#address').innerText = hotel.address
    document.querySelector('#numberOfRooms').innerText = `Number of rooms: ${hotel.rooms}`
    document.querySelector('#gymAvailable').innerText = `Gym Available: ${hotel.gym}`
    let roomTypes = 'Room Types: '
    hotel.roomTypes.forEach( (type, i) => {
        roomTypes += i === hotel.roomTypes.length - 1 ? type : `${type}, ` //add a comma and space if array item is not the last item in the array
    })
    document.querySelector('#roomTypes').innerText = roomTypes
    document.querySelector('#roomPhoto').setAttribute('src', hotel.picture[0])
}

//creates a slide show with hotel images
let slideIndex = 0; //index of array of images that is currently being shown
function slideShow(e) {
    if (e.currentTarget.id === "slideRight") { //if right triangle on slideshow is clicked
        slideIndex++
        if (slideIndex >= selectedHotel.picture.length) { 
            slideIndex = 0
        }
    }
    else if (e.currentTarget.id === "slideLeft") {
        slideIndex--
        if (slideIndex < 0) {
            slideIndex = selectedHotel.picture.length - 1
        }
    }
    document.querySelector('#roomPhoto').setAttribute('src', selectedHotel.picture[slideIndex]) //changes DOM element to chosen image
}
document.querySelectorAll('svg').forEach(arrow => arrow.addEventListener('click', slideShow))