import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import CreateAccountPage from "./Pages/CreateAccountPage";
import LoginPage from "./Pages/LoginPage";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <LoginPage /> } />
        <Route path="/create"  element={ <CreateAccountPage /> } />
      </Routes>
    </Router>
  );
}