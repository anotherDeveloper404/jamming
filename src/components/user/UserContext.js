import React, { createContext, useContext, useState } from 'react';

// Create a context with an initial user value
const UserContext = createContext({ user: {}, setUser: () => {} });

// Create a provider component that wraps your app and manages the user state
export function UserProvider(props) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

// Create a custom hook to conveniently access the user and setUser from the context
export function useUser() {
  return useContext(UserContext);
}
