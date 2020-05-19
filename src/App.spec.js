import React from 'react';
import { shallow } from 'enzyme';
import App, {initializeAnalytics} from './App';


describe('initializeAnalytics', () => {
  it('should render correctly', () => {
    const component = shallow(<initializeAnalytics />);
  
    expect(component).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const component = shallow(<App />);
  
    expect(component).toMatchSnapshot();
  });

  



});