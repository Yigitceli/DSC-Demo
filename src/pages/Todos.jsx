import React, { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import Todo from "../components/Todo";
import ReactLoading from "react-loading";

export default function Todos({ user }) {
  const fetchTodos = async () => {
    const todosRef = doc(db, "Todos", user.uid);
    const todos = (await getDoc(todosRef)).data();
    setTodos(todos.todos);
  };

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const todosRef = doc(db, "Todos", user.uid);
    const todos = await (await getDoc(todosRef)).data();
    const todoUID = uuidv1();
    await updateDoc(todosRef, {
      todos: [
        {
          todoId: todoUID,
          todoName: todoName,
          todoDesc: todoDesc,
        },
        ...todos.todos,
      ],
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
    setLoading(false);
  }, [user]);

  return (
    <div className="d-flex w-100" style={{ height: "85vh" }}>
      <div className=" bg-dark" style={{ width: "15%", minWidth: "300px" }}>
        <form
          className="w-100 h-100 d-flex align-items-center px-2 py-5 flex-column"
          style={{ justifyContent: "space-between" }}
          onSubmit={submitHandler}
        >
          <input
            type="text"
            className="text-center"
            placeholder="TODO NAME"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <textarea
            className="h-50 w-75 text-center"
            placeholder="TODO DESCRIPTION"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
          ></textarea>
          <button className="btn btn-danger w-75" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div
        className="d-flex w-100 h-100 align-items-center justify-content-evenly flex-wrap"
        style={{ width: "85%", overflow: "scroll" }}
      >
        {loading ? (
          <ReactLoading type={"spin"} color={"red"} height={200} width={150} />
        ) : (
          todos?.length > 0 &&
          todos?.map((item, index) => (
            <Todo
              key={index}
              data={item}
              setTodos={setTodos}
              user={user}
              todos={todos}
            />
          ))
        )}
      </div>
    </div>
  );
}
