import React, { useEffect } from "react";
import "firebase/auth";
import "firebase/firestore";
import { DatabaseProvider } from "./components/DatabaseContext";
import Wrapper from "./components/Wrapper";

const App = () => {
  return (
    <DatabaseProvider>
      <Wrapper />
    </DatabaseProvider>
  );
};

export default App;
