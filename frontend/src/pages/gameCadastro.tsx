import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPackage, PostPackage, PutPackage } from "requestApi";
import { GameFull } from "types";
import PreviewImage from "./previewImage";

type UrlParams = {
    id: string;
}

const GameFormulario = () => {

    const {id} = useParams<UrlParams>();
    const gameId = id ? parseInt(id) : null;
    const [formData, setFormData] = useState<GameFull>({genre:'Aventura e RPG', listId:1, imgUrl: ''} as GameFull);
    const [btnName, setBtnName] = useState('Salvar');
    const [preview, setPreview] = useState(false);

    useEffect(() =>{
        
        const getResult = (result: any) => {
            setFormData(result.data);
            setBtnName('Atualizar');
        }
        if(gameId !== null){
            GetPackage(gameId, "games", getResult);
        }
        
    }, [gameId, setFormData]);
    
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        if(name !== 'genre')
            setFormData({...formData, [name] : value});
        else{
            let newListId = value === 'Aventura e RPG' ? 1 : 2;
            setFormData({...formData, [name] : value, listId: newListId});
        }
    }

    const handleSubmit = (e: any) => {

        e.preventDefault();

        const data = JSON.stringify(formData);
        if(gameId === null)
            PostPackage('games', data, getResult);
        else
            PutPackage(gameId,'games', data, getResult);
    }

    const getResult = (result: any) => {

        if(result.status === 200){
            alert('Game salvo com sucesso!');
            window.location.href = "/";
        }
        else
            alert('Erro ao tentar salvar este Game!');

    }

    const showPreviewImg = () => {
        setPreview(true);
    }

    const closePreviewImg = () => {
        debugger
        setPreview(false);
    }
    return(
        <>
         
            <div className="form-cadastro-game">
                {preview && <PreviewImage closePreviewImg={closePreviewImg} urlImg={formData.imgUrl}/>}
                {formData.imgUrl !== '' ?
                    <div className="game-img-preview mt-3" style={{textAlign: 'center'}}>
                        <img src={formData && formData.imgUrl} alt="Imagem do Game" onClick={showPreviewImg}/>
                    </div> : ''
                }
                <form onSubmit={handleSubmit}>
                    <div className="container">

                        <div className="row">
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='title' value={formData && formData.title} onChange={handleChange} placeholder="Titulo do Game"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='year' value={formData && formData.year} onChange={handleChange}  placeholder="Ano de Lançamento"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <select className="form-select" name="genre" value={formData && formData.genre} onChange={handleChange}>
                                    <option key={1} value={'Aventura e RPG'}>Aventura e RPG</option>
                                    <option key={2} value={'Jogos de Plataforma'}>Jogos de Plataforma</option>
                                </select>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='platforms' value={formData && formData.platforms} onChange={handleChange}  placeholder="Plataforma do Game"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='score' value={formData && formData.score} onChange={handleChange}  placeholder="Score do Game"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='imgUrl' value={formData && formData.imgUrl} onChange={handleChange} placeholder="Url da imagem do Game"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='shortDescription' value={formData && formData.shortDescription} onChange={handleChange}  placeholder="Breve descrição do Game"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <input className="form-control" name='longDescription' value={formData && formData.longDescription} onChange={handleChange}  placeholder="Longa descrição do Game"/>
                            </div>
                            <div className="col-md-6 offset-md-3 mt-2">
                                <button className="btn btn-primary" type="submit">{btnName}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default GameFormulario;