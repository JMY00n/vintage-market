package com.vintagemarket.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class ProductRequest {

    @NotNull
    private Long sellerId;

    @NotBlank(message = "상품명을 입력해주세요.")
    private String title;

    @NotNull(message = "가격을 입력해주세요.")
    @Min(value = 100, message = "가격은 100원 이상이어야 합니다.")
    @Max(value = 100_000_000, message = "가격은 1억원을 초과할 수 없습니다.")
    private Integer price;

    private String description;

    @NotBlank(message = "카테고리를 선택해주세요.")
    private String category;
}
