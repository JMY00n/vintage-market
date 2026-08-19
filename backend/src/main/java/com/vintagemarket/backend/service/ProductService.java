package com.vintagemarket.backend.service;

import com.vintagemarket.backend.dto.ProductRequest;
import com.vintagemarket.backend.dto.ProductResponse;
import com.vintagemarket.backend.dto.ProductUpdateRequest;
import com.vintagemarket.backend.entity.Product;
import com.vintagemarket.backend.entity.ProductImage;
import com.vintagemarket.backend.entity.User;
import com.vintagemarket.backend.exception.ProductNotFoundException;
import com.vintagemarket.backend.exception.UserNotFoundException;
import com.vintagemarket.backend.repository.AuthRepository;
import com.vintagemarket.backend.repository.ProductImageRepository;
import com.vintagemarket.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final AuthRepository authRepository;
    private final ProductImageService productImageService;

    private ProductResponse toResponse(Product product) {
        List<String> imageUrls = productImageRepository.findByProductOrderBySortOrder(product)
                .stream()
                .map(ProductImage::getImageUrl)
                .toList();

        return new ProductResponse(
                product.getId(),
                product.getSeller().getId(),
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
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 판매자입니다."));

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

    public List<ProductResponse> getAll(String category, String keyword) {
        List<Product> products = productRepository.search(category, keyword);

        return products.stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getOne(long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("존재하지 않는 상품입니다."));
        return toResponse(product);
    }

    @Transactional
    public void delete(long id) {
        Product product = productRepository.findById(id)
                        .orElseThrow(() -> new ProductNotFoundException("이미 삭제된 상품입니다."));

        productImageRepository.deleteByProduct(product);
        productRepository.deleteById(id);
    }

    @Transactional
    public ProductResponse update(Long id, ProductUpdateRequest request, List<MultipartFile> newImages) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("이미 삭제된 게시글입니다."));

        product.update(request.getTitle(), request.getPrice(), request.getDescription(), request.getCategory());

        List<ProductImage> currentImages = productImageRepository.findByProduct(product);
        List<ProductImage> toDelete = currentImages.stream()
                .filter(img -> !request.getKeepImageUrls().contains(img.getImageUrl()))
                .toList();
        productImageRepository.deleteAll(toDelete);

        int keepCount = currentImages.size() - toDelete.size();

        if (newImages != null) {
            for (int i = 0; i < newImages.size(); i++) {
                productImageService.saveSingleImage(product, newImages.get(i), keepCount + i);
            }
        }

        return toResponse(product);
    }

    @Transactional
    public ProductResponse updateStatus(Long id, String status) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("이미 삭제된 게시글입니다."));

        Product.Status newStatus;
        try {
            newStatus = Product.Status.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("올바르지 않은 상태값입니다.");
        }

        product.updateStatus(newStatus);

        return toResponse(product);
    }
}
