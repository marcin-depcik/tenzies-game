import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'

export default function App() {
    const [allDice, setAllDice] = React.useState(makeDiceArray())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = allDice.every((dice) => dice.isHeld)
        const allSameValues = allDice.every((dice) => allDice[0].value === dice.value)
        if (allHeld && allSameValues) {
            setTenzies(true)
        }
    }, [allDice])

    function makeNewDie() {
        const randomNumber = Math.ceil(Math.random() * 6)
        return {
            id: nanoid(),
            value: randomNumber,
            isHeld: false,
        }
    }

    function makeDiceArray() {
        const diceArray = []
        while (diceArray.length < 10) {
            diceArray.push(makeNewDie())
        }
        return diceArray
    }

    const diceBoard = allDice.map((dice) => {
        return (
            <Die
                key={dice.id}
                value={dice.value}
                isHeld={dice.isHeld}
                handleClick={() => holdDice(dice.id)}
            />
        )
    })

    function rollDice() {
        if (tenzies) {
            setTenzies(false)
            setAllDice(makeDiceArray())
        } else {
            setAllDice((prevDice) => {
                return prevDice.map((dice) => {
                    return dice.isHeld ? dice : makeNewDie()
                })
            })
        }
    }

    function holdDice(id) {
        setAllDice((prevDice) => {
            return prevDice.map((dice) => {
                return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
            })
        })
    }

    return (
        <main>
            <header>
                <h1>{tenzies ? 'You won the game!' : 'Tenzies'}</h1>
                <p>
                    Roll until all dice are the same. Click each die to freeze it at its current
                    value between rolls.
                </p>
            </header>
            <div className="dice-board">{diceBoard}</div>
            <button type="button" className="roll-btn" onClick={rollDice}>
                {tenzies ? 'new game' : 'roll'}
            </button>
        </main>
    )
}
