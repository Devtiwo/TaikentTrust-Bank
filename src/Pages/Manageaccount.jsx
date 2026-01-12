import React, { useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchAllUsers, deleteUser, topUpUserBalance } from '../Redux/adminSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Manageaccount = () => {
  const dispatch = useDispatch();
  const { users, fetchStatus, fetchError } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
    const intervalId = setInterval(() => {
      dispatch(fetchAllUsers());
    }, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId);
  }, [dispatch]);

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
      `<input id="swal-desc" class="swal2-input" placeholder="Enter description" type="text" />` +
      `<input type="date" id="swal-date" class="swal2-input" />`,
      focusConfirm: false,
      confirmButtonColor: "#27ae60",
      showCancelButton: true,
      preConfirm: () => {
        const type = document.getElementById("swal-type").value;
        const amount = document.getElementById("swal-amount").value;
        const desc = document.getElementById("swal-desc").value;
        const date = document.getElementById("swal-date").value;
        if (!type || !amount || !date || !desc) {
          Swal.showValidationMessage(`all fields are required`);
        }
        return { type, amount, date, desc };
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
  
        {fetchError && (<p>{error}</p>)}
        
          <table className="w-full lg:max-w-2/3 p-5 text-sm text-left rounded-2xl lg:text-base font-medium">
            <thead className="border-b border-b-gray-300">
              <tr className="text-blue-sapphire">
                <th className="p-4">Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="odd:bg-gray-100 even:bg-gray-300">
                  <td className="p-4">{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td className="flex gap-5 mt-4">
                     <GiWallet
                       onClick={() => handleTopUp(user._id)}
                       className="text-2xl text-green-600 hover:text-green-500 font-bold cursor-pointer" title="Top up balance" 
                     />
                     <RiDeleteBin6Line
                       onClick={() => handleDelete(user._id)}
                       className="text-2xl text-red-400 hover:text-red-600 font-bold cursor-pointer" title="Delete user"
                      />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </section>
  )
}

export default Manageaccount;