import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div>
        <div className='while f3'>
          {`${name} , your current rank is...`}
          
        </div>
        <div className='while f1'>
          {entries}
        </div>
      </div>
    </div>
  );
}

export default Rank