import { ReactNode, createContext, useContext, useReducer } from "react";

const defaultValue = {
  state: {
    id: null,
    email: null,
    name: null
  }
}
const CurrentUserContext = createContext(defaultValue);

type Action = {
  type: string
  payload: {}
}

function currentUserReducer(_, action: Action) {
  switch (action.type) {
    case "set": {
      return {
        ...action.payload,
      };
    }
    case "logout": {
      return {
        id: null,
        email: null,
        name: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const CurrentUserProvider = ({ children }: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(currentUserReducer, {
    id: null,
    email: null,
    name: null,
  });

  const value = { state, dispatch };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

const useCurrentUser = () => useContext(CurrentUserContext);
export { CurrentUserProvider, useCurrentUser };
