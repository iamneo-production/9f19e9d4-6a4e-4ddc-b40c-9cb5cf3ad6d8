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
import { Button } from '@mui/material';
import Panel from './Panel/Panel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllocationData = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Fetch data from your API
    axios.get('http://localhost:3002/inventory')
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
const handleActionClick = (item) => {
  setSelectedItem(item);

  if (item.isAllocated === 'true') {
      // If the item is already allocated, perform deallocation directly
      handleDeallocate(item);
  } else {
      // If the item is not allocated, open the panel for allocation
      setSelectedUser(item.allocatedTo || '');
      setDialogOpen(true);
  }
};
const fetchInventoryData = () => {
  axios.get('http://localhost:3002/inventory')
      .then(response => {
          setRows(response.data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
};
const handleDeallocate = (item) => {
  const deallocateData = {
      id: item.id,
      name: item.name,
      desc: item.desc,
      category: item.category,
      quantity: item.quantity,
      isAllocated: "false", // Set isAllocated to false
      location: item.location,
      allocatedTo: null, // Remove allocatedTo value
  };

  // Send a PUT request to update the item
  axios.put(`http://localhost:3002/inventory/${item.id}`, deallocateData)
      .then(response => {
          // Handle success, e.g., refresh data or show a success message
          console.log(`Deallocated item with ID ${item.id}`);
          toast.success('🚀 Item Deallocated', {
              position: "top-right",
              autoClose: 5000,
              // ...other toast settings
          });
          // Optionally, refresh your data
          fetchInventoryData();
      })
      .catch(error => {
          // Handle error, e.g., show an error message
          console.error('Error deallocating item:', error);
          toast.error('❌ Error Deallocating Item', {
              position: "top-right",
              autoClose: 5000,
              // ...other toast settings
          });
      });
};

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
              <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
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
                <TableCell>
                                    <Button
                                        variant="outlined"
                                        sx={{color:"blue"}}
                                        onClick={() => handleActionClick(row)}
                                    >
                                        {row.isAllocated == 'true' ? 'Deallocate' : 'Allocate'}
                                    </Button>
                                </TableCell>
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

export default AllocationData;
