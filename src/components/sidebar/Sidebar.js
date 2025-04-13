import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Menu, MenuItem } from '@mui/material';
import { ExpandLess, ExpandMore, Description, DirectionsCar,  HomeWork, Payments } from '@mui/icons-material';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${props => props.customTheme.colors.secondary};
  color: ${props => props.customTheme.colors.text};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const NestedList = styled(List)`
  padding-left: 16px !important;
`;

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState({
    contracts: true,
    vehicles: false,
    agreements: false, 
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (section) => {
    setOpen({
      ...open,
      [section]: !open[section],
    });
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({ mouseX: event.clientX, mouseY: event.clientY });
    setSelectedItem(item);
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  return (
    <SidebarContainer customTheme={theme}>
      <List component="nav">
        <ListItem button onClick={() => handleClick('contracts')}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Verträge" />
          {open.contracts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.contracts} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            <ListItem
              button
              onContextMenu={(e) => handleContextMenu(e, 'AS9838259666')}
              selected={selectedItem === 'AS9838259666'}
            >
              <ListItemText primary="Vertrag AS9838259666" />
            </ListItem>
            <ListItem
              button
              onContextMenu={(e) => handleContextMenu(e, 'AS1122334455')}
              selected={selectedItem === 'AS1122334455'}
            >
              <ListItemText primary="Vertrag AS1122334455" />
            </ListItem>
          </NestedList>
        </Collapse>

        <ListItem button onClick={() => handleClick('agreements')}>
          <ListItemIcon><HomeWork /></ListItemIcon>
          <ListItemText primary="Vereinbarung" />
          {open.agreements ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.agreements} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Vorversicherung HUK" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Vertreter BVT,FB" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="abweichende Empfänger" />
            </ListItem>
          </NestedList>
        </Collapse>

        <ListItem button onClick={() => handleClick('vehicles')}>
          <ListItemIcon>
            <DirectionsCar />
          </ListItemIcon>
          <ListItemText primary="Fahrzeuge" />
          {open.vehicles ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.vehicles} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Mercedes GLC 250" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="VW Golf - Vorfahrzeug" />
            </ListItem>
          </NestedList>
        </Collapse>



        <ListItem button>
          <ListItemIcon>
            <Payments />
          </ListItemIcon>
          <ListItemText primary="In/Ex" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HomeWork />
          </ListItemIcon>
          <ListItemText primary="Schaden" />
        </ListItem>
      </List>

      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleContextMenuClose}>Öffnen</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Bearbeiten</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Drucken</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Stornieren</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Verzweigen</MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
