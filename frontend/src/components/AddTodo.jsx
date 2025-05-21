import { useState } from "react";
import { useNavigate } from "react-router";

const AddTodo = ({ currentUser, userTodos, setUserTodos }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    uID: currentUser.userID,
    text: "",
    state: false,
  });

  const navigate = useNavigate();

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
      const data = await fetch("http://localhost:5500/addtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await data.json();
      alert(res.message);
      setUserTodos((prev) => [...prev, formData]);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="addtodo-section">
        <form className="addtodo-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="text">Aufgabe</label>
            <textarea
              type="text"
              name="text"
              id="text"
              value={formData.text}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Hinzufügen</button>
        </form>
      </section>
    </>
  );
};
export default AddTodo;
