import React from 'react';
import CreateAnswer from "./CreateAnswer";

describe('CreateAnswer', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<CreateAnswer/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('triggers login event', () => {
        const body = "Questa è una risposta.";

        const handleLogin = sinon.spy();
        const wrapper = shallow(<CreateAnswer onCreate={handleLogin}/>);

        wrapper.find('textarea').simulate('change', {target: {name: 'body', value: body}});
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });

        expect(handleLogin.withArgs({body}).calledOnce).toBe(true);
    });
});
