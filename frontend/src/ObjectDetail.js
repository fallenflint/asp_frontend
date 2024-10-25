import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Stack } from '@mui/material';
import { apiFetch } from './utils/api';
import {Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ObjectDetail = ({api_url, columns}) => {
  const [object, setObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { uuid } = useParams();
  const navigate = useNavigate();

  const column_map = columns.reduce((acc, column) => {
    acc[column.field] = column;
    return acc;
  }, {});

  const fetchObjects = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await apiFetch(
        `${api_url}${uuid}/`,
      );
      const data = await response.json();
      setObject(data);
    } catch (error) {
      console.error("Failed to fetch objects", error);
      setError(error);
    }
    setLoading(false);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    const response = await apiFetch(
      `${api_url}${uuid}/`,
      { method: 'DELETE'}
    );
    if (response.status == 204){
      navigate('./..')
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ pb: 2 }}>{object.name}</Typography>
      <TableContainer >
        <Table>
          <TableBody>
              {Object.entries(object).map(([key, value])=>(
                <TableRow>
                  <TableCell>{ column_map[key]?.headerName}</TableCell>
                  {/*<TableCell>{key}</TableCell>*/}
                  <TableCell>{(column_map[key]?.valueFormatter ?? ((val)=>val))(value)}</TableCell>
                </TableRow>
              ))}
          </TableBody>

        </Table>
      </TableContainer>
      <Stack direction="row" useFlexGap>
          <Button variant="outlined" color="info" sx={{ mx: 2, my: 2}} startIcon={<ArrowBackIcon />} onClick={()=>{navigate(`./..`)}}>Назад</Button>
          <Button variant="contained" color="primary" sx={{ mx: 2, my: 2}} startIcon={<EditIcon />} onClick={()=>{navigate(`./edit/`)}}>Редактировать</Button>
          <Button variant="outlined" color="error" sx={{ mx: 2, my: 2}} startIcon={<DeleteIcon />} onClick={handleDelete}>Удалить</Button>
      </Stack>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Уверены, что хотите удалить?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Отменить это действие нельзя
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="error">Да</Button>
          <Button onClick={handleClose} autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ObjectDetail;