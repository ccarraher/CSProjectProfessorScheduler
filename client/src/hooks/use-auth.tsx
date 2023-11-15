import { SubmitHandler } from "react-hook-form";
import * as React from "react";
import { LoginFormInputs } from "../pages/login-page";
import { User } from "../types/auth-types";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = React.useState<User>();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();

  const login: SubmitHandler<LoginFormInputs> = (
    userCreds: LoginFormInputs
  ) => {
    const body = {
      username: userCreds.username,
      password: userCreds.password,
    };
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.userId) {
            const user: User = {
              firstName: data.firstName,
              lastName: data.lastName,
              netId: data.userId,
              role: {
                roleId: data.authorities[0].roleId,
                type: data.authorities[0].authority,
              },
              authToken: data.jwt,
            };
            setUser(user);
            setIsAuthenticated(true);
            navigate("/home");
          }
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  };

  const logout = (): void => {
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, user, login, logout };
};

export const AuthContext = React.createContext(
  null as unknown as AuthenticatedUserContextValue
);

export const AuthProvider = ({
  children,
}: AuthenticatedUserProviderProps): JSX.Element => {
  const { login, isAuthenticated, user, logout } = useAuth();

  const value: AuthenticatedUserContextValue = {
    login,
    isAuthenticated,
    user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export interface AuthenticatedUserContextValue {
  readonly login: SubmitHandler<LoginFormInputs>;
  readonly logout: () => void;
  readonly isAuthenticated: boolean;
  readonly user: User | undefined;
}

interface AuthenticatedUserProviderProps
  extends React.HTMLAttributes<HTMLElement> {}
