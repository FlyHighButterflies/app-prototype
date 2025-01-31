import React, { createContext, useContext, useState } from "react";

const userIDContext = createContext(null);
const setUserIDContext = createContext(null);

export function useUserID() {
  return useContext(userIDContext);
}

export function useSetUserID() {
  return useContext(setUserIDContext);
}

function UserContext({ children }) {
  const [userID, setUserID] = useState(null);

  return (
    <userIDContext.Provider value={userID}>
      <setUserIDContext.Provider value={setUserID}>
        {children}
      </setUserIDContext.Provider>
    </userIDContext.Provider>
  );
}

export default UserContext;
