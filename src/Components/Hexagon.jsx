const Hexagon = ({ letter, center, hexagonClick, shuffling }) => {


    return (
        <div className="relative w-24">
            <svg viewBox="0 0 128 111.8" xmlns="http://www.w3.org/2000/svg" >
                <polygon onClick={() => { hexagonClick(letter) }} className="active:scale-75 transition-all origin-center hover:cursor-pointer"
                    points="0,55.9 32,0 96,0 128,55.9 96,111.8 32,111.8"
                    fill={center ? "var(--color-bee-yellow)" : "var(--color-gray)"}
                ></polygon>
            </svg>
            <span className={`absolute inset-0 grid place-items-center text-3xl font-bold uppercase pointer-events-none select-none letter ${shuffling ? "disappearing" : "appearing"}`}>{letter}</span>

        </div>
    )
}




export default Hexagon