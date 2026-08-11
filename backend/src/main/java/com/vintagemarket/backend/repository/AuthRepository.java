package com.vintagemarket.backend.repository;

import com.vintagemarket.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
