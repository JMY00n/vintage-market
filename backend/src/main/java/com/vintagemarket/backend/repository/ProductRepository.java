package com.vintagemarket.backend.repository;

import com.vintagemarket.backend.entity.Product;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public List<Product> findAllByOrderByIdDesc();
}
