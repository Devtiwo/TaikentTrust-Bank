import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchAllUsers, deleteUser, topUpUserBalance } from '../Redux/adminSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Manageaccount = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admin);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete user!',
      confirmButtonColor: '#e74c3c ',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: '#b2babb',
    });
    if (!result.isConfirmed) return;
    try {
      const response = await dispatch(deleteUser(userId));
      if (deleteUser.fulfilled.match(response)) {
        toast.success(response.payload.message);
      } else {
        toast.error(response.payload?.message || "Cannot delete Admin" );
      }
    } catch (error) {
      toast.error("Error deleting user")
    }
  }
 
  const handleTopUp = async (userId) => {
    const { value: formValues} = await Swal.fire({
      title: 'Top Up User Balance',
      html:`
      <select id="swal-type" class="swal2-input">
        <option value="">Select Transaction Type</option>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
      </select>` + 
      `<input id="swal-amount" class="swal2-input" placeholder="Enter Amount" type="number" min="0" />` +
      `<input type="date" id="swal-date" class="swal2-input" />`,
      focusConfirm: false,
      confirmButtonColor: "#27ae60",
      showCancelButton: true,
      preConfirm: () => {
        const type = document.getElementById("swal-type").value;
        const amount = document.getElementById("swal-amount").value;
        const date = document.getElementById("swal-date").value;
        if (!type || !amount || !date) {
          Swal.showValidationMessage(`all fields are required`);
        }
        return { type, amount, date };
      },
    });
    if (!formValues) return;
    try {
      const response = await dispatch(topUpUserBalance({ userId, ...formValues }));
      if (topUpUserBalance.fulfilled.match(response)) {
        toast.success(response.payload.message);
        dispatch(fetchAllUsers());
      } else {
        toast.error(response.payload?.message || "Error topping up user balance" );
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    }
  };

  return (
    <section className="h-screen lg:ms-80">
      <div>
        <h1 className="text-3xl font-medium mb-2">Manage Users Account</h1>
        <p className="font-medium mb-10 text-sm">Delete user accounts or update user account balances.</p>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>{error}</p>}
        {status === "succeeded" && (
          <table className="w-full lg:max-w-2/3 text-sm lg:text-base text-left">
            <thead className="border-b border-b-gray-300">
              <tr className="leading-10 text-blue-sapphire">
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-b-gray-300 leading-13">
                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td className="flex gap-5 mt-4">
                     <GiWallet
                       onClick={() => handleTopUp(user._id)}
                       className="text-2xl text-blue-sapphire hover:text-green-500 font-bold cursor-pointer" title="Top up balance" 
                     />
                     <RiDeleteBin6Line
                       onClick={() => handleDelete(user._id)}
                       className="text-2xl text-blue-sapphire hover:text-red-600 font-bold cursor-pointer" title="Delete user"
                      />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

export default Manageaccount;