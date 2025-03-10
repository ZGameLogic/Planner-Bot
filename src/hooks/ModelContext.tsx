import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {ModelContextType} from '../types/APITypes.ts';

const ModelContext = createContext<ModelContextType>({
  userData: {},
  setUserData: () => {},
  print: () => {},
});

export const ModelProvider = ({ children } : PropsWithChildren) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log('Ben it started');
  }, []);

  function print(){
    console.log('Ben it print');
  }

  return (
    <ModelContext.Provider value={{userData, setUserData, print}}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
