import React, { FC, useState } from "react";
import { MdClear } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TCreateTodoProps = {
  setIsOpen: any;
  addTodo?: any;
  editTodo?: any;
  todo?: ToDo;
  isEdit: boolean;
};
export const CreateTask: React.FC<TCreateTodoProps> = ({
  setIsOpen,
  addTodo,
  todo,
  editTodo,
  isEdit = false,
}) => {
  const [todoTitle, setTodoTitle] = useState<string>(todo ? todo.title : "");
  const [endDate, setEnddate] = useState<Date>(
    todo ? todo.dueDate : new Date()
  );
  const [todoStatus, setTodoStatus] = useState<ToDo["status"]>(
    todo ? todo.status : "In progress"
  );
  const [todoIsDone, setTodoIsDone] = useState<boolean>(
    todo ? todo.isDone : false
  );

  const add = () => {
    const currentTodo: TTodoBasic = {
      status: todoStatus,
      title: todoTitle,
      dueDate: endDate,
      isDone: false,
    };
    addTodo(currentTodo);
  };
  const edit = () => {
    if (todo) {
      const currentTodo: ToDo = {
        id: todo.id,
        status: todoStatus,
        title: todoTitle,
        dueDate: endDate,
        isDone: todoStatus === "Done" ? true : false,
      };
      editTodo(currentTodo);
    }
  };
  return (
    <div className="w-screen h-56 grid grid-cols-3 absolute items-center">
      <div className="col-start-2 box-content bg-white w-max rounded-lg shadow-inner border">
        <div className="box-content ">
          <button
            className="focus:outline-none float-right"
            onClick={() => setIsOpen(false)}
          >
            <MdClear className="text-red-500 text-lg hover:text-red-700" />
          </button>
        </div>

        <input
          className="block focus:outline-none ml-1 "
          type="text"
          placeholder="title"
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        ></input>

        <select
          className="block text-gray-400 focus:outline-none mt-2 mb-2"
          onChange={(e) => {
            setTodoStatus(e.target.value as any);
          }}
        >
          <option value="Paused">Paused</option>
          <option value="In progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <span className="block focus:outline-none ml-1">
          <span className="col-start-7 col-end-8 font-semibold text-xs">
            {" "}
            <DatePicker
              showTimeSelect
              dateFormat="d MMMM yyyy h:mmaa"
              selected={endDate}
              selectsStart
              startDate={endDate}
              onChange={(date) => {
                setEnddate(date);
              }}
            ></DatePicker>{" "}
          </span>
        </span>
        <button
          className="rounded-full p-1 hover:shadow-xl w-10 border focus:outline-none mt-2 mb-2 ml-1 text-xs bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-700 hover:to-green-600"
          onClick={() => {
            if (isEdit) {
              edit();
            } else {
              add();
            }
            setIsOpen(false);
          }}
        >
          {isEdit ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
};
