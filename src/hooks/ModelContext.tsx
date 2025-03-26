import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext.tsx';
import {getDiscordUsers, getUserEvents} from '../services/Bot Service.ts';
import {bodyToJson} from '../helpers/format-helper.ts';

export type ModelContextType = {
  plans: Plan[]
  discordUsers: DiscordUser[]
  getUserById: Function
}

const ModelContext = createContext<ModelContextType>({
  plans: [],
  discordUsers: [],
  getUserById: () => {}
});

export const ModelProvider = ({ children } : PropsWithChildren) => {
  const { userData, deviceId } = useAuth();
  const [ plans, setPlans ] = useState<Plan[]>([]);
  const [ discordUsers, setDiscordUsers ] = useState<DiscordUser[]>([]);

  function getUserById(id: bigint){
    return discordUsers.filter(user => user.id === id)[0];
  }

  useEffect(() => {
    if(!userData || !deviceId){
      setPlans([]);
      return;
    }
    getUserEvents(userData.token.access_token, deviceId)
      .then(response => bodyToJson<Plan[]>(response))
      .then(plans => setPlans(plans));
    getDiscordUsers()
      .then(response => bodyToJson<DiscordUser[]>(response))
      .then(users => setDiscordUsers(users));
  }, [userData, deviceId]);


  return (
    <ModelContext.Provider value={{plans, discordUsers, getUserById}}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
