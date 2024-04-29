import React,{useState} from 'react';
import '../../pages/global.css'
import{ FiFilePlus }from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import Menu from '../../componentes/menu';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Head from '../../componentes/Head';
import api from '../../server/api';


export default function Cadastrousuario(){
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const usuario={
        id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
        nome,
        email,
        senha
    }


    function salvardados(e){
        e.preventDefault();
        // console.log(usuario);
        let i=0;
        if(nome=="")
        i++;
       else if(email=="")
        i++;
       else if(senha=="")
       i++;
      if(i==0)
       {
        //  const banco =JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
        //  banco.push(usuario);
        //  localStorage.setItem("cd-usuarios",JSON.stringify(banco));
        api.post('/usuario', usuario, 
        {headers:{"Constent-Type":"application/json"}})
        .then(function(response){
            console.log(response.data)
            alert(response.data.mensagem)
        }

        )
         //alert("Usuário salvo com sucesso");
         navigate('/listausuario');
       }else{
        alert("Verifique! Há campos vazios!")
       }
        }
    return(
        <div className="dashboard-container">
            <div className='menu'>
                <h1>menu</h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title='Cadastro de Usuário'/>

                <div class="form-container">
                    <form className='form-cadastro' onSubmit={salvardados}>
                        <input type='text'
                        value={nome}
                        onChange={e=>setNome(e.target.value)}
                         placeholder='Digite o nome do usuário' 
                         />

                        <input type='email' 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        placeholder='Digite o email' 
                        />

                        <input type='password' 
                        value={senha}
                        onChange={e=>setSenha(e.target.value)}
                        placeholder='Digite a senha' 
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