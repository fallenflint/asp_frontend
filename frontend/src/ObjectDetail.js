import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { apiFetch } from './utils/api';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ObjectDetail = ({api_url}) => {
  const [object, setObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { uuid } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">{object.name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {Object.entries(object).map(([key, value])=>(
                <TableRow>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default ObjectDetail;