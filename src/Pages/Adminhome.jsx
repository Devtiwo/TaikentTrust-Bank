import React from 'react';
import { useSelector } from 'react-redux';

const Adminhome = () => {
  const { admin } = useSelector ((state) => state.auth);

  if(!admin) {
    return <p>Loading admin details...</p>;
  }
  
  return (
    <section className="lg:ms-80">
      <h1 className="text-xl font-medium">Welcome <span className="text-blue-sapphire">{admin?.fname}</span></h1>
    </section>
  )
}

export default Adminhome;