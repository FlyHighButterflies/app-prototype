import React, { createContext, useContext, useState } from "react";
import DummyData from "constants/DummyData.json";

const dataContext = createContext({});
const setDataContext = createContext(null);

export function useData() {
  return useContext(dataContext);
}

export function useSetData() {
  return useContext(setDataContext);
}

function DataContext({ children }) {
  const [data, setData] = useState(DummyData.expenseList);

  return (
    <dataContext.Provider value={data}>
      <setDataContext.Provider value={setData}>
        {children}
      </setDataContext.Provider>
    </dataContext.Provider>
  );
}

export default DataContext;
