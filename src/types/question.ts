export type Category = {
    id: number
    name: string
}

export type QuestionRequest = {
    amount: string
    category: string
    difficulty: string
}

export type Question = {
    type: string
    category: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}
