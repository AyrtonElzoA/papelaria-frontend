import React,{useState, useEffect} from 'react';
import '../../pages/global.css'
import{ FiFilePlus }from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import Menu from '../../componentes/menu';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Editarusuario(){
    let { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [banco, setBanco] = useState([])
    const [status,setStatus] = useState(true);
    const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
    const usuario={
        id,
        nome,
        email,
        senha
    }

    useEffect(()=>{

        mostrardados(id);
        
        },[])
        async function mostrardados(idu) {
        
        // let listaUser =JSON.parse(localStorage.getItem("cd-usuarios"));
        
        // listaUser.
        // filter(value => value.id ==idu).
        // map(value => {
        // setNome(value.nome);
        // setEmail(value.email);
        // setSenha(value.senha);
        
        // })
            api.get(`/usuario/${idu}`)
            .then(res=>{
                console.log(res.data)
                if(res.status ===200){
                    setNome(res.data.usuario[0].nome)
                    setEmail(res.data.usuario[0].email)
                    
                }
            })
        }

        // Função para validar formato de e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

    function salvardados(e){
        e.preventDefault();
        let i = 0;
        // Validação dos campos
        if (!nome || nome.length < 3) {
            // Definindo mensagem de erro específica para o campo nome
            setError("Nome inválido! Deve ter pelo menos 3 caracteres.");
            i++;
        }
        if (!email || !validateEmail(email)) {
            setError("E-mail inválido!");
            i++;
        }
        if (!senha || senha.length < 6) {
            setError("A senha deve conter pelo menos 6 caracteres.");
            i++;
        }

        if (i === 0){
        //  const banco =JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
        //  let dadosnovos = banco.filter(item => item.id !== id);
        //  dadosnovos.push(usuario);
        //  localStorage.setItem("cd-usuarios",JSON.stringify(dadosnovos));
        //  alert("Usuário salvo com sucesso");
        api.put('/usuario', usuario, 
        {headers:{"Constent-Type":"application/json"}})
        .then(function(response){
            console.log(response.data)
            alert(response.data.mensagem)
            navigate('/listausuario');
        })
       }else{

           return (
            <div className="dashboard-container">
                {/* Código omitido para brevidade */}
                <div className="form-container">
                    {/* Exibição da mensagem de erro */}
                    {error && <div className="error-message">{error}</div>}
                    <form className='form-cadastro' onSubmit={salvardados}>
                        {/* Campos do formulário */}
                        {/* Botões e demais elementos do formulário */}
                    </form>
                </div>
            </div>
        );
       }
        }
    return(
        <div className="dashboard-container">
            <div className='menu'>
                <h1>menu</h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title='Editar Usuário'/>

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