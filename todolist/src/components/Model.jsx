import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Select from './Select';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    gap: "10px",
    flexDirection: "column",
};




export default function BasicModal({ onclick, obj, todos, children, row }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [curntCondition, setCurntCondition] = useState("completed");


    useEffect(() => {
        if (!row) return
        setTitle(row.title)
        setDescription(row.description)
        setCurntCondition(row.status)

    }, [row])

    function handleSubmit(e) {
        e.preventDefault();

        if (onclick) onclick({ title, description, curntCondition });

        if (row) onclick({ title, description, curntCondition, id: row.id });

        setTitle("");
        setDescription("");
        setCurntCondition("completed");
        handleClose(true);
    }

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleOpen}>{children}</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Task
                        </Typography>

                        <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth={true} value={title} onChange={(e) => setTitle(e.target.value)} />

                        <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth={true} value={description} onChange={(e) => setDescription(e.target.value)} />


                        {/* this component for select is task is pending or not */}
                        <Select obj={obj ? obj : ""} condition={curntCondition} setCondition={setCurntCondition} />


                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
}