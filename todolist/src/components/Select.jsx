import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Avtar from './Avtar';



export default function Select({ obj, condition, setCondition }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    defaultValue={obj[1].value}
                    helperText={obj[1].value === "milan" ? `Please select People's for work` : `Please select Task's condition`}
                >
                    {obj.map((option) => (
                        <MenuItem key={option.value} value={option.value} onClick={() => setCondition(option.value)}>
                            {/* {option.label} */}

                            {obj[1].value === "milan" ? <Avtar>{option.label}</Avtar> : option.label}

                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}