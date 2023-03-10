import { mensagemAlerta } from "../Components/Toastr";
import AuthService from "./AuthService";
class LancamentoService extends AuthService {
    constructor() {
        super('/lancamento')
    }

    validar(lancamento) {
        console.log(lancamento)
        if (lancamento.idLancamento.descricao === '') {
            mensagemAlerta("Descrição em branco")
        }
        if (lancamento.idLancamento.mes === '' || lancamento.idLancamento.mes === 'Selecione...') {
            mensagemAlerta("Mês em branco")
        }
        if (lancamento.idLancamento.ano === '') {
            mensagemAlerta("Ano em branco")
        }
        if (lancamento.idLancamento.ano.length != 4) {
            mensagemAlerta("Ano invalido")
        }
        if (lancamento.idLancamento.tipoLancamento === '' || lancamento.idLancamento.tipoLancamento === 'Selecione...') {
            mensagemAlerta("Tipo de lancamento em branco")
        }
        if (lancamento.categoria === '' || lancamento.categoria === 'Selecione...') {
            mensagemAlerta("Categoria em branco")
        }

        if (lancamento.idLancamento.mes === 'Janeiro') {
            lancamento.idLancamento.mes = 1;
        } else if (lancamento.idLancamento.mes === 'Fevereiro') {
            lancamento.idLancamento.mes = 2;
        } else if (lancamento.idLancamento.mes === 'Março') {
            lancamento.idLancamento.mes = 3;
        } else if (lancamento.idLancamento.mes === 'Abril') {
            lancamento.idLancamento.mes = 4;
        } else if (lancamento.idLancamento.mes === 'Maio') {
            lancamento.idLancamento.mes = 5;
        } else if (lancamento.idLancamento.mes === 'Junho') {
            lancamento.idLancamento.mes = 6;
        } else if (lancamento.idLancamento.mes === 'Julho') {
            lancamento.idLancamento.mes = 7;
        } else if (lancamento.idLancamento.mes === 'Agosto') {
            lancamento.idLancamento.mes = 8;
        } else if (lancamento.idLancamento.mes === 'Setembro') {
            lancamento.idLancamento.mes = 9;
        } else if (lancamento.idLancamento.mes === 'Outubro') {
            lancamento.idLancamento.mes = 10;
        } else if (lancamento.idLancamento.mes === 'Novembro') {
            lancamento.idLancamento.mes = 11;
        } else if (lancamento.idLancamento.mes === 'Dezembro') {
            lancamento.idLancamento.mes = 12;
        }

        if (lancamento.idLancamento.tipoLancamento === 'Receita') {
            lancamento.idLancamento.tipoLancamento = 'RECEITA'
        } else if (lancamento.idLancamento.tipoLancamento === 'Despesa') {
            lancamento.idLancamento.tipoLancamento = 'DESPESA'
        }

        if (lancamento.categoria === 'Ganhos de Investimentos') {
            lancamento.categoria = 'GANHO_INVESTIMENTO'
        } else if (lancamento.categoria === 'Salario') {
            lancamento.categoria = 'SALARIO'
        } else if (lancamento.categoria === 'Extra') {
            lancamento.categoria = 'EXTRA'
        }

        else if (lancamento.categoria === 'Conta') {
            lancamento.categoria = 'CONTA'
        } else if (lancamento.categoria === 'Entretenimento') {
            lancamento.categoria = 'ENTRETENIMENTO'
        } else if (lancamento.categoria === 'Investimento') {
            lancamento.categoria = 'INVESTIMENTO'
        } else if (lancamento.categoria === 'Curso') {
            lancamento.categoria = 'CURSO'
        }

    }





    adicionar(lancamento) {
        //texto.match(/^-?\d+\.\d+$/);

        return this.post('', lancamento);
    }

    async editar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento)
    }

    async deletar(id) {
        return this.delete(`/${id}`)
    }

    async tipoLancamento() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'Despesa', value: 'DESPESA' },
            { name: 'Receita', value: 'RECEITA' },
        ]
    }

    async categoriaReceita() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'Ganhos de Investimentos', value: 'GANHO_INVESTIMENTO' },
            { name: 'Salario', value: 'SALARIO' },
            { name: 'Extra', value: 'EXTRA' },
        ]
    }

    async categoriaDespesa() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'Conta', value: 'CONTA' },
            { name: 'Entretenimento', value: 'ENTRETENIMENTO' },
            { name: 'Investimento', value: 'INVESTIMENTO' },
            { name: 'Curso', value: 'CURSO' }
        ]
    }

    async meses() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'Janeiro', value: '1' },
            { name: 'Fevereiro', value: '2' },
            { name: 'Março', value: '3' },
            { name: 'Abril', value: '4' },
            { name: 'Maio', value: '5' },
            { name: 'Junho', value: '6' },
            { name: 'Julho', value: '7' },
            { name: 'Agosto', value: '8' },
            { name: 'Setembro', value: '9' },
            { name: 'Outubro', value: '10' },
            { name: 'Novembro', value: '11' },
            { name: 'Dezembro', value: '12' },
        ]
    }



}

export default LancamentoService;