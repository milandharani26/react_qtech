import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "./Select";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from '@mui/material/Stack';
import BasicModal from "./Model";

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

const priority = [
  {
    value: "select",
    label: "select",
  },
  {
    value: "high",
    label: "high",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "low",
    label: "low",
  },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ search, rows, obj, onUpdate, onDelete, searchedList, filteredItems, personName, personName1 }) {

  console.log(rows, "table");
  console.log(searchedList, searchedList.length, "search list inside table")
  // console.log(filteredItems, "set filtered items")



  return (
    <>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>priority</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
            <StyledTableCell align="right">Assign to</StyledTableCell>
            <StyledTableCell align="right">Generate Time</StyledTableCell>
            <StyledTableCell align="right">Updated time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {/* {search || searchedList.length > 0 ? (searchedList.map((row, i) => (
            <StyledTableRow key={i}>

              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                <Select obj={priority} setCondition={onUpdate} row={row} defaulte={row.priority} />
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>

              <StyledTableCell align="right">{row.description}</StyledTableCell>

              <StyledTableCell align="right" style={{ position: "relative" }}>

                <div className={`status ${row.status === "completed" ? "green" : (row.status === "pending" ? "red" : "gray")}`}></div>
                {row.status}

              </StyledTableCell>

              <StyledTableCell align="right">
                <Stack direction="row-reverse" spacing={2}>

                  <BasicModal onclick={onUpdate} obj={obj} row={row}><EditIcon /></BasicModal>

                  <Button variant="contained" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </Stack>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Select obj={people} setCondition={onUpdate} row={row} defaulte={row.assignTo} />
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[0]}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[row.time.length - 1] ? row.time[row.time.length - 1] : ""}
              </StyledTableCell>


            </StyledTableRow>
          ))) : rows.map((row, i) => (
            <StyledTableRow key={i}>

              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                <Select obj={priority} setCondition={onUpdate} row={row} defaulte={row.priority} />
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>

              <StyledTableCell align="right">{row.description}</StyledTableCell>

              <StyledTableCell align="right" style={{ position: "relative" }}>

                <div className={`status ${row.status === "completed" ? "green" : (row.status === "pending" ? "red" : "gray")}`}></div>
                {row.status}

              </StyledTableCell>

              <StyledTableCell align="right">
                <Stack direction="row-reverse" spacing={2}>

                  <BasicModal onclick={onUpdate} obj={obj} row={row}><EditIcon /></BasicModal>

                  <Button variant="contained" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </Stack>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Select obj={people} setCondition={onUpdate} row={row} defaulte={row.assignTo} />
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[0]}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[row.time.length - 1] ? row.time[row.time.length - 1] : ""}
              </StyledTableCell>


            </StyledTableRow>
          ))} */}


          {search || searchedList.length > 0 ? (searchedList.filter((item) => {
            if (personName.length && personName1.length) {
              console.log("1");
              return (
                personName.every((status) =>
                  item.status.toLowerCase().includes(status.toLowerCase())
                ) &&
                personName1.every((priority) =>
                  item.priority.toLowerCase().includes(priority.toLowerCase())
                )
              );
            } else if (personName.length) {
              console.log("2", rows, personName);
              return personName.every((status) =>
                item.status.toLowerCase().includes(status.toLowerCase())
              );
            } else if (personName1.length) {
              console.log("3");
              return personName1.every((priority) =>
                item.priority.toLowerCase().includes(priority.toLowerCase())
              );
            } else {
              return true;
            }
          }).map((row, i) => (
            <StyledTableRow key={i}>

              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                <Select obj={priority} setCondition={onUpdate} row={row} defaulte={row.priority} />
                {/* {row.priority} */}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>

              <StyledTableCell align="right">{row.description}</StyledTableCell>

              <StyledTableCell align="right" style={{ position: "relative" }}>

                <div className={`status ${row.status === "completed" ? "green" : (row.status === "pending" ? "red" : "gray")}`}></div>
                {row.status}

              </StyledTableCell>

              <StyledTableCell align="right">
                <Stack direction="row-reverse" spacing={2}>

                  <BasicModal onclick={onUpdate} obj={obj} row={row}><EditIcon /></BasicModal>

                  <Button variant="contained" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </Stack>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Select obj={people} setCondition={onUpdate} row={row} defaulte={row.assignTo} />
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[0]}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[row.time.length - 1] ? row.time[row.time.length - 1] : ""}
              </StyledTableCell>


            </StyledTableRow>
          ))) : rows.filter((item) => {
            if (personName.length && personName1.length) {
              console.log("1");
              return (
                personName.every((status) =>
                  item.status.toLowerCase().includes(status.toLowerCase())
                ) &&
                personName1.every((priority) =>
                  item.priority.toLowerCase().includes(priority.toLowerCase())
                )
              );
            } else if (personName.length) {
              console.log("2", rows, personName);
              return personName.every((status) =>
                item.status.toLowerCase().includes(status.toLowerCase())
              );
            } else if (personName1.length) {
              console.log("3");
              return personName1.every((priority) =>
                item.priority.toLowerCase().includes(priority.toLowerCase())
              );
            } else {
              return true;
            }
          }).map((row, i) => (
            <StyledTableRow key={i}>

              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                <Select obj={priority} setCondition={onUpdate} row={row} defaulte={row.priority} />
                {/* {row.priority} */}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>

              <StyledTableCell align="right">{row.description}</StyledTableCell>

              <StyledTableCell align="right" style={{ position: "relative" }}>

                <div className={`status ${row.status === "completed" ? "green" : (row.status === "pending" ? "red" : "gray")}`}></div>
                {row.status}

              </StyledTableCell>

              <StyledTableCell align="right">
                <Stack direction="row-reverse" spacing={2}>

                  <BasicModal onclick={onUpdate} obj={obj} row={row}><EditIcon /></BasicModal>

                  <Button variant="contained" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </Stack>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Select obj={people} setCondition={onUpdate} row={row} defaulte={row.assignTo} />
                {/* <Select obj={people} /> */}

                {/* {row.assinTo} */}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[0]}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.time[row.time.length - 1] ? row.time[row.time.length - 1] : ""}
              </StyledTableCell>


            </StyledTableRow>
          ))}


        </TableBody>
      </Table>
    </>
  );
}

