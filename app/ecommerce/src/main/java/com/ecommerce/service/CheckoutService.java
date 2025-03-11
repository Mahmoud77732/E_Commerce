/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ecommerce.service;

import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponse;


public interface CheckoutService {
    
    PurchaseResponse placeOrder(Purchase purchase);
    
}