import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import {registerCode, relogin} from '../services/Bot Service.ts';
import DeviceInfo from 'react-native-device-info';
import { setGenericPassword, resetGenericPassword, getGenericPassword } from 'react-native-keychain';

export type ModelContextType = {
  userData: DiscordAuth | undefined,
  isAuthenticated: boolean,
  login: Function,
  logout: Function,
  isAuthing: boolean,
}

const AuthContext = createContext<ModelContextType>({
  userData: undefined,
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
  isAuthing: false,
});

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [userData, setUserData] = useState<DiscordAuth | undefined>(undefined);
  const [isAuthing, setIsAuthing] = useState(true);
  const isAuthenticated = useMemo(() => {
    return !!userData;
  }, [userData]);

  // try to login with the token if it exists
  useEffect(() => {
    getGenericPassword().then(result => {
      if(!result) {
        setIsAuthing(false);
        return;
      }
      DeviceInfo.getUniqueId().then(deviceId => {
        const { username, password } = result;
        relogin(username, password, deviceId)
          .then(response => response.text())
          .then(text => {
            text = text.replace(/("[^"]*"\s*:\s*)(\d{18,})/g, '$1"$2"');
            const json: DiscordAuth = JSON.parse(text);
            setUserData(json);
            setIsAuthing(false);
          }).catch(() => {
            setIsAuthing(false);
          }).finally(() => setIsAuthing(false));
      });
    });
  }, []);

  // set and remove token when the state is updated
  useEffect(() => {
    if(userData) {
      setGenericPassword(String(userData.user.id), userData.token.access_token)
        .catch(error => console.error(error));
    } else {
      resetGenericPassword();
    }
  },[userData]);

  function logout(){
    setUserData(undefined);
  }

  async function login(loginCode: String) {
    const deviceId = await DeviceInfo.getUniqueId();
    setIsAuthing(true);
    registerCode(loginCode, deviceId)
      .then(response => response.text())
      .then(text => {
        text = text.replace(/("[^"]*"\s*:\s*)(\d{18,})/g, '$1"$2"');
        const json: DiscordAuth = JSON.parse(text);
        setUserData(json);
        setIsAuthing(false);
      }).catch(error => {
        setIsAuthing(false);
        console.error(error);
      });
  }

  return (
    <AuthContext.Provider value={{userData, logout, login, isAuthenticated, isAuthing}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
