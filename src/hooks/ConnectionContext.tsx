import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { healthCheck } from '../services/Bot Service.ts';

export type ConnectionContextType = {
  serverConnection: boolean | undefined,
}

const ConnectionContext = createContext<ConnectionContextType>({
  serverConnection: undefined,
});

export const ConnectionProvider = ({ children } : PropsWithChildren) => {
  const [serverConnection, setServerConnection] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    healthCheck()
      .then(() => setServerConnection(true))
      .catch(() => setServerConnection(false));
  }, []);

  return (
    <ConnectionContext.Provider value={{ serverConnection }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  return useContext(ConnectionContext);
};
