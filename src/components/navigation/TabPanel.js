import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { Tabs, Tab} from '@mui/material';
import { DirectionsCar, AddCircle, Category,TopicRounded } from '@mui/icons-material';

const TabsContainer = styled.div`
  background-color: ${props => props.customTheme.colors.primary};
  color: ${props => props.customTheme.colors.text};
`;

const StyledTab = styled(Tab)`
  color: ${props => props.customTheme.colors.text} !important;
  opacity: 0.7;
  
  &.Mui-selected {
    opacity: 1;
  }
`;

const TabPanel = ({ activeTab, setActiveTab }) => {
  const { theme } = useContext(ThemeContext);
 
  return (
    <TabsContainer customTheme={theme}>
      <Tabs 
        value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        <StyledTab icon={<TopicRounded />} label="Übersicht" customTheme={theme} />
        <StyledTab icon={<DirectionsCar />} label="Fahrzeug" customTheme={theme} />
        <StyledTab icon={<AddCircle />} label="Zusatz" customTheme={theme} />
        <StyledTab icon={<Category />} label="Produkt" customTheme={theme} />
      </Tabs>
    </TabsContainer>
  );
};

export default TabPanel;