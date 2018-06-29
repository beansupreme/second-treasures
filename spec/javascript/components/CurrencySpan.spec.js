import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow} from 'enzyme';
import CurrencySpan from 'components/CurrencySpan'

describe('<CurrencySpan />', () => {

  it('renders a string as expected', () => {
    const tree = renderer.create(<CurrencySpan number={"10.00"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a number as expected', () => {
    const tree = renderer.create(<CurrencySpan number={10.00} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can format a string into currency', () => {
    const wrapper = mount(<CurrencySpan number={"10.55"} />);
    expect(wrapper).toHaveHTML('<span>$10.55</span>')
  });

  it('can format a string with one decimal into currency', () => {
    const wrapper = mount(<CurrencySpan number={"10.0"} />);
    expect(wrapper).toHaveHTML('<span>$10.00</span>')
  });

  it('can format a number into currency', () => {
    const wrapper = mount(<CurrencySpan number={10.00} />);
    expect(wrapper).toHaveHTML('<span>$10.00</span>')
  });

  it('can handle an empty string', () => {
    const wrapper = mount(<CurrencySpan number={''} />);
    expect(wrapper).toHaveHTML('<span>$</span>')
  });
});