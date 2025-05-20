const Card = ({ toDo }) => {
  return (
    <div className="todo-card">
      <h3>{toDo.title}</h3>
      <p>{toDo.text}</p>
    </div>
  );
};

export default Card;
