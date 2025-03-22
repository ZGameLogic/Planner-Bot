import {createContext, PropsWithChildren, useContext} from 'react';

export type ModelContextType = {}

const ModelContext = createContext<ModelContextType>({});

export const ModelProvider = ({ children } : PropsWithChildren) => {

  return (
    <ModelContext.Provider value={{}}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
