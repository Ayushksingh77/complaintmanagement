"use client";
import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Typography, FormControl, InputLabel, Alert } from '@mui/material';
import axios from 'axios';

const statusOptions = ['Pending', 'In Progress', 'Resolved'];
const priorityOptions = ['Low', 'Medium', 'High'];

export default function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const fetchComplaints = async () => {
    const res = await axios.get('/api/complaints');
    setComplaints(res.data);
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleStatusChange = async (id, status) => {
    await axios.put(`/api/complaints/${id}`, { status });
    fetchComplaints();
  };

  const handleDelete = async id => {
    await axios.delete(`/api/complaints/${id}`);
    fetchComplaints();
  };

  const filtered = complaints.filter(c =>
    (filterStatus ? c.status === filterStatus : true) &&
    (filterPriority ? c.priority === filterPriority : true)
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7f6', py: 8 }}>
      <Paper elevation={4} sx={{ maxWidth: 1100, mx: 'auto', p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={700} color="primary.main" align="center">
          All Complaints
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} label="Status" onChange={e => setFilterStatus(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Priority</InputLabel>
            <Select value={filterPriority} label="Priority" onChange={e => setFilterPriority(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {priorityOptions.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e3e9f7' }}>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date Submitted</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((c, idx) => (
                <TableRow key={c._id} sx={{ backgroundColor: idx % 2 === 0 ? '#f9fafb' : '#f1f3f6' }}>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.priority}</TableCell>
                  <TableCell>{new Date(c.dateSubmitted).toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={c.status} onChange={e => handleStatusChange(c._id, e.target.value)} size="small">
                      {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(c._id)} sx={{ borderRadius: 2, fontWeight: 600 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Alert severity="info" sx={{ my: 2 }}>No complaints found.</Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 