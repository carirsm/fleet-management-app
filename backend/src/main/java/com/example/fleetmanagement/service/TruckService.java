package com.example.fleetmanagement.service;

import com.example.fleetmanagement.model.Truck;
import com.example.fleetmanagement.repository.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TruckService {
    @Autowired
    private TruckRepository truckRepository;

    public List<Truck> getAllTrucks() {
        return truckRepository.findAllByOrderByIdAsc();
    }

    public Truck addTruck(Truck truck) {
        return truckRepository.save(truck);
    }

    public Truck updateTruckStatus(Long id, String status) {
        Truck truck = truckRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Truck not found"));
        truck.setStatus(status);
        truck.setLastUpdated(LocalDateTime.now());
        return truckRepository.save(truck);
    }

    public Truck updateTruckDriver(Long id, String assignedDriver) {
        Truck truck = truckRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Truck not found"));
        truck.setAssignedDriver(assignedDriver);
        truck.setLastUpdated(LocalDateTime.now());
        return truckRepository.save(truck);
    }

    public Truck editTruck(Long id, String truckNumber, String licensePlate, String model) {
        Truck truck = truckRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Truck not found"));
        truck.setTruckNumber(truckNumber);
        truck.setLicensePlate(licensePlate);
        truck.setModel(model);
        truck.setLastUpdated(LocalDateTime.now());
        return truckRepository.save(truck);
    }

    public void deleteTruck(Long id) {
        truckRepository.deleteById(id);
    }
}
