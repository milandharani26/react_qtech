import * as React from "react";
import Avatar from "@mui/material/Avatar";
// import Stack from '@mui/material/Stack';
// import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Avtar({ children }) {
    return (
        <>
            <div className="flex justify-between">
                <Avatar>{children.slice(0, 1)}</Avatar>
                <span>{children}</span>
            </div>
        </>
    );
}
