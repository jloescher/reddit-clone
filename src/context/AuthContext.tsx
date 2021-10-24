import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth, Hub } from "aws-amplify";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser | null>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: ReactElement;
}

const AuthContext = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      // perform action to update state whenever an auth event is detected.
      checkUser();
    });
  }, []);

  const checkUser = async () => {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();

      if (amplifyUser) {
        setUser(amplifyUser);
      }
    } catch (err) {
      // No current signed in user
      console.error(err);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;
export const useUser = (): UserContextType => useContext(UserContext);
