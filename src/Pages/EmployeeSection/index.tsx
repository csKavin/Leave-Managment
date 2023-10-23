import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { Button, Typography ,TextField} from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'S.N', width: 100 },
  {
    field: 'firstName',
    headerName: 'Employee Id',
    width: 200,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Full Name',
    width: 200,
    editable: false,
  },
  {
    field: 'age',
    headerName: 'Applied On',
    // type: 'number',
    width: 150,
    editable: false,

  },
  {
    field: 'fullName',
    headerName: 'Current Status',
    description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'details',
    headerName: '',
    description: 'This column has a value getter and is not sortable.',
    width: 200,
    renderCell: (params) => {
      const onClick = () => {
        alert(params);
      };
      return <Button variant="contained" sx={{ bgcolor: 'theme.light' }} onClick={onClick}>View Details</Button>;
    },
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 'T12032001', details: 'apply' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 'T12032065', details: 'apply' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 'T12032098', details: 'apply' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 'T12032001', details: 'apply' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 'T12032035', details: 'apply' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 'T12032075', details: 'apply' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 'T12032023', details: 'apply' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 'T12032001', details: 'apply' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 'T12032001', details: 'apply' },
];

export default function DataGridDemo() {
  const [search, setSearch] = React.useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
};
  return (
    <React.Fragment>
      <Typography sx={{ flexGrow: 1, color: 'theme.main', fontWeight: 'bold' }}>Employee Section</Typography>
      <div className='d-flex justify-content-end gap-3 align-items-center'>
                <Typography className='fw-bold' sx={{color:'theme.main'}}>Search</Typography>
                <TextField placeholder='By Name' onChange={handleChange}/>
            </div>
      <Box sx={{
        width: '100%',
      }} className='mt-4'>
        <DataGrid
          rows={rows.filter(item => item.lastName.toLowerCase().includes(search.toLowerCase()))}
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
      </Box>
    </React.Fragment>
  );
}
