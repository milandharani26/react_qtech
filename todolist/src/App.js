import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CustomizedTables from "./components/Table";
import { theme } from "./components/Theme";
import { ThemeProvider } from "@emotion/react";
import BasicModal from "./components/Model";

const task = [
  {
    value: "select",
    label: "select",
  },
  {
    value: "completed",
    label: "completed",
  },
  {
    value: "pending",
    label: "pending",
  },
  {
    value: "not started",
    label: "not started",
  },
];

const people = [
  {
    value: "sachin",
    label: "sachin",
  },
  {
    value: "milan",
    label: "milan",
  },
  {
    value: "dixit",
    label: "dixit",
  },
];

const generatedIds = new Set();

function generateUniqueTicketId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let ticketId = "";

  do {
    ticketId = "";
    for (let i = 0; i < 3; i++) {
      ticketId += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 5; i++) {
      ticketId += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  } while (generatedIds.has(ticketId));

  generatedIds.add(ticketId);
  return ticketId;
}

export default function App() {
  function createData(title, description, status, assignTo) {
    return { title, description, status, assignTo };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 5.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 5.0),
    createData("Eclair", 262, 16.0, 24, 6.0, 5.0),
    createData("Cupcake", 305, 3.7, 67, 4.3, 5.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 5.0),
    createData("milan", 356, 16.0, 49, 3.9, 5.0),
  ];

  const [add, setAdd] = useState([
    { title: "", description: "", status: "", id: "", assignTo: "milan" },
  ]);

  const [search, setSearch] = useState("");

  function hanldeAdd({ title, description, curntCondition }) {
    setAdd((prev) => [
      ...prev,
      {
        title: title,
        description: description,
        status: curntCondition,
        id: generateUniqueTicketId(),
        assignTo: "milan",
      },
    ]);
    console.log(add);
  }

  function handleUpdate({ title, description, curntCondition, status, id, assignTo }) {
    console.log(
      title,
      description,
      curntCondition,
      status,
      id,
      "inside update function"
    );

    setAdd((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = {
            title: title,
            description: description,
            // status: curntCondition ? curntCondition : status,
            status: status ? status : curntCondition,
            id: id,
            assignTo: assignTo ? assignTo : "milan",
          };
          return updatedTodo;
        } else return todo;
      })
    );
  }

  function handleDelete(id) {
    // console.log(id);
    setAdd((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    // console.log(search, "handle");


    const filteredTodos = add.filter((todo) =>
      Object.values(todo).some((value) => {
        console.log(value, "value");
        return (
          typeof value === "string" &&
          value.toLocaleLowerCase().includes(search)
        );
      })
    );

    console.log(filteredTodos);

    // setAdd(filteredTodos);


  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Addtodo onadd={hanldeAdd} obj={task} people={people} todos={add} />
          <Todo
            rows={add}
            onUpdate={handleUpdate}
            obj={task}
            onDelete={handleDelete}
            onSearch={handleSearch}
            search={search}
          />
        </div>
      </ThemeProvider>
    </>
  );
}

function Addtodo({ onadd, obj, todos }) {
  return (
    <>
      <div className="add-todo">
        <div>
          <h1>Todolist</h1>
          <p>add your work</p>
        </div>

        <BasicModal onclick={onadd} obj={obj} todos={todos}>
          + add
        </BasicModal>
      </div>
    </>
  );
}

function Todo({ rows, onUpdate, obj, onDelete, onSearch, search }) {
  return (
    <>
      <div className="list-container">
        <div className="search">
          <TextField
            id="outlined-basic"
            label="search"
            variant="outlined"
            value={search}
            onChange={(e) => onSearch(e)}
          />

          <p className="flex filter">
            <FilterAltOutlinedIcon /> Filter
          </p>
        </div>
        <List rows={rows} onUpdate={onUpdate} obj={obj} onDelete={onDelete} />
      </div>
    </>
  );
}

function List({ rows, onUpdate, obj, onDelete }) {
  return (
    <CustomizedTables
      rows={rows}
      onUpdate={onUpdate}
      obj={obj}
      onDelete={onDelete}
    />
  );
}
