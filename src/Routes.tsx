import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ClientPage from "./Pages/ClientPage";

import CreateAccountPage from "./Pages/CreateAccountPage";
import CreatePetPage from "./Pages/CreatePetPage";
import LoginPage from "./Pages/LoginPage";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <LoginPage /> } />
        <Route path="/create"  element={ <CreateAccountPage /> } />
        <Route path="/client"  element={ <ClientPage /> } />
        <Route path="/create/pet"  element={ <CreatePetPage /> } />
      </Routes>
    </Router>
  );
}