import React from 'react';
import './Prediction.css';

const Prediction = ({ name1, value1, name2, value2, name3, value3, name4, value4 }) => {
  return (
    <div>
      {/* <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p> */}
      <div className='center'>
        <div className='form2 center pa4 br3 shadow-5'>
          {/* <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/> */}
          {/* <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button> */}
          <p className='f3 pa2 w-700 center' type='tex'>This is {name1} with a probobality of {value1}</p>
          <p className='f3 pa2 w-700 center' type='tex'>This is {name2} with a probobality of {value2}</p>

          <p className='f3 pa2 w-700 center' type='tex'>This is {name3} with a probobality of {value3}</p>
          <p className='f3 pa2 w-700 center' type='tex'>This is {name4} with a probobality of {value4}</p>
        </div>
      </div>
    </div>
  );
}

export default Prediction;