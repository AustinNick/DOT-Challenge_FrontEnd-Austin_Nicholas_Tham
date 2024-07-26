import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategory } from "./../apis/questionAPI"
import { Category } from "./../types/question"
import { useAuthContext } from "./../context/authContext"

const HomePage = () => {
    const [amount, setAmount] = useState<string>("10")
    const [category, setCategory] = useState<string>("any")
    const [listCategory, setListCategory] = useState<Category[]>([])
    const [difficulty, setDifficulty] = useState<string>("any")
    const [error, setError] = useState<string>("")

    const { user, startQuiz } = useAuthContext()

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await getCategory()
            setListCategory(data)
        }

        fetchCategory()
    }, [])

    const handleQuestion = () => {
        if (parseInt(amount) < 1) {
            setError("Number of question must be at least 1")
        }

        startQuiz()
    }

    return (
        <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Welcome, {user?.username}!
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="number_of_question"
                    >
                        Number of Question
                    </label>
                    <input
                        type="string"
                        inputMode="numeric"
                        id="number_of_question"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="any">Any Category</option>
                        {listCategory.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="difficulty"
                    >
                        Difficulty
                    </label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="any">Any Category</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        onClick={handleQuestion}
                        to={"/quiz"}
                        state={{
                            amount,
                            category,
                            difficulty
                        }}
                        className="bg-green-500 hover:bg-green-600 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none w-full focus:shadow-outline"
                    >
                        Start Quiz
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
