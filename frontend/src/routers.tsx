import GameFormulario from "pages/gameCadastro";
import GameDrop from "pages/gameDrop";
import GameInfo from "pages/gameInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Routers = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GameDrop />}/>
                <Route path="/game/information/:id" element={<GameInfo />}/>
                <Route path="/game/cadastro" element={<GameFormulario />}/>
                <Route path="/game/update/:id" element={<GameFormulario />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;