package com.melim.mymoneyapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.entity.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Integer>{

	Receita findByLancamento(Lancamento lancamento);

}
