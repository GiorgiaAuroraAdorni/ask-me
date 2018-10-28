import React from 'react';
import Question from "./Question";

describe('Question', () => {
    it('renders correctly', () => {
        const question = {
            title: 'titolo della domanda',
            body: 'corpo della domanda',
            user: 'utente'
        };

        const wrapper = shallow(<Question {...question} />);
        expect(wrapper).toMatchSnapshot();
    });
});
