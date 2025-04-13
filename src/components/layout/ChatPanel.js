import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { Paper, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import { Send, Close, ChatBubble } from '@mui/icons-material';

const ChatContainer = styled(Paper)`
  width: 300px;
  background-color: ${props => props.customTheme.colors.secondary};
  color: ${props => props.customTheme.colors.text};
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  transform: translateX(${props => props.open ? "0" : "100%"});
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: ${props => props.customTheme.colors.primary};
  color: ${props => props.customTheme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 18px;
  margin-bottom: 10px;
  word-wrap: break-word;
  background-color: ${props => props.isUser ? props.customTheme.colors.accent : '#e0e0e0'};
  color: ${props => props.isUser ? '#fff' : '#333'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-left: ${props => props.isUser ? 'auto' : '0'};
`;

const ChatInputArea = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

const ToggleButton = styled(IconButton)`
  position: absolute !important;
  top: 50%;
  left: -48px;
  background-color: ${props => props.customTheme.colors.primary} !important;
  color: ${props => props.customTheme.colors.text} !important;
  border-radius: 50% 0 0 50% !important;
`;

const ChatPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { text: 'Hallo! Wie kann ich Ihnen heute bei Ihrer KFZ-Versicherung helfen?', isUser: false },
  ]);

  const toggleChat = () => {
    setOpen(!open);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    setChatHistory([...chatHistory, { text: message, isUser: true }]);
    setMessage('');
    
    // Simuliere Antwort vom Agenten
    setTimeout(() => {
      const responses = [
        'Ich schaue mir Ihren Vertrag gleich an.',
        'Haben Sie weitere Fragen zu Ihrer Versicherung?',
        'Ich kann Ihnen bei Änderungen an Ihrem Vertrag helfen.',
        'Möchten Sie mehr über unsere aktuellen Angebote erfahren?'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <ToggleButton onClick={toggleChat} customTheme={theme}>
        {open ? <Close /> : <ChatBubble />}
      </ToggleButton>
      
      <ChatContainer customTheme={theme} open={open} elevation={3}>
        <ChatHeader customTheme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: '8px' }}>S</Avatar>
            <Typography variant="subtitle1">Support-Agent</Typography>
          </div>
        </ChatHeader>
        
        <ChatMessages>
          {chatHistory.map((msg, index) => (
            <MessageBubble key={index} isUser={msg.isUser} customTheme={theme}>
              {msg.text}
            </MessageBubble>
          ))}
        </ChatMessages>
        
        <ChatInputArea>
          <TextField
            fullWidth
            placeholder="Nachricht eingeben..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
          />
          <Button
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send />
          </Button>
        </ChatInputArea>
      </ChatContainer>
    </div>
  );
};

export default ChatPanel;