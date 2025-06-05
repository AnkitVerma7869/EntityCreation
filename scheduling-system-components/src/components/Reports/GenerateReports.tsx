"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Paper, TextField, Button, Checkbox } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast , Toaster } from "react-hot-toast";

interface TableData {
  name: string;
  numberofcolumn: string;
  columns: {
    columnName: string;
    dataType: string;
  }[];
  primarykeycolumnname: string;
  primarykeycolumndatatype: string;
}

interface ColumnInfo {
  id: number;
  name: string;
  dataType: string;
  isPrimaryKey: boolean;
  isSelected: boolean;
}

const GenerateReports: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTables, setSelectedTables] = useState<TableData[]>([]);
  const [tableColumns, setTableColumns] = useState<{ [key: string]: ColumnInfo[] }>({});
  const [prompt, setPrompt] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!API_URL) {
          setError("API URL is not configured");
          setLoading(false);
          return;
        }
        const response = await fetch(`${API_URL}/api/v1/entity/all-entities`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch data");
          setLoading(false);
          return;
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.success.data)) {
          setTables(data.success.data);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("Failed to fetch tables");
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, [API_URL, token]);

  const parseColumns = (table: TableData): ColumnInfo[] => {
    return table.columns
      .filter((col) => col.columnName !== table.primarykeycolumnname)
      .map((col, index) => ({
        id: index,
        name: col.columnName,
        dataType: col.dataType,
        isPrimaryKey: false,
        isSelected: false,
      }));
  };

  const handleTableSelection = (event: React.SyntheticEvent, value: TableData[]) => {
    setSelectedTables(value);
    const newTableColumns: { [key: string]: ColumnInfo[] } = {};
    value.forEach(table => {
      newTableColumns[table.name] = parseColumns(table);
    });
    setTableColumns(newTableColumns);
  };

  const handleColumnSelection = (tableName: string, columnId: number) => {
    setTableColumns(prev => ({
      ...prev,
      [tableName]: prev[tableName].map(col => 
        col.id === columnId ? { ...col, isSelected: !col.isSelected } : col
      )
    }));
  };

  const getSelectedColumns = (tableName: string): string[] => {
    const columns = tableColumns[tableName] || [];
    const selected = columns.filter(col => col.isSelected).map(col => col.name);
    return selected.length > 0 ? selected : columns.map(col => col.name);
  };

  const handleGenerateQueries = async () => {
    if (selectedTables.length === 0) {
      toast.error("Please select at least one table");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const payload = {
        prompt: prompt.trim(),
        tables: selectedTables.map(table => table.name)
      };

      const response = await fetch(`${API_URL}/api/v1/ai/generate-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to generate queries');
      }

      const data = await response.json();
      
      if (data.success && data.success.data && data.success.data.queries) {
        const formattedQueries = Object.entries(data.success.data.queries)
          .map(([queryName, query]) => `-- ${queryName}\n${query}`)
          .join('\n\n');
        
        setGeneratedOutput(formattedQueries);
        toast.success("Queries generated successfully!");
      } else {
        setGeneratedOutput("No queries were generated");
        toast.error("No queries were generated");
      }
    } catch (error) {
      toast.error("Failed to generate queries");
      setGeneratedOutput("");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = () => {
    setGeneratedOutput("");
    setPrompt("");
    setSelectedTables([]);
    setTableColumns({});
    toast.success("Query accepted!");
  };

  const handleReject = () => {
    setGeneratedOutput("");
    toast.error("Query rejected!");
  };

  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 2000, style: { background: 'white', color: 'black' }, success: { duration: 2000, style: { background: 'white', color: 'black' } }, error: { duration: 2000, style: { background: 'white', color: 'black' } } }} />
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#666', fontSize: '1.1rem', fontWeight: 500 }}>
        Select Tables
      </Typography>
      {loading ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CircularProgress size={20} />
          <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>Loading tables...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ fontSize: '0.9rem' }}>{error}</Typography>
      ) : (
        <Autocomplete
          multiple
          options={tables.filter((table) => !selectedTables.some((selected) => selected.name === table.name))}
          getOptionLabel={(option) => option.name}
          value={selectedTables}
          onChange={handleTableSelection}
          renderInput={(params) => (
            <TextField 
              {...params} 
              placeholder="Select tables"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#666',
                  fontSize: '0.9rem',
                },
              }}
            />
          )}
          sx={{ width: '100%', mb: 2 }}
        />
      )}

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 2, 
        mb: 2 
      }}>
        {selectedTables.map((table) => {
          const columns: GridColDef[] = [
            {
              field: "select",
              headerName: "Select",
              width: 80,
              renderCell: (params) => (
                <Checkbox
                  checked={params.row.isSelected}
                  onChange={() => handleColumnSelection(table.name, params.row.id)}
                  size="small"
                />
              ),
            },
            { field: "name", headerName: "Column", flex: 1 },
            { field: "dataType", headerName: "Data Type", flex: 1 },
          ];

          const sortedColumns = [...(tableColumns[table.name] || [])].sort((a, b) => {
            if (a.isSelected === b.isSelected) return 0;
            return a.isSelected ? -1 : 1;
          });

          return (
            <Paper key={table.name} sx={{ p: 1.5 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', fontSize: '0.9rem' }}>
                {table.name}
              </Typography>
              <DataGrid
                rows={sortedColumns}
                columns={columns}
                autoHeight={false}
                hideFooter
                disableColumnMenu
                sx={{ 
                  height: 250,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f5f5f5',
                    fontSize: '0.8rem',
                  },
                  '& .MuiDataGrid-cell': {
                    color: '#666',
                    fontSize: '0.8rem',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    color: '#666',
                    fontSize: '0.8rem',
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    overflow: 'auto',
                  },
                  '& .MuiDataGrid-virtualScrollerContent': {
                    minHeight: '250px !important',
                  },
                }}
              />
            </Paper>
          );
        })}
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#666', fontSize: '1.1rem', fontWeight: 500 }}>
          Enter your prompt
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Type your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
                borderWidth: '1px',
              },
            },
            '& .MuiInputBase-input': {
              color: '#000',
              fontSize: '0.9rem',
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleGenerateQueries}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '0.9rem',
              '&:hover': {
                backgroundColor: '#000',
              },
            }}
          >
            {isGenerating ? 'Generating...' : 'Generate Queries'}
          </Button>
        </Box>
      </Box>

      {generatedOutput && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#666', fontSize: '1.1rem', fontWeight: 500 }}>
            Generated Output
          </Typography>
          <Typography
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              backgroundColor: '#f5f5f5',
              p: 1.5,
              borderRadius: 1,
              color: '#666',
              fontSize: '0.9rem',
            }}
          >
            {generatedOutput}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
              variant="outlined"
              onClick={handleReject}
              sx={{
                borderColor: '#000',
                color: '#000',
                fontSize: '0.9rem',
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: 'rgba(241, 241, 241, 0.04)',
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '0.9rem',
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              Accept
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
    </>
  );
};

export default GenerateReports;
