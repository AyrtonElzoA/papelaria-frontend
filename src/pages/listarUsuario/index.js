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


export default function Listausuario(){
    const [dados, setDados] = useState([]);
    const [banco, setBanco] = useState([]);

    

    useEffect(()=>{
        mostrardados();
        
    //     consultarCEP("77807270").then(res=>{
    //       console.log(res)
        // })
    },[])

    async function consultarCEP(cep){
     
        // Substitua a URL base pela URL específica do ViaCEP com o CEP desejado
        const url = `https://viacep.com.br/ws/${cep}/json/`;
      
        // Utilizando o método fetch para fazer a requisição GET
        return fetch(url)
          .then(response => {
            // Verifica se a requisição foi bem-sucedida (status 2xx)
            if (!response.ok) {
              throw new Error(`Erro ao consultar o CEP: ${response.status}`);
            }
      
            // Parseia o JSON da resposta
            return response.json();
          })
          .then(data => {
            // Retorna os dados do CEP
            return data;
          })
          .catch(error => {
            console.error('Erro na requisição:', error);
          });
      }

    function mostrardados()
    {
        //setBanco(JSON.parse(localStorage.getItem("cd-usuarios") || "[]"));
        api.get('/usuario')
                .then(res=>{
                    console.log(res.data.usuarios)
                    setBanco(res.data.usuarios)
                })
    }

   const Apagar = (id) => {
        confirmAlert({
          title: 'Excluir usuário',
          message: 'Tem certeza que deseja excluir este usuário?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                // let dadosnovos = banco.filter(item => item.id !== id);
                // localStorage.setItem("cd-usuarios", JSON.stringify(dadosnovos));
                // setBanco(dadosnovos);
                api.delete(`/usuario/${id}`)
                .then(res=>{
                  if(res.status===200){
                    alert(`Você apagou o usuário id:${id}`);
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

    return(
        <div className="dashboard-container">
            <div className='menu'>
                <h1></h1>
                <Menu />
            </div>
            <div className='principal'>
            <Head title='Lista de usuários'/>
            
                <div>
                    <Link to="/cadastrousuario" className='btn-novo'> Novo Cadastro</Link>
                </div>
                <table >
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {
                        banco.map((usu)=>{

                            return(
                                <tr key={usu.toString()}>
                                    <td>{usu.id}</td>
                                    <td>{usu.nome}</td>
                                    <td>{usu.email}</td>
                                    <td className='botoes'> 
                                    <Link to={`/editarusuario/${usu.id}`} >
                                    <FiEdit size={20} 
                                    color='blue'
                                    onClick={(e)=>Editarusuario}
                                    />
                                    </Link>
                                    </td>
                                    <td className='botoes'> 
                     
                                    <FiTrash 
                                    size={20} 
                                    color='red'
                                    onClick={(e)=>Apagar(usu.id)}
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