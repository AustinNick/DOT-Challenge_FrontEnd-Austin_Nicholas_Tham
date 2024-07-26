import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getQuestions } from "./../apis/questionAPI"
import Timer from "./../components/common/Timer"
import { Question } from "./../types/question"
import { useAuthContext } from "./../context/authContext"

interface QuizPageProps {
    isContinue?: boolean
    amount?: string
    category?: string
    difficulty?: string
}

const QuizPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { finishQuiz } = useAuthContext()

    const {
        amount = "10",
        category = "",
        difficulty = ""
    } = (location.state as QuizPageProps) || {}

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [timer, setTimer] = useState(0)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await getQuestions(
                    amount || "10",
                    category || "",
                    difficulty || ""
                )

                setQuestions(fetchedQuestions)
                setTimer(fetchedQuestions.length * 30)
                setLoading(false)
            } catch (err) {
                setError("Failed to fetch questions")
                setLoading(false)
            }
        }
        const savedState = localStorage.getItem("quizState")

        if (savedState) {
            const parsedState = JSON.parse(savedState)

            if (
                parsedState &&
                parsedState.questions &&
                parsedState.questions.length !== 0
            ) {
                setQuestions(parsedState.questions)
                setCurrentQuestionIndex(parsedState.currentQuestionIndex)
                setCorrectAnswers(parsedState.correctAnswers)
                setWrongAnswers(parsedState.wrongAnswers)
                setTimer(parsedState.timer)

                setLoading(false)
            } else {
                fetchQuestions()
            }
        } else {
            fetchQuestions()
        }
    }, [amount, category, difficulty])

    useEffect(() => {
        if (questions?.length > 0) {
            localStorage.setItem(
                "quizState",
                JSON.stringify({
                    questions,
                    currentQuestionIndex,
                    correctAnswers,
                    wrongAnswers,
                    timer
                })
            )
        }
    }, [questions, currentQuestionIndex, correctAnswers, wrongAnswers, timer])

    const handleAnswer = (answer: string) => {
        if (questions[currentQuestionIndex]?.correct_answer === answer) {
            setCorrectAnswers(correctAnswers + 1)
        } else {
            setWrongAnswers(wrongAnswers + 1)
        }

        if (currentQuestionIndex < questions?.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            setQuizCompleted(true)
            localStorage.removeItem("quizState")
        }
    }

    const handleTimeUp = () => {
        setQuizCompleted(true)
        localStorage.removeItem("quizState")
    }

    const handleTimerChange = () => {
        setTimer(timer - 1)
    }

    useEffect(() => {
        if (quizCompleted) {
            localStorage.removeItem("quizState")
            finishQuiz()

            navigate("/results", {
                state: {
                    correctAnswers,
                    wrongAnswers,
                    totalQuestions: questions?.length
                }
            })
        }
    }, [
        quizCompleted,
        correctAnswers,
        wrongAnswers,
        questions?.length,
        navigate,
        finishQuiz
    ])

    if (loading) return <div className="text-center mt-10">Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <Timer
                duration={timer}
                onChange={handleTimerChange}
                onTimeUp={handleTimeUp}
            />
            <div className="flex flex-col gap-4 justify-center items-center text-center">
                <h2 className="text-2xl">
                    Question {currentQuestionIndex + 1} of {questions?.length}
                </h2>
                <p
                    className="text-xl"
                    dangerouslySetInnerHTML={{
                        __html: questions[currentQuestionIndex]?.question
                    }}
                ></p>
                <div className="flex flex-row">
                    {questions[currentQuestionIndex]?.incorrect_answers
                        ?.concat(
                            questions[currentQuestionIndex]?.correct_answer
                        )
                        .sort()
                        .map((answer, index) => (
                            <button
                                className="border border-2 border-black text-xl rounded-md py-1.5 px-3 mx-1 hover:bg-blue-500 transition hover:text-white"
                                key={index}
                                onClick={() => handleAnswer(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default QuizPage
