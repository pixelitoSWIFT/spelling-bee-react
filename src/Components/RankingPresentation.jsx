import { rankings } from "../Helpers/data"

const RankingPresentation = ({ click, score, maxScore, scores }) => {


    return (
        <div onClick={click} className="h-11 my-2 flex items-center hover:cursor-pointer">
            <div className="font-bold text-sm min-w-24">{score >= maxScore ? rankings[rankings.length - 1] : rankings[(scores.findIndex((element) => element > score) - 1)]}</div>
            <div className="w-full flex justify-between">
                {rankings.map((rank, rankIndex) => {
                    const currentThreshold = scores[rankIndex]
                    const nextThreshold = scores[rankIndex + 1]
                    const highestScore = scores[rankings.length - 1]
                    if ((score >= currentThreshold && score < nextThreshold) || (score >= highestScore && nextThreshold == null)) {
                        return (
                            <div key={rankIndex} className="h-[30px] w-[30px] relative z-10 bg-bee-yellow rounded-full grid place-content-center text-xs">
                                {score}
                            </div>
                        )
                    } else if (nextThreshold == null || score < nextThreshold) {
                        return (
                            <div key={rankIndex} className="relative w-[30px] flex justify-center items-center">
                                <div className={`h-[10px] w-[10px] bg-gray ${nextThreshold == null ? "" : "rounded-full"}`}></div>
                                <div className="w-10 h-[2px] absolute -left-7 bg-gray"></div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={rankIndex} className="relative w-[30px] flex justify-center items-center text-zinc-300">
                                <div className="h-[9px] w-[9px] z-10 rounded-full bg-bee-yellow"></div>
                                <div className="w-11 h-[2px] absolute left-4 bg-gray"></div>

                            </div>
                        )
                    }

                })}
            </div>
        </div>
    )
}


export default RankingPresentation