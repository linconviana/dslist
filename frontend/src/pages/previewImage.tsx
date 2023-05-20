import './style.css';

type Props = {
    closePreviewImg : Function,
    urlImg: string
}
const PreviewImage = ({urlImg, closePreviewImg} : Props) => {
///https://img.nsctotal.com.br/wp-content/uploads/2023/03/jogo-super-mario-bros-1.jpg.webp
    const close = ()=>{
        debugger
        closePreviewImg();
    }
    return(
        <>
            <div className="img_preview fade-in"></div>
            <div className="game-img">
                <span onClick={close}><b>X</b></span>
                <img src={urlImg} 
                alt="Imagem do Game" 
                />
            </div>
        </>
    )
}

export default PreviewImage;