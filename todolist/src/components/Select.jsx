import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Avtar from "./Avtar";

export default function Select({
    obj,
    setCondition,
    todos,
    status,
    condition,
    row,
}) {
    function handleClick(value) {
        // console.log(value, row, "rows");

        if (row) {
            row.assignTo = value;

            console.log(row, "rows");

            setCondition(row);
        }

        setCondition(value);


    }

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    defaultValue={condition ? condition : obj[1].value}
                    helperText={
                        obj[1].value === "milan"
                            ? `Please select People's for work`
                            : `Please select Task's condition`
                    }
                >
                    {obj.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            onClick={() => handleClick(option.value)}
                        >
                            {obj[1].value === "milan" ? (
                                <Avtar>{option.label}</Avtar>
                            ) : (
                                option.label
                            )}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}
