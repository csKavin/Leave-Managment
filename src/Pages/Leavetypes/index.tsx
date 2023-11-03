import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { getLeave, postLeave, deleteLeave } from '../../Apiservice/apiservice';

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
        field: 'leaveType',
        headerName: 'Leave Type',
        editable: false,
        minWidth: 300
    },
    {
        field: 'description',
        headerName: ' Description',
        editable: false,
        // minWidth:300,
        flex: 1
    },
    {
        field: 'createDate',
        headerName: 'Created',
        // type: 'number',
        editable: false,
        minWidth: 300
    }
];

interface leaveData {
    userId: string,
    id: number,
    leaveType: string,
    description: string,
    createDate: string
}
interface leaveany {
    _id: string,
    id: number,
    leavetype: string,
    content: string,
    createdAt: string
}

export default function LeaveTypes() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<leaveData[]>([]);
    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    const [selected, setSelected] = React.useState<number | null>();
    const [payload, setPayload] = React.useState({
        leavetype: "",
        content: ""
    })
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };

    React.useEffect(() => {
        getLeave()
            .then((res) => {
                if (res.data) {
                    let response = res.data;
                    console.log("responseLion", response);

                    let tempArray: leaveData[] = response.map((res: leaveany, index: number) => ({
                        userId: res?._id,
                        id: index + 1,
                        leaveType: res.leavetype,
                        description: res.content,
                        createDate: res.createdAt
                    }))
                    setData(tempArray)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [refresh])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setPayload((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        postLeave(payload)
            .then((res) => {
                handleClose();
                setRefresh(!refresh)
                alert("saved successfully")
            })
            .catch((err) => {
                console.log(err);

            })
    }

    const handleDelete = () => {
        if (selected) {
            let tempObject = data[selected-1]
            let id: string = tempObject?.userId;            
            if (id) {
                deleteLeave(id)
                    .then((res) => {
                        if (res.data) {
                            alert("deleted successfully");
                            handleClose();
                            setRefresh(!refresh)
                        }
                    })
                    .catch((err) => {
                        alert("something went wrong")
                    })
            }
        }
    }

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
                    rows={data.filter((item: any) => item?.leaveType.toLowerCase().includes(search.toLowerCase()))}
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
                    onRowSelectionModelChange={(row) => {
                        let data: any = row[0];
                        setSelected(data)
                    }}
                />
                <div className='d-flex justify-content-end mt-4 '>
                    <Button onClick={handleDelete}>Delete Leave Type</Button>
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
                    <TextField className='w-100 mt-2' name='leavetype' required onChange={handleOnChange} />
                    <Typography sx={{ color: 'theme.main' }} className='mt-4'>Description</Typography>
                    <TextField className='w-100 mt-2' name='content' required onChange={handleOnChange} />
                    <div className='d-flex justify-content-end mt-4 gap-3'>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Add Leave</Button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
