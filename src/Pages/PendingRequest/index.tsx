import React, { useEffect, useState } from 'react';
import { pendingRequest } from '../../Apiservice/apiservice';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

interface responseArray {
    id: number,
    user_name: string,
    _id: string,
    startDate: string,
    endDate: string,
    status: string,
    leave_type: string,
    email: string,
    description: string,
    createdAt: string
}


const columns: GridColDef[] = [
    { field: 'id', headerName: 'S.N', width: 100 },
    {
        field: 'user_name',
        headerName: 'Name',
        width: 200,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: false,
    },
    {
        field: 'leave_type',
        headerName: 'Leave Type',
        // type: 'number',
        width: 150,
        editable: false,

    },
    {
        field: 'status',
        headerName: 'Current Status',
        description: 'This column has a value getter and is not sortable.',
        // sortable: false,
        width: 200,
        renderCell: (params) => (
            <div style={{background:'#cc9035',color:'white',borderRadius:'8px'}} className='text-center p-1 '>

                pending
            </div>
        )
    },
    {
        field: '_id',
        headerName: 'View More',
        description: 'This column has a value getter and is not sortable.',
        width: 200,
        renderCell: (params) => (
            <Button >
                View more
            </Button>
        )
    }
];


const PendingRequest = () => {
    const [rows, setRows] = useState<any>([]);
    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 'T12032001', details: 'apply' },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 'T12032065', details: 'apply' },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 'T12032098', details: 'apply' },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 'T12032001', details: 'apply' },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 'T12032035', details: 'apply' },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 'T12032075', details: 'apply' },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 'T12032023', details: 'apply' },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 'T12032001', details: 'apply' },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 'T12032001', details: 'apply' },
    // ];
    useEffect(() => {
        pendingRequest()
            .then((res) => {
                let response = res.data;
                let tempArray: responseArray[] = [];
                response.filter((response: responseArray, index: number) => {
                    return tempArray.push({
                        id: index + 1,
                        user_name: response.user_name,
                        _id: response._id,
                        startDate: `${response.startDate}`,
                        endDate: `${response.endDate}`,
                        status: response.status,
                        leave_type: response.leave_type,
                        email: response.email,
                        description: response.description,
                        createdAt: response.createdAt
                    })
                })
                setRows(tempArray)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [10000])
    console.log(rows, "data");


    return (
        <div>
            {rows.length > 0 && <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    // setRowSelectionModel(newRowSelectionModel);
                    console.log(newRowSelectionModel);
                }}
            />
            }

        </div>
    )
}
export default PendingRequest