const timerDisplay = document.getElementById("timer-display")
const startButton = document.getElementById("start-button")
const stopButton = document.getElementById("stop-button")
const resetButton = document.getElementById("reset-button")
const lapButton = document.getElementById("lap-button")
const lapList = document.getElementById("lap-list")
const clearLaps = document.getElementById("clear-laps")

let totalMilliseconds = 0
let intervalId = null
let lapTimes = []
let canTakeLapWhilePaused = false

const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = ms % 1000
    const pad = (num, length = 2) => String(num).padStart(length, "0")
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`
}

const startTimer = () => {
    if (intervalId !== null) {
        return
    }

    intervalId = setInterval(() => {
        totalMilliseconds += 10
        timerDisplay.textContent = formatTime(totalMilliseconds)
    }, 10)

    startButton.classList.add("pressed")
    stopButton.classList.remove("pressed")
    
    startButton.disabled = true
    stopButton.disabled = false
    lapButton.disabled = false
    resetButton.disabled = false
    canTakeLapWhilePaused = false
}

const stopTimer = () => {
    clearInterval(intervalId)
    intervalId = null

    stopButton.classList.add("pressed")
    startButton.classList.remove("pressed")

    startButton.disabled = false
    stopButton.disabled = true
    
    if (totalMilliseconds > 0) {
        lapButton.disabled = false
        canTakeLapWhilePaused = true
    } else {
        lapButton.disabled = true
        canTakeLapWhilePaused = false
    }

    resetButton.disabled = (totalMilliseconds === 0)
}

const recordLap = () => {
    const currentLapTime = formatTime(totalMilliseconds)
    lapTimes.push(currentLapTime)

    const listItem = document.createElement("li")
    listItem.textContent = `${currentLapTime}`

    lapList.appendChild(listItem)

    lapList.scrollTop = lapList.scrollHeight

    if (intervalId === null && canTakeLapWhilePaused) {
        lapButton.disabled = true
        canTakeLapWhilePaused = false
    }

    clearLaps.disabled = false
}

const lapCleaner = () => {
    lapTimes = []
    lapList.innerHTML = ""
    clearLaps.disabled = true
}

const resetTimer = () => {
    clearInterval(intervalId)
    intervalId = null
    totalMilliseconds = 0
    timerDisplay.textContent = formatTime(totalMilliseconds)

    startButton.classList.remove("pressed")
    stopButton.classList.remove("pressed")

    startButton.disabled = false
    stopButton.disabled = true
    lapButton.disabled = true
    resetButton.disabled = true
    canTakeLapWhilePaused = false
}

startButton.addEventListener("click", startTimer)
stopButton.addEventListener("click", stopTimer)
resetButton.addEventListener("click", resetTimer)
lapButton.addEventListener("click", recordLap)
clearLaps.addEventListener("click", lapCleaner)

timerDisplay.textContent = formatTime(totalMilliseconds)
startButton.disabled = false
stopButton.disabled = true
lapButton.disabled = true
resetButton.disabled = true
clearLaps.disabled = true
canTakeLapWhilePaused = false

startButton.classList.remove("pressed")
stopButton.classList.remove("pressed")