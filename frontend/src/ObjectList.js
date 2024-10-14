import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { apiFetch } from './utils/api';
import Alert from '@mui/material/Alert';

const ObjectList = ({columns, api_url}) => {
  const [objects, setObjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Assuming the page size is 10
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchObjects = async (pageNumber) => {
    setLoading(true);
    setError(false);
    try {
      const response = await apiFetch(
        `${api_url}?page=${pageNumber}`,
      );
      const data = await response.json();
      setObjects(data.results);
      setRowCount(data.count);
      setPageSize(data.results.length);
    } catch (error) {
      console.error("Failed to fetch objects", error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchObjects(page);
  }, [page]);

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={objects}
        columns={columns}
        getRowId={(row) => row.uuid}
        paginationMode="server"
        rowCount={rowCount}
        pageSize={pageSize}
        page={page - 1} // DataGrid uses 0-based index
        onPaginationModelChange={(model) => setPage(model.page + 1)}
        onRowClick={(params) => {
            const uuid = params.row.uuid;
            navigate(`./detail/${uuid}`);
        }}
        loading={loading}
        disableSelectionOnClick
        autoPageSize
        components={{
            NoRowsOverlay: () => (
              <div style={{ padding: 20, textAlign: 'center' }}>
                {error ? <Alert severity="error">{error}</Alert> : 'No data available'}
              </div>
            ),
          }}
        sx={{
            '& .MuiDataGrid-row': {
                cursor: 'pointer',
            }
        }}
      />
    </div>
  );
};

export default ObjectList;