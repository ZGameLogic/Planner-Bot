import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import {registerCode, relogin} from '../services/Bot Service.ts';
import DeviceInfo from 'react-native-device-info';
import { setGenericPassword, resetGenericPassword, getGenericPassword } from 'react-native-keychain';

export type AuthContextType = {
  userData: DiscordAuth | undefined,
  isAuthenticated: boolean,
  login: Function,
  logout: Function,
  isAuthing: boolean,
}

const AuthContext = createContext<AuthContextType>({
  userData: undefined,
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
  isAuthing: false,
});

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [userData, setUserData] = useState<DiscordAuth | undefined>(undefined);
  const [isAuthing, setIsAuthing] = useState(true);
  const [initLoginFailed, setInitLoginFailed] = useState(false);
  const isAuthenticated = useMemo(() => {
    return !!userData;
  }, [userData]);
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
    if(!deviceId) { return; }
    getGenericPassword().then(result => {
      if(!result) {
        setIsAuthing(false);
        return;
      }
      const { username, password } = result;
      relogin(username, password, deviceId)
        .then(response => response.text())
        .then(text => {
          text = text.replace(/("[^"]*"\s*:\s*)(\d{18,})/g, '$1"$2"');
          const json: DiscordAuth = JSON.parse(text);
          setUserData(json);
          setIsAuthing(false);
        }).catch(() => {
          setInitLoginFailed(true);
          setIsAuthing(false);
        }).finally(() => setIsAuthing(false));
    });
  }, [deviceId]);

  // set and remove token when the state is updated
  useEffect(() => {
    if(userData) {
      setGenericPassword(String(userData.user.id), userData.token.access_token)
        .then(result => console.log(result))
        .catch(error => console.error(error));
    } else {
      if(initLoginFailed) {
        resetGenericPassword();
      }
    }
  },[userData, initLoginFailed]);

  function logout(){
    setUserData(undefined);
  }

  async function login(loginCode: String) {
    if(!deviceId) { return; }
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
