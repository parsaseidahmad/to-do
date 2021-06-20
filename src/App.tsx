import "./App.css";
import React, { memo, useState } from "react";
import { TodoWrapper } from "./components/tasks";
import "tailwindcss/tailwind.css";
import { CreateTask } from "./components/createTask";
import { MdAdd } from "react-icons/md";

const todosInit: Array<ToDo> = [
  {
    id: 0,
    isDone: false,
    title: "Task #1",
    dueDate: new Date(),
    status: "Paused",
  },
  {
    id: 1,
    isDone: true,
    title: "Task #2",
    dueDate: new Date(),
    status: "Done",
  },
  {
    id: 2,
    isDone: false,
    title: "Task #3",
    dueDate: new Date(),
    status: "In progress",
  },
];

const App: any = () => {
  const [todos, setTodos] = useState<Array<ToDo>>(todosInit);
  React.useEffect(() => {
    const data = localStorage.getItem("my-todo-list");
    if (data) {
      const dataAll = JSON.parse(data);
      const validData = dataAll.map((d) => {
        return {
          ...d,
          dueDate: new Date(d.dueDate),
        };
      });
      setTodos(validData);
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(todos));
  }, [todos]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<"week" | "month" | "day">("day");
  const [sort, setSort] = useState<"reverse" | "none">("none");
  const [donePage, setDonePage] = useState<"isDone" | "isNotDone">("isNotDone");

  const addtodo = (todo: TTodoBasic) => {
    const nextId = todos.length;

    setTodos((prev) => {
      return [...prev, { ...todo, id: nextId }];
    });
  };

  return (
    <>
      <header className="">
        <div className=" block grid grid-cols-6 mr-10 -mb-7 mt-7 ">
          <button
            onClick={() => setIsOpen(true)}
            className="flex w-max h-max  text-xs col-start-7 col-end-7 content-center justify-center bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 mt-2 rounded"
          >
            <MdAdd className="text-xl" />
            Add Task
          </button>
          {isOpen && (
            <CreateTask
              isEdit={false}
              setIsOpen={setIsOpen}
              addTodo={addtodo}
            ></CreateTask>
          )}
        </div>
        <div className="text-xss  ml-10 mr-10 block border-b mt-3 mb-5  text-gray-500">
          <button
            onClick={() => {
              setDonePage("isNotDone");
            }}
            className="font-bold w-24 h-8 rounded-sm bg-white hover:text-blue-500 focus:outline-none py-1 px-2  border-t border-r border-l focus:text-blue-500   "
          >
            To Do
          </button>
          <button
            onClick={() => {
              setDonePage("isDone");
            }}
            className="font-bold w-24 h-8 rounded-sm bg-white hover:text-blue-500 focus:outline-none py-1 px-2  border-t border-r border-l focus:text-blue-500 ml-1"
          >
            Done task
          </button>
        </div>
        <div className=" grid grid-cols-3 text-gray-500 mt-9">
          <div className=" text-xss col-start-4 col-end-4 shadow rounded-xs mr-10">
            <button
              onClick={() => {
                setFilter("month");
              }}
              className=" w-14 font-semibold rounded-l-xs bg-white focus:text-blue-600 hover:text-blue-500 focus:outline-none py-1 px-2  border-t border-b border-l "
            >
              Month
            </button>
            <button
              onClick={() => {
                setFilter("week");
              }}
              className="w-14 font-semibold bg-white hover:text-blue-500 focus:text-blue-600 focus:outline-none py-1 px-2  border  "
            >
              Week
            </button>
            <button
              onClick={() => {
                setFilter("day");
              }}
              className="w-14 font-semibold rounded-r-xs bg-white hover:text-blue-500 focus:text-blue-600 focus:outline-none py-1 px-2  border-t border-b border-r  "
            >
              Day
            </button>
          </div>
        </div>
      </header>
      <div className="">
        <header className="text-sm font-semibold text-gray-500 flex ml-10 mt-9 mr-10 pt-3 pb-3 border-t border-b grid grid-cols-12 gap-4">
          <h4 className="col-start-2 col-end-5 ">
            <button
              className="font-semibold hover:text-gray-700  focus:outline-none"
              onClick={() => {
                if (sort === "reverse") {
                  setSort("none");
                } else {
                  setSort("reverse");
                }
              }}
            >
              Tasks
            </button>
          </h4>
          <h4 className="col-start-5 col-end-6">Status</h4>
          <h4 className="col-start-7 col-end-8">Date</h4>
          <h4 className="col-start-9 col-end-10">Time</h4>
        </header>
        <TodoWrapper
          filter={filter}
          todos={todos}
          setTodos={setTodos}
          sort={sort}
          donePage={donePage}
        ></TodoWrapper>
      </div>
    </>
  );
};

export default memo(App);
