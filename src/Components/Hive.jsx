import Hexagon from "./Hexagon"

const Hive = ({ letters, center, hexagonClick, shuffling }) => {



    return (
        <div className="flex justify-center">
            <div className="mt-[48px] space-y-[8px]">
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} letter={letters[0]} shuffling={shuffling} />
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} letter={letters[1]} shuffling={shuffling} />
            </div>

            <div className="ml-[-16px] space-y-[8px]">
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} letter={letters[2]} shuffling={shuffling} />
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} center letter={center}/>
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} letter={letters[3]} shuffling={shuffling} />
            </div>

            <div className="mt-[48px] ml-[-16px] space-y-[8px]">
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} letter={letters[4]} shuffling={shuffling} />
                <Hexagon hexagonClick={(letter) => hexagonClick(letter)} letter={letters[5]} shuffling={shuffling} />
            </div>
        </div>
    )
}

export default Hive