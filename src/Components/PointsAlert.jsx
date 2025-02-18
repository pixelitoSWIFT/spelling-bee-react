import { useEffect, useState } from "react"

const PointsAlert = ({ points, pangram }) => {
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        if (points) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [points])

    return (
        <div className={`flex items-center gap-3 transition-opacity ${visible ? "opacity-100" : "opacity-0"} `}>
            <div className={`px-3 py-1 text-center text-sm  border-gray border rounded-sm transition-opacity duration-500 ${pangram ? "bg-bee-yellow" : "bg-white"}`}>
                {pangram ? "Pangram!" : "Nice!"}
            </div>
            <div className="">
                {"+ " + points}
            </div>
        </div>
    )
}

export default PointsAlert
