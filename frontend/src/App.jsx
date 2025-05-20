import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <section className="main-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
