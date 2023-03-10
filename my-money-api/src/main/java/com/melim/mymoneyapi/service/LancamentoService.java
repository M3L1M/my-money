package com.melim.mymoneyapi.service;

import java.math.BigDecimal;

import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.enums.TipoLancamento;

public interface LancamentoService {
	Lancamento save(Lancamento lancamento);
	Lancamento obterPorId(Integer id);
	Integer update(Integer id,Lancamento lancamento);
	Integer delete(Integer id);
	Integer alterarTipoLancamento(Integer id,TipoLancamento tipoLancamento);
	BigDecimal obterValorTotal();
}
