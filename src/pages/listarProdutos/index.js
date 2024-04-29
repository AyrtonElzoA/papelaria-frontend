import '../../pages/global.css'
import React, {useState, useEffect} from 'react';
import{ FiEdit,FiTrash,FiDelete, FiFilePlus }from "react-icons/fi";
import Menu from '../../componentes/menu';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link} from 'react-router-dom'
import Head from '../../componentes/Head';
import Editarusuario from '../editarUsuario';
import Editarprodutos from '../editarProdutos';
import api from '../../server/api';


export default function Listaprodutos(){
    const [dados, setDados] = useState([]);
    const [banco, setBanco] = useState([]);

   

    useEffect(()=>{
        mostrardados();
    },[])

    function mostrardados()
    {
        // setBanco(JSON.parse(localStorage.getItem("cd-produtos") || "[]"));
        api.get('/produtos')
                .then(res=>{
                  setBanco(res.data.produto)
                  console.log(res.data)
                })
    }

   const Apagar = (id) => {
        confirmAlert({
          title: 'Excluir produto',
          message: 'Tem certeza que deseja excluir este produto?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                // let dadosnovos = banco.filter(item => item.id !== id);
                // localStorage.setItem("cd-produtos", JSON.stringify(dadosnovos));
                // setBanco(dadosnovos);

                api.delete(`/produtos/${id}`)
                .then(res=>{
                  if(res.status===200){
                    alert(`Você apagou o produto id:${id}`);
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
            <Head title='Lista de produtos'/>
            
                <div>
                    <Link to="/cadastroprodutos" className='btn-novo'> Novo Produto</Link>
                </div>
                <table >
                    <tr>
                        <th>Id</th>
                        <th>status</th>
                        <th>descrição</th>
                        <th>estoque minimo</th>
                        <th>estoque máximo</th>
                    </tr>
                    {
                        banco.map((pro)=>{

                            return(
                                <tr key={pro.toString()}>
                                    <td>{pro.id}</td>
                                    <td>{pro.status}</td>
                                    <td>{pro.descricao}</td>
                                    <td>{pro.estoque_minimo}</td>
                                    <td>{pro.estoque_maximo}</td>
                                    <td className='botoes'> 
                                    <Link to={`/editarprodutos/${pro.id}`} >
                                    <FiEdit size={20} 
                                    color='blue'
                                    onClick={(e)=>Editarprodutos}
                                    />
                                    </Link>
                                    </td>
                                    <td className='botoes'> 
                     
                                    <FiTrash 
                                    size={20} 
                                    color='red'
                                    onClick={(e)=>Apagar(pro.id)}
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