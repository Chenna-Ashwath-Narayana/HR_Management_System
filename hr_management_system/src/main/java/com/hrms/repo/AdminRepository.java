package com.hrms.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

	public Optional<Admin> findByAdminIdAndPassword(Long adminId, String password);

}
