import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow} from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RecommendedBookTable from 'components/RecommendedBookTable';
import NewBookForm from 'components/NewBookForm';

describe('<RecommendedBookTable />', () => {
  let mock = new MockAdapter(axios);

  const booksResponse = [
    {
      id: 5,
      isbn: '978-1552453056',
      title: 'Fifteen Dogs',
      author: 'Andre Alexis',
      genre: 'Fiction',
      price: '17.95',
      createdAt: "2018-06-25T14:44:31.990Z",
      updatedAt: "2018-06-25T14:44:31.990Z"
    },
    {
      id: 6,
      isbn: '978-330020242',
      title: 'Vimy Ridge',
      author: 'Alexander McKee',
      genre: 'War novel',
      price: '1.50',
      createdAt: "2018-06-25T14:44:31.990Z",
      updatedAt: "2018-06-25T14:44:31.990Z"
    },
    {
      id: 7,
      isbn: '978-0060850524',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Dystopian Fiction',
      price: '16.31',
      createdAt: "2018-06-25T14:44:31.990Z",
      updatedAt: "2018-06-25T14:44:31.990Z"
    }
  ];

  beforeEach(function() {
    mock.onGet('/api/v1/books').reply(200, 
      booksResponse
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(<RecommendedBookTable />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls to the books index endpoint on render', () => {
    sinon.spy(axios, 'get');

    const wrapper = mount(<RecommendedBookTable />);


    expect(axios.get.calledOnce).toEqual(true);

    let getData = axios.get.getCall(0).args;
    
    expect(getData[0]).toEqual('/api/v1/books');


    axios.get.restore();

  });

  xit('calls to the books delete endpoint when a row is clicked', (done) => {
    sinon.spy(axios, 'delete');

    const wrapper = mount(<RecommendedBookTable />);

    setTimeout(() => {
      let list = wrapper.find('#recommended-book-table');
      console.log(list.html())
      let firstDeleteButton = wrapper.find('#delete-book-button-5');
      console.log(firstDeleteButton)
      expect(firstDeleteButton).toHaveText('Delete');

      expect(axios.delete.calledOnce).toEqual(true);

      let getData = axios.delete.getCall(0).args;
      
      expect(getData[0]).toEqual('/api/v1/books/5');


      axios.delete.restore();
      done()
    }, 0);

  });

  it('renders the books from the get books endpoint on the page', (done) => {
    const wrapper = mount(<RecommendedBookTable />);

    setTimeout(() => {
      expect(wrapper.state('books')).toEqual(booksResponse);

      let list = wrapper.find('#recommended-book-table');
      expect(list).toIncludeText('Vimy Ridge');
      expect(list).toIncludeText('Alexander McKee');
      expect(list).toIncludeText('$17.95');
      expect(list).toIncludeText('978-1552453056');
      expect(list).toIncludeText('War novel');


      expect(list).toIncludeText('Fifteen Dogs');
      expect(list).toIncludeText('Andre Alexis');

      expect(wrapper.find('#recommended-book-table-errors').first()).toHaveHTML('<div></div>');
      
      done()
    }, 0);
  });

  it('renders errors on the page if the get books call fails', (done) => {
    mock.onGet('/api/v1/books').reply(500, 
      "Beep Boop Server error."
    );

    const wrapper = mount(<RecommendedBookTable />);

    

    setTimeout(() => {
      expect(wrapper.find('#recommended-book-table-errors').first()).toIncludeText("Something went wrong... Books are not available at this time.");
      expect(wrapper.find('#recommended-book-table-message').first()).toHaveHTML('<div></div>');
      
      done();
    }, 0);

    mock.restore();
  });

  it('renders a NewBookForm', () => {
    const wrapper = shallow(<RecommendedBookTable />);

    expect(wrapper.find(NewBookForm)).toHaveLength(1)
  });

});