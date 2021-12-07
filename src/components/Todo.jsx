import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import React from "react";
import { db } from "../config/firebase-config";

export default function Todo({ todos, user, data, setTodos }) {
  const clickHandler = async () => {
    const todosRef = doc(db, "Todos", user.uid);
    const newTodos = todos.filter((item) => item.todoId != data.todoId);
    await updateDoc(todosRef, { todos: [...newTodos] });
    setTodos(newTodos);
  };
  return (
    <div
      className="card text-center"
      style={{ minWidth: "500px", minHeight: "300px" }}
    >
      <h5 className="card-header">{data?.todoName}</h5>
      <div className="card-body">
        <h5 className="card-title">Description</h5>
        <p className="card-text">{data?.todoDesc}</p>
        <button className="btn btn-danger" onClick={clickHandler}>
          Complete
        </button>
      </div>
    </div>
  );
}
