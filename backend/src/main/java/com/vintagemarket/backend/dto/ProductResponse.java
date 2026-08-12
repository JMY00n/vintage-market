package com.vintagemarket.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String sellerName;
    private boolean sellerVerified;
    private String title;
    private Integer price;
    private String description;
    private String category;
    private String status;
}
