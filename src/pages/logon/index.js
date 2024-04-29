import './styles.css'
import Logo from '../../assets/img/logo2.jpg';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import api from '../../server/api';

export default function Logon(){
const navigate = useNavigate();
const [email, setEmail] = useState();
const [senha, setSenha] = useState();
const log = {
    email,
    senha
}

const logar =(e)=>{
     e.preventDefault();
    // let banco =JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
    
    
    // let dadosnovos = banco.filter(item => item.email === email && item.senha === senha);
    // console.log(banco);
    // if(dadosnovos.length>0){
    //     navigate('/dashboard');
    // }else{
    //     alert("Dados incorretos!!!");
    // }
    api.post('/usuario/login', log)
    .then(function(response){
        console.log(response.status);
        if(response.status === 200){
            navigate('/dashboard');
        }else{
                
        }
    })
    .catch(function(error){
        console.error(error);
    });



    
    }

    return(
        <div className="logon-container">
            <div>
                <img src={Logo} />
            </div>
            <section className="form">
                <h1 className="">Faça seu login</h1>
                <form onSubmit={logar}>
                    <input placeholder="Email" 
                    onChange={e=>setEmail(e.target.value)}
                    value ={email}
                    />
                    
                    <input placeholder="Senha" type='password' 
                    onChange={e=>setSenha(e.target.value)}
                    value={senha}
                    />
                    
                    <button type="submit">Entrar</button>
                    <a href="#">Novo Cadastro</a>
                </form>
            </section>
        </div>
    )
}