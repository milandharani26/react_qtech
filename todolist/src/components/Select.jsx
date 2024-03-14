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
    defaulte,
}) {

    console.log(defaulte, "default")


    function handleClick(value) {
        if (row) {

            if (value === "high" || value === "medium" || value === "low") {
                row.priority = value;
            }

            if (value === "milan" || value === "dixit" || value === "sachin") {
                row.assignTo = value;
            }

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
                    // defaultValue={typeof defaulte === "string" ? String(defaulte) : (condition ? condition : obj[1].value)}
                    defaultValue={defaulte}
                >
                    {obj.map((option, i) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            // disabled={option.value === "selct" ? true : false}
                            onClick={() => handleClick(option.value)}>
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
