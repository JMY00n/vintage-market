package com.vintagemarket.backend.repository;

import com.vintagemarket.backend.entity.Product;
import com.vintagemarket.backend.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProductOrderBySortOrder(Product product);
    void deleteByProduct(Product product);
}
