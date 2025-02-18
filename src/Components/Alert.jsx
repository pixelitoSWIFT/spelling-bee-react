import { useEffect, useState } from "react"

const Alert = ({ alert, setAlert }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (alert) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
                setTimeout(() => setAlert(""), 500)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [alert, setAlert])

    return (
        <div className={`px-3 py-1 text-center text-sm font-thin bg-zinc-900 rounded-sm text-white transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
            {alert}
        </div>
    )
}

export default Alert
