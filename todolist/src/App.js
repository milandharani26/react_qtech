import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CustomizedTables from "./components/Table";
import { theme } from "./components/Theme";
import { ThemeProvider } from "@emotion/react";
import BasicModal from "./components/Model";
import Filter from "./components/Filter";

const task = [
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
    value: "x`",
    label: "dixit",
  },
];

const status = [
  'completed',
  'pending',
  'not started',
];

const priority = [
  'high',
  'medium',
  'low'
]

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
  const [add, setAdd] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedList, setSearchedList] = useState(add);
  const [searchFilterData, setSearchFilterData] = useState([])

  const [personName, setPersonName] = useState([]);
  const [personName1, setPersonName1] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName1(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // get current date and time
  const currentDate = new Date();

  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour time format
  };
  const formattedDateTime = currentDate.toLocaleString("en-US", options);

  //! add todo
  function hanldeAdd({ title, description, curntCondition }) {
    const timeArray = [];
    timeArray.push(formattedDateTime);

    setAdd((prev) => [
      ...prev,
      {
        title: title,
        description: description,
        priority: "hign",  /// priority added
        status: curntCondition,
        id: generateUniqueTicketId(),
        assignTo: "milan",
        time: timeArray,
      },
    ]);
    console.log(add);
  }

  //!update Todo
  function handleUpdate({
    title,
    description,
    curntCondition,
    status,
    id,
    assignTo,
    time,
    priority
  }) {
    console.log(
      title,
      description,
      curntCondition,
      status,
      id,
      priority,
      "inside update function"
    );

    const timeArray = [];
    timeArray.push(formattedDateTime);

    setAdd((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = {
            title: title,
            description: description,
            priority: priority,
            status: status ? status : curntCondition,
            id: id,
            assignTo: assignTo ? assignTo : "milan",
            time: [...time, timeArray],
          };
          return updatedTodo;
        } else return todo;
      })
    );

    searchedList.length > 0 &&
      setSearchedList((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            const updatedTodo = {
              title: title,
              description: description,
              priority: priority ? priority : "high",
              status: status ? status : curntCondition,
              id: id,
              assignTo: assignTo ? assignTo : "milan",
              time: [...time, timeArray],
            };
            return updatedTodo;
          } else return todo;
        })
      );
  }

  //!handle Delete
  function handleDelete(id) {
    setAdd((prev) => prev.filter((todo) => todo.id !== id));
    setSearchedList((prev) => prev?.filter((todo) => todo.id !== id));
  }

  //! handle Search
  function handleSearch(e) {
    setSearch(e.target.value.trim());
    

    const searchItem = e.target.value;
    const filteredData = add.filter((item) => {
      return item.title.trim().includes(searchItem);
    });

    if (searchItem.length === 0) {
      return setSearchedList("");
    }

    setSearchedList(filteredData);


    
  }

  //! handle filter

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
            searchedList={searchedList}
            setSearchedList={setSearchedList}
            searchFilterData={searchFilterData}
            setSearchFilterData={setSearchFilterData}
            personName1={personName1}
            handleChange={handleChange}
            handleChange1={handleChange1}
            personName={personName}
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

function Todo({
  rows,
  onUpdate,
  obj,
  onDelete,
  onSearch,
  search,
  searchedList,
  setSearchedList,
  dataNotFound,
  searchFilterData,
  setSearchFilterData,
  handleChange,
  handleChange1,
  personName1,
  personName,
  
}) {
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


          {/* <p className="flex filter">
            <Filter rows={rows} setSearchedList={setSearchedList} filters={priority} searchedList={searchedList} searchFilterData={searchFilterData}
            setSearchFilterData={setSearchFilterData}/>
          </p> */}

          <p className="flex filter">
            <Filter rows={rows} setSearchedList={setSearchedList} filters={status} searchedList={searchedList} searchFilterData={searchFilterData}
              setSearchFilterData={setSearchFilterData} 
              personName={personName}
              personName1={personName1}
              handleChange={handleChange}
              handleChange1={handleChange1}/>
          </p>


        </div>
        <List
          rows={rows}
          onUpdate={onUpdate}
          obj={obj}
          onDelete={onDelete}
          searchedList={searchedList}
          dataNotFound={dataNotFound}
          search={search}
          personName={personName}
          personName1={personName1}
        />
      </div>
    </>
  );
}

function List({
  search,
  rows,
  onUpdate,
  obj,
  onDelete,
  searchedList,
  filteredItems,
  dataNotFound,
  personName,
  personName1
}) {
  return (
    <CustomizedTables
      search={search}
      rows={rows}
      onUpdate={onUpdate}
      obj={obj}
      onDelete={onDelete}
      searchedList={searchedList}
      filteredItems={filteredItems}
      dataNotFound={dataNotFound}
      personName={personName}
      personName1={personName1}
    />
  );
}
