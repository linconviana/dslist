import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllPackage, PostPackage } from "requestApi";
import { Game } from "types";

const GameDrop = () => {
  
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [position, setPosition] = useState({sourceIndex: 0, destinationIndex: 0});
  const [page, setPage] = useState<Game[]>([]);
  const [tipoGame, setTipoGame] = useState(2);

  useEffect(() =>{
        
    const getResult = (result: any) => {
      setPage(result.data);
    }
    GetAllPackage(`lists/${tipoGame}/games`, '', getResult);

    return;   
  }, [tipoGame]);

  const handleSort = () => {

    let newLista2 = [...page];

    const draggerItemContent2 = newLista2.splice(dragItem.current, 1)[0];

    newLista2.splice(dragOverItem.current, 0, draggerItemContent2);

    setPosition({...position, sourceIndex : dragItem.current, destinationIndex: dragOverItem.current});

    const data = JSON.stringify({'sourceIndex' : dragItem.current, 'destinationIndex': dragOverItem.current});
    dragItem.current = null;
    dragOverItem.current = null;

    setPage(newLista2);
    PostPackage(`lists/${tipoGame}/replacement`, data, ()=>{});
  }

  return (
    <>
      <div className="container-main"> 
        <div className="container-title-type"><h1>{tipoGame === 1 ? 'Aventura e RPG' : 'Jogos de Plataforma'}</h1></div>   
        <div className="container-option">
          <Link to={`/game/cadastro`}><button className="add-game">Adicionar Game</button></Link>
          <div className="col-md-2">
            <label className='label-fonte'>Mudar tipo de game</label>
            <select className="form-select" name="filial" value={tipoGame} onChange={(e)=>setTipoGame(parseInt(e.target.value))}>
              <option key={1} value={1}>RPG e Shooter</option>
              <option key={2} value={2}>Plataforma</option>
            </select>
          </div>
        </div>
        {page?.map((x, index) => (
          <div key={index} className='container-secondary' draggable 
            onDragStart={(e) => dragItem.current = index}
            onDragEnter={(e) => dragOverItem.current = index}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className='img-container'>
              <img src={x.imgUrl} alt="Imagem do Game" />
            </div>
            <div className='info-container'>
              <div className='info'>
                <div className="title-container">
                  <h3>{x.title}</h3>
                  <Link to={`/game/information/${x.id}`}><button>Informações Game</button></Link>
                </div>
                <p>{x.shortDescription} </p>
                <span>{x.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GameDrop;