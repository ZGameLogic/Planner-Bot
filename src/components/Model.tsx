import React, {PropsWithChildren} from 'react';
import {AuthProvider} from '../hooks/AuthContext.tsx';
import {ConnectionProvider} from '../hooks/ConnectionContext.tsx';
import {ModelProvider} from '../hooks/ModelContext.tsx';

function Model({ children }: PropsWithChildren): React.JSX.Element {
  return <ConnectionProvider>
    <AuthProvider>
      <ModelProvider>
        {children}
      </ModelProvider>
    </AuthProvider>
  </ConnectionProvider>;
}

export default Model;
