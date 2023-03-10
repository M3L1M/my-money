package com.melim.mymoneyapi.service.impl;

import java.math.BigDecimal;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.enums.TipoLancamento;
import com.melim.mymoneyapi.model.repository.LancamentoRepository;
import com.melim.mymoneyapi.service.LancamentoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class LancamentoServiceImpl implements LancamentoService {

	private final LancamentoRepository repository;

	@Override
	@Transactional
	public Lancamento save(Lancamento lancamento) {
		return repository.save(lancamento);
	}

	@Override
	public Lancamento obterPorId(Integer id) {
		Lancamento lancamento = repository
				.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
						"Este lancamento não esta cadastrado na base de dados"));
		System.out.println("--"+lancamento);
		return lancamento;
	}

	@Override
	@Transactional
	public Integer update(Integer id, Lancamento lancamento) {
		repository.findById(id).map(entity -> {
			lancamento.setId(id);
			return repository.save(lancamento);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
				"Este lancamento não esta cadastrado na base de dados"));

		return id;
	}

	@Override
	@Transactional
	public Integer delete(Integer id) {
		repository.findById(id).map(entity -> {
			repository.delete(entity);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
				"Este lancamento não esta cadastrado na base de dados"));

		return id;
	}

	@Override
	@Transactional
	public Integer alterarTipoLancamento(Integer id, TipoLancamento tipoLancamento) {
		repository.findById(id).map(entity -> {
			entity.setTipoLancamento(tipoLancamento);
			return repository.save(entity);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
				"Este lancamento não esta cadastrado na base de dados"));

		return id;
	}

	

	@Override
	public BigDecimal obterValorTotal() {
		
		
		
		return BigDecimal.ZERO;
	}

}
