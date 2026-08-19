package com.vintagemarket.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int price;

    private String description;

    private String category;

    @Enumerated(EnumType.STRING)
    private Status status; // ON_SALE/RESERVED/SOLD

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime create_at;

    public void update(String title, int price, String description, String category) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
    }

    public void updateStatus(Status status) {
        this.status = status;
    }

    public enum Status {
        ON_SALE, RESERVED, SOLD
    }
}
