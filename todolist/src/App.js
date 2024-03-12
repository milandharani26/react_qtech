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

export default function App() {
  function createData(title, description, status, edit, delet, assignTo) {
    return { title, description, status, edit, delet, assignTo };
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
    { title: "", description: "", status: "", id: "" }
  ]);

  function hanldeAdd({ title, description, curntCondition }) {
    // console.log(title, description, curntCondition, "hello");

    setAdd((prev) => [...prev, { title: { title }, description: { description }, status: { curntCondition }, id: "" }]);

    console.log(add);
  }

  function handleUpdate() {
    // console.log(add);
    console.log("update");
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Addtodo onadd={hanldeAdd} obj={task} people={people} />
          <Todo rows={rows} onUpdate={handleUpdate} obj={task} />
        </div>
      </ThemeProvider>
    </>
  );
}

function Addtodo({ onadd, obj }) {
  return (
    <>
      <div className="add-todo">
        <div>
          <h1>Todolist</h1>
          <p>add your work</p>
        </div>

        <BasicModal onclick={onadd} obj={obj}>
          + add
        </BasicModal>
      </div>
    </>
  );
}

function Todo({ rows, onUpdate, obj }) {
  return (
    <>
      <div className="list-container">
        <div className="search">
          <TextField id="outlined-basic" label="search" variant="outlined" />

          <p className="flex filter">
            <FilterAltOutlinedIcon /> Filter
          </p>
        </div>
        <List rows={rows} onUpdate={onUpdate} obj={obj} />
      </div>
    </>
  );
}

function List({ rows, onUpdate, obj }) {
  return <CustomizedTables rows={rows} onUpdate={onUpdate} obj={obj} />;
}
