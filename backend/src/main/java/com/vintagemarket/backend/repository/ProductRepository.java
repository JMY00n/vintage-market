package com.vintagemarket.backend.repository;

import com.vintagemarket.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryOrderByIdDesc(String category);
    List<Product> findAllByOrderByIdDesc();
    void deleteById(Long id);

}
