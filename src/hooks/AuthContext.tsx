import {createContext, PropsWithChildren, useContext, useMemo, useState} from 'react';
import {registerCode} from '../services/Bot Service.ts';
import DeviceInfo from 'react-native-device-info';

export type ModelContextType = {
  userData: object | undefined,
  isAuthenticated: boolean,
  login: Function,
  logout: Function,
  isAuthing: boolean,
}

const AuthContext = createContext<ModelContextType>({
  userData: {},
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
  isAuthing: false,
});

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [userData, setUserData] = useState<object | undefined>(undefined);
  const [isAuthing, setIsAuthing] = useState(false);
  const isAuthenticated = useMemo(() => {
    return !!userData;
  }, [userData]);

  function logout(){
    setUserData(undefined);
  }

  async function login(loginCode: String) {
    const deviceId = await DeviceInfo.getUniqueId();
    setIsAuthing(true);
    registerCode(loginCode, deviceId)
      .then(response => response.json())
      .then(json => {
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
