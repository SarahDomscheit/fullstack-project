import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Header = ({ currentUser, setCurrentUser, setUserTodos }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = () => {
    if (currentUser) {
      setCurrentUser(false);
      setIsLoggedIn(false);
      setUserTodos(false);
      return;
    }
    setIsLoggedIn(!isLoggedIn);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setCurrentUser(data);
      setIsLoggedIn(false);
      const resToDos = await fetch("http://localhost:5500/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const toDos = await resToDos.json();
      setUserTodos(toDos);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="header-wrapper">
        <NavLink to="/">
          <h2>Taskify</h2>{" "}
        </NavLink>
        <div className="log-wrapper">
          <div className="button-wrapper">
            {" "}
            <button onClick={handleLogin}>
              {!currentUser ? "LOGIN" : "LOGOUT"}
            </button>
            <NavLink to="/dashboard">
              <button>DASHBOARD</button>
            </NavLink>
          </div>

          {isLoggedIn ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">LOGIN</button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
