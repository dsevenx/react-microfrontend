// Mock-Service für den ersten Entwurf
// Später durch echte API-Aufrufe ersetzen

export const fetchContractData = async (contractId) => {
    // Simuliere API-Aufruf
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: contractId || 'AS9838259145',
          customerName: 'Mustermann Frank',
          gender: 'männlich',
          address: {
            street: 'Am Viehhügel 26',
            zipCode: 'DE-99444',
            city: 'Blankenhain',
          },
          birthDate: '27.01.1953',
          contractNumber: 'AS9838259145'+contractId,
          validFrom: '01.01.2024',
          status: 'Vertrag Aktiv',
          contactInfo: {
            phonePrivate: '+49 (036459) 41064',
            phoneBusiness: '',
            phoneMobile: '+49 (0176) 43745961',
            email: 'f.h.mustermann@freenet.de',
          },
          agent: {
            type: 'Angestellte/r',
            name: '',
          },
          contractDetails: {
            product: 'Mein Privatfahrzeug 10 2015',
            begin: '08.09.2016',
            end: '01.01.2025',
            paymentMethod: 'jährlich',
            paymentType: 'Lastschrift',
            iban: 'DE03120300000015023833 Deutsche Kreditbank Berlin',
            accountBalance: '0,00',
            payment: 'taggenau am 01ten',
          },
          insuranceComponents: [
            {
              type: 'KH 100 Mio.',
              class: 'Sc',
              classInfo: '1981(SF 35)/25',
              status: 'aktiv',
              cancelDate: '',
              replacementReason: '',
              premium: '375,06',
            },
            {
              type: 'VK 300 / TK 150',
              class: '',
              classInfo: '',
              status: '',
              cancelDate: '10.08.2022',
              replacementReason: 'Ersatz',
              premium: '',
            },
            {
              type: 'TK 300',
              class: '',
              classInfo: '',
              status: 'aktiv',
              cancelDate: '',
              replacementReason: '',
              premium: '208,33',
            },
          ],
          totalPremium: '583,39',
          vehicle: {
            licensePlate: 'AP-FR 333',
            make: 'Mercedes-Benz'+contractId,
            model: '204 X (GLC 250 4MATIC)',
            mileage: '17.000',
            usage: '1 PKW / 1 Ohne Vermietung',
            industryGroup: 'Rest',
            hsnTsn: '1313 Mercedes- / EWS 204 X',
            mileageHistory: [
              { date: '03.02.2023', km: '80.255', reason: 'km-Anfrage' },
              { date: '28.12.2021', km: '70.963', reason: 'km-Anfrage' },
              { date: '30.12.2020', km: '58.271', reason: 'km-Anfrage' },
              { date: '12.01.2020', km: '50.580', reason: 'km-Anfrage' },
            ],
            accessories: []
          },
          notes: 'KM-Abfrage offen vor Erinnerungsmail, KS 7'
        });
      }, 500);
    });
  };