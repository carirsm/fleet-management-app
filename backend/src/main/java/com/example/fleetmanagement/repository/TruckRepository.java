package com.example.fleetmanagement.repository;

import com.example.fleetmanagement.model.Truck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TruckRepository extends JpaRepository<Truck, Long> {
    List<Truck> findAllByOrderByIdAsc();
}
