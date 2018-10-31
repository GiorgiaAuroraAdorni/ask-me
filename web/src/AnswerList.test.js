import React from 'react';
import AnswerList from "./AnswerList";

describe('AnswerList', () => {
    it('renders correctly', () => {
        const answers = [
            {
                id: 1,
                question_id: 1,
                body: 'corpo della risposta',
                user: 'utente',
                _links: {self: 'answers/1'},
                votes: [
                        {
                          "_links": {},
                          "answer_id": 1,
                          "user": "gio",
                          "value": 1
                        },
                        {
                          "_links": {},
                          "answer_id": 1,
                          "user": "fghj",
                          "value": 1
                        }
                ],
                score: 2,
            },
            {
                id: 2,
                question_id: 1,
                body: 'corpo della risposta',
                user: 'utente2',
                _links: {self: 'answers/2'},
                votes: [
                        {
                          "_links": {},
                          "answer_id": 2,
                          "user": "gio",
                          "value": -1
                        },
                        {
                          "_links": {},
                          "answer_id": 2,
                          "user": "fghj",
                          "value": 1
                        }
                ],
                score: 0,
            },
        ];

        const wrapper = shallow(<AnswerList answers={answers} />);
        expect(wrapper).toMatchSnapshot();
    });
});

