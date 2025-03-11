package com.ecommerce.dao;

import com.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface CustomerRepository extends JpaRepository<Customer, Long>{
    
    //SELECT * FROM Customer c WHERE c.email=theEmail
    Customer findByEmail(String theEmail);
    
}