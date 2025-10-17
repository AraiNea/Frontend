import { createContext } from "react";

const UserContext = createContext({
    userInfo: null,
    setUserInfo: () => { },
});

export default UserContext;