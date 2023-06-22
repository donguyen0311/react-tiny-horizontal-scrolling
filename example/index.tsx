import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HorizontalScrolling } from '../.';

const App = () => {
  return (
    <div>
      <HorizontalScrolling
        data={[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} style={{ width: 400, background: 'red', padding: 20, margin: 10 }}>{item}</div>
        ))}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
