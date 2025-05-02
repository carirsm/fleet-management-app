import React, { useState } from 'react'; 
import axios from 'axios'; 
import { toast } from 'react-toastify'; // Importing toast for notifications

const EditTruckModal = ({ isOpen, onClose, truck, onUpdate }) => { // Modal component to edit truck details
  const [licensePlate, setLicensePlate] = useState(truck.licensePlate); // State variable to manage the license plate input
  const [model, setModel] = useState(truck.model); // State variable to manage the model input

  const handleSubmit = (e) => { 
    e.preventDefault();
    axios.put(`http://localhost:8080/api/trucks/${truck.id}/edit`, null, {
      params: { licensePlate, model }
    })
      .then(() => { // API endpoint to update truck details
        onUpdate(); // refresh table
        toast.success('Truck updated succesfully!'); // shows truck updated succesfully
      })
      .catch((error) => { 
        console.error('Error updating truck:', error);
        toast.error('Failed to update truck. Please try again.'); // shows error message when updating fails
      });
  };

  if (!isOpen) return null; // if the modal is not open, return null

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Truck</h2> 
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="License Plate"
            required
          />
        <select value={model} onChange={(e) => setModel(e.target.value)} required>
          <option value="">Select Model</option>
          <option value="Mack">Mack</option>
          <option value="International">International</option>
          <option value="Peterbilt">Peterbilt</option>
          <option value="Freightliner">Freightliner</option>
        </select>
          <div style={styles.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = { // Styles the modal component
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default EditTruckModal;
