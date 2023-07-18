import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

const DataComponent = ({ children }) => {
    const [mode, setMode] = useState("light");
    const updateMode = (newData) => {
        setMode(newData);
    };
    
    return (
        <DataContext.Provider value={{ mode, updateMode }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataComponent, DataContext };
