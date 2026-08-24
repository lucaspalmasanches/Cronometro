const timerDisplay = document.getElementById("timer-display")
const startButton = document.getElementById("start-button")
const stopButton = document.getElementById("stop-button")
const resetButton = document.getElementById("reset-button")
const LapButton = document.getElementById("lap-button")
const lapList = document.getElementById("lap-list")

let totalMilliseconds = 0
let intervalId = null
let lapTimes = []

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
    }, 10);
}

const stopTimer = () => {
    clearInterval(intervalId)
    intervalId = null
}

const recordLap = () => {
    if (intervalId === null && totalMilliseconds === 0) {
        console.log("O cronômetro precisa estar rodando para registrar uma volta.")
        return
    }

    const currentLapTime = formatTime(totalMilliseconds)
    lapTimes.push(currentLapTime)

    const listItems = document.createElement("li")
    listItems.textContent = `${currentLapTime}`

    lapList.appendChild(listItems)

    lapList.scrollTop = lapList.scrollHeight
}

const resetTimer = () => {
    stopTimer()
    totalMilliseconds = 0
    timerDisplay.textContent = formatTime(totalMilliseconds)
    lapTimes = []
    lapList.innerHTML = ""
}

startButton.addEventListener("click", startTimer)
stopButton.addEventListener("click", stopTimer)
resetButton.addEventListener("click", resetTimer)
LapButton.addEventListener("click", recordLap)

timerDisplay.textContent = formatTime(totalMilliseconds)