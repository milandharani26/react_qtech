import * as React from "react";
import { styled } from "@mui/material/styles";
// import { ThemeProvider } from "@emotion/react";
// import { theme } from "./Theme";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
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

export default function CustomizedTables({ rows, obj, onUpdate }) {
  return (
    <>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
            <StyledTableCell align="right">Assign to</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>

              <StyledTableCell align="right">{row.description}</StyledTableCell>

              <StyledTableCell align="right">
                <Select obj={obj} />
              </StyledTableCell>

              <StyledTableCell align="right">
                <Stack direction="row-reverse" spacing={2}>

                  <BasicModal onclick={onUpdate} obj={obj}><EditIcon /></BasicModal>

                  {/* <Button variant="contained">
                    <EditIcon />
                  </Button> */}
                  <Button variant="contained">
                    <DeleteIcon />
                  </Button>
                </Stack>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Select obj={people} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
