import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useMemo, useContext } from "react";
/* navigation */
import DrawerNavigator from "./DrawerNavigator";
/* context */
import { AuthContext, AuthProvider } from "../context/AuthProvider";
import { AudioProvider } from "../context/AudioProvider";
import { OthersProvider } from "../context/OthersProvider";

/* firebae */
import { auth } from "../libs/firebae";

const Navigation = () => {
  const { setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthProvider>
      <AudioProvider>
        <OthersProvider>
          <NavigationContainer>
            <DrawerNavigator navigation />
          </NavigationContainer>
        </OthersProvider>
      </AudioProvider>
    </AuthProvider>
  );
};

export default Navigation;
