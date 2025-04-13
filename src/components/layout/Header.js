import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Notifications, Settings, ColorLens } from '@mui/icons-material';

// Verwende eine Funktion, die das Theme aus dem props-Objekt extrahiert
const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.customTheme.colors.primary} !important;
  color: ${props => props.customTheme.colors.text} !important;
`;

const Logo = styled.div`
  margin-right: 16px;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Header = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [themeMenu, setThemeMenu] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeMenu = (event) => {
    setThemeMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeClose = (themeName) => {
    if (themeName) changeTheme(themeName);
    setThemeMenu(null);
  };

  return (
    // Verwende customTheme als prop-Name statt theme
    <StyledAppBar position="static" customTheme={theme}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Logo>Tribe Motor</Logo>
        
        <Button color="inherit">Übersicht</Button>
        <Button color="inherit">Verträge</Button>
        <Button color="inherit">Kunden</Button>
        <Button color="inherit">Berichte</Button>
        
        <Spacer />
        
        <IconButton color="inherit" onClick={handleThemeMenu}>
          <ColorLens />
        </IconButton>
        <Menu
          anchorEl={themeMenu}
          open={Boolean(themeMenu)}
          onClose={() => handleThemeClose()}
        >
          <MenuItem onClick={() => handleThemeClose('default')}>Standard</MenuItem>
          <MenuItem onClick={() => handleThemeClose('allianz')}>Allianz</MenuItem>
          <MenuItem onClick={() => handleThemeClose('adac')}>ADAC</MenuItem>
          <MenuItem onClick={() => handleThemeClose('volkswagen')}>Volkswagen</MenuItem>
        </Menu>
        
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profil</MenuItem>
          <MenuItem onClick={handleClose}>Einstellungen</MenuItem>
          <MenuItem onClick={handleClose}>Abmelden</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;