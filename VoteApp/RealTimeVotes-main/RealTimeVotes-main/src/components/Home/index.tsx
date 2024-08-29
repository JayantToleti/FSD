import React from 'react';
import { Header } from '../Header/index';
import { ElementItem } from '../ElementItem/index';
import { useSocket } from '../../hooks/useSocket';


export const Home = () => {

  const { list } = useSocket();

  return (
    <div className="container mt-1">
      <Header />
      <div className="w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2">
        {list.map(e => (
          <ElementItem key={e.id} {...e} />
        ))}
      </div>
    </div>
  );
};
