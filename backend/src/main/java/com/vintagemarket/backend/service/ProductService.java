package com.vintagemarket.backend.service;

import com.vintagemarket.backend.dto.ProductRequest;
import com.vintagemarket.backend.dto.ProductResponse;
import com.vintagemarket.backend.entity.Product;
import com.vintagemarket.backend.entity.ProductImage;
import com.vintagemarket.backend.entity.User;
import com.vintagemarket.backend.repository.AuthRepository;
import com.vintagemarket.backend.repository.ProductImageRepository;
import com.vintagemarket.backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final AuthRepository authRepository;

    private ProductResponse toResponse(Product product) {
        List<String> imageUrls = productImageRepository.findByProductOrderBySortOrder(product)
                .stream()
                .map(ProductImage::getImageUrl)
                .toList();

        return new ProductResponse(
                product.getId(),
                product.getSeller().getNickname(),
                product.getSeller().getRole() == User.Role.STORE,
                product.getTitle(),
                product.getPrice(),
                product.getDescription(),
                product.getCategory(),
                product.getStatus().name(),
                imageUrls
        );
    }

    public ProductResponse create(ProductRequest request) {
        User seller = authRepository.findById(request.getSellerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 판매자입니다."));

        Product product = Product.builder()
                .seller(seller)
                .title(request.getTitle())
                .price(request.getPrice())
                .description(request.getDescription())
                .category(request.getCategory())
                .status(Product.Status.ON_SALE)
                .build();

        Product saved = productRepository.save(product);

        return toResponse(saved);
    }

    public List<ProductResponse> getAll() {
        return productRepository.findAllByOrderByIdDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getOne(long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));
        return toResponse(product);


    }
}
