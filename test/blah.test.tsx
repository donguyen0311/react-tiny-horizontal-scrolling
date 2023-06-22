import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HorizontalScrolling } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const data = [1, 2, 3, 4, 5, 6].map((item, index) => (
      <div
        key={index}
        style={{ width: 400, background: 'red', padding: 20, margin: 10 }}
      >
        {item}
      </div>
    ));
    ReactDOM.render(<HorizontalScrolling data={data} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
