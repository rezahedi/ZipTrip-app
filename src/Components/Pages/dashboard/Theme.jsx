import React from 'react';
import {
  Box,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { text: 'My Plans', path: '/account' },
  { text: 'Bookmarked', path: '/account/bookmarked' },
  { text: 'Done', path: '/account/done' },
  { text: 'Profile', path: '/account/profile' },
];

export default function DashboardTheme() {
  return (
    <Box sx={{ display: 'flex' }}>

        <List
          sx={{
            position: "sticky",
            flex: 1,
            flexGrow: 0,
            alignItems: "stretch",
            top: "0",
            maxHeight: "96vh",
            minHeight: "50vh",
            width: "240px",
            bgcolor: "#eee",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          {links.map((link) => (
            <ListItem key={link.text} disablePadding>
              <NavLink
                to={link.path}
                end
                style={({ isActive }) => ({
                  width: '140px',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: isActive ? 'white' : 'inherit',
                  backgroundColor: isActive ? '#4CAF50' : 'transparent',
                  borderLeft: isActive ? '4px solid #388e3c' : '4px solid transparent',
                })}
              >
                <Typography>{link.text}</Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}