import { auth, db } from "firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const { createContext, useContext, useState, useEffect } = require("react");
const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Đăng xuất → reset state
        setUserInfo(null);
        return;
      }
      const colRef = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setUserInfo({
            ...user,
            ...doc.data(),
          });
        });
      });
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
