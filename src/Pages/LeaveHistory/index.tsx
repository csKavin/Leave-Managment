import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { Button, Typography ,TextField} from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'S.N' },
  {
    field: 'Type',
    headerName: 'Leave Type',
    width: 200,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    editable: false,
    flex:1
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: false,
  }
];

const rows = [
  { id: 1, Type: 'Casual Leave',description:'Hey I have fever from morning have fever from morning have fever from morning', status: 'pending'},
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
                <TextField placeholder='By Type' onChange={handleChange}/>
            </div>
      <Box  className='mt-4'>
        <DataGrid
          rows={rows.filter(item => item.Type.toLowerCase().includes(search.toLowerCase()))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[10]}
        //   checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            // setRowSelectionModel(newRowSelectionModel);
            console.log(newRowSelectionModel);
          }}
        />
      </Box>
    </React.Fragment>
  );
}
