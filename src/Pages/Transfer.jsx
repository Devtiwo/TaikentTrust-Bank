import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AnimatePresence, motion } from 'framer-motion';
import { slideUp } from '../Components/Utilities/animation';
import Modal from '../Components/Modal';
import ProgressModal from '../Components/Progressmodal';
import { toast } from 'react-toastify';
import { baseUrl } from '../Redux/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';



const cotCode = import.meta.env.VITE_COT_CODE;
const taxNumber = import.meta.env.VITE_TAX_NUMBER;
const imfNumber = import.meta.env.VITE_IMF_NUMBER;
const mlCode = import.meta.env.VITE_ML_CODE;

const Transfer = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [shouldCallApi, setShouldCallApi] = useState(false);
  const { user } = useSelector((state) => state.user);
  const availableBalance = user?.balance || 0;
  
  const isPaused = useRef(false);
  const isWaitingForResponse = useRef(false);
  const hasCalledApi = useRef(false);
  const hasShownToast = useRef(false);
 
  useEffect(() => {
    if (loadingProgress === 15) {
      setActiveModal("cot");
      isPaused.current = true;
    }
    if (loadingProgress === 35) { 
      setActiveModal("tax");
      isPaused.current = true;
    }
    if (loadingProgress === 50) { 
      setActiveModal("imf");
      isPaused.current = true;
    }
    if (loadingProgress === 75) {
      setActiveModal("ml");
      isPaused.current = true;
    }
  }, [loadingProgress]);
 
  useEffect(() => {
    if (shouldCallApi) {
      handleTransfer();
      setShouldCallApi(false);
    }
  }, [shouldCallApi]);

  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/user/transfer`, formik.values, {
      headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.status === true || response.data?.success === true) {
        const completeInterval = setInterval(() => {
          setLoadingProgress(prevComplete => {
            if(prevComplete >= 100) {
              clearInterval(completeInterval);
              setShowProgressModal(false);
              setLoadingProgress(0);
              formik.resetForm();
              setActiveModal(null);
              if (!hasShownToast.current) {
                toast.success(response.data?.message || "Transfer successful!");
                hasShownToast.current = true;
              }
              return prevComplete;
            }
             return prevComplete + 2;
          });
        }, 50);
      } else {
        throw new Error(response.data?.message || "Transfer failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message ||"Transfer failed! pls try again");
      setShowProgressModal(false);
      setLoadingProgress(0);
    }
  }
  
  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
      address: "",
      bankName: "",
      acctNum: "",
      routing: "",
      swift: "",
      amount: "",
      note: ""
    },
    validationSchema: yup.object({
      type: yup.string().required("select a type of transfer"),
      name: yup.string().required("Full account name is required"),
      address: yup.string().required("Bank address is required"),
      bankName: yup.string().required("Bank name is required"),
      acctNum: yup.string().required("Account number is required"),
      routing: yup.string().when("type", {
        is: "domestic",
        then: () => yup.string().required("Routing number is required"),
        otherwise: () => yup.string().notRequired()
      }),
      swift: yup.string().when("type", {
        is: "international",
        then: () => yup.string().required("Swift/BIC code is required"),
        otherwise: () => yup.string().notRequired()
      }),
      amount: yup.number().required("Amount is required"),
      note: yup.string()
    }),
    onSubmit: async (values) => {
      hasShownToast.current = false;
      const transferAmount = Number(values.amount);
      if (transferAmount > availableBalance) {
        toast.error("Insufficient balance");
        return;
      }

      isPaused.current = false;
      isWaitingForResponse.current = false;
      hasCalledApi.current = false;
      setLoadingProgress(0);
      setShowProgressModal(true);

      const interval = setInterval(() => {
        if (isPaused.current || isWaitingForResponse.current) return;
        setLoadingProgress(prev => {
          const next = prev + 5;
          if (next >= 90 && !hasCalledApi.current) {
            hasCalledApi.current = true;
            isWaitingForResponse.current = true;
            clearInterval(interval);
            setShouldCallApi(true);
          }
          return next;
        });
      }, 400);
    }
  });    
      
  const handleCodeSubmit = () => {
    if (activeModal === "cot" && inputValue.trim() === cotCode) {
      setActiveModal(null);
      setInputValue("");
      isPaused.current = false;
    } else if (activeModal === "tax" && inputValue.trim() === taxNumber) {
      setActiveModal(null);
      setInputValue("");
      isPaused.current = false;
    } else if (activeModal === "imf" && inputValue.trim() === imfNumber) {
      setActiveModal(null);
      setInputValue("");
      isPaused.current = false;
    } else if (activeModal === "ml" && inputValue.trim() === mlCode) {
      setActiveModal(null);
      setInputValue("");
      isPaused.current = false;
    } else {
      toast.error("Incorrect code! Please try again.");
    }
  }
  return (
    <section className="h-dvh lg:ms-80">
      <div>
        <h1 className="text-3xl font-medium mb-2">Payment Transfers</h1>
        <p className="text-sm font-medium text-gray-600">Kindly provide accurate information regarding transfer details.</p>
        <form autoComplete="off" method="POST" className="container pb-20" onSubmit={formik.handleSubmit}>
          <p className="my-5 text-lg font-semibold">Select type of transfer</p>

          {/* Select transfer type */}
          <div className="flex flex-col">
            <label htmlFor="type" className="ml-1">Transfer Type</label>
            <select id="type" name="type" 
            className="px-4 py-2 my-2 w-full lg:w-1/3 border rounded-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            >
              <option value="">-- Select the type of transfer --</option>
              <option value="domestic">Domestic wire transfer (US citizens only)</option>
              <option value="international">International wire transfer (Non-US citizens)</option>
            </select>
            <small className="ml-1 text-red-600">{formik.touched.type && formik.errors.type}</small>
          </div>

          <hr className="text-gray-400 w-full my-5" />

          {/* Form fields based on type of transfer */}
          <AnimatePresence mode="wait">
          {formik.values.type &&  (
            <motion.div
            key={formik.values.type}
            variants={slideUp(0.3)}
            initial="hidden"
            animate="visible"
            >
              <p className="my-5 text-lg font-semibold">Enter Receipient's Information</p>

              {/* Common fields for both domestic & international transfers */}
              {/* Full account name */}
              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="ml-1 text-sm font-medium">Account Name</label>
                <input type="text" id="name" name="name" 
                placeholder="Enter full account name"
                className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                <small className="ml-1 text-red-600">{formik.touched.name && formik.errors.name}</small>
              </div>
              {/* Bank Address */}
              <div className="flex flex-col mb-3">
                <label htmlFor="address" className="ml-1 text-sm font-medium">Bank Address</label>
                <input type="text" id="address" name="address"
                placeholder="Enter your bank address"
                className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                />
                <small className="ml-1 text-red-600">{formik.touched.address && formik.errors.address}</small>
              </div>
              {/* Bank name*/}
              <div className="flex flex-col mb-3">
                <label htmlFor="bankName" className="ml-1 text-sm font-medium">Bank Name</label>
                <input type="text" id="bankName" name="bankName"
                placeholder="Enter your bank name"
                className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bankName}
                />
                <small className="ml-1 text-red-600">{formik.touched.bankName && formik.errors.bankName}</small>
              </div>
              {/* Account number */}
              <div className="flex flex-col mb-3">
                <label htmlFor="acctNum" className="ml-1 text-sm font-medium">Account Number(IBAN for international transfers)</label>
                <input type="text" id="acctNum" name="acctNum"
                placeholder="Enter account number"
                className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.acctNum}
                />
                <small className="ml-1 text-red-600">{formik.touched.acctNum && formik.errors.acctNum}</small>
              </div>

              {/* Only show Routing for Domestic transfers*/}
              {formik.values.type === "domestic" && (
                <div className="flex flex-col mb-3">
                  <label htmlFor="routing" className="ml-1 text-sm font-medium">Routing Number</label>
                  <input type="text" id="routing" name="routing"
                  placeholder="Enter routing number"
                  className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.routing}
                  />
                  <small className="ml-1 text-red-600">{formik.touched.routing && formik.errors.routing}</small>
                </div>
              )}
              
              {/* Only show swift/BIC for international transfers */}
              {formik.values.type === "international" && (
                <div className="flex flex-col mb-3">
                  <label htmlFor="swift" className="ml-1 text-sm font-medium">Swift/BIC code</label>
                  <input type="text" id="swift" name="swift"
                  placeholder="Enter swift/BIC code"
                  className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.swift}
                  />
                  <small className="ml-1 text-red-600">{formik.touched.swift && formik.errors.swift}</small>
                </div>
              )}

              <hr className="text-gray-400 w-full my-5" />
              <p className="my-5 text-lg font-semibold">Enter Transfer details</p>

              {/* Transfer amount */}
              <div className="flex flex-col mb-3">
                <label htmlFor="amount" className="ml-1 text-sm font-medium">Amount(usd)</label>
                <input type="number" id="amount" name="amount"
                placeholder="Enter transfer amount"
                className="px-4 py-2 my-2 border rounded-2xl w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                />
                <small className="ml-1 text-red-600">{formik.touched.amount && formik.errors.amount}</small>
              </div>
              {/* Transfer note */}
              <div className="flex flex-col mb-3">
                <label htmlFor="note" className="ml-1 text-sm font-medium">Transfer Note (optional)</label>
                <textarea id="note" name="note" 
                placeholder="provide any additional information or instructions related to the transfer"
                className="py-2 px-4 my-2 h-20 border rounded-2xl w-full lg:w-2/4 "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.note}
                />
              </div>
              {/* Submit button */}
              <div className="mt-10">
                <button type="submit" className="cursor-pointer px-18 py-2 text-white font-bold rounded-3xl bg-blue-sapphire hover:bg-blue-hover transition duration-[0.5s] ease-in-out">Transfer</button>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </form>
      </div>
      
      {/* Modals */}

      {/* Progress Modal */}
      {showProgressModal && (<ProgressModal progress={loadingProgress} /> )}

      {/* Cost of transfer Modal */}
      {activeModal === "cot" && (
        <Modal
        title="Enter Cost of Transfer code"
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter cost of transfer code"
        onSubmit={handleCodeSubmit}
        />
      )}

      {/* Tax Modal */}
      {activeModal === "tax" && (
        <Modal
        title="Enter Tax clearance number"
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter tax clearance number"
        onSubmit={handleCodeSubmit}
        />
      )}

      {/* IMF Modal */}
      {activeModal === "imf" && (
        <Modal
        title="Enter IMF certificate number"
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter IMF certificate number"
        onSubmit={handleCodeSubmit}
        />
      )}

      {/* Anti- terrorrism & Money laundering Modal */}
      {activeModal === "ml" && (
        <Modal
        title="Enter anti-terrorism & money laundering code"
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter anti-terrorism & money laundering code"
        onSubmit={handleCodeSubmit}
        />
      )}
    </section>
  )
}

export default Transfer;