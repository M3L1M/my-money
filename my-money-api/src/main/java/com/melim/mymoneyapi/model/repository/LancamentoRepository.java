package com.melim.mymoneyapi.model.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.melim.mymoneyapi.model.entity.Lancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Integer> {

	
}
