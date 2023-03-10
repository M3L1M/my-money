package com.melim.mymoneyapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.melim.mymoneyapi.model.entity.Despesa;
import com.melim.mymoneyapi.model.entity.Lancamento;

public interface DespesaRepository extends JpaRepository<Despesa, Integer> {

	Despesa findByLancamento(Lancamento lancamento);

}
