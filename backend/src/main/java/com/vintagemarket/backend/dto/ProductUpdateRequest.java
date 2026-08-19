package com.vintagemarket.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProductUpdateRequest {
    private String title;
    private Integer price;
    private String description;
    private String category;
    private List<String> keepImageUrls;
}
