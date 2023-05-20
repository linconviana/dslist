import { useRef, useState } from "react";

const CopyGameDrop = () => {

    const [lista, setLista] = useState(["Java", "Python", "PHP", "Javascript", "Typescrpit"]);
  const [position, setPosition] = useState({index: '', resourceIndex: 0, destinationIndex: 0});

  const handleSort = () => {

    let newLista = [...lista];

    const draggerItemContent = newLista.splice(dragItem.current, 1)[0];

    newLista.splice(dragOverItem.current, 0, draggerItemContent);

    setPosition({...position, index: draggerItemContent, resourceIndex : dragItem.current, destinationIndex: dragOverItem.current});

    dragItem.current = null;
    dragOverItem.current = null;

    setLista(newLista);
  }

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleSubmit = () => {
    debugger
    const index = position.index;
    const min = position.resourceIndex;
    const max = position.destinationIndex;
  }

  return (
    <>
      <div className="container-main">
        {lista.map((item: string, index: number) => (
          <div key={index} className='container-secondary' draggable 
            onDragStart={(e) => dragItem.current = index}
            onDragEnter={(e) => dragOverItem.current = index}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className='img-container'>
              <img src="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000006411/73d58198e35bf94be752cf3d9ba0b44dea877cab1487e2cc1b7eeb02157f066f" alt="" />
            </div>
            <div className='info-container'>
              <div className='info'>
                <h3>{item}</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                <span>2012</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-main">
          <button onClick={handleSubmit}>Salvar</button>
      </div>
    </>
  );
}

export default CopyGameDrop;