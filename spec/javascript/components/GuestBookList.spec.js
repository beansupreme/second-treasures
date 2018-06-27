import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import GuestBookList from 'components/GuestBookList';

describe('<GuestBookList />', () => {
  let mock = new MockAdapter(axios);

  const booksResponse = [
    {
      id: 5,
      isbn: '978-1552453056',
      title: 'Fifteen Dogs',
      author: 'Andre Alexis',
      price: '17.95',
      createdAt: "2018-06-25T14:44:31.990Z",
      updatedAt: "2018-06-25T14:44:31.990Z"
    },
    {
      id: 6,
      isbn: '978-330020242',
      title: 'Vimy Ridge',
      author: 'Alexander McKee',
      price: '1.50',
      createdAt: "2018-06-25T14:44:31.990Z",
      updatedAt: "2018-06-25T14:44:31.990Z"
    },
    {
      id: 7,
      isbn: '978-0060850524',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      price: '16.31',
      createdAt: "2018-06-25T14:44:31.990Z",
      updatedAt: "2018-06-25T14:44:31.990Z"
    }
  ];
  beforeEach(function() {
    mock.onGet('/api/v1/books').reply(200, 
      booksResponse
    );
  })


  it('renders as expected', () => {
    const tree = renderer.create(<GuestBookList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls to the books index endpoint on render', () => {
    sinon.spy(axios, 'get');

    const wrapper = mount(<GuestBookList />);


    expect(axios.get.calledOnce).toEqual(true);

    let getData = axios.get.getCall(0).args;
    
    expect(getData[0]).toEqual('/api/v1/books');


    axios.get.restore();

  });

  it('renders the books from the get books endpoint on the page', (done) => {
    const wrapper = mount(<GuestBookList />);

    setTimeout(() => {
      expect(wrapper.state('books')).toEqual(booksResponse);

      let list = wrapper.find('#recommended-book-list');
      expect(list).toIncludeText('Vimy Ridge');
      expect(list).toIncludeText('Alexander McKee');
      expect(list).toIncludeText('Fifteen Dogs');
      expect(list).toIncludeText('Andre Alexis');
      
      done()
    }, 0);
  });
});