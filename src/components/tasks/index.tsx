import React, { FC, useState } from "react";
import { MdClear, MdModeEdit } from "react-icons/md";
import { CreateTask } from "../createTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ToDoListItemProps {
  todo: ToDo;
  editTodo: any;
  deleteTodo: any;
}

export const ToDoListItem: React.FC<ToDoListItemProps> = ({
  todo,
  editTodo,
  deleteTodo,
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [todoStatus, setTodoStatus] = useState<ToDo["status"]>(
    todo ? todo.status : "In progress"
  );
  const getStatusColor = (status: ToDo["status"]) => {
    switch (status) {
      case "Paused":
        return "bg-yellow-500";
      case "In progress":
        return "bg-blue-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };
  return (
    <li className="list-none">
      <div className="text-sm font-semibold text-gray-900 flex ml-10  mr-10 pt-8 pb-8  border-b grid grid-cols-12 gap-4">
        <span className="ml-2">
          <input type="checkbox" checked={todoStatus === "Done"} />
        </span>
        <div className=" font-semibold text-xs col-start-2 col-end-5">
          {todo.title}
        </div>
        <div
          className={`col-start-5 col-end-6 ${getStatusColor(todo.status)}
           rounded-full content-center p-1 w-max justify-center text-white`}
        >
          {todo.status}
        </div>
        <span className="col-start-7 col-end-8 font-semibold text-xs">
          {" "}
          <DatePicker
            showTimeSelect
            dateFormat="d MMMM yyyy"
            selected={todo.dueDate}
            selectsStart
            startDate={todo.dueDate}
            endDate={todo.dueDate}
          ></DatePicker>{" "}
        </span>
        <span className="col-start*9 col-end-10 font-black text-xs ">
          <DatePicker
            showTimeSelect
            dateFormat="h:mmaa"
            selected={todo.dueDate}
            selectsStart
            startDate={todo.dueDate}
            endDate={todo.dueDate}
          ></DatePicker>
        </span>
        <div className="col-start-12">
          <button
            className="mr-2 focus:outline-none"
            onClick={() => setIsopen(true)}
          >
            <MdModeEdit className="text-blue-500 text-2xl hover:text-blue-700" />
          </button>
          <button
            className="focus:outline-none"
            onClick={() => {
              deleteTodo(todo);
            }}
          >
            <MdClear className="text-red-500 text-2xl hover:text-red-700" />
          </button>
        </div>
        {isOpen && (
          <CreateTask
            isEdit={true}
            todo={todo}
            editTodo={editTodo}
            setIsOpen={setIsopen}
          ></CreateTask>
        )}
      </div>
    </li>
  );
};
export const TodoWrapper: FC<any> = ({ todos, setTodos, filter }) => {
  const editTodo = (todo: ToDo) => {
    const todoArr = [...todos].filter((t) => t.id !== todo.id);
    todoArr.push(todo);
    setTodos(todoArr);
  };
  const deleteTodo = (todo: ToDo) => {
    const todoArr = [...todos].filter((t) => t.id !== todo.id);
    setTodos(todoArr);
  };
  const handleFilter = () => {
    if (filter === "month") {
      return [...todos].filter((t: ToDo) => {
        return (
          t.dueDate.getMonth() === new Date().getMonth() &&
          t.dueDate.getFullYear() === new Date().getFullYear()
        );
      });
    }
    if (filter === "week") {
      return [...todos].filter((t: ToDo) => {
        return (
          t.dueDate.getMonth() === new Date().getMonth() &&
          t.dueDate.getMonth() === new Date().getMonth() &&
          t.dueDate.getFullYear() === new Date().getFullYear()
        );
      });
    }
    if (filter === "day") {
      return [...todos].filter((t: ToDo) => {
        return (
          t.dueDate.getDay() === new Date().getDay() &&
          t.dueDate.getMonth() === new Date().getMonth() &&
          t.dueDate.getFullYear() === new Date().getFullYear()
        );
      });
    }
    if (filter === "isDone") {
      return [...todos].filter((t: ToDo) => {
        return t.isDone;
      });
    }
    return todos;
  };
  return (
    <>
      {handleFilter().map((t: ToDo) => {
        return (
          <ToDoListItem editTodo={editTodo} todo={t} deleteTodo={deleteTodo} />
        );
      })}
    </>
  );
};
