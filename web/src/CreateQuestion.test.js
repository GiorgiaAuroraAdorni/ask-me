import React from 'react';
import CreateQuestion from "./CreateQuestion";

describe('CreateQuestion', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<CreateQuestion/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('triggers login event', () => {
        const title = "Questo è il titolo della domanda?";
        const body = "Si. E questo è il corpo della domanda.";

        const handleLogin = sinon.spy();
        const wrapper = shallow(<CreateQuestion onCreate={handleLogin}/>);

        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'title', value: title}});
        wrapper.find('textarea').simulate('change', {target: {name: 'body', value: body}});
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });

        expect(handleLogin.withArgs({title, body}).calledOnce).toBe(true);
    });
});
