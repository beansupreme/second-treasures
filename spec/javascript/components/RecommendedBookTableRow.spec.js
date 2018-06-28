import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import RecommendedBookTableRow from 'components/RecommendedBookTableRow';

describe('<RecommendedBookTableRow />', () => {
  let book = {
    id: 6,
    isbn: '978-330020242',
    title: 'Vimy Ridge',
    author: 'Alexander McKee',
    genre: 'War novel',
    price: '1.50',
    createdAt: "2018-06-25T14:44:31.990Z",
    updatedAt: "2018-06-25T14:44:31.990Z"
  }

  it('renders as expected', () => {

    const tree = renderer.create(<RecommendedBookTableRow book={book} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  
  it('Starts out in a non-edit state', () => {
    const wrapper = mount(<RecommendedBookTableRow book={book} />);

    expect(wrapper.state('editMode')).toEqual(false);
  });

  

  describe('when editMode is false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<RecommendedBookTableRow book={book} />);
      wrapper.setState({editMode: false})
    });

    it('renders read-only table data', () => {
      let tableData = wrapper.find('td');

      expect(tableData.at(0)).toHaveHTML('<td>Vimy Ridge</td>')
      expect(tableData.at(1)).toHaveHTML('<td>Alexander McKee</td>')
      expect(tableData.at(2)).toHaveHTML('<td><span>$1.50</span></td>')
      expect(tableData.at(3)).toHaveHTML('<td>978-330020242</td>')
      expect(tableData.at(4)).toHaveHTML('<td>War novel</td>')
    });

    it('switches to an editable state when edit is clicked', () => {
      wrapper.find('.edit-book').first().simulate('click');

      expect(wrapper.state('editMode')).toEqual(true);
    });

  });

  describe('when editMode is true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<RecommendedBookTableRow book={book} />);
      wrapper.setState({editMode: true})
    });


    it('renders edtiable inputs filled in with the book prop values', () => {
      let tableData = wrapper.find('td');
      
      expect(tableData.at(0).find('input')).toHaveValue('Vimy Ridge')
      expect(tableData.at(1).find('input')).toHaveValue('Alexander McKee')
      expect(tableData.at(2).find('input')).toHaveValue('1.50')
      expect(tableData.at(3).find('input')).toHaveValue('978-330020242')
      expect(tableData.at(4).find('input')).toHaveValue('War novel')
      
    });

    it('renders a save button', () => {
      expect(wrapper.find('.save-book')).toHaveHTML('<button class="btn btn-success save-book">Save</button>')
    });
  })
});