import React from 'react';

const CategeryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>Name</label>
      <input
        type='text'
        className='form-control'
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        placeholder='Enter category here...'
        required
      />
      <br />
      <button className='btn btn-outline-primary'>Save</button>
    </div>
  </form>
);

export default CategeryForm;
