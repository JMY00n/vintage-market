package com.vintagemarket.backend.repository;

import com.vintagemarket.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryOrderByIdDesc(String category);
    List<Product> findAllByOrderByIdDesc();
    void deleteById(Long id);

    @Query("SELECT p FROM Product p WHERE " +
            "(:category IS NULL OR :category = '전체' OR p.category = :category) AND " +
            "(:keyword IS NULL OR :keyword = '' OR p.title LIKE CONCAT('%', :keyword, '%')) AND " +
            "(:onSaleOnly = false OR p.status = 'ON_SALE') " +
            "ORDER BY p.id DESC")
    List<Product> search(@Param("category") String category,
                         @Param("keyword") String keyword,
                         @Param("onSaleOnly") boolean onSaleOnly);

}
