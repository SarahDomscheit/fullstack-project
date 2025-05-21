import { NavLink } from "react-router";
import Card from "./Card";

const Dashboard = ({ userTodos, setUserTodos }) => {
  return (
    <section className="todos">
      <NavLink to="/addtodo">
        <button className="addtodo">Neues Todo hinzufügen</button>
      </NavLink>
      {userTodos.map((toDo, index) => {
        return <Card toDo={toDo} setUserTodos={setUserTodos} key={index} />;
      })}
    </section>
  );
};

export default Dashboard;
