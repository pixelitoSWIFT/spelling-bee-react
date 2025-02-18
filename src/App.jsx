import { useState, useEffect } from "react"

import { isPangram } from "./Helpers/functions"
import { rankPercentages, rankings } from "./Helpers/data"

import CurrentGuess from "./Components/CurrentGuess"
import Hive from "./Components/Hive"
import Button from "./Components/Button"
import Alert from "./Components/Alert"
import Rankings from "./Components/Rankings"
import RankingPresentation from "./Components/RankingPresentation"
import PointsAlert from "./Components/PointsAlert"

const App = () => {

    const [letters, setLetters] = useState(["r", "a", "t", "n", "j", "o"])
    const [centerLetter, setCenterLetter] = useState("i")
    const [word, setWord] = useState([])
    const [guessedWords, setGuessedWords] = useState([])
    const [score, setScore] = useState(0)
    const [maxScore, setMaxScore] = useState(0)
    const [rankScores, setRankScores] = useState([])
    const [pangrams, setPangrams] = useState(["janitor"])
    const [answers, setAnswers] = useState(["janitor", "anion", "annotation", "anoint", "anti", "aria", "atria", "attain", "attrition", "initiation", "initiator", "into", "intonation", "intro", "iota", "iron", "irritant", "irritation", "jinn", "jinni", "join", "joint", "narration", "nation", "ninja", "nitro", "noir", "nori", "notation", "notion", "onion", "oration", "oratorio", "rain", "raita", "rani", "ratio", "ration", "rioja", "riot", "rotation", "roti", "rotini", "taint", "tannin", "tarnation", "tiara", "tint", "titan", "titration", "tori", "torii", "tortoni", "train", "trait", "traitor", "trattoria", "trio", "triton"])
    const [alert, setAlert] = useState(null)
    const [rankingModal, setRankingModal] = useState(false)
    const [shuffling, setShuffling] = useState(false)
    const [points, setPoints] = useState(0)

    const handleClick = (letter) => {
        handleKeyDown(letter)
    }

    const handleAlert = (alert) => {
        setAlert(alert)
    }

    const handleAlertOff = () => {
        setAlert("")
        setWord([])
    }

    const handleEnter = () => {
        let handleWord = word.join("")
        if (!handleWord) return
        if (!answers.includes(handleWord)) {
            handleAlert("Bad letters")
            return
        }
        if (answers.includes(handleWord)) {
            if (guessedWords.includes(handleWord)) {
                handleAlert("Already found")
                return
            }
            setGuessedWords((previous) => {
                return [...previous, handleWord]
            })
            setWord([])
            setScore((previous) => {
                let points = word.length + (isPangram(word, [...centerLetter, ...letters]) ? 7 : 0)
                setPoints(points)
                return previous + points
            })

            setTimeout(() => {
                setPoints(0)
            }, 2500)
        }
    }

    const handleShuffle = () => {
        if (!shuffling) {
            setShuffling(true)

            const shuffledArray = [...letters]
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
            }

            setTimeout(() => {
                setLetters(shuffledArray)
                setShuffling(false)
            }, 300)


        }
    }

    const handleDelete = () => {
        setWord((previous) => {
            return previous.slice(0, previous.length - 1)
        })
    }


    const pressedKeys = new Set()

    const handleKeyDown = (event) => {
        if (alert || points) return
        const key = event.key ? event.key.toLowerCase() : event

        if (key == "enter") {
            handleEnter()
        }

        if (key == "backspace") {
            handleDelete()
        }
        if (key == " ") {
            handleShuffle()
        }

        if (key.length == 1 && (key >= "a" && key <= "z") && !pressedKeys.has(key)) {
            pressedKeys.add(key)
            setWord((previous) => {
                if (previous.length >= 20) {
                    return []
                }
                return [...previous, key]
            })
        }


    }

    const handleKeyUp = (event) => {
        const key = event.key.toLowerCase()
        pressedKeys.delete(key)
    }

    useEffect(() => {
        const newScore = answers.reduce((total, word) => {
            return total + word.length + (isPangram(word, [...centerLetter, ...letters]) ? 7 : 0)
        }, 0)
        setMaxScore(newScore)
    }, [answers])

    useEffect(() => {
        setRankScores(rankPercentages.map(percent => Math.round((percent / 100) * maxScore)))
    }, [maxScore])

    useEffect(() => {
        if (word.length == 20) {
            handleAlert("Too long")
        }
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }

    }, [word, shuffling, alert, points])


    return (
        <div className="">
            <div className="text-4xl font-extrabold border-b border-gray">
                <div className="mx-auto max-w-5xl p-6">
                    Spelling Bee
                </div>
            </div>
            <div className="relative mx-auto max-w-5xl px-2 h-200">
                {rankingModal && <Rankings score={score} scores={rankScores} closeRankings={() => { setRankingModal(false) }}></Rankings>}
                <div className="flex gap-3 h-full">
                    <div className="relative w-1/2 flex flex-col justify-center h-full items-center">
                        <div className="absolute top-40">
                            <Alert alert={alert} setAlert={() => { handleAlertOff() }}></Alert>
                            <PointsAlert points={points} pangram={isPangram(guessedWords[guessedWords.length - 1] || word, [...centerLetter, ...letters])}></PointsAlert>
                        </div>
                        <div className="w-full gap-3 flex flex-col justify-center">
                            <CurrentGuess shake={alert} letters={letters} center={centerLetter} word={word} ></CurrentGuess>
                            <Hive letters={letters} center={centerLetter} hexagonClick={handleClick} shuffling={shuffling} ></Hive>
                            <div className="flex justify-center gap-4">
                                <Button handleClick={() => { handleDelete() }}>Delete</Button>
                                <Button width handleClick={() => { handleShuffle() }}><img className="h-7" src="/shuffle.svg" /></Button>
                                <Button handleClick={() => { handleEnter() }}>Enter</Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full">
                        <RankingPresentation score={score} maxScore={maxScore} scores={rankScores} click={() => { setRankingModal(true) }}></RankingPresentation>
                        <div className="border border-gray px-4 py-3 rounded-md min-h-[700px]">
                            <div className="">
                                You have found {guessedWords.length} {guessedWords.length == 1 ? "word" : "words"}
                            </div>
                            <div className="mt-5">
                                {guessedWords.map((guessedWord, guessedWordIndex) => (
                                    <div key={guessedWordIndex} className={`w-1/3 border-b border-gray capitalize ${isPangram(guessedWord, [...centerLetter, ...letters]) ? "font-bold" : ""}`}>{guessedWord} {isPangram(guessedWord)}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default App