package com.melim.mymoneyapi.controller.dto;


import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LancamentoDTO {
	private String descricao;
	private Integer ano;
	private Integer mes;
	private BigDecimal valor;
	private String tipoLancamento;
}
