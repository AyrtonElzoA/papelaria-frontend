import '../../pages/global.css'
import React, {useState, useEffect} from 'react';
import{ FiEdit,FiTrash,FiDelete, FiFilePlus }from "react-icons/fi";
import Menu from '../../componentes/menu';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link} from 'react-router-dom'
import Head from '../../componentes/Head';
import Editarusuario from '../editarUsuario';
import api from '../../server/api';



export default function Listarentradaprodutos(){
    const [dados, setDados] = useState([]);
    const [banco, setBanco] = useState([]);

   

    useEffect(()=>{
        mostrardados();
    },[])

    function mostrardados()
    {
        // setBanco(JSON.parse(localStorage.getItem("cd-entradaprodutos") || "[]"));
        api.get('/entrada')
                .then(res=>{
                    console.log(res.data.entrada)
                    setBanco(res.data.entrada)
                })
    }

   const Apagar = (id) => {
        confirmAlert({
          title: 'Excluir entrada do produto',
          message: 'Tem certeza que deseja excluir esta entrada do produto?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                // let dadosnovos = banco.filter(item => item.id !== id);
                // localStorage.setItem("cd-usuarios", JSON.stringify(dadosnovos));
                // setBanco(dadosnovos);
                api.delete(`/entrada/${id}`)
                .then(res=>{
                  if(res.status===200){
                    alert(`Você apagou a entrada id:${id}`);
                    mostrardados();
                  }else{
                    alert("Houve um problema no servidor");
                  }
                })
              }
            },
            {
              label: 'Não',
              onClick: () => alert('Click No')  
            }
          ]
        });
      };

      function Mostrarproduto(id_produto) {
        // let descricao_produto= "";
        // let lista =JSON.parse(localStorage.getItem("cd-produtos") || "[]");
        // lista.filter(item => item.id === id).map(value => {
        //     console.log(value.descricao)
        //     descricao_produto= value.descricao;
        api.get("/produtos")
                .then(res=>{
                    console.log(res.data.produtos)
                    // setBanco(res.data.produto)

                    return res.data.produtos[0].descricao
                })

                return false;
            }

        return(
            <div className="dashboard-container">
                <div className='menu'>
                    <h1></h1>
                    <Menu />
                </div>
                <div className='principal'>
                <Head title='Entrada de produtos'/>
                
                    <div>
                        <Link to="/cadastroentradaprodutos" className='btn-novo'> Novo Produto</Link>
                    </div>
                    <table >
                        <tr>
                            <th>Id</th>
                            <th>Id produto</th>
                            <th>Quantidade</th> 
                            <th>Data da entrada</th>
                            <th>Valor do produto</th>
                        </tr>
                        {
                            banco.map((entpro)=>{
    
                                return(
                                    <tr key={entpro.toString()}>
                                        <td>{entpro.id}</td>
                                        <td>{entpro.descricao}</td>
                                        <td>{entpro.qtde}</td>
                                        <td>{entpro.data_entrada}</td>
                                        <td>{entpro.valor_unitario}</td>
                                        
                                        <td className='botoes'> 
                         
                                        <FiTrash 
                                        size={20} 
                                        color='red'
                                        onClick={(e)=>Apagar(entpro.id)}
                                        />
                                        </td>
                                        
                                    </tr>
                                )
                            
                            })
                                
    
                        }                
                            
                        
    
                    </table>
                </div>
            </div>
        )
      }

