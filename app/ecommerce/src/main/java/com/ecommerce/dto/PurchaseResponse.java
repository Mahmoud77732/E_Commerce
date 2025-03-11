package com.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {

    // Lombok @Data will generate constructor for final fields
    // instead of "final" you can use @NotNull
    private final String orderTrackingNumber = null;
    
    public PurchaseResponse() {
    }

    public PurchaseResponse(String orderTrackingNumber) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }
    
    
    
}
