import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Adminhome = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { admin } = useSelector ((state) => state.auth);
  const { users } = useSelector((state) => state.admin)

  if(!admin) {
    return <p>Loading admin details...</p>;
  }
  
  return (
    <section className="lg:ms-80 h-screen">
      <h1 className="text-xl lg:text-2xl font-medium">Welcome <span className="text-blue-sapphire">{admin?.fname}</span></h1>
      <div className="mt-10 container grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">

        {/* cards */}
         
        {/* Total accounts card */}
        <div className="p-5 bg-[#c071d6] rounded-2xl text-white shadow-md shadow-purple-600">
          <FaPeopleGroup className="text-5xl mb-2" />
          <h2 className="font-medium text-2xl mb-2">Total Accounts</h2>
          <p className="text-2xl font-bold text-right lg:text-center">{users.length}</p>
        </div>
        
        {/* User accounts card */}
        <div
        onClick={() => setSelectedCard("usersAccount")}
        className="p-5 bg-orange-400 rounded-2xl text-white cursor-pointer shadow-md shadow-orange-700 transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <IoPersonCircleOutline className="text-5xl mb-5"/>
          <h2 className="text-2xl font-medium">User Accounts</h2>
        </div>
        
        {/* Transactions card */}
        <div
        onClick={() => setSelectedCard("transactions")}
        className="p-5 bg-green-500 rounded-2xl text-white cursor-pointer shadow-md shadow-green-700 transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <RiMoneyDollarCircleLine className="text-5xl mb-5"/>
          <h2 className="text-2xl font-medium overflow-hidden whitespace-nowrap text-ellipsis">Transactions</h2>
        </div>
      </div>

      {/* Cards Information */}
      <div className="container mb-20">

         {/* User accounts information */}
         {selectedCard === "usersAccount" && (
           <div className="overflow-x-auto">
           <table className="min-w-[600px] w-full border-collapse text-left">
              <thead className="border-b border-b-gray-300">
                <tr>
                  <th className="p-4">Account Name</th>
                  <th>Account Number</th>
                  <th>Username</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="odd:bg-gray-100 even:bg-gray-300 font-medium">
                    <td className="p-4">{user.fname} {user.lname}</td>
                    <td>{user.accountNumber}</td>
                    <td>{user.username}</td>
                    <td>${user.balance}</td>
                  </tr>
                ))}
              </tbody>
           </table>
           </div>
         )}

         {/* Transactions Information */}
         {selectedCard === "transactions" && (
           <div>
             {users.map((user) => (
               <div key={user._id} className="border rounded-2xl border-gray-300 p-5 mb-10">
                 <h3 className="tracking-wide mb-2 font-medium">Account Information: {user.fname} {user.lname} {user.accountNumber} ${user.balance}</h3>

                 <div className="overflow-x-auto">
                   <table className="min-w-[600px] w-full border-collapse text-left">
                      <thead className="border-b border-b-gray-300">
                        <tr>
                          <th className="p-4">Date</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.transactions?.length > 0 ? (
                          user.transactions.map((transact, transactId) => (
                            <tr key={transactId} className="font-medium odd:bg-gray-100 even:bg-gray-300">
                              <td className="p-4">{new Date(transact.date).toLocaleDateString("en-US")}</td>
                              <td>{transact.type}</td>
                              <td>{transact.amount}</td>
                              <td>{transact.desc}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="p-5 text-gray-500 text-center">No transactions found</td>
                          </tr>
                        )}
                      </tbody>
                   </table>
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>
    </section>
  )
}

export default Adminhome;