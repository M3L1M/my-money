import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import FormGroup from "../../Components/FormGroup";
import SelectMenu from "../../Components/SelectMenu";
import LancamentoService from "../../Service/LancamentoService";
import * as messages from "../../Components/Toastr";


const lancamentoService = new LancamentoService();

const Home = () => {
    const [deletar, setDeletar] = useState([]);
    const [editar, setEditar] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showDialogSave, setShowDialogSave] = useState(false);
    const [atualizando, setAtualizando] = useState(false)

    const [descricao, setDescricao] = useState('');
    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');
    const [valor, setValor] = useState(0.0);
    const [tipoPagamento, setTipoPagamento] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('');
    const [categoria, setCategoria] = useState('');
    const [position, setPosition] = useState('center');
    const [meses] = useState([])
    const [tiposLancamento] = useState([])
    const [tiposPagamento] = useState([])
    const [categoriaReceita] = useState([])
    const [categoriaDespesa] = useState([])

    const dialogFuncMap = {
        'showConfirmDelete': setShowConfirmDelete,
        'showDialogSave': setShowDialogSave
    }

    const listarLancamentos = () => {
        var uri = '?categoria';
        if(tipoLancamento != ''){
            uri+=`=${tipoLancamento}`
        }

    }

    const gerarSelectMeses = () => {
        lancamentoService
            .meses()
            .then((query) => {
                const dropdown = [];
                query.forEach((prg) => {
                    dropdown.push(prg)
                });
                console.log(dropdown)
                for (var i = 0; i < dropdown.length; i++) {
                    meses.push(dropdown[i])
                }
                console.log(meses)
                return meses;
            })
    }
    const gerarSelectTipoLicenca = () => {
        lancamentoService
            .tipoLancamento()
            .then((query) => {
                query.forEach((prg) => {
                    tiposLancamento.push(prg)
                });
                return tiposLancamento;
            })
    }

    const gerarSelectReceita = () => {
        lancamentoService
            .categoriaReceita()
            .then((query) => {
                query.forEach((prg) => {
                    categoriaReceita.push(prg)
                });
                return categoriaReceita;
            })
    }

    const gerarSelectDespesa = () => {
        lancamentoService
            .categoriaDespesa()
            .then((query) => {
                query.forEach((prg) => {
                    categoriaDespesa.push(prg)
                });
                return categoriaDespesa;
            })
    }

    const gerarSelectPagamento = () => {
        lancamentoService
            .tipoPagamento()
            .then((query) => {
                query.forEach((prg) => {
                    tiposPagamento.push(prg)
                });
                return tiposPagamento;
            })
    }

    useEffect(() => {
        gerarSelectMeses();
        gerarSelectTipoLicenca();
        gerarSelectReceita();
        gerarSelectDespesa();
        gerarSelectPagamento();
    }, [])



    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
        if (position) {
            setPosition(position);
        }
    }
    const onHide = (nome) => {
        setAtualizando(false)
        dialogFuncMap[`${nome}`](false);
        setDescricao('');
        setAno('');
        setMes('');
        setValor('');
        setTipoPagamento('');
        setTipoLancamento('');
        setCategoria('');

    }

    const adicionar = () => {

        const lancamento = {
            idLancamento: {
                descricao, ano, mes, valor,
                tipoLancamento,tipoPagamento
            },
            categoria
        }


        const erro=lancamentoService.validar(lancamento)

        if(erro.length>0){
            const mensagens=erro;
            mensagens.forEach(msg => messages.mensagemAlerta(msg))
            return false;
        }

        lancamentoService
            .adicionar(lancamento)
            .then(response => {
                onHide("showDialogSave")
                messages.mensagemSucesso("Adicionado com sucesso")

            }).catch(error => {
                messages.mensagemErro(error.response.data.message);
            })
    }

    const confirmSaveFooter = (
        <div>
            {atualizando ?
                (
                    <Button label='Editar' icon='pi pi-check' />

                ) : (
                    <Button label='Adicionar' onClick={adicionar} icon='pi pi-check' />
                )
            }

            <Button label='Cancelar' icon='pi pi-times' onClick={() => onHide('showDialogSave')}
                className="p-button-secondary" />
        </div>
    )

    return (
        <div className='col-md-10' style={{ position: 'relative', left: '8.3%' }}>
            <Card title="Finanças" children={
                <div>
                    <div className="row">
                        <div className='col-md-12'>
                            <div className="bs-component">
                                
                                <button className="btn btn-primary">Buscar</button>
                                <br/><br/>
                                <button className="btn btn-secondary">Receita</button>
                                <button className="btn btn-secondary">Despesa</button>
                                <button title="Adicionar" style={{ float: "right" }} onClick={() => onClick('showDialogSave')} className="btn btn-success" nome="Adicionar">Adicionar</button>

                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog
                            header={atualizando ? 'Atualização de Cadastro' : 'Cadastro de Lançamento'}
                            visible={showDialogSave}
                            style={{ width: '50vw' }}
                            footer={confirmSaveFooter}
                            modal={true}
                            onHide={() => { onHide('showDialogSave') }}
                        >
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup htmlFor="inputDescricao" label="Descrição: " children={
                                            <Input id="inputDescricao" name="descricao"
                                                value={descricao} className="form-control"
                                                onChange={(e) => [setDescricao(e.target.value)]} />
                                        } />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <FormGroup htmlFor="inputMes" label="Mês" children={
                                            <SelectMenu id="inputMes" name="mes"
                                                value={mes} className="form-control"
                                                onChange={(e) => [setMes(e.target.value)]}
                                                lista={meses} />
                                        } />
                                    </div>
                                    <div className="col-md-3">
                                        <FormGroup htmlFor="inputAno" label="Ano" children={
                                            <Input id="inputAno" name="ano"
                                                value={ano} className="form-control"
                                                onChange={(e) => [setAno(e.target.value)]} />
                                        } />
                                    </div>
                                    <div className="col-md-3">
                                        <FormGroup htmlFor="inputValor" label="Valor" children={
                                            <Input id="inputValor" name="valor" type="number"
                                                value={valor} className="form-control"
                                                onChange={(e) => [setValor(e.target.value)]} />
                                        } />
                                    </div>
                                    <div className="col-md-3">
                                        <FormGroup htmlFor="inputPagamento" label="Pagamento" children={
                                            <SelectMenu id="inputPagamento" name="pagamento"
                                                value={tipoPagamento} className="form-control"
                                                onChange={(e) => [setTipoPagamento(e.target.value)]}
                                                lista={tiposPagamento} />
                                        } />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <FormGroup htmlFor="inputTipoLancamento" label="Tipo de Lançamento" children={
                                            <div>
                                                {
                                                    atualizando ? (
                                                        <SelectMenu id="inputTipoLancamento" name="tipoLancamento" disabled value={tipoLancamento} className="form-control"
                                                            onChange={(e) => [setTipoLancamento(e.target.value)]} lista={tiposLancamento} />
                                                    ) : (
                                                        <SelectMenu id="inputTipoLancamento" name="tipoLancamento" value={tipoLancamento} className="form-control"
                                                            onChange={(e) => [setTipoLancamento(e.target.value)]} lista={tiposLancamento} />
                                                    )
                                                }
                                            </div>
                                        } />
                                    </div>
                                    <div className="col-md-3">
                                        <FormGroup htmlFor="inputCategoria" label="Categoria" children={
                                            <div>
                                                {
                                                    tipoLancamento === '' ? (
                                                        <div>
                                                            <SelectMenu id="inputCategoria" className="form-control" name="categoria"
                                                                value={categoria} lista={['Selecione...']} onChange={(e) => [setCategoria(e.target.value)]} />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {
                                                                tipoLancamento === "RECEITA" ? (
                                                                    <div>
                                                                        <SelectMenu id="inputCategoria" className="form-control"
                                                                            name="categoria" value={categoria}
                                                                            onChange={(e) => [setCategoria(e.target.value)]}
                                                                            lista={categoriaReceita} />
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <SelectMenu id="inputCategoria" className="form-control" name="categoria"
                                                                            value={categoria} onChange={(e) => [setCategoria(e.target.value)]}
                                                                            lista={categoriaDespesa} />
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        } />
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            } />
        </div>
    )
}

export default Home;