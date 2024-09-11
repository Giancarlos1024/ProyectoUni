import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import "../../../Styles/Styles_deysi/Grafico.css";

// Registrar todos los componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const GraficoCasos = () => {
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [tipoGrafico, setTipoGrafico] = useState('bar'); // Estado para el tipo de gráfico

  useEffect(() => {
    // Función para obtener datos del endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/casosFechaIngreso');
        const data = await response.json();
        setDatosFiltrados(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const colores = ['#36a2eb', '#ff6384', '#4bc0c0', '#ffcd56', '#9966ff', '#ff9f40'];

  const datosGrafico = {
    labels: datosFiltrados.map((item) => item.año),
    datasets: [
      {
        label: 'Cantidad de Casos',
        backgroundColor: tipoGrafico === 'bar' ? colores : 'transparent',
        borderColor: colores,
        borderWidth: tipoGrafico === 'bar' ? 1 : 2,
        hoverBackgroundColor: colores,
        hoverBorderColor: colores,
        data: datosFiltrados.map((item) => item.cantidad_casos),
      },
    ],
  };

  const opcionesGrafico = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#f8f9fa',
        titleColor: '#333',
        bodyColor: '#333',
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: {
            size: 14,
          },
          padding: 10,
        },
        title: {
          display: true,
          text: 'Año',
          color: '#333',
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          color: '#333',
          font: {
            size: 14,
          },
          padding: 10,
        },
        title: {
          display: true,
          text: 'Cantidad de Casos',
          color: '#333',
          font: {
            size: 16,
          },
        },
      },
    },
    barThickness: tipoGrafico === 'bar' ? 20 : undefined,
  };

  return (
    <div className="container-grafico">
      <button 
      className="change-chart-type"
      onClick={() => setTipoGrafico(tipoGrafico === 'bar' ? 'line' : 'bar')}>
        Cambiar a {tipoGrafico === 'bar' ? 'Gráfico de Líneas' : 'Gráfico de Barras'}
      </button>
      <div style={{ width: '1000px', height: '400px' }}>
        {tipoGrafico === 'bar' ? (
          <Bar data={datosGrafico} options={opcionesGrafico} />
        ) : (
          <Line data={datosGrafico} options={opcionesGrafico} />
        )}
      </div>

      <div className="graph-description">
        <p className="description-text">Casos por cantidad de año.</p>
        <p className="source-text">Fuente: Tribunal Constitucional Plurinacional de Bolivia.</p>
      </div>

      
    </div>
  );
};

export default GraficoCasos;
