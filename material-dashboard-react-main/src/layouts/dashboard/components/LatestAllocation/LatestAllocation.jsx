import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './LatestAllocation.css'
import { Typography } from '@mui/material';

const LatestAllocation = () => {
    const [rows, setRows] = useState([]);

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
    const displayedRows = rows.slice(0, 7);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <Typography style={{ marginLeft: "15px", marginTop: "25px"}}>Latest Allocations</Typography>
                <TableBody>
                    <TableRow>
                        <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                        <TableCell style={{fontWeight:"bold"}} align="left">Location</TableCell>
                        <TableCell style={{fontWeight:"bold"}} align="left">Allocate To</TableCell>
                    </TableRow>
                    {displayedRows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className="table-cell" component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className="table-cell" align="left">
                                {row.location}
                            </TableCell>
                            <TableCell className="table-cell" align="left">
                                {row.allocatedTo}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LatestAllocation;
