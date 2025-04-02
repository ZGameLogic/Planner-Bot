import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.tsx';
import { getDiscordUsers, getUserEvents } from '../services/Bot Service.ts';
import { bodyToJson } from '../helpers/format-helper.ts';
import { DiscordUser, Plan } from '../types/APITypes.ts';

export type ModelContextType = {
  plans: Plan[]
  discordUsers: DiscordUser[]
  getUserById: Function
  refresh: Function
}

const ModelContext = createContext<ModelContextType>({
  plans: [],
  discordUsers: [],
  getUserById: () => {},
  refresh: () => {},
});

export const ModelProvider = ({ children } : PropsWithChildren) => {
  const { userData, deviceId } = useAuth();
  const [ plans, setPlans ] = useState<Plan[]>([]);
  const [ discordUsers, setDiscordUsers ] = useState<DiscordUser[]>([]);

  function getUserById(id: bigint){
    return discordUsers.filter(user => user.id === id)[0];
  }

  async function refresh(): Promise<void> {
    if (!userData || !deviceId) {
      setPlans([]);
      return Promise.resolve();
    }
    await Promise.all([
      getUserEvents(userData.token.access_token, deviceId)
        .then(response => bodyToJson<Plan[]>(response))
        .then(ps => setPlans(ps)),
      getDiscordUsers()
        .then(response_2 => bodyToJson<DiscordUser[]>(response_2))
        .then(users => setDiscordUsers(users)),
    ]);
  }

  useEffect(() => {
    const fetchData = async () => {
      await refresh();
    };
    fetchData();
  }, [userData, deviceId]);

  return (
    <ModelContext.Provider value={{ plans, discordUsers, getUserById, refresh }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
