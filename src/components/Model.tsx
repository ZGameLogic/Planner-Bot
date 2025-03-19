import React, {PropsWithChildren} from 'react';
import {AuthProvider} from '../hooks/AuthContext.tsx';
import {ModelProvider} from '../hooks/ModelContext.tsx';

function Model({ children }: PropsWithChildren): React.JSX.Element {
  return <ModelProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ModelProvider>;
}

export default Model;
