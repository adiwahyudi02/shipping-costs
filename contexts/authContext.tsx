import { User } from "@/types/user";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalstorage";
import { useLoginMutation } from "@/hooks/queries/auth/useLoginMutation";

interface AuthContextType {
  user?: User;
  isPendingLogin: boolean;
  login: (data: User) => void;
  logout: () => void;
}

interface AuthProviderPropsType {
  children: ReactNode;
}

const useAuthValue = (): AuthContextType => {
  const { push, pathname } = useRouter();
  const [user, setUser] = useLocalStorage<string>("user", "{}");
  const userData = JSON.parse(user);

  const handleLoginSuccess = (data: User) => {
    setUser(JSON.stringify(data));
    push("/");
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } =
    useLoginMutation(handleLoginSuccess);

  const login = (data: User) => {
    mutateLogin(data);
  };

  const logout = () => {
    setUser("{}");
    push("/login");
  };

  // Route protection
  useEffect(() => {
    const isAuthenticated = Object.keys(userData).length !== 0;
    if (pathname === "/login" && isAuthenticated) {
      push("/");
    } else if (!isAuthenticated) {
      push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user: userData,
    isPendingLogin,
    login,
    logout,
  };
};

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const value = useAuthValue();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthCtx must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuthCtx };
