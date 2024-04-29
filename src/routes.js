import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Logon from './pages/logon';

import Dashboard from './pages/dashboard';

import Listausuario from './pages/listarUsuario';
import Listarprodutos from './pages/listarProdutos';
import Listarentradaprodutos from './pages/listarEntradaProduto';
import Listaestoque from './pages/listarEstoque';
import Listarsaidaprodutos from './pages/listaSaidaProduto';

import Cadastrousuario from './pages/CadastroUsuário';
import Cadastroprodutos from './pages/CadastroProdutos';
import Cadastroentradaprodutos from './pages/CadastroentradaProdutos';
import Cadastrosaidaprodutos from './pages/CadastrosaidaProdutos';

import Editarusuario from './pages/editarUsuario';
import Editarprodutos from './pages/editarProdutos';


export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/listausuario" element={<Listausuario />} />
                <Route path="/listaprodutos" element={<Listarprodutos />} />
                <Route path="/listaentrada" element={<Listarentradaprodutos />} />
                <Route path="/listaestoque" element={<Listaestoque />} />
                <Route path="/listasaida" element={<Listarsaidaprodutos />} />

                <Route path="/cadastrousuario" element={<Cadastrousuario />} />
                <Route path="/cadastroprodutos" element={<Cadastroprodutos />} />
                <Route path="/cadastroentradaprodutos" element={<Cadastroentradaprodutos />} />
                <Route path="/cadastrosaidaprodutos" element={<Cadastrosaidaprodutos />} />

                <Route path="/editarusuario/:id" element={<Editarusuario />} />
                <Route path="/editarprodutos/:id" element={<Editarprodutos />} />
            </Routes>
        </BrowserRouter>
    )
}