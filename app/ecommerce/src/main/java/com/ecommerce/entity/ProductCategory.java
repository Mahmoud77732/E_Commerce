package com.ecommerce.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author mahmoud
 */
@Entity
@Table(name = "product_category")
// @Data // known bug with @ManyToOne || @OneTomany
@Getter
@Setter
public class ProductCategory {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    
    @Column(name="category_name")
    private String categoryName;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;
    
}