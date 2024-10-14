import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { apiFetch } from './utils/api';
import { Box, Fab, IconButton, TextField, Stack } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Alert from '@mui/material/Alert';

const ObjectList = ({columns, api_url}) => {
  const [objects, setObjects] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [pageSize, setPageSize] = useState(20);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [sortModel, setSortModel] = useState([]);

  const fetchObjects = async (pageNumber) => {
    const sortParams = sortModel.map(({ field, sort }) => `${sort === 'desc'? '-' : ''}${field}`).join(',');
    setLoading(true);
    setError(false);
    try {
      const response = await apiFetch(
        `${api_url}?page=${pageNumber}${search ? `&search=${search}` : ''}${sortParams ? `&o=${sortParams}` : ''}`,
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
  }, [page, search, sortModel]);

  const handleSortModelChange = (model) => {
    setSortModel(model); // Установка модели сортировки
  };

  const handleSearch = (event) => {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    setSearch(event.target.value);
    setTypingTimeout(setTimeout(() => {
    }, 500));
  }
  return (
    <Box sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="justify" mb={2}>
            <Stack direction="row" alignItems="flex-end">
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <TextField
                id="standard-search"
                label="Поиск"
                type="search"
                variant="standard"
                value={search}
                onChange={handleSearch}
              />
            </Stack>
            <Fab variant="extended" onClick={()=> {navigate('./create')}}>
              <AddCircleOutlineOutlinedIcon /> Создать
            </Fab>
        </Box>
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
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
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
    </Box>
  );
};

export default ObjectList;