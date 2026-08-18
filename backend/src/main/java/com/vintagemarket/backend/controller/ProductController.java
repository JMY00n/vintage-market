package com.vintagemarket.backend.controller;

import com.vintagemarket.backend.dto.ProductRequest;
import com.vintagemarket.backend.dto.ProductResponse;
import com.vintagemarket.backend.service.ProductImageService;
import com.vintagemarket.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request) {
        ProductResponse response = service.create(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<List<String>> uploadImage(
            @PathVariable Long id,
            @RequestParam("images") List<MultipartFile> files) {
        List<String> urls = productImageService.uploadImages(id, files);

        return ResponseEntity.ok(urls);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll() {
        List<ProductResponse> products = service.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.getOne(id));
    }
}
