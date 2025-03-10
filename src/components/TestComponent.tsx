import React, {useEffect} from 'react';
import {useModel} from '../hooks/ModelContext.tsx';

function TestComponent(): React.JSX.Element {
  const {print} = useModel();

  useEffect(() => {
    print();
  }, []);

  return <></>;
}

export default TestComponent;
