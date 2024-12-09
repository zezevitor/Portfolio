import React, { useState } from 'react';

const Rate = () => {
  const [inputs, setInputs] = useState([
    { id: 1, color: '#75726e', checked: false },
    { id: 2, color: '#75726e', checked: false },
    { id: 3, color: '#75726e', checked: false },
    { id: 4, color: '#75726e', checked: false },
    { id: 5, color: '#75726e', checked: false },
  ]);

  const handleClick = (id) => {
    const updatedInputs = inputs.map((input) =>
    input.id <= id
        ? {
            ...input,
            color: '#e8e2da',
            checked: true,
          }
        : {
          ...input,
          color: '#75726e',
          checked: false,
        }
    );
    setInputs(updatedInputs);
  };

  return (
    <form className='Components Rate'>
      <fieldset>
        <legend>Avalie meu portfólio</legend>
        <label htmlFor='name'>Nome</label><br/>
        <input type='text' className='textInput' id='name' name='name' /><br/><br/>
        <label>Comentário</label> <br/>
        <input type='text' className='textInput' id='comment' name='comment' /> <br /><br />
        <label>Nota: </label>
        {inputs.map((input) => (
          <span
            className='fa fa-star'
            style={{ color: input.color, paddingLeft: '5px'}}
            onClick={() => handleClick(input.id)}
            checked={input.checked}
          />
        ))} <br/><br/>
        <button className='submitButton'>Submit</button>
      </fieldset>
    </form>
  );
};

export default Rate;
