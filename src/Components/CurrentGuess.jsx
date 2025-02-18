import { useState, useEffect } from "react"

const CurrentGuess = ({ letters, center, word, shake }) => {
    const [hasBeenFilled, setHasBeenFilled] = useState(false);
    const [wasEmptyInitially, setWasEmptyInitially] = useState(word.length === 0);


    useEffect(() => {
        if (word.length > 0) {
            if (wasEmptyInitially) {
                setHasBeenFilled(true)
                setWasEmptyInitially(false)
            }
        } else if (hasBeenFilled) {
            setHasBeenFilled(true)
        }
    }, [word, hasBeenFilled, wasEmptyInitially])

    if (!hasBeenFilled) {
        return (
            <div className="flex justify-center">
                <div className="current-guess text-gray-darker text-3xl h-10 inline-block whitespace-nowrap w-min">Type or click</div>
            </div>
        )
    }

    return (
        <div className="flex justify-center">
            <div className={`flex w-min justify-center h-10 ${shake ? "shake" : ""}`}>
                <div className="current-guess after:-right-[2px] w-min">
                    {word.map((letter, letterIndex) => {
                        const color = letter === center
                            ? "text-bee-yellow"
                            : letters.includes(letter)
                                ? ""
                                : "text-gray-mid"

                        const fontSize = word.length >= 18
                            ? "text-xl"
                            : word.length >= 15
                                ? "text-2xl"
                                : "text-3xl"

                        return (
                            <span key={letterIndex} className={`${color} font-bold ${fontSize} uppercase`}>{letter}</span>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default CurrentGuess
