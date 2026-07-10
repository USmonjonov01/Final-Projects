import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const ProfileContext = createContext();
export const StudentListData = () => useContext(ProfileContext);

export default function ProfileProvider({ children }) {
     const data = useReducer(reducer, false);
     return (<ProfileContext.Provider value={data}> {children} </ProfileContext.Provider>
     );
}
