import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';


function App() {

  const [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };

  useEffect(() =>{
    const loggedInUser = localStorage.getItem("user");
      if(loggedInUser){
        const foundUser = (loggedInUser);
        const realUser = JSON.parse(foundUser)
        setUser(realUser);
      }
  }, []);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
