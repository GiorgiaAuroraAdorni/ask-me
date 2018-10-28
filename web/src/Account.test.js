import React from 'react';
import Account from "./Account";

it('renders correctly', () => {
  let tree;

  tree = shallow(<Account currentUser="Giorgia" />);
  expect(tree).toMatchSnapshot();

  tree = shallow(<Account currentUser={null} />);
  expect(tree).toMatchSnapshot();
});
