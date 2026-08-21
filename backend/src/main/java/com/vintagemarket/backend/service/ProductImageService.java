package com.vintagemarket.backend.service;

import com.vintagemarket.backend.entity.Product;
import com.vintagemarket.backend.entity.ProductImage;
import com.vintagemarket.backend.exception.ForbiddenException;
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

    public List<String> uploadImages(Long productId, List<MultipartFile> files, Long userId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

        if (!product.getSeller().getId().equals(userId)) {
            throw new ForbiddenException("본인이 등록한 상품에만 이미지를 추가할 수 있습니다.");
        }

        List<String> urls = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            String imageUrl = saveSingleImage(product, files.get(i), i);
            urls.add(imageUrl);
        }

        return urls;
    }

    public String saveSingleImage(Product product, MultipartFile file, int sortOrder) {
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
                .sortOrder(sortOrder)
                .build();

        productImageRepository.save(image);

        return imageUrl;
    }

    public void delete(Long no) {
        productImageRepository.deleteById(no);
    }
}
