import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { apiFetch } from './utils/api';


const ObjectList = ({columns, api_url}) => {
  const [objects, setObjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Assuming the page size is 10
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchObjects = async (pageNumber) => {
    setLoading(true);
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
        loading={loading}
        disableSelectionOnClick
        autoPageSize
      />
    </div>
  );
};

export default ObjectList;