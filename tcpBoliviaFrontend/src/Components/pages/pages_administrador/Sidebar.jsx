import React from 'react';
import { List, ListItem, ListItemText, Drawer, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';

import FileUploadIcon from '@mui/icons-material/Upload';


import '../../../Styles/Styles_administrador/Sidebar.css';

const Sidebar = ({ className }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
      className={className}
    >
      <Toolbar className="sidebar-toolbar">
        <Typography variant="h6" noWrap className="sidebar-title">
          Admin Menu
        </Typography>
      </Toolbar>
      <List>
        <ListItem button component={Link} to="/Administrador/Dashboard" className="sidebar-list-item">
          <DashboardIcon sx={{ mr: 1 }} className="sidebar-icon" />
          <ListItemText primary="Dashboard" classes={{ primary: 'sidebar-list-item-text' }} />
        </ListItem>


        <ListItem button component={Link} to="/Administrador/Subir/Excel" className="sidebar-list-item">
          <FileUploadIcon sx={{ mr: 1 }} className="sidebar-icon" />
          <ListItemText primary="Subir Excel" classes={{ primary: 'sidebar-list-item-text' }} />
        </ListItem>

        <ListItem button component={Link} to="/Administrador/cerrarsesion" className="sidebar-list-item">
          <ExitToAppIcon sx={{ mr: 1 }} className="sidebar-icon" />
          <ListItemText primary="Cerrar Sesión" classes={{ primary: 'sidebar-list-item-text' }} />
        </ListItem>
        
        {/* Agrega otros elementos del menú aquí */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
