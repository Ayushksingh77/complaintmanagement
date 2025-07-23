
"use client";
import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, RadioGroup, FormControlLabel, Radio, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';

const categories = ['Product', 'Service', 'Support'];
const priorities = ['Low', 'Medium', 'High'];

export default function ComplaintForm() {
  const [form, setForm] = useState({ title: '', description: '', category: '', priority: 'Low' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      console.log(form);
      await axios.post('/api/complaints', form);
      setSuccess('Complaint submitted successfully!');
      setForm({ title: '', description: '', category: '', priority: 'Low' });
    } catch (err) {
      setError('Failed to submit complaint.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'transparent', py: 8 }}>
      <Paper elevation={4} sx={{
        maxWidth: 480,
        mx: 'auto',
        p: 4,
        borderRadius: 4,
        boxShadow: 3,
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(255,255,255,0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Image src="/globe.svg" alt="Logo" width={56} height={56} />
        </Box>
        <Typography variant="h4" mb={3} fontWeight={700} color="primary.main" align="center">
          Submit a Complaint
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth required margin="dense" variant="outlined" />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth required margin="dense" multiline rows={4} variant="outlined" />
          <TextField select label="Category" name="category" value={form.category} onChange={handleChange} fullWidth required margin="dense" variant="outlined">
            {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Typography variant="subtitle1" sx={{ minWidth: 70 }}>Priority:</Typography>
            <RadioGroup row name="priority" value={form.priority} onChange={handleChange}>
              {priorities.map(p => (
                <FormControlLabel key={p} value={p} control={<Radio />} label={p} />
              ))}
            </RadioGroup>
          </Box>
          <Button type="submit" variant="contained" size="large" sx={{
            mt: 2,
            borderRadius: 2,
            fontWeight: 600,
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)',
            boxShadow: '0 4px 24px 0 rgba(33,203,243,0.15)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 8px 32px 0 rgba(33,203,243,0.25)',
              background: 'linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)',
            },
          }}>
            Submit
          </Button>
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      </Paper>
    </Box>
  );
} 