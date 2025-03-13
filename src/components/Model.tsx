import React, {PropsWithChildren} from 'react';
import {AuthProvider} from '../hooks/AuthContext.tsx';

function Model({ children }: PropsWithChildren): React.JSX.Element {
  return <AuthProvider>
    {children}
  </AuthProvider>;
}

export default Model;
