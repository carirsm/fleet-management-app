package com.example.fleetmanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity  // Marks this class as a JPA Entity (a database table)
@Table(name = "trucks")  // Maps to a table named "trucks"
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Truck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment ID
    private Long id;

    @Column(name = "truck_number", nullable = false, unique = true, length = 7)
    private String truckNumber;

    @Column(nullable = false, unique = true)
    private String licensePlate;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String status;  // Example: "In Service", "Needs Maintenance"

    @Column(nullable = true)
    private String assignedDriver;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;


}
