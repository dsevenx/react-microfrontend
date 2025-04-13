import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchContractData } from '../../api/contractService';
import { Paper, Typography, Grid, Divider, Chip } from '@mui/material';
import { Person, Phone, Email, Home, DirectionsCar, EuroSymbol, Event } from '@mui/icons-material';

const ContractPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const SectionTitle = styled(Typography)`
  font-weight: 500 !important;
  margin-bottom: 10px !important;
  color: ${props => props.customTheme.colors.accent};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  color: ${props => props.customTheme.colors.accent};
`;

const StatusChip = styled(Chip)`
  margin-left: auto !important;
`;

const InsuranceRow = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InsuranceType = styled.div`
  flex: 2;
  font-weight: ${props => props.bold ? '500' : 'normal'};
`;

const InsuranceClass = styled.div`
  flex: 1;
`;

const InsuranceStatus = styled.div`
  flex: 1;
`;

const InsurancePremium = styled.div`
  flex: 1;
  text-align: right;
  font-weight: ${props => props.bold ? '500' : 'normal'};
`;

const ContractOverview = ({ vertrkey }) => {
  const { theme } = useContext(ThemeContext);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContractData = async () => {
      try {
        const data = await fetchContractData(vertrkey);
        setContract(data);
      } catch (error) {
        console.error('Error loading contract data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContractData();
  }, [vertrkey]);

  if (loading) {
    return <Typography>Vertragsdaten werden geladen...</Typography>;
  }

  if (!contract) {
    return <Typography>Keine Vertragsdaten gefunden.</Typography>;
  }

  return (
    <>
      <ContractPaper elevation={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InfoRow>
              <Typography variant="h5">{contract.customerName} ({contract.gender})</Typography>
              <StatusChip 
                label={contract.status}
                color="primary"
                size="small"
              />
            </InfoRow>
            <Typography variant="subtitle2" color="textSecondary">
              Vertragsnummer: {contract.contractNumber}, gültig ab: {contract.validFrom}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h6" customTheme={theme}>
              Kontaktdaten
            </SectionTitle>
            <InfoRow>
              <IconWrapper customTheme={theme}><Home fontSize="small" /></IconWrapper>
              <div>
                {contract.address.street}<br />
                {contract.address.zipCode} {contract.address.city}
              </div>
            </InfoRow>
            <InfoRow>
              <IconWrapper customTheme={theme}><Person fontSize="small" /></IconWrapper>
              <div>Geburtsdatum: {contract.birthDate}</div>
            </InfoRow>
            <InfoRow>
              <IconWrapper customTheme={theme}><Phone fontSize="small" /></IconWrapper>
              <div>{contract.contactInfo.phonePrivate}</div>
            </InfoRow>
            {contract.contactInfo.phoneMobile && (
              <InfoRow>
                <IconWrapper customTheme={theme}><Phone fontSize="small" /></IconWrapper>
                <div>{contract.contactInfo.phoneMobile}</div>
              </InfoRow>
            )}
            <InfoRow>
              <IconWrapper customTheme={theme}><Email fontSize="small" /></IconWrapper>
              <div>{contract.contactInfo.email}</div>
            </InfoRow>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h6" customTheme={theme}>
              Vertragsdetails
            </SectionTitle>
            <InfoRow>
              <IconWrapper customTheme={theme}><DirectionsCar fontSize="small" /></IconWrapper>
              <div>{contract.vehicle.make} {contract.vehicle.model}</div>
            </InfoRow>
            <InfoRow>
              <IconWrapper customTheme={theme}><EuroSymbol fontSize="small" /></IconWrapper>
              <div>Prämie: {contract.totalPremium} €</div>
            </InfoRow>
            <InfoRow>
              <IconWrapper customTheme={theme}><Event fontSize="small" /></IconWrapper>
              <div>
                Beginn: {contract.contractDetails.begin} | Ende: {contract.contractDetails.end}
              </div>
            </InfoRow>
            {contract.notes && (
              <Typography variant="body2" style={{ marginTop: '10px', color: '#f44336' }}>
                Hinweis: {contract.notes}
              </Typography>
            )}
          </Grid>
        </Grid>
      </ContractPaper>
      
      <ContractPaper elevation={2}>
        <SectionTitle variant="h6" customTheme={theme}>
          Versicherungsumfang
        </SectionTitle>
        
        <InsuranceRow>
          <InsuranceType bold>Versicherungsart</InsuranceType>
          <InsuranceClass bold>SF-Klasse</InsuranceClass>
          <InsuranceStatus bold>Status</InsuranceStatus>
          <InsurancePremium bold>Prämie (€)</InsurancePremium>
        </InsuranceRow>
        
        <Divider style={{ margin: '8px 0' }} />
        
        {contract.insuranceComponents.map((component, index) => (
          <InsuranceRow key={index}>
            <InsuranceType>{component.type}</InsuranceType>
            <InsuranceClass>{component.classInfo}</InsuranceClass>
            <InsuranceStatus>
              {component.status === 'aktiv' ? (
                <Chip label="Aktiv" size="small" color="success" variant="outlined" />
              ) : component.cancelDate ? (
                <Chip label={`Gekündigt: ${component.cancelDate}`} size="small" color="error" variant="outlined" />
              ) : ''}
            </InsuranceStatus>
            <InsurancePremium>{component.premium}</InsurancePremium>
          </InsuranceRow>
        ))}
        
        <Divider style={{ margin: '8px 0' }} />
        
        <InsuranceRow>
          <InsuranceType bold>Gesamt</InsuranceType>
          <InsuranceClass></InsuranceClass>
          <InsuranceStatus></InsuranceStatus>
          <InsurancePremium bold>{contract.totalPremium}</InsurancePremium>
        </InsuranceRow>
      </ContractPaper>
      
      <ContractPaper elevation={2}>
        <SectionTitle variant="h6" customTheme={theme}>
          Zahlungsinformationen
        </SectionTitle>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Zahlungsweise:</strong> {contract.contractDetails.paymentMethod}
            </Typography>
            <Typography variant="body2">
              <strong>Zahlungsart:</strong> {contract.contractDetails.paymentType}
            </Typography>
            <Typography variant="body2">
              <strong>Kontostand:</strong> {contract.contractDetails.accountBalance} €
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Einzug:</strong> {contract.contractDetails.payment}
            </Typography>
            <Typography variant="body2" style={{ wordBreak: 'break-word' }}>
              <strong>IBAN:</strong> {contract.contractDetails.iban}
            </Typography>
          </Grid>
        </Grid>
      </ContractPaper>
    </>
  );
};

export default ContractOverview;