import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Button, Input, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Papa from 'papaparse';

const FormularioExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  // Manejar el cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      if (file.type.includes('csv')) {
        handleCSV(file);
      } else if (file.type.includes('sheet')) {
        handleExcel(file);
      } else {
        alert('Formato de archivo no soportado. Seleccione un archivo CSV o Excel.');
      }
    }
  };

  // Procesar archivo CSV
  const handleCSV = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        setFileData(results.data);
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  // Procesar archivo Excel
  const handleExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setFileData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Enviar archivo a la base de datos
  const handleFileUpload = async () => {
    if (!selectedFile) {
        alert('Por favor, selecciona un archivo primero.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const response = await axios.post('http://localhost:8000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setIsFileUploaded(true);
        alert('Archivo subido exitosamente.');
        console.log(response.data);
    } catch (error) {
        console.error('Error subiendo el archivo:', error);
        if (error.response) {
            alert('Error al subir el archivo: ' + error.response.data.error);
        } else if (error.request) {
            alert('Error en la solicitud: ' + error.message);
        } else {
            alert('Error: ' + error.message);
        }
    }
};

  
  

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Subir Archivo Excel o CSV
      </Typography>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: '.xls, .xlsx, .csv' }}
        sx={{ mb: 2 }}
      />

      {/* Previsualización de datos */}
      {fileData.length > 0 && (
        <Box sx={{ maxHeight: '400px', overflow: 'auto', mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Vista Previa del Archivo:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                {fileData[0] && fileData[0].map((col, index) => (
                  <TableCell key={`header-${index}`}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fileData.slice(1).map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={`cell-${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={!selectedFile || isFileUploaded}
      >
        Subir Archivo
      </Button>
    </Box>
  );
};

export default FormularioExcel;
