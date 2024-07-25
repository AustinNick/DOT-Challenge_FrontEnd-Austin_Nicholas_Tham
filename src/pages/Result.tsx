import { Link, useLocation } from 'react-router-dom'

const ResultPage = () => {
    const location = useLocation()
    const { correctAnswers, wrongAnswers, totalQuestions } = location.state

    return (
        <div className='flex flex-col text-2xl gap-4 mt-16 justify-center items-center'>
            <h2 className='font-bold text-4xl mb-6'>Quiz Results</h2>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Wrong Answers: {wrongAnswers}</p>
            <p>Total Questions: {totalQuestions}</p>
            <Link className='border border-2 border-black py-1.5 px-3 rounded-lg bg-blue-500 text-white mt-6 hover:bg-blue-600 transition-all' to={'/home'}>Back to Home</Link>
        </div>
    )
}

export default ResultPage
