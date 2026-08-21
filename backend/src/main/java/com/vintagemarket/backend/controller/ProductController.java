package com.vintagemarket.backend.controller;

import com.vintagemarket.backend.dto.ProductRequest;
import com.vintagemarket.backend.dto.ProductResponse;
import com.vintagemarket.backend.dto.ProductUpdateRequest;
import com.vintagemarket.backend.dto.StatusUpdateRequest;
import com.vintagemarket.backend.service.ProductImageService;
import com.vintagemarket.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;
    private final ProductImageService productImageService;

    @PostMapping("/create")
    public ResponseEntity<ProductResponse> create(
            @Valid @RequestBody ProductRequest request,
            @AuthenticationPrincipal Long userId
    ) {
        ProductResponse response = service.create(request, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<List<String>> uploadImage(
            @PathVariable Long id,
            @RequestParam("images") List<MultipartFile> files,
            @AuthenticationPrincipal Long userId
            ) {
        List<String> urls = productImageService.uploadImages(id, files, userId);

        return ResponseEntity.ok(urls);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "false") boolean onSaleOnly,
            @RequestParam(required = false) Long sellerId
    ) {
        return ResponseEntity.ok(service.getAll(category, keyword, onSaleOnly, sellerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.getOne(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,
                                    @AuthenticationPrincipal Long userId) {
        service.delete(id, userId);
        return ResponseEntity.ok().body("삭제 완료");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @RequestPart("product") @Valid ProductUpdateRequest request,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages,
            @AuthenticationPrincipal Long userId
            ) {
        ProductResponse response = service.update(id, request, newImages, userId);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ProductResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request,
            @AuthenticationPrincipal Long userId
            ) {
        ProductResponse response = service.updateStatus(id, request.getStatus(), userId);

        return ResponseEntity.ok(response);
    }
}
