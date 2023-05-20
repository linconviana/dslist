import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DeletePackage, GetPackage } from "requestApi";
import { GameFull } from "types";

type UrlParams = {
    id: string;
}

const GameInfo = () => {

    const {id} = useParams<UrlParams>();
    const gameId = id ? parseInt(id) : null;
    const [formData, setFormData] = useState<GameFull>({} as GameFull);

    useEffect(() =>{
        
        const getResult = (result: any) => {
            setFormData(result.data);
        }

        if(gameId !== null){
            GetPackage(gameId, "games", getResult);
        }
        
    }, [gameId, setFormData]);
    
    const deleteGame = () => {
        const id = gameId as never;
        DeletePackage(parseInt(id), "games", getResult);
    }

    const getResult = (result: any) => {

        if(result.status === 200){
            alert('Game excluido com sucesso!');
            window.location.href = "/";
        }
        else
            alert('Erro ao tentar excluir este Game!');
    }

    return(
        <div className="game-information">
            <div className="game-full-container">
                <div className="header-game">
                    <h5 className="title-game">{formData && formData.title}</h5>
                    <Link to={`/game/update/${gameId}`}><button>Atualizar Game</button></Link>
                    <button onClick={deleteGame}>Excluir Game</button>
                    <Link to={`/`}><button>Retornar</button></Link>
                </div>
                <div className="game-img-info">
                    <img src={formData && formData.imgUrl} alt="Imagem do Game" />
                </div>
                <div>
                    <div className="game-status">
                        <label className="lbl-game-status">Ano Lançamento: <h3>{formData && formData.year}</h3></label>
                        <label className="lbl-game-status">Genero: <h3>{formData && formData.genre}</h3></label>
                        <label className="lbl-game-status">Classificação: <h3>{formData && formData.score}</h3></label>
                    </div>
                    <span className="game-short-description" style={{marginTop:'1%'}}>Descrição Curta:</span>
                    <p>{formData && formData.shortDescription}</p>
                    <span className="game-long-description">Descrição Longa:</span>
                    <p>{formData && formData.longDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default GameInfo;