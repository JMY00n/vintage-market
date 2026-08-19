package com.vintagemarket.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StatusUpdateRequest {
    @NotNull
    private String status;
}
