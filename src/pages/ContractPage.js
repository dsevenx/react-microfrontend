import React, { useState } from 'react';
import ContractOverview from '../components/contract/ContractOverview';
import VehicleDetails from '../components/vehicle/VehicleDetails';
import Layout from '../components/layout/Layout';

const ContractPage = ({ vertrkey } ) => {
  const [activeTab, setActiveTab] = useState(0);

   return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 0 && <ContractOverview vertrkey={vertrkey}/>}
      {activeTab === 1 && <VehicleDetails vertrkey={vertrkey}/>}
    </Layout>
  );
};

export default ContractPage;