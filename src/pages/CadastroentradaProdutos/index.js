import React,{useEffect, useState} from 'react';
import '../../pages/global.css'
import{ FiFilePlus }from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import Menu from '../../componentes/menu';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Head from '../../componentes/Head';
import api from '../../server/api';


export default function Cadastroentradaprodutos(){
    const navigate = useNavigate();
    const [id_produto, setId_produto] = useState("");
    const [qtde, setQtde] = useState("");
    const [valor_unitario, setValor_unitario] = useState("");
    const [data_entrada, setData_entrada] = useState("");
    const [lista, setLista] = useState([])
    const entrada={
        id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
        id_produto,
        qtde,
        valor_unitario,
        data_entrada
    }

    const dadosestoque={
        id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
        id_produto,
        qtde,
        valor_unitario
    }
    useEffect(()=>{
    api.get("/produtos").then((res)=>{
                setLista(res.data.produto)
            });
    },[])

    

  // function alterarEstoque(idProduto, quantidade, valor) {
  //   const estoque = JSON.parse(localStorage.getItem("cd-estoques") || "[]");
  //   const produtoExistente = estoque.find(item => item.id_produto === idProduto);
  
  //   if (produtoExistente) {
  //     const soma = parseFloat(produtoExistente.qtde) + parseFloat(quantidade);
  //     const dadosNovos = estoque.map(item => {
  //       if (item.id_produto === idProduto) {
  //         return {
  //           id: item.id,
  //           id_produto: item.id_produto,
  //           qtde: soma,
  //           valor_unitario: valor
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //     localStorage.setItem("cd-estoques", JSON.stringify(dadosNovos));
  //   } else {
  //     const dadosEstoque = {
  //       id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
  //       id_produto,
  //       qtde: parseFloat(quantidade),
  //       valor_unitario: valor
  //     };
  //     estoque.push(dadosEstoque);
  //     localStorage.setItem("cd-estoques", JSON.stringify(estoque));
  //   }
  // }


    function salvardados(e){
        e.preventDefault();
        // console.log(usuario);
        let i=0;
        if(qtde=="")
        i++;
        else if(valor_unitario=="" || valor_unitario=== 0)
        i++;
        else if(data_entrada=="")
         i++;
      if(i==0)
      {
        // const  banco =JSON.parse(localStorage.getItem("cd-entradaprodutos")|| "[]");
       
        // banco.push(entrada);
        // localStorage.setItem("cd-entradaprodutos",JSON.stringify(banco));
        // alterarEstoque(id_produto,qtde,valor_unitario) 
        // alert("Entrada salvo com sucesso");
        api.post('/entrada', entrada, 
        {headers:{"Constent-Type":"application/json"}})
        .then(function(response){
            console.log(response.data)
            alert(response.data.mensagem)
            navigate('/listaentrada');
        }
        )
      
        }

        // function Carregarproduto(){
        //     setLista(JSON.parse(localStorage.getItem("cd-produtos") || "[]"));
        // }
        // useEffect(()=>{
        //     Carregarproduto()
        // },[])
    }
    return(
        <div className="dashboard-container">
            <div className='menu'>
                <h1>menu</h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title='Entrada de Produtos'/>

                <div class="form-container">
                    <form className='form-cadastro' onSubmit={salvardados}>



                    <select value={id_produto} onChange={e=>setId_produto(e.target.value)}  >
                <option>Selecione um produto</option>
                {
                  lista.map((pro)=>{
                    return(
                      <option value={pro.id}>{pro.descricao}</option>
                    )
                  })
                }
              </select>
                        {/* <select 
                          value={id_produto}
                          onChange={e => setId_produto(e.target.value)}
                        >
                        <option selected>Lista de produtos</option>
                        {
                        lista.map((pro)=>{

                            return(

                                    <option value={pro.id}>{pro.descricao}</option>
                                  )

                            })
                        }
                       
                        </select> */}


                        <input type='text' 
                        value={qtde}
                        onChange={e=>setQtde(e.target.value)}
                        placeholder='Digite a quantidade do produto' 
                        />


                        <input type='date'
                        value={data_entrada}
                        onChange={e=>setData_entrada(e.target.value)}
                         placeholder='Digite a data da entrada do produto' 
                         />


                        <input type='number' 
                        value={valor_unitario}
                        onChange={e=>setValor_unitario(e.target.value)}
                        placeholder='Digite o valor do produto' 
                        />


                        <div class="acao">
                            <button className='btn-save'>
                                <FaSave />
                                Salvar
                                </button>
                            <button className='btn-cancel'>
                                <GiCancel />
                                Cancelar
                    
                                </button>
                        </div>
                    
                    </form>
                    
                </div>    
            </div>

            
        </div>
    )
}