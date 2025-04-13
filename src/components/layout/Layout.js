import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from '../sidebar/Sidebar';
import ChatPanel from './ChatPanel';
import TabPanel from '../navigation/TabPanel';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.customTheme.colors.secondary};
  color: ${props => props.customTheme.colors.text};
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Footer = styled.footer`
  background-color: ${props => props.customTheme.colors.primary};
  color: ${props => props.customTheme.colors.text};
  padding: 10px 20px;
  text-align: center;
`;

const Layout = ({ children, activeTab, setActiveTab }) => {
  const { theme } = useContext(ThemeContext);
 
  return (
    <LayoutContainer customTheme={theme}>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea>{children}</ContentArea>
        <ChatPanel />
      </MainContent>
      <TabPanel activeTab={activeTab} setActiveTab={setActiveTab}/>
      <Footer customTheme={theme}>
        © {new Date().getFullYear()} KFZ-Versicherungsportal
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;