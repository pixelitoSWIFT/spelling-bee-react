const isPangram = (word, requiredLetters) => {
    return new Set(requiredLetters).size === new Set([...word]).size &&
        requiredLetters.every(letter => word.includes(letter))
}


export { isPangram }