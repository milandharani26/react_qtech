// import { useState } from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };


// export default function Filter({ rows, setSearchedList, filters, searchedList }) {
//     const [filterItem, setFilterItem] = useState([]);

   



//     const handleChange = (e) => {
//         const { target: { value }, } = e;
//         setFilterItem(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );
//         const markedData = e.target.value.map((e) => e.toLowerCase());
        
//         const sortedData = rows.filter((item) => {
//             const status = markedData.some((e) => item.status.includes(e));
//             // const assignTo = markedData.some((e) => item.assignTo.includes(e));
//             const priority = markedData.some((e) => item.priority.includes(e));

//             console.log(status, priority, "filter");

//             if (status || priority) return item;
//         })

//         setSearchedList(sortedData);
//     };


//     return (
//         <div>
//             <FormControl sx={{ m: 1, width: 300 }}>
//                 <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
//                 <Select
//                     labelId="demo-multiple-checkbox-label"
//                     id="demo-multiple-checkbox"
//                     multiple
//                     value={filterItem}
//                     onChange={handleChange}
//                     input={<OutlinedInput label="Tag" />}
//                     renderValue={(selected) => selected.join(', ')}
//                     MenuProps={MenuProps}
//                 >
//                     {filters.map((name) => (
//                         <MenuItem key={name} value={name}>
//                             <Checkbox checked={filterItem.indexOf(name) > -1} />
//                             <ListItemText primary={name} />
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </div>
//     );
// }

import * as React from "react";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusData = ["pending", "completed", "not started"];

const priorityData = ["high", "medium", "low"];

// rows, setSearchedList, filters, searchedList 

export default function Filter({
  rows,
  setSearchedList,
  searchFilterData,
  setSearchFilterData,
  handleChange,
  handleChange1,
  personName1,
  personName,
}) {
//   const [personName, setPersonName] = useState([]);
//   const [personName1, setPersonName1] = useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

//   const handleChange1 = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName1(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

  const [statusFilters, setStatusFilters] = useState([]);
  const [priorityFilters, setPriorityFilters] = useState([]);

  const handleStatusChange = (e) => {
    const checkedData = e.target.value.map((e) => e.toLowerCase());
    const filteredData = rows.filter((item) => {
      return checkedData.every((status) =>
        item.status.toLowerCase().includes(status)
      );
    });
    setStatusFilters(filteredData);
    updateFilteredData(filteredData, priorityFilters);
  };

  const handlePriorityChange = (e) => {
    const checkedData = e.target.value.map((e) => e.toLowerCase());
    const filteredData = rows.filter((item) => {
      return checkedData.every((priority) =>
        item.priority.toLowerCase().includes(priority)
      );
    });
    setPriorityFilters(filteredData);
    updateFilteredData(statusFilters, filteredData);
  };

  const updateFilteredData = (statusFilteredData, priorityFilteredData) => {
    console.log(statusFilteredData, "statusFilteredData");
    console.log(priorityFilteredData, "priorityFilteredData");
    const commonData = statusFilteredData.filter((statusItem) =>
      priorityFilteredData.some(
        (priorityItem) => priorityItem.id === statusItem.id
      )
    );

    setSearchedList(commonData);

    setSearchFilterData(commonData);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={(e) => {
            handleChange(e);
            handleStatusChange(e);
          }}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {statusData.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Priority</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName1}
          onChange={(e) => {
            handleChange1(e);
            handlePriorityChange(e);
          }}
          input={<OutlinedInput label="Priority" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {priorityData.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName1.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

// const handleStatusChange = (e) => {
//   const checkedData = e.target.value.map((e) => e.toLowerCase());

//   const sortData = data.filter((item) => {
//     const isStatus = checkedData.some((e) => item.status.includes(e));
//     console.log(isStatus);
//     if (isStatus) return item;
//   });
//   console.log(sortData);
//   if (checkedData.length > 0) {
//     setStatusFilters(sortData);
//     setDupData(sortData);
//     setSearchFilterData(sortData);
//   } else {
//     setDupData(data);
//     setSearchFilterData(data);
//   }
// };

// const handlePriorityChange = (e) => {
//   const checkedData = e.target.value.map((e) => e.toLowerCase());

//   const sortData = data.filter((item) => {
//     const isPriority = checkedData.some((e) => item.priority.includes(e));
//     console.log(isPriority, "isPriority");
//     if (isPriority) return item;
//   });
//   console.log(sortData);
//   if (checkedData.length > 0) {
//     setPriorityFilters(sortData);
//     setDupData(sortData);
//     setSearchFilterData(sortData);
//   } else {
//     setDupData(data);
//     setSearchFilterData(data);
//   }
// };
