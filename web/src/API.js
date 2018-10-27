import Axios from 'axios';

class API {
    constructor() {
        this.axios = Axios.create({
            baseURL: process.env.REACT_APP_API_URL
        });
    }

    async loadQuestions() {
        const response = await this.axios.get('questions');

        return response.data;
    }

    async createQuestion(question) {
        const response = await this.axios.post('questions', question);

        return response.data;
    }

    async loadQuestion(id) {
        const response = await this.axios.get('questions/' + id);

        return response.data;
    }
}

export default new API();