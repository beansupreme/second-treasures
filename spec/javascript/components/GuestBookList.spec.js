import React from 'react';
import renderer from 'react-test-renderer';
import GuestBookList from 'components/GuestBookList';

describe('<GuestBookList />', () => {
  it('renders as expected', () => {
    const tree = renderer.create(<GuestBookList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});