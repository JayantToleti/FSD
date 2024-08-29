import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../redux/hooks/index';

const formInitialState = {
  name: ''
};

export const FormAdd = () => {

  const { socket } = useAppSelector(state => state.socketsState);
  const [inputForm, setInputForm] = useState(formInitialState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { name } = inputForm;
    if (name.length < 2) return;

    socket.emit('create', { name });
    setInputForm(formInitialState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  return (
    <div className='container flex flex-col'>
      <h1 className='mx-auto text-center text-2xl mb-2'>Add new Element</h1>
      <form className='mx-auto mt-2' onSubmit={handleSubmit}>
        <input
          autoComplete='off'
          onChange={handleChange}
          name='name'
          value={inputForm.name}
          type="text"
          placeholder='ADD'
          className='border-0 rounded px-2 py-3 text-center'
        />
      </form>
    </div>
  );
};
