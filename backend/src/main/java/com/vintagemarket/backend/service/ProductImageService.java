package com.vintagemarket.backend.service;

import com.vintagemarket.backend.entity.Product;
import com.vintagemarket.backend.entity.ProductImage;
import com.vintagemarket.backend.repository.ProductImageRepository;
import com.vintagemarket.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    private final String uploadDir = "uploads/";

    public List<String> uploadImages(Long productId, List<MultipartFile> files) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

        List<String> urls = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            try {
                Path path = Paths.get(uploadDir + fileName);
                Files.createDirectories(path.getParent());

                Thumbnails.of(file.getInputStream())
                        .size(800, 800)
                        .outputQuality(0.8)
                        .toFile(path.toFile());

            } catch (IOException e) {
                throw new RuntimeException("파일 저장 실패 : " + fileName, e);
            }

            String imageUrl = "/uploads/" + fileName;

            ProductImage image = ProductImage.builder()
                    .product(product)
                    .imageUrl(imageUrl)
                    .sortOrder(i)
                    .build();

            productImageRepository.save(image);

            urls.add(imageUrl);
        }

        return urls;
    }

    public void delete(Long no) {
        productImageRepository.deleteById(no);
    }
}
