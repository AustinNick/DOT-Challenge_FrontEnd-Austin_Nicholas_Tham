import React, { useState, useEffect } from 'react'

interface TimerProps {
    duration: number
    onTimeUp: () => void
    onChange?: () => void
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, onChange }) => {
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1)
            if (onChange) onChange()
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, onTimeUp, onChange])

    return (
        <div>
            <h2 className='text-xl m-4 text-red-500'>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h2>
        </div>
    )
}

export default Timer
