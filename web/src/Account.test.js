import React from 'react';
import Account, { LoginForm } from "./Account";

describe('Account', () => {
  it('renders correctly', () => {
      let wrapper;

      wrapper = shallow(<Account currentUser="Giorgia"/>);
      expect(wrapper).toMatchSnapshot();

      wrapper = shallow(<Account currentUser={null}/>);
      expect(wrapper).toMatchSnapshot();
  });
});

describe('LoginForm', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers login event', () => {
    const username = "Giorgia";

    const handleLogin = sinon.spy();
    const wrapper = shallow(<LoginForm onLogin={handleLogin} />);

    wrapper.find('input[type="text"]').simulate('change', {target: {value: username}});
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});

    expect(handleLogin.withArgs(username).calledOnce).toBe(true);
  });
});