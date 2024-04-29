import {FiLogOut} from 'react-icons/fi'
import { FaReply } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './styles.css'
export default function Head({title}){
    const navigate = useNavigate();


    function retornar(){
        navigate(-1);
    }

    function sair(){
        navigate("/")
    }
    const confirmarsaida=()=>{
        confirmAlert({
            message: "Realmente deseja sair?",
            buttons: [
                {
                    label: 'sim',
                    onClick: () => {sair();}
                },
                {
                    label:'no',
                   // onClick: () => alert('concelou saída')
                }
            ]
        }
        )
    }
    return(
        <div className="head">
            <FaReply className='voltar' onClick={retornar} color='blue'/>
            <h2>{title}</h2>
            <FiLogOut className='sair' onClick={confirmarsaida} size={24} color='red'/>
        </div>
    )
}   
