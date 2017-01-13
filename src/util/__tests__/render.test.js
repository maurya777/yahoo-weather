/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/

import Component from 'src/components/Component';
import render from 'src/util/render';

class BlankComponent extends Component {
  render() {
    return '';
  }
}

class TestComponent extends Component {
  render() {
    return 'test';
  }
}

describe('render', () => {
  it('should render blank template', () => {
    render(new BlankComponent, document.body);
    expect(document.body.innerHTML).to.be.blank;
  });

  it('should render test template', () => {
    render(new TestComponent, document.body);
    expect(document.body.innerHTML).to.equals('test');
  });

  it('should error on invalid Dom Element', () => {
    expect(render.bind(null, new TestComponent, null)).to.throw('render needs a dom element to render html');
  });

  it('should error on invalid Component', () => {
    expect(render.bind(null, null, document.body)).to.throw('render needs a component to render html');
  });
});
