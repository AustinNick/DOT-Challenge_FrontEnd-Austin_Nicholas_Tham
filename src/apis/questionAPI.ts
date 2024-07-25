import axiosInstance from '../axiosConfig'



const getQuestions = async ({  }) => {
    try {
        const response = await axiosInstance.get('/customer', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

export {
    getQuestions
}