package com.vintagemarket.backend.dto;

import com.vintagemarket.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private Long sellerId;
    private String sellerName;
    private boolean sellerVerified;
    private String title;
    private Integer price;
    private String description;
    private String category;
    private String status;
    private List<String> imageUrls;
}
