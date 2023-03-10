package com.melim.mymoneyapi.service;

import com.melim.mymoneyapi.model.entity.Despesa;
import com.melim.mymoneyapi.model.entity.Lancamento;

public interface DespesaService {
	Integer save(Despesa despesa);
	Despesa obterPorIdLancamento(Lancamento lancamento);
	void update(Integer id,Despesa despesa);
}
