import React from 'react';

const Modal = ({ title, inputValue, onInputChange, onSubmit, placeholder }) => {
  return (
    <section className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl ">
        <h2 className="mb-3">{title}</h2>
        <input type="text" value={inputValue} onChange={onInputChange} placeholder={placeholder}
        className="px-4 py-2 w-full border rounded-2xl mb-5"
        />
        <button onClick={onSubmit} 
        className="bg-blue-sapphire text-white px-8 py-2 rounded-2xl font-semibold cursor-pointer hover:bg-blue-hover transition duration-[0.5s] ease-in-out"
        >
            submit
        </button>
      </div>
    </section>
  )
}

export default Modal