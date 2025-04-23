import React from 'react';
import {
  Box,
  List,
  ListItem,
} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { text: 'My Plans', path: '/account' },
  { text: 'Bookmarked Plans', path: '/account/bookmarked' },
  { text: 'Create New', path: '/account/create' },
];

export default function DashboardTheme() {
  return (
    <Box sx={{ display: 'flex' }}>

        <List>
          {links.map((link) => (
            <ListItem key={link.text} disablePadding>
              <NavLink
                to={link.path}
                end
                style={({ isActive }) => ({
                  width: '100%',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: isActive ? '#1976d2' : 'inherit',
                  backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                  borderLeft: isActive ? '4px solid #1976d2' : '4px solid transparent',
                })}
              >
                {link.text}
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