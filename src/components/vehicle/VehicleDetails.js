import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchContractData } from '../../api/contractService';
import { Paper, Typography, Grid, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { DirectionsCar, Speed, LocalOffer, Add, Delete, EventNote } from '@mui/icons-material';
import DatePicker from '../common/DatePicker.tsx';

const VehiclePaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const SectionTitle = styled(Typography)`
  font-weight: 500 !important;
  margin-bottom: 15px !important;
  color: ${props => props.customTheme.colors.accent};
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  color: ${props => props.customTheme.colors.accent};
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InfoLabel = styled(Typography)`
  font-weight: 500 !important;
  min-width: 180px;
`;

const InfoValue = styled(Typography)`
  flex: 1;
`;

const ActionButton = styled(Button)`
  margin-top: 8px !important;
  margin-right: 8px !important;
`;

const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
`;

const VehicleDetails = ({ vertrkey }) => {
  const { theme } = useContext(ThemeContext);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrationDate, setRegistrationDate] = useState(new Date());
  const [firstRegistrationDate, setFirstRegistrationDate] = useState(new Date());

  useEffect(() => {
    const loadContractData = async () => {
      try {
        const data = await fetchContractData(vertrkey);
        setContract(data);
        
        // Wenn die Daten vom Server kommen, aktualisieren wir die Datumswerte
        if (data?.vehicle?.registrationDate) {
          setRegistrationDate(new Date(data.vehicle.registrationDate));
        }
        if (data?.vehicle?.firstRegistrationDate) {
          setFirstRegistrationDate(new Date(data.vehicle.firstRegistrationDate));
        }
      } catch (error) {
        console.error('Error loading contract data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContractData();
  }, [vertrkey]);

  const handleRegistrationDateChange = (date) => {
    setRegistrationDate(date);
    // Hier könnte man die Änderungen an den Server senden
  };

  const handleFirstRegistrationDateChange = (date) => {
    setFirstRegistrationDate(date);
    // Hier könnte man die Änderungen an den Server senden
  };

  if (loading) {
    return <Typography>Fahrzeugdaten werden geladen...</Typography>;
  }

  if (!contract || !contract.vehicle) {
    return <Typography>Keine Fahrzeugdaten gefunden.</Typography>;
  }

  const { vehicle } = contract;

  return (
    <>
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" customTheme={theme}>
          <IconWrapper customTheme={theme}><DirectionsCar /></IconWrapper>
          Fahrzeugdaten
        </SectionTitle>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoRow>
              <InfoLabel variant="body2">Kennzeichen:</InfoLabel>
              <InfoValue variant="body2">{vehicle.licensePlate}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">Fahrzeug:</InfoLabel>
              <InfoValue variant="body2">{vehicle.make} {vehicle.model}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">HSN/TSN:</InfoLabel>
              <InfoValue variant="body2">{vehicle.hsnTsn}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">Nutzungsart:</InfoLabel>
              <InfoValue variant="body2">{vehicle.usage}</InfoValue>
            </InfoRow>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InfoRow>
              <InfoLabel variant="body2">Aktuelle Fahrleistung:</InfoLabel>
              <InfoValue variant="body2">{vehicle.mileage} km</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">Branchengruppe:</InfoLabel>
              <InfoValue variant="body2">{vehicle.industryGroup}</InfoValue>
            </InfoRow>
          </Grid>
        </Grid>
      </VehiclePaper>
      
      {/* Neue Sektion für Zulassungsdaten */}
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" customTheme={theme}>
          <IconWrapper customTheme={theme}><EventNote /></IconWrapper>
          Zulassungsdaten
        </SectionTitle>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePickerWrapper>
              <DatePicker
                label="Anmeldedatum"
                id="registration-date"
                initialDate={registrationDate}
                onChange={handleRegistrationDateChange}
              />
            </DatePickerWrapper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <DatePickerWrapper>
              <DatePicker
                label="Erstzulassungsdatum"
                id="first-registration-date"
                initialDate={firstRegistrationDate}
                onChange={handleFirstRegistrationDateChange}
              />
            </DatePickerWrapper>
          </Grid>
        </Grid>
      </VehiclePaper>
      
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" customTheme={theme}>
          <IconWrapper customTheme={theme}><Speed /></IconWrapper>
          Kilometerstand
        </SectionTitle>
        
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Kilometerstand (km)</TableCell>
              <TableCell>Grund</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicle.mileageHistory.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.km}</TableCell>
                <TableCell>{entry.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<Add />}
          size="small"
        >
          Hinzufügen
        </ActionButton>
        <ActionButton
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          size="small"
        >
          Entfernen
        </ActionButton>
      </VehiclePaper>
      
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" customTheme={theme}>
          <IconWrapper customTheme={theme}><LocalOffer /></IconWrapper>
          Zubehör
        </SectionTitle>
        
        {vehicle.accessories && vehicle.accessories.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Bezeichnung</TableCell>
                <TableCell>Hersteller</TableCell>
                <TableCell>Neuwert (EUR)</TableCell>
                <TableCell>MwSt.</TableCell>
                <TableCell>Zuschlag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicle.accessories.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.tax}</TableCell>
                  <TableCell>{item.surcharge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body2">Kein Zubehör vorhanden</Typography>
        )}
        
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<Add />}
          size="small"
        >
          Hinzufügen
        </ActionButton>
      </VehiclePaper>
    </>
  );
};

export default VehicleDetails;
