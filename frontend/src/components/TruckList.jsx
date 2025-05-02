import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTruckModal from './EditTruckModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Manages truck list: displays, adds, edits, deletes, and updates trucks
const TruckList = () => {
  const [trucks, setTrucks] = useState([]);
  const [licensePlate, setLicensePlate] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [assignedDriver, setAssignedDriver] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);

  // Fetches trucks from backend
  const fetchTrucks = () => {
    axios.get('http://localhost:8080/api/trucks')
      .then((response) => setTrucks(response.data))
      .catch((error) => console.error('Error fetching trucks:', error));
  };

  // Load trucks on component mount
  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (licensePlate.length !== 7) {
      alert('License plate must be exactly 7 chars.');
      return;
    }

    if (!model || !status || !assignedDriver.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const newTruck = { licensePlate, model, status, assignedDriver };
    axios.post('http://localhost:8080/api/trucks', newTruck)
      .then(() => {
        fetchTrucks();
        setLicensePlate('');
        setModel('');
        setStatus('');
        setAssignedDriver('');
        toast.success('Truck added successfully!');
      })
      .catch((error) => {
        console.error('Error adding truck:', error);
        toast.error('Failed to add truck. Please try again.');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this truck?')) {
      axios.delete(`http://localhost:8080/api/trucks/${id}`)
        .then(() => {
          fetchTrucks();
          toast.success('Truck deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting truck:', error);
          toast.error('Failed to delete truck. Please try again.');
        });
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    axios.put(`http://localhost:8080/api/trucks/${id}/status`, null, {
      params: { status: newStatus }
    })
      .then(fetchTrucks)
      .catch(error => console.error('Error updating status:', error));
  };

  const handleDriverUpdate = (id) => {
    const newDriver = prompt('Enter new assigned driver:');
    if (newDriver) {
      axios.put(`http://localhost:8080/api/trucks/${id}/driver`, { assignedDriver: newDriver })
        .then(() => {
          fetchTrucks();
          toast.success('Driver updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating driver:', error);
          toast.error('Failed to update driver. Please try again.');
        });
    }
  };

  const openEditModal = (truck) => {
    setSelectedTruck(truck);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedTruck(null);
  };

  const handleUpdate = () => {
    fetchTrucks();
    closeEditModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
          maxLength="7"
        />

        <select value={model} onChange={(e) => setModel(e.target.value)} required>
          <option value="">Select Model</option>
          <option value="Mack">Mack</option>
          <option value="International">International</option>
          <option value="Peterbilt">Peterbilt</option>
          <option value="Freightliner">Freightliner</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="In Service">In Service</option>
          <option value="Out of Service">Out of Service</option>
          <option value="Needs Maintenance">Needs Maintenance</option>
        </select>

        <input
          type="text"
          placeholder="Assigned Driver"
          value={assignedDriver}
          onChange={(e) => setAssignedDriver(e.target.value)}
          required
        />

        <button type="submit">Add Truck</button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>License Plate</th>
            <th>Model</th>
            <th>Status</th>
            <th>Assigned Driver</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.length > 0 ? (
            trucks.map((truck) => (
              <tr key={truck.id}>
                <td>{truck.id}</td>
                <td>{truck.licensePlate}</td>
                <td>{truck.model}</td>
                <td>
                  <select
                    value={truck.status}
                    onChange={(e) => handleStatusUpdate(truck.id, e.target.value)}
                  >
                    <option value="In Service">In Service</option>
                    <option value="Out of Service">Out of Service</option>
                    <option value="Needs Maintenance">Needs Maintenance</option>
                  </select>
                </td>
                <td>{truck.assignedDriver}</td>
                <td>{truck.lastUpdated ? new Date(truck.lastUpdated).toLocaleString() : 'N/A'}</td>
                <td>
                  <button onClick={() => handleDriverUpdate(truck.id)}>Update Driver</button>{' '}
                  <button onClick={() => openEditModal(truck)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(truck.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7">No trucks found</td></tr>
          )}
        </tbody>
      </table>

      <ToastContainer position="bottom-right" />

      {editModalOpen && (
        <EditTruckModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          truck={selectedTruck}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default TruckList;
// This component manages the truck list, including adding, editing, deleting, and updating truck information.