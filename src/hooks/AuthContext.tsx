import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import {registerCode, relogin} from '../services/Bot Service.ts';
import DeviceInfo from 'react-native-device-info';
import { setGenericPassword, resetGenericPassword, getGenericPassword } from 'react-native-keychain';
import { useConnection } from './ConnectionContext.tsx';
import {bodyToJson} from "../helpers/format-helper.ts";

export type AuthContextType = {
  userData: DiscordAuth | undefined,
  login: Function,
  logout: Function,
  isAuthing: boolean,
  deviceId: string | undefined,
}

const AuthContext = createContext<AuthContextType>({
  userData: undefined,
  logout: () => {},
  login: () => {},
  isAuthing: false,
  deviceId: undefined,
});

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [userData, setUserData] = useState<DiscordAuth | undefined>(undefined);
  const [isAuthing, setIsAuthing] = useState(true);
  const [initLoginFailed, setInitLoginFailed] = useState(false);
  const { serverConnection } = useConnection();
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };

    fetchDeviceId();
  }, []);

  // try to login with the token if it exists
  useEffect(() => {
    if(!serverConnection) { return; }
    if(!deviceId) { return; }
    getGenericPassword().then(result => {
      if(!result) {
        setIsAuthing(false);
        return;
      }
      const { username, password } = result;
      relogin(username, password, deviceId)
        .then(response => bodyToJson<DiscordAuth>(response))
        .then(authData => {
          setUserData(authData);
          setIsAuthing(false);
        }).catch(() => {
          setInitLoginFailed(true);
          setIsAuthing(false);
        }).finally(() => setIsAuthing(false));
    });
  }, [deviceId, serverConnection]);

  // set and remove token when the state is updated
  useEffect(() => {
    if(userData) {
      setGenericPassword(String(userData.user.id), userData.token.access_token)
    } else {
      if(initLoginFailed) {
        resetGenericPassword();
      }
    }
  }, [userData, initLoginFailed, serverConnection]);

  function logout(){
    setUserData(undefined);
  }

  async function login(loginCode: String) {
    if(!deviceId) { return; }
    setIsAuthing(true);
    registerCode(loginCode, deviceId)
      .then(response => bodyToJson<DiscordAuth>(response))
      .then(authData => {
        setUserData(authData);
        setIsAuthing(false);
      }).catch(error => {
        setIsAuthing(false);
        console.error(error);
      });
  }

  return (
    <AuthContext.Provider value={{userData, logout, login, isAuthing, deviceId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
