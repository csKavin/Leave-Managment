import React, { useEffect, useState } from 'react';
import { pendingRequest, approveLeave } from '../../Apiservice/apiservice';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { Button, Typography, TextField, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface responseArray {
    id: number,
    _id: string,
    startDate: string,
    endDate: string,
    status: string,
    leave_type: string,
    description: string,
    createdAt: string,
    user_name: string,
    email: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '58%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    'box-shadow': '0 0 40px rgba(0,0,0,0.16)',
    boxShadow: 24,
    p: 4,
};


const PendingRequest = () => {
    const [rows, setRows] = useState<any>([]);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState<any>({})
    const [search, setSearch] = React.useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };
    const handleOpen = (params: any) => {
        console.log(params);
        setData(params);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        pendingRequest()
            .then((res) => {
                let response = res.data;
                let tempArray: responseArray[] = response.map((response: responseArray, index: number) => ({
                    id: index + 1,
                    _id: response._id,
                    startDate: `${response.startDate}`,
                    endDate: `${response.endDate}`,
                    status: response.status,
                    leave_type: response.leave_type,
                    description: response.description,
                    createdAt: response.createdAt,
                    user_name: response.user_name,
                    email: response.email
                })).filter((item: any) => item.status.toLowerCase() === "approved");
                setRows(tempArray)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [10000])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'S.N', width: 10 },
        {
            field: 'user_name',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: false,
        },
        {
            field: 'leave_type',
            headerName: 'Leave Type',
            width: 300,
            editable: false,

        },
        {
            field: 'status',
            headerName: 'Current Status',
            description: 'This column has a value getter and is not sortable.',
            width: 200,
            renderCell: (params) => (
                <div style={{ color: 'green' }} className='text-center p-2'>
                    {params.row.status}
                </div>
            )
        },
        {
            field: '_id',
            headerName: 'View More',
            description: 'This column has a value getter and is not sortable.',
            width: 200,
            renderCell: (params) => (
                <Button onClick={() => handleOpen(params.row)}>
                    View more
                </Button>
            )
        }
    ];


    return (
        <React.Fragment>
            <Typography sx={{ flexGrow: 1, color: 'theme.main', fontWeight: 'bold' }}>Approved Request</Typography>
            <div className='d-flex justify-content-end gap-3 align-items-center'>
                <Typography className='fw-bold' sx={{ color: 'theme.main' }} >Search</Typography>
                <TextField placeholder='By name' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                {rows.length > 0 ? <DataGrid
                    rows={rows.filter((item: responseArray) => item.user_name.toLowerCase().includes(search.toLowerCase()))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    // checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        // setRowSelectionModel(newRowSelectionModel);
                        console.log(newRowSelectionModel);
                    }}
                /> : <Typography className='text-center'>No Approved leave request</Typography>
                }

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography className='fw-bold'>User Name</Typography>
                            <Typography>{data.user_name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='fw-bold'>Email</Typography>
                            <Typography>{data.email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='fw-bold'>User Id</Typography>
                            <Typography>{data._id}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='fw-bold'>Start Date</Typography>
                            <Typography>{data.startDate}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='fw-bold'>End Date</Typography>
                            <Typography>{data.endDate}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='fw-bold'>Status</Typography>
                            <Typography color={"red"}>{data.status}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='fw-bold'>Description</Typography>
                            <Typography >{data.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='fw-bold'>Leave Type</Typography>
                            <Typography >{data.leave_type}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    )
}
export default PendingRequest