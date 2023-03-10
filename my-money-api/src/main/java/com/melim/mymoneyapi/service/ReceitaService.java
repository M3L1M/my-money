package com.melim.mymoneyapi.service;

import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.entity.Receita;

public interface ReceitaService {
	Integer save(Receita receita);
	Receita obterPorIdLancamento(Lancamento lancamento);
	void update(Integer id, Receita receita);
}
