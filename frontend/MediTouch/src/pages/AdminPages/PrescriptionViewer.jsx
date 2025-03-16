import React from 'react';
import { useParams } from 'react-router-dom';

const PrescriptionViewer = () => {
  const { fileName } = useParams();
  const filePath = `/prescriptions/${fileName}`; 

  return (
    <div className="container">
      <h2>Prescription</h2>
      <iframe
        src={filePath}
        width="100%"
        height="600px"
        title="Prescription"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

// Ensure the default export is here
export default PrescriptionViewer;
