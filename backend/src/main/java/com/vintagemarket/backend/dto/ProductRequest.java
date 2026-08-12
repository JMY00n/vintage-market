package com.vintagemarket.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class ProductRequest {

    @NotNull
    private Long sellerId;

    @NotBlank
    private String title;

    @NotNull
    private Integer price;

    private String description;

    private String category;
}
