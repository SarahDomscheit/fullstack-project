const Card = ({ toDo, setUserTodos }) => {
  const toggleState = async () => {
    const res = await fetch("http://localhost:5500/editstate", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    });
    const data = await res.json();

    setUserTodos((prev) =>
      prev.map((todo) => (todo.id === data.id ? data : todo))
    );
  };

  const deleteTodo = async () => {
    const res = await fetch("http://localhost:5500/deletetodo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    });
    setUserTodos((prev) => prev.filter((todo) => todo.id !== toDo.id));
  };
  return (
    <div className={`todo-card${toDo.state ? " completed" : ""}`}>
      <span className="toggle-state" onClick={toggleState}>
        {toDo.state ? "Erledigt" : "Nicht erledigt"}
      </span>
      <h3>{toDo.title}</h3>
      <p>{toDo.text}</p>
      <button className="deletebutton" onClick={deleteTodo}>
        Löschen
      </button>
    </div>
  );
};

export default Card;
