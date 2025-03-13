import React from 'react';

import Model from './src/components/Model.tsx';
import Main from './src/components/Main.tsx';

function App(): React.JSX.Element {
  return (
    <Model>
      <Main/>
    </Model>
  );
}

export default App;
