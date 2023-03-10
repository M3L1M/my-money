package com.melim.mymoneyapi.service.impl;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.melim.mymoneyapi.model.entity.Despesa;
import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.repository.DespesaRepository;
import com.melim.mymoneyapi.service.DespesaService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class DespesaServiceImpl implements DespesaService {
	
	private final DespesaRepository repository;
	
	@Override
	public Integer save(Despesa despesa) {
		despesa=repository.save(despesa);
		return despesa.getId();
	}
	
	@Override
	public Despesa obterPorIdLancamento(Lancamento lancamento) {
		Despesa despesa=repository.findByLancamento(lancamento);
		return despesa;
	}
	
	@Override
	@Transactional
	public void update(Integer id, Despesa despesa) {
		repository
			.findById(id)
			.map(entity -> {
				despesa.setId(id);
				despesa.getLancamento().setId(entity.getLancamento().getId());
			return repository.save(despesa);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
				"Esta despesa não esta cadastrada na base de dados"));
	
}

}
