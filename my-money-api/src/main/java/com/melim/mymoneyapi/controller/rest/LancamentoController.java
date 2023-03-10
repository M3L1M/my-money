package com.melim.mymoneyapi.controller.rest;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.melim.mymoneyapi.controller.dto.LancamentoEspecificoDTO;
import com.melim.mymoneyapi.controller.dto.ReceitaDespesaDTO;
import com.melim.mymoneyapi.model.entity.Despesa;
import com.melim.mymoneyapi.model.entity.Lancamento;
import com.melim.mymoneyapi.model.entity.Receita;
import com.melim.mymoneyapi.model.enums.CategoriaDespesa;
import com.melim.mymoneyapi.model.enums.CategoriaReceita;
import com.melim.mymoneyapi.model.enums.Status;
import com.melim.mymoneyapi.model.enums.TipoLancamento;
import com.melim.mymoneyapi.service.DespesaService;
import com.melim.mymoneyapi.service.LancamentoService;
import com.melim.mymoneyapi.service.ReceitaService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/lancamento")
public class LancamentoController {
	private final LancamentoService service;
	private final ReceitaService receitaService;
	private final DespesaService despesaService;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Integer save(@RequestBody ReceitaDespesaDTO dto) {
		System.out.println(dto);
		Lancamento lancamento=converter(dto);
		lancamento.setDataCadastro(LocalDate.now());
		lancamento.setHoraCadastro(LocalTime.now());
		lancamento.setStatus(Status.ATIVO);
		lancamento=service.save(lancamento);
		
		if(lancamento.getTipoLancamento().equals(TipoLancamento.RECEITA)) {
			Receita receita=new Receita();
			receita.setCategoriaReceita(CategoriaReceita.valueOf(dto.getCategoria()));
			receita.setLancamento(lancamento);
			receitaService.save(receita);
		}else {
			Despesa despesa=new Despesa();
			despesa.setCategoriaDespesa(CategoriaDespesa.valueOf(dto.getCategoria()));
			despesa.setLancamento(lancamento);
			despesaService.save(despesa);
		}
		
		return lancamento.getId();
	}
	
	@GetMapping("/{id}")
	public LancamentoEspecificoDTO obterPorId(@PathVariable("id") Integer id) {
		
		Lancamento lancamento=service.obterPorId(id);
		LancamentoEspecificoDTO dto=converter(lancamento);
		if(lancamento.getTipoLancamento().equals(TipoLancamento.RECEITA)) {
			Receita receita = receitaService.obterPorIdLancamento(lancamento);
			dto.setCategoria(receita.getCategoriaReceita().toString());
		}else {
			Despesa despesa = despesaService.obterPorIdLancamento(lancamento);
			dto.setCategoria(despesa.getCategoriaDespesa().toString());
		}
		
		return dto;
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public Integer update(@PathVariable("id") Integer id,@RequestBody ReceitaDespesaDTO dto) {
		Lancamento lancamento=converter(dto);
		
		if(lancamento.getTipoLancamento().equals(TipoLancamento.RECEITA)) {
			Receita receita=new Receita();
			receita.setCategoriaReceita(CategoriaReceita.valueOf(dto.getCategoria()));
			receita.setLancamento(lancamento);
			receitaService.update(id, receita);
		}else {
			Despesa despesa=new Despesa();
			despesa.setCategoriaDespesa(CategoriaDespesa.valueOf(dto.getCategoria()));
			despesa.setLancamento(lancamento);
			despesaService.update(id,despesa);
		}
		service.update(id, lancamento);
		return lancamento.getId();
	}
	
	private LancamentoEspecificoDTO converter(Lancamento lancamento) {
		LancamentoEspecificoDTO dto=new LancamentoEspecificoDTO();
		dto.setDescricao(lancamento.getDescricao());
		dto.setAno(lancamento.getAno());
		dto.setMes(lancamento.getMes());
		dto.setValor(lancamento.getValor());
		dto.setTipoLancamento(lancamento.getTipoLancamento().toString());
		return dto;
	}

	private Lancamento converter(ReceitaDespesaDTO dto) {
		Lancamento lancamento=new Lancamento();
		lancamento.setDescricao(dto.getIdLancamento().getDescricao());
		lancamento.setAno(dto.getIdLancamento().getAno());
		lancamento.setMes(dto.getIdLancamento().getMes());
		lancamento.setValor(dto.getIdLancamento().getValor());
		lancamento.setTipoLancamento(TipoLancamento.valueOf(dto.getIdLancamento().getTipoLancamento()));
		return lancamento;
	}

	
}
