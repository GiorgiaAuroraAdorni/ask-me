import React from 'react';
import QuestionList from "./QuestionList";

describe('QuestionList', () => {
    it('renders correctly', () => {
        const questions = [
            {
                id: 1,
                title: 'titolo della domanda',
                body: 'corpo della domanda',
                user: 'utente',
                _links: {self: 'questions/1'}
            },
            {
                id: 2,
                title: 'titolo di un\'altra domanda',
                body: 'corpo di un\'altra domanda',
                user: 'anonimo',
                _links: {self: 'questions/2'}
            },
            {
                id: 3,
                title: 'un titolo',
                body: 'un po di testo',
                user: 'qualcuno',
                _links: {self: 'questions/3'}
            },
        ];

        const wrapper = shallow(<QuestionList questions={questions} />);
        expect(wrapper).toMatchSnapshot();
    });
});
