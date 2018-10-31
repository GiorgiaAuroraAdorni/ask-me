import React from 'react';
import Answer from "./Answer";

describe('Answer', () => {
    it('renders correctly', () => {
        const answer = {
            body: 'corpo della risposta',
            user: 'utente'
        };

        const wrapper = shallow(<Answer {...answer} />);
        expect(wrapper).toMatchSnapshot();
    });
});
