import {createContext, PropsWithChildren, useContext, useState} from 'react';

export type ModelContextType = {
  serverConnection: boolean,
  setServerConnection: Function,
}

const ModelContext = createContext<ModelContextType>({
  serverConnection: true,
  setServerConnection: () => {},
});

export const ModelProvider = ({ children } : PropsWithChildren) => {
  const [serverConnection, setServerConnection] = useState(true);

  return (
    <ModelContext.Provider value={{serverConnection, setServerConnection}}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
