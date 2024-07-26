import axiosInstance from '../config/axiosConfig'

export interface getQuestionProps {
    amount?: string
    category?: string
    difficulty?: string
    token?: string
}

const getSessionToken = async () => {
    try {
        const response = await axiosInstance.get('/api_token.php?command=request')
        
        return response.data.token
    } catch (error) {
        console.error(error)
    }
}

const getCategory = async () => {
    try {
        const response = await axiosInstance.get('/api_category.php')
        
        return response.data.trivia_categories
    } catch (error) {
        console.error(error)
    }
}

const getQuestions = async ( amount: string, category: string, difficulty: string) => {
    try {
        const token = localStorage.getItem('token')
        const params: getQuestionProps = { amount }

        if (category !== "any" && category != '') {
            params.category = category
        }

        if (difficulty !== "any" && difficulty != '') {
            params.difficulty = difficulty
        }

        if (!token) {
            const sessionToken = await getSessionToken()
            localStorage.setItem('token', sessionToken)
            params.token = sessionToken
        } else {
            params.token = token
        }

        const response = await axiosInstance.get(`/api.php`, { params })
        
        return response.data.results
    } catch (error) {
        console.error(error)
    }
}

export {
    getQuestions,
    getCategory,
    getSessionToken
}