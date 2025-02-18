import { useState } from "react"
import { rankings } from "../Helpers/data"

const Rankings = ({ score, scores, closeRankings }) => {

    const [closing, setClosing] = useState(false)

    const close = () => {
        if (!closing) {
            setClosing(true)
        }
        setTimeout(() => {
            setClosing(false)
            closeRankings()
        }, 400);
    }

    return (
        <div onClick={(e) => e.target === e.currentTarget && close()} className={`fixed inset-0 flex items-center justify-center z-40 bg-black/5 ${closing ? "disappearing" : "appearing"}`}>
            <div className="absolute w-170 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg shadow-lg">
                <div className="">
                    <div className="flex justify-end">
                        <div onClick={() => { close() }} className="hover:cursor-pointer">
                            <img className="h-4" src="/close.svg" />
                        </div>
                    </div>
                    <div className="font-extrabold text-3xl mb-3">Rankings</div>
                    <div>Ranks are based on a percentage of possible points in a puzzle.</div>
                    <div className="flex justify-between mt-5 mx-4">
                        <div className="ml-8 text-xs font-bold">Rank</div>
                        <div className="text-xs font-bold"> Minimum score</div>
                    </div>
                    <div className="text-sm">
                        {rankings.slice().reverse().map((rank, rankIndex) => {
                            const index = rankings.length - rankIndex - 1
                            const currentThreshold = scores[index]
                            const nextThreshold = scores[index + 1]
                            const highestScore = scores[rankings.length - 1]
                            if ((score >= currentThreshold && score < nextThreshold) || (score >= highestScore && nextThreshold == null)) {
                                return (

                                    <div key={rankIndex} className="flex z-50 relative bg-bee-yellow rounded-full h-12 justify-between items-center my-3 ">
                                        <div className="w-6 ml-3 grid place-content-center font-bold">{score}</div>
                                        <div className="">
                                            <div className="ml-2 mr-5 font-bold">{rank}</div>
                                            {nextThreshold &&
                                                <div className="text-xs ml-2">{nextThreshold - score} {nextThreshold - score > 1 ? "points" : "point"} to next rank, {highestScore - score} to Genius</div>}
                                        </div>
                                        <div className="flex-grow"></div>
                                        <div className="mr-4">{currentThreshold}</div>
                                    </div>
                                )
                            } else if (nextThreshold == null || score < nextThreshold) {
                                return (

                                    <div key={rankIndex} className="mx-4 relative flex justify-between items-center my-3">
                                        <div className={`h-[10px] w-[10px] mr-5 bg-gray ${nextThreshold == null ? "" : "rounded-full"}`}></div>
                                        <div className="w-[2px] h-7 absolute top-3 left-[4px] bg-gray"></div>
                                        <div className="mr-5">{rank}</div>
                                        <div className="flex-grow bg-gray h-[1px]"></div>
                                        <div className="ml-5">{currentThreshold}</div>
                                    </div>
                                )
                            } else {
                                return (

                                    <div key={rankIndex} className="mx-4 relative flex justify-between items-center my-3 text-zinc-300">
                                        <div className="h-[9px] w-[9px] mr-5 rounded-full bg-bee-yellow"></div>
                                        <div className="w-[2px] h-7 absolute bottom-3 left-[4px] bg-bee-yellow"></div>
                                        <div className="mr-5">{rank}</div>
                                        <div className="flex-grow bg-gray h-[1px]"></div>
                                        <div className="ml-5">{currentThreshold}</div>
                                    </div>
                                )
                            }



                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}



export default Rankings