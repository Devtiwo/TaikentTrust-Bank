import React from "react";
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa } from "react-icons/si";

const Overview = () => {
  return (
    <section className="h-screen lg:ms-80 flex flex-col lg:flex-row gap-5">
      <div className="w-full lg:w-2/3">
        <h1 className="font-medium text-xl lg:text-3xl">
          Welcome, <span className="text-blue-sapphire">Andrian</span>
        </h1>

        {/* Balance Card */}
        <div className="mt-5 px-8 py-5 bg-[#d9f2f9] rounded-2xl font-semibold">
          <small className="text-gray-600">Available Balance</small>
          <h1 className="text-5xl mt-1">$75,650,00.00</h1>
          <h2 className="mt-10 text-xs text-gray-600">Checking</h2>
          <p className="text-gray-600 text-sm">Account Number: 8907689542</p>
        </div>

        {/* Recent transactions */}
        <div className="mt-10 mb-5">
          <h2 className="mb-3 text-3xl">Recent Transactions</h2>
          <hr className="text-gray-400" />
        </div>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-b-gray-400">
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      {/* Profile section */}
      <div className="lg:border-l-2 lg:border-l-gray-200 lg:w-1/4 mt-20 lg:mt-0">
        <div className="flex flex-col items-center mb-6 relative">
          <div className="absolute w-full h-32 px-4 top-0 left-0 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 rounded-t-xl">
            {/* Avatar section */}
            <div className="z-10 mt-22">
              <img
                src="../../src/assets/avatar.png"
                alt="avatar"
                className="h-20 w-20 rounded-full border-3 border-gray-300"
              />
            </div>

            {/* Name section */}
            <div className="mt-4">
              <h2 className="font-bold text-lg">Adrian Hajdin</h2>
              <p className="text-sm text-gray-500">adrian@jsmastery.pro</p>
            </div>

            {/* Bank card section */}
            <div className="mt-20">
              <h3 className="font-semibold text-gray-500">My Wallet</h3>
              <div className="w-full mt-5 h-50 rounded-xl bg-gradient-to-tr from-black via-gray-900 to-gray-300 text-white p-6 shadow-lg relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute w-64 h-64 rounded-full bg-white -top-20 -left-20" />
                  <div className="absolute w-40 h-40 rounded-full bg-white -bottom-10 right-10" />
                </div>
                {/* Chip + Bank logo */}
                <div className="flex">
                  <FcSimCardChip className="text-5xl" />
                  <img
                    src="/images/titantrust.png"
                    alt="logo"
                    className="absolute top-2 right-0 h-20 w-20"
                  />
                </div>
                {/* Balance + card type */}
                <div className="mt-15 flex justify-between">
                  <div>
                    <span className="text-xs">Balance</span>
                    <h1 className="font-semibold text-xl">$75,650.00</h1>
                  </div>
                  <div>
                    <SiVisa className="text-5xl mt-2 " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
