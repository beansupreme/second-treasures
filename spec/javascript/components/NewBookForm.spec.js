import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow} from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NewBookForm from 'components/NewBookForm';

describe('<NewBookForm />', () => { 
  let mock = new MockAdapter(axios);
  const newBookResponse = {
    id: 14,
    title: 'By Gaslight',
    author: 'Steven Price',
    price: 12.32,
    isbn: '978-0060850666'
  }
  beforeEach(() =>{

    mock.onPost('/api/v1/books').reply(200, 
      newBookResponse
    );
  })
  it('calls to the books create endpoint with the current state', () => {
    sinon.spy(axios, 'post');

    const wrapper = mount(<NewBookForm />);

    wrapper.setState({
      title: 'By Gaslight',
      author: 'Steven Price',
      price: 12.32,
      isbn: '978-0060850666'
    });

    wrapper.find('#new-book-form').first().simulate('submit');

    expect(axios.post.calledOnce).toEqual(true);

    let expectedPostBody = {
      book: {
        title: 'By Gaslight',
        author: 'Steven Price',
        price: 12.32,
        isbn: '978-0060850666'
      } 
    };

    let postData = axios.post.getCall(0).args;
    
    expect(postData[0]).toEqual('/api/v1/books');
    expect(postData[1]).toEqual(expectedPostBody);

    expect(axios.post.calledOnce).toEqual(true);

    let getData = axios.post.getCall(0).args;


    axios.post.restore();
  });

  it('updates state when the inputs are changed', () => {
    const wrapper = mount(<NewBookForm />);

    updateInput(wrapper, 'book_title_field', 'The Game');
    updateInput(wrapper, 'book_author_field', 'Ken Dryden');
    updateInput(wrapper, 'book_price_field', '22.78');
    updateInput(wrapper, 'book_isbn_field', '978-29292929');


    let state = wrapper.state();
    const expectedState = {
      title: 'The Game',
      author: 'Ken Dryden',
      price: '22.78',
      isbn: '978-29292929',
      errors: []
    }
    expect(state).toEqual(expectedState)
  });

  it('resets state after a book is created', (done) => {
    const wrapper = mount(<NewBookForm />);

    wrapper.setState({
      title: 'By Gaslight',
      author: 'Steven Price',
      price: 12.32,
      isbn: '978-0060850666'
    });

    wrapper.find('#new-book-form').first().simulate('submit');
    

    setTimeout(() => {
      expect(wrapper.state()).toEqual({
        title: '',
        author: '',
        price: 0,
        isbn: '',
        errors: []
      });
      done()
    }, 0);
  });

  xit('calls the onNewBookAdd callback when a new book is submitted', (done) => {
    let handleNewBookAdd = sinon.spy();

    const wrapper = mount(<NewBookForm onNewBookAdd={handleNewBookAdd}/>);

    wrapper.setState({
      title: 'By Gaslight',
      author: 'Steven Price',
      price: 12.32,
      isbn: '978-0060850666'
    });

    wrapper.find('#new-book-form').first().simulate('submit');

    setTimeout(() => {
      expect(handleNewBookAdd.called).toEqual(true)

      expect(handleNewBookAdd.calledWith({title: 'By Gaslight'})).toEqual(true)
      done();
    }, 0);
  });

});

function updateInput(wrapper, inputId, value) {
  let input = wrapper.find('#' + inputId).first();
  input.simulate('change', { target: { id: inputId, value: value }});
}