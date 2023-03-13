package com.melim.mymoneyapi.service;

import java.math.BigDecimal;
import java.util.List;

import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.enums.TipoLancamento;

public interface LancamentoService {
	List<Lancamento> buscar(Lancamento licencaFiltro);
	Lancamento save(Lancamento lancamento);
	Lancamento obterPorId(Integer id);
	Integer update(Integer id,Lancamento lancamento);
	Integer delete(Integer id);
	Integer alterarTipoLancamento(Integer id,TipoLancamento tipoLancamento);
	BigDecimal obterValorTotal();
}
