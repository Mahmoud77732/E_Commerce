package com.ecommerce.dao;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

// spring-data-rest: provide free pagination/sorting
// ex: localhost:8080/api/products?size=100
// we use spring-data-rest: so we have free ready crud_endpoints, ex: http://localhost:8080/api/products
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // query method
    // http://localhost:8080/api/products/search/findByCategoryId?id=?
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    
    // SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%')
    // containging == SQL "Like"
    // http://localhost:8080/api/products/search/findByNameContaining?name=ProductName
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
    
}
