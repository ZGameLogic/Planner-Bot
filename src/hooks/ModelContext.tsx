import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext.tsx';
import {getUserEvents} from '../services/Bot Service.ts';

export type ModelContextType = {
  plans: Plan[]
}

const ModelContext = createContext<ModelContextType>({
  plans: []
});

export const ModelProvider = ({ children } : PropsWithChildren) => {
  const { userData, deviceId } = useAuth();
  const [ plans, setPlans ] = useState<Plan[]>([]);

  useEffect(() => {
    if(!userData || !deviceId){
      setPlans([]);
      return;
    }
    getUserEvents(userData.token.access_token, deviceId)
      .then(response => response.json())
      .then(json => {
        setPlans(json);
      });
  }, [userData, deviceId]);


  return (
    <ModelContext.Provider value={{plans}}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
