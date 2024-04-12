const xClass = 'x'
const oClass = 'o'
let xTurn

const quadrado = document.querySelectorAll(".quadrado")
const veia = document.querySelector(".veia")

const gameEndMessage = document.querySelector('[data-game-end-message]')
const gameEndElement = document.querySelector('#fimDeJogoElement')

const restartButton = document.querySelector('#botaoRecomeçar')

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

startGame ()

function startGame() {
    xTurn = true
    veias.classList.add('x')

    quadrado.forEach(quadrado => {
        quadrado.classList.remove(xClass)
        quadrado.classList.remove(oClass)
        veia.classList.replace('o', 'x')


        quadrado.addEventListener('click', handleClick, { once: true })
    })

    restartButton.addEventListener('click', startGame)

    gameEndElement.classList.remove('show')
    document.querySelector('main').classList.remove('end')
}

function handleClick(e) {
    let quadrado = e.target
    let turnClass = xTurn ? xClass : oClass

    placeMark(quadrado, turnClass)

    if (checkWin(turnClass)) {
        endGame(false)
    } else if (checkDraw()) {
        endGame(true)
    }

    swapTurn()
    setBoardHover()
}

function placeMark(quadrado, turnClass) {
    quadrado.classList.add(turnClass)
}

function swapTurn() {
    xTurn = !xTurn
}

function setBoardHover() {
    xTurn ? veia.classList.replace('o', 'x') : veia.classList.replace('x', 'o')
}

function checkWin(turnClass) {
    return lines.some(line => {
        return line.every(index => {
            return cells[index].classList.contains(turnClass)
        })
    })
}

function checkDraw() {
    return [...quadrados].every(quadrado => {
        return quadrado.classList.contains(xClass) || quadrado.classList.contains(oClass)
    })
}

function endGame(draw) {
    if (draw) {
        gameEndMessage.innerText = "Empate!"
    } else {
        gameEndMessage.innerText = `${xTurn ? "X's" : "O's"} venceu!`
    }

    gameEndElement.classList.add('show')
    document.querySelector('main').classList.add('end')
}