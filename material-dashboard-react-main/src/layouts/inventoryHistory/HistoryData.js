import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Panel from 'layouts/tables/Panel/Panel';

const HistoryData = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Fetch data from your API
    axios.get('http://localhost:3002/inventory?isAllocated=true')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
//   const handleActionClick = (item) => {
//     setSelectedItem(item);
//     setSelectedUser(item.allocatedTo || '');
//     setDialogOpen(true);
// };

const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
    setSelectedUser('');
};

const handleAllocateClick = (values) => {
    // Implement your allocation logic here using values.selectedUser
    console.log(`Allocating item with ID ${selectedItem.id} to user ${values.selectedUser}`);
    handleCloseDialog();
};
  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <ToastContainer/>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
          <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Is Allocated</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Allocated To</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Location</TableCell>
            </TableRow>
            {displayedRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.isAllocated}</TableCell>
                <TableCell>{row.allocatedTo}</TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Panel
                open={dialogOpen}
                onClose={handleCloseDialog}
                selectedItem={selectedItem}
                selectedUser={selectedUser}
                onSubmit={handleAllocateClick}
            />
      <TablePagination
        rowsPerPageOptions={[8, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default HistoryData;
