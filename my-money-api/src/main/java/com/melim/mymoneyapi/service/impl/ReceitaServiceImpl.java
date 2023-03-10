package com.melim.mymoneyapi.service.impl;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.entity.Receita;
import com.melim.mymoneyapi.model.repository.ReceitaRepository;
import com.melim.mymoneyapi.service.ReceitaService;

import lombok.AllArgsConstructor;
@AllArgsConstructor
@Service
public class ReceitaServiceImpl implements ReceitaService {
	
	private final ReceitaRepository repository;
	
	@Override
	@Transactional
	public Integer save(Receita receita) {
		receita=repository.save(receita);
		return receita.getId();
	}

	@Override
	public Receita obterPorIdLancamento(Lancamento lancamento) {
		Receita receita=repository.findByLancamento(lancamento);
		return receita;
	}

	@Override
	@Transactional
	public void update(Integer id, Receita receita) {
		
		repository
			.findById(id)
			.map(entity -> {
				receita.setId(id);
				receita.getLancamento().setId(entity.getLancamento().getId());
				return repository.save(receita);
			}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Esta receita não esta cadastrada na base de dados"));
		
	}

}
