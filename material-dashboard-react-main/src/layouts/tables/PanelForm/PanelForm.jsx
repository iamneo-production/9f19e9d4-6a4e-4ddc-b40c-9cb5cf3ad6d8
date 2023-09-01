import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    allocatedTo: Yup.string().required('User is required'),
});

const PanelForm = ({ selectedItem, allocatedTo, onSubmit, onClose }) => {
    const navigate = useNavigate();
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        width: '1000px', // Adjust width as needed
        borderRadius: '10px', // Add border radius
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
    };

    const { errors, touched, handleChange, handleBlur } = Formik;
    const [allocateTo, setAllocateTo] = useState('')
    const [userData, setUserData] = useState([])
    const handleInput = (e) => {
        console.log(e.target.value)
        setAllocateTo(e.target.value)
    }
    const formFieldStyle = {
        marginBottom: '15px',
    };

    const errorStyle = {
        color: 'red',
        marginTop: '5px',
    };

    const handleSubmit = () => {
        const allocationData = { id: selectedItem.id, name: selectedItem.name, desc: selectedItem.desc, category: selectedItem.category, quantity: selectedItem.quantity, isAllocated: "true", location: selectedItem.location, allocatedTo: allocateTo }
        console.log(allocationData)
        console.log(allocateTo)

        fetch("http://localhost:3002/inventory/" + selectedItem.id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(allocationData)
        }).then((res) => {
            console.log(res)
            toast.success('🦄 User Allocated', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                navigate('/dashboard')
            },2000)
        }).catch((err) => {
            console.log(err.message)
        })

    }
    useEffect(() => {
        fetch('http://localhost:3002/users')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setUserData(data)
                } else {
                    console.log("error")
                }
            })
            .catch(error => {
                console.log("error")
            })
    }, [])

    return (
        <>
        <ToastContainer/>
        <Formik
            initialValues={{
                id: selectedItem?.id || '',
                name: selectedItem?.name || '',
                desc: selectedItem?.desc || '',
                category: selectedItem?.category || '',
                quantity: selectedItem?.quantity || '',
                isAllocated: selectedItem?.isAllocated || false,
                allocatedTo: selectedItem?.allocatedTo || '',
                location: selectedItem?.location || ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form style={formStyle}>
                    {
                        errors && (
                            <Typography variant="caption" sx={{ color: "red", fontSize: "14px" }}>
                                *Please fill all the necessary fields
                            </Typography>
                        )
                    }
                    <div >
                        <Grid container py={3} sx={{ justifyContent: "space-between" }}>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="ID"
                                    name="id"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.id || ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="Name"
                                    name="name"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.name || ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="Description"
                                    name="desc"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.desc || ""}
                                />
                            </Grid>
                        </Grid>
                        <Grid container py={3} sx={{ justifyContent: "space-between" }}>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="Category"
                                    name="category"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.category || ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="Quantity"
                                    name="quantity"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.quantity || ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="Location"
                                    name="location"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.location || ""}
                                />
                            </Grid>
                        </Grid>
                        <Grid container py={3} sx={{ justifyContent: "space-between" }}>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <TextField
                                    id="standard-basic"
                                    label="Is Allocated"
                                    name="isAllocated"
                                    component="div"
                                    variant="standard"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    value={selectedItem?.isAllocated || "False"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3.2}>
                                <div style={formFieldStyle}>
                                    <FormControl fullWidth variant="standard">
                                        <label  >Allocate To</label>
                                        <select
                                            id="allocatedTo"
                                            name="allocatedTo"
                                            onChange={handleInput} // Attach onChange event handler
                                            value={allocateTo} // Set the value from the state
                                            style={{ padding: "10px", height: "35px" }} // Adjust styling
                                        >
                                            <option value="">Select User</option>
                                            {userData.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.id}
                                                </option>
                                            ))}
                                        </select>
                                        {touched?.allocatedTo && errors?.allocatedTo ? (
                                            <div style={errorStyle}>{errors?.allocatedTo}</div>
                                        ) : null}
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" disabled={isSubmitting}
                            sx={{
                                mr: "1",
                                color: "white",
                                background: "#232526",
                                background: "linear-gradient(to right,#232526,#414345)"
                            }}
                        >
                            {selectedItem?.isAllocated == 'true' ? 'Deallocate' : 'Allocate'}
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button variant="contained"
                            color="info"
                            sx={{
                                color: "white",
                                background: "red",
                            }}
                            onClick={onClose}>Cancel</Button>
                    </Box>

                </Form>
            )}
        </Formik>
        </>
    );
};

export default PanelForm;
