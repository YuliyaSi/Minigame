const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0
const colors = ['#FFA07A', '#FFB6C1', '#EEE8AA', '#EE82EE', '#6A5ACD', '#F4A460', '#ADFF2F', '#90EE90', '#20B2AA', '#40E0D0', '#2F4F4F']

startBtn.addEventListener('click', (event) => {
event.preventDefault()
screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
time = parseInt(event.target.getAttribute('data-time'))
screens[1].classList.add('up')
startGame()
    }
})

board.addEventListener('click', event => {
   if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
   }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else{

   
    let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)

    }
}

function setTime (value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame () {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</h1></span>`
}

function createRandomCircle () {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const col = getColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${col}`

    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

function getColor() {
    const idColor = Math.floor(Math.random() * colors.length)
    return colors[idColor]
}