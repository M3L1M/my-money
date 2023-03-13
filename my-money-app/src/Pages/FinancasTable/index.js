import React from "react";
import currencyFomartter from 'currency-formatter'

export default props => {
    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFomartter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.mes}/{lancamento.ano}</td>
                <td>{lancamento.tipoLancamento}</td>
                <td>{lancamento.tipoPagamento}</td>
                <td>Butão</td>
            </tr>
        )
    })

    return (
        <table>
            <thead>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Mes/Ano</th>
                <th scope="col">Lancamento</th>
                <th scope="col">Pagamento</th>
                <th scope="col"></th>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}