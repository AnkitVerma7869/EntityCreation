import { Entity } from '../../../../interfaces/types';

export function generateListPage(config: Entity): string {
  return `
    'use client';
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import {
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TableRow,
      Paper,
      IconButton,
      Button
    } from '@mui/material';
    import EditIcon from '@mui/icons-material/Edit';
    import DeleteIcon from '@mui/icons-material/Delete';
    import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    
    export default function ${config.entityName}ListPage() {
      const router = useRouter();
      const { records, loading, error, fetchRecords, deleteRecord } = use${config.entityName}Store();

      useEffect(() => {
        fetchRecords();
      }, []);

      const handleEdit = (id: string) => {
        router.push(\`/${config.entityName.toLowerCase()}/edit/\${id}\`);
      };

      const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
          await deleteRecord(id);
        }
      };

      if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div className="text-red-500">{error}</div>;
      }

      return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">${config.entityName} List</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/${config.entityName.toLowerCase()}/create')}
            >
              Create New
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  ${config.attributes.map(attr => `
                    <TableCell>${attr.name}</TableCell>
                  `).join('')}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    ${config.attributes.map(attr => {
                      const fieldName = attr.name.replace(/\s+/g, '_');
                      if (attr.dataType.toLowerCase() === 'date') {
                        return `
                          <TableCell>
                            {record.${fieldName} ? new Date(record.${fieldName}).toLocaleDateString() : ''}
                          </TableCell>
                        `;
                      }
                      return `<TableCell>{record.${fieldName}}</TableCell>`;
                    }).join('')}
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEdit(record.id)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(record.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  `;
} 