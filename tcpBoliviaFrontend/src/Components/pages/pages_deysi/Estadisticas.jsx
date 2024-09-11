import React from 'react';
import "../../../Styles/Styles_deysi/estadisticas.css";
import { Card, CardContent, Typography } from '@mui/material';

const Estadisticas = ({ datos }) => {
  return (
    <div className="estadisticas-container">
      <Card className="estadistica-card">
        <CardContent>
          <Typography variant="h6" component="h4">
            Total Casos
          </Typography>
          <Typography variant="h4" className="data-percentage">
            80%
          </Typography>
        </CardContent>
      </Card>

      <Card className="estadistica-card">
        <CardContent>
          <Typography variant="h6" component="h4">
            Casos Resueltos
          </Typography>
          <Typography variant="h4" className="data-percentage">
            50%
          </Typography>
        </CardContent>
      </Card>

      <Card className="estadistica-card">
        <CardContent>
          <Typography variant="h6" component="h4">
            Casos No Resueltos
          </Typography>
          <Typography variant="h4" className="data-percentage">
            70%
          </Typography>
        </CardContent>
      </Card>

      {/* Agrega más tarjetas según sea necesario */}
    </div>
  );
};

export default Estadisticas;
