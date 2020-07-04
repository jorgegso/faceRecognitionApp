import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imagenUrl, box }) => {
  return (
    <div className='center ma'>
      <dic className='absolute mt2'>
        <img id='inputimage' src={imagenUrl} alt="" width='500px' height='auto' />
        <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </dic>
    </div>
  );
}


export default FaceRecognition