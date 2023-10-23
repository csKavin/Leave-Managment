import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '58%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    'box-shadow': '0 0 40px rgba(0,0,0,0.16)',
    boxShadow: 24,
    p: 4,
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'S.N', width: 100 },
    {
        field: 'firstName',
        headerName: ' Description',
        editable: false,
        // minWidth:300,
        flex: 1
    },
    {
        field: 'lastName',
        headerName: 'Leave Type',
        editable: false,
        minWidth: 300
    },
    {
        field: 'age',
        headerName: 'Created',
        // type: 'number',
        editable: false,
        minWidth: 300

    }
];

const rows = [
    { id: 1, lastName: 'Casual Leave', firstName: 'Provided for urgent or unforeseen matters to the employees ', age: '2023-11-01 17:07:24' },
    { id: 2, lastName: 'Medical Leave', firstName: 'Related to Health Problems', age: '2023-11-01 17:07:24' },
    { id: 3, lastName: 'Restricted Holiday', firstName: 'Holiday that is optional', age: '2023-11-01 17:07:24' },
    { id: 4, lastName: 'Paternity Leave', firstName: 'To take care of new borns ', age: '2023-11-01 17:07:24' },
    { id: 5, lastName: 'Bereavement Leave', firstName: 'Grieve their loss of losing loved ones', age: '2023-11-01 17:07:24' },
    { id: 6, lastName: 'Componsatory Leave', firstName: 'For overtime workers ', age: '2023-11-01 17:07:24' },
    { id: 7, lastName: 'Maternity Leave', firstName: 'Provided for urgent or unforeseen matters to the employees ', age: '2023-11-01 17:07:24' },
];

export default function LeaveTypes() {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };

    return (
        <React.Fragment>
            <Typography sx={{ flexGrow: 1, color: 'theme.main', fontWeight: 'bold' }}>Leave Types</Typography>
            <div className='d-flex justify-content-center'><Button onClick={handleOpen}>Add New Leave Type</Button></div>
            <div className='d-flex justify-content-end gap-3 align-items-center'>

                <Typography className='fw-bold' sx={{ color: 'theme.main' }} >Search</Typography>
                    <TextField placeholder='By Leave Type' onChange={handleChange} />

            </div>
            <Box className='mt-4'>
                <DataGrid
                    sx={{
                        width: '100%',
                    }}
                    rows={rows.filter(item => item.lastName.toLowerCase().includes(search.toLowerCase()))}
                    columns={columns}
                    rowHeight={50}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    autoHeight={true}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        console.log(newRowSelectionModel);
                    }}
                />
                <div className='d-flex justify-content-end mt-4 '>
                    <Button onClick={handleClose}>Delete Leave Type</Button>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ color: 'theme.main' }}>Leave Type</Typography>
                    <TextField className='w-100 mt-2' />
                    <Typography sx={{ color: 'theme.main' }} className='mt-4'>Description</Typography>
                    <TextField className='w-100 mt-2' />
                    <div className='d-flex justify-content-end mt-4 gap-3'>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button>Add Leave</Button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}