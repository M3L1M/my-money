import { mensagemAlerta } from "../Components/Toastr";
import AuthService from "./AuthService";
class LancamentoService extends AuthService {
    constructor() {
        super('/lancamento')
    }

    async buscar(status){
        const {data} = await this.get(`${status}`)
        return data;
    }

    validar(lancamento) {
        const erros=[]
        if (lancamento.idLancamento.descricao === '') {
            erros.push("Descrição em branco")
        }
        if (lancamento.idLancamento.mes === '' || lancamento.idLancamento.mes === 'Selecione...') {
            erros.push("Mês em branco")
        }
        if (lancamento.idLancamento.ano === '') {
            erros.push("Ano em branco")
        }
        if (lancamento.idLancamento.ano.length != 4) {
            erros.push("Ano invalido")
        }
        if (lancamento.idLancamento.tipoLancamento === '' || lancamento.idLancamento.tipoLancamento === 'Selecione...') {
            erros.push("Tipo de lancamento em branco")
        }
        if (lancamento.categoria === '' || lancamento.categoria === 'Selecione...') {
            erros.push("Categoria em branco")
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

       return erros;

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
            { name: 'DESPESA', value: 'DESPESA' },
            { name: 'RECEITA', value: 'RECEITA' },
        ]
    }

    async tipoPagamento() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'DINHEIRO', value: 'DINHEIRO' },
            { name: 'PIX', value: 'PIX' },
            { name: 'CREDITO', value: 'CREDITO' },
        ]
    }

    async categoriaReceita() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'GANHO_INVESTIMENTO', value: 'GANHO_INVESTIMENTO' },
            { name: 'SALARIO', value: 'SALARIO' },
            { name: 'EXTRA', value: 'EXTRA' },
        ]
    }

    async categoriaDespesa() {
        return [
            { name: 'Selecione...', value: '' },
            { name: 'CONTA', value: 'CONTA' },
            { name: 'ENTRETENIMENTO', value: 'ENTRETENIMENTO' },
            { name: 'INVESTIMENTO', value: 'INVESTIMENTO' },
            { name: 'CURSO', value: 'CURSO' }
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