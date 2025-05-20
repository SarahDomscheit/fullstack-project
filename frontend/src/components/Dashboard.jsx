import Card from "./Card";

const Dashboard = ({ userTodos }) => {
  return (
    <section className="todos">
      {userTodos.map((toDo, index) => {
        return <Card toDo={toDo} key={index} />;
      })}
    </section>
  );
};

export default Dashboard;
