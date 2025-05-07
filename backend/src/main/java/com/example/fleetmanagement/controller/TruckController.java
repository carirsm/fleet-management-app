package com.example.fleetmanagement.controller;

import com.example.fleetmanagement.model.Truck;
import com.example.fleetmanagement.service.TruckService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/trucks")
public class TruckController {

    private final TruckService truckService;

    public TruckController(TruckService truckService) {
        this.truckService = truckService;
    }

    @GetMapping
    public ResponseEntity<List<Truck>> getAllTrucks() {
        List<Truck> trucks = truckService.getAllTrucks();
        return ResponseEntity.ok(trucks);
    }

    @PostMapping
    public ResponseEntity<Truck> addTruck(@RequestBody Truck truck) {
        Truck newTruck = truckService.addTruck(truck);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTruck);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Truck> updateTruckStatus(@PathVariable Long id, @RequestParam String status) {
        Truck updatedTruck = truckService.updateTruckStatus(id, status);
        return ResponseEntity.ok(updatedTruck);
    }

    @PutMapping("/{id}/driver")
    public ResponseEntity<Truck> updateTruckDriver(@PathVariable Long id, @RequestBody Truck updatedTruck) {
        Truck truck = truckService.updateTruckDriver(id, updatedTruck.getAssignedDriver());
        return ResponseEntity.ok(truck);
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Truck> editTruck(
            @PathVariable Long id,
            @RequestParam String truckNumber,
            @RequestParam String licensePlate,
            @RequestParam String model
    ) {
        Truck truck = truckService.editTruck(id, truckNumber, licensePlate, model);
        return ResponseEntity.ok(truck);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTruck(@PathVariable Long id) {
        truckService.deleteTruck(id);
        return ResponseEntity.ok("Truck deleted successfully!");
    }
}
