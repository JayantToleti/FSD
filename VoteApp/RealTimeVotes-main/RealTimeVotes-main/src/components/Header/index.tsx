import React from 'react';
import { FormAdd } from '../formAdd/index';
import { useAppSelector } from '../../redux/hooks/index';
import { Graphics } from '../Charts';

export const Header: React.FC = () => {

  const { service } = useAppSelector(state => state.socketsState);

  return (
    <div className='sticky min-h-max top-0 bg-[#242424] p-2'>
      <h5 className="text-center uppercase text-sm">Service status:
        <span className={`text-center ${service ? 'text-green-500' : 'text-red-500'} mx-1`}>{`${service ? 'Active' : 'Inactive'}`}</span>
      </h5>
      <FormAdd />
      <Graphics />
      <h1 className="capitalize mt-4 text-2xl text-center">Vote area</h1>
    </div>
  );
};
