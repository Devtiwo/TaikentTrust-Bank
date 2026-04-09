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
      iban: "",
      country: "",
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
      acctNum: yup.string().when(["type", "country"], {
        is: (type, country) => type === "domestic" || (type === "international" && country === "usa"),
        then: () => yup.string().required("Account number is required"),
        otherwise: () => yup.string().notRequired()
      }),
      iban: yup.string().when(["type", "country"], {
        is: (type, country) => type === "international" && country !== "usa",
        then: () => yup.string().required("IBAN number is required"),
        otherwise: () => yup.string().notRequired()
      }),
      country: yup.string().when("type", {
        is: (type) => type === "international",
        then: () => yup.string().required("Please select the country where the bank is located"),
        otherwise: () => yup.string().notRequired()
      }),
      routing: yup.string().when(["type", "country"], {
        is: (type, country) => type === "international" && country === "usa",
        then: () => yup.string().required("Routing number is required")
        .matches(/^\d{9}$/, "Routing number must be exactly 9 digits"),
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
  
  // Helper varaibles for handling toggling of transfer type specific fields in the form
  const isDomestic = formik.values.type === "domestic";
  const isInternational = formik.values.type === "international";
  const isUsa = formik.values.country === "usa";
  const isOtherCountry = isInternational && formik.values.country && !isUsa;
  
  // useEffect(() => {
  //   if (!formik.values.type) return;
  //   const updates = {};
  //   if (formik.values.type === "domestic") {
  //     updates.country = "";
  //     updates.iban = "";
  //     updates.routing = "";
  //     updates.swift = "";
  //   }
  //   if (formik.values.type === "international") {
  //     updates.acctNum = "";
  //     updates.routing = "";
  //   }
  //   if (Object.keys(updates).length > 0) {
  //   formik.setValues({
  //     ...formik.values,
  //     ...updates,
  //   });
  // }
  // }, [formik.values.type]);

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
            className="px-4 py-2 my-2 w-full lg:w-1/3 border-2 border-gray-300 rounded-3xl outline-none"
            onChange={(e) => {
              const newType = e.target.value;
              formik.setValues((prev) => ({
                ...prev,
                type: newType,
                acctNum: "",
                iban: "",
                routing: "",
                swift: "",
                country: ""
              }));
              formik.setTouched({});
            }}
            onBlur={formik.handleBlur}
            >
              <option value="">-- Select the type of transfer --</option>
              <option value="domestic">Domestic wire transfer (Cayman citizens only)</option>
              <option value="international">International wire transfer (Other Countries)</option>
            </select>
            <small className="ml-1 text-red-600">{(formik.touched.type || formik.submitCount > 0) && formik.errors.type}</small>
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
                className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                <small className="ml-1 text-red-600">{(formik.touched.name || formik.submitCount > 0) && formik.errors.name}</small>
              </div>
              {/* Bank Address */}
              <div className="flex flex-col mb-3">
                <label htmlFor="address" className="ml-1 text-sm font-medium">Bank Address</label>
                <input type="text" id="address" name="address"
                placeholder="Enter your bank address"
                className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl w-full lg:w-2/4 outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                />
                <small className="ml-1 text-red-600">{(formik.touched.address || formik.submitCount > 0) && formik.errors.address}</small>
              </div>
              {/* Bank name*/}
              <div className="flex flex-col mb-3">
                <label htmlFor="bankName" className="ml-1 text-sm font-medium">Bank Name</label>
                <input type="text" id="bankName" name="bankName"
                placeholder="Enter your bank name"
                className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bankName}
                />
                <small className="ml-1 text-red-600">{(formik.touched.bankName || formik.submitCount > 0) && formik.errors.bankName}</small>
              </div>
              {/* Account number - ony show if transfer type is domestic or country is USA*/}
              {(isDomestic || (isInternational && isUsa)) && (
               <div className="flex flex-col mb-3">
                 <label htmlFor="acctNum" className="ml-1 text-sm font-medium">Account Number</label>
                 <input type="text" id="acctNum" name="acctNum"
                 placeholder="Enter account number"
                 className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.acctNum}
                 />
                 <small className="ml-1 text-red-600">{(formik.touched.acctNum || formik.submitCount > 0) && formik.errors.acctNum}</small>
               </div>
              )}
              {/* IBAN number - only show if country is not USA and transfer type is international */}
              {isOtherCountry && (
                <div className="flex flex-col mb-3">
                  <label htmlFor="iban" className="ml-1 text-sm font-medium">IBAN Number</label>
                  <input type="text" id="iban" name="iban"
                  placeholder="Enter IBAN number"
                  className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.iban}
                  />
                  <small className="ml-1 text-red-600">{(formik.touched.iban || formik.submitCount > 0) && formik.errors.iban}</small>
                </div>
              )}
             {/* Country - only show for international transfers */}
             {isInternational && (
               <div className="flex flex-col mb-3">
                 <label htmlFor="country" className="ml-1">Country</label>
                 <select id="country" name="country" 
                 className="px-4 py-2 my-2 w-full lg:w-2/4 border-2 border-gray-300 rounded-3xl outline-none"
                 onChange={(e) => {
                    const newCountry = e.target.value;
                    formik.setValues((prev) => ({
                      ...prev,
                      country: newCountry,
                      acctNum: "",
                      iban: "",
                      routing: "",
                      swift: ""
                    }));
                    formik.setTouched({});
                  }}
                 onBlur={formik.handleBlur}
                 >
                   <option value="">-- what country is bank located --</option>
                   <option value="Afghanistan">Afghanistan</option>
                   <option value="Albania">Albania</option>
                   <option value="Algeria">Algeria</option>
                   <option value="Andorra">Andorra</option>
                   <option value="Angola">Angola</option>
                   <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                   <option value="Argentina">Argentina</option>
                   <option value="Armenia">Armenia</option>
                   <option value="Australia">Australia</option>
                   <option value="Austria">Austria</option>
                   <option value="Azerbaijan">Azerbaijan</option>
                   <option value="Bahamas">Bahamas</option>
                   <option value="Bahrain">Bahrain</option>
                   <option value="Bangladesh">Bangladesh</option>
                   <option value="Barbados">Barbados</option>
                   <option value="Belarus">Belarus</option>
                   <option value="Belgium">Belgium</option>
                   <option value="Belize">Belize</option>
                   <option value="Benin">Benin</option>
                   <option value="Bhutan">Bhutan</option>
                   <option value="Bolivia">Bolivia</option>
                   <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                   <option value="Botswana">Botswana</option>
                   <option value="Brazil">Brazil</option>
                   <option value="Brunei">Brunei</option>
                   <option value="Bulgaria">Bulgaria</option>
                   <option value="Burkina Faso">Burkina Faso</option>
                   <option value="Burundi">Burundi</option>
                   <option value="Cabo Verde">Cabo Verde</option>
                   <option value="Cambodia">Cambodia</option>
                   <option value="Cameroon">Cameroon</option>
                   <option value="Canada">Canada</option>
                   <option value="Central african Republic">Central African Republic</option>
                   <option value="Chad">Chad</option>
                   <option value="Chile">Chile</option>
                   <option value="China">China</option>
                   <option value="Colombia">Colombia</option>
                   <option value="Comoros">Comoros</option>
                   <option value="Congo(Democratic republic)">Congo(Democratic Republic)</option>
                   <option value="Congo(republic)">Congo(Republic)</option>
                   <option value="Costa Rica">Costa Rica</option>
                   <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                   <option value="Croatia">Croatia</option>
                   <option value="Cuba">Cuba</option>
                   <option value="Cyprus">Cyprus</option>
                   <option value="Czech Republic">Czech Republic</option>
                   <option value="Denmark">Denmark</option>
                   <option value="Djibouti">Djibouti</option>
                   <option value="Dominica">Dominica</option>
                   <option value="Dominican Republic">Dominican Republic</option>
                   <option value="East Timor (Timor-Leste)">East Timor (Timor-Leste)</option>
                   <option value="Ecuador">Ecaduor</option>
                   <option value="Eqypt">Egypt</option>
                   <option value="El Salvador">El Salvador</option>
                   <option value="Equatorial Guinea">Equatorial Guinea</option>
                   <option value="Eritrea">Eritrea</option>
                   <option value="Estonia">Estonia</option>
                   <option value="Eswatini">Eswatini</option>
                   <option value="Ethiopia">Ethiopia</option>
                   <option value="Fiji">Fiji</option>
                   <option value="Finland">Finland</option>
                   <option value="France">France</option>
                   <option value="Gabon">Gabon</option>
                   <option value="Gambia">Gambia</option>
                   <option value="Georgia">Georgia</option>
                   <option value="Germany">Germany</option>
                   <option value="Ghana">Ghana</option>
                   <option value="Greece">Greece</option>
                   <option value="Grenada">Grenada</option>
                   <option value="Guatemala">Guatemala</option>
                   <option value="Guinea">Guinea</option>
                   <option value="Guinea-Bissau">Guinea-Bissau</option>
                   <option value="Guyana">Guyana</option>
                   <option value="Haiti">Haiti</option>
                   <option value="Honduras">Honduras</option>
                   <option value="Hungary">Hungary</option>
                   <option value="Iceland">Iceland</option>
                   <option value="India">India</option>
                   <option value="Indonesia">Indonesia</option>
                   <option value="Iran">Iran</option>
                   <option value="Iraq">Iraq</option>
                   <option value="Ireland">Ireland</option>
                   <option value="Israel">Israel</option>
                   <option value="Italy">Italy</option>
                   <option value="Jamaica">Jamaica</option>
                   <option value="Japan">Japan</option>
                   <option value="Jordan">Jordan</option>
                   <option value="Kazakhstan">Kazakhstan</option>
                   <option value="Kenya">Kenya</option>
                   <option value="Kiribati">Kiribati</option>
                   <option value="Korea North">Korea (North)</option>
                   <option value="Korea South">Korea (South)</option>
                   <option value="Kosovo">Kosovo</option>
                   <option value="Kuwait">Kuwait</option>
                   <option value="Kyrgyzstan">Kyrgyzstan</option>
                   <option value="Laos">Laos</option>
                   <option value="Latvia">Latvia</option>
                   <option value="Lebanon">Lebanon</option>
                   <option value="Lesotho">Lesotho</option>
                   <option value="Liberia">liberia</option>
                   <option value="Libya">Libya</option>
                   <option value="Liechtenstein">Liechtenstein</option>
                   <option value="Lithuania">Lithuania</option>
                   <option value="Luxembourg">Luxembourg</option>
                   <option value="Madagascar">Madagascar</option>
                   <option value="Malawi">Malawi</option>
                   <option value="Malaysia">Malaysia</option>
                   <option value="Maldives">Maldives</option>
                   <option value="Mali">Mali</option>
                   <option value="Malta">Malta</option>
                   <option value="Marshall Islands">Marshall Islands</option>
                   <option value="Mauritania">Mauritania</option>
                   <option value="Mauritius">Mauritius</option>
                   <option value="Mexico">Mexico</option>
                   <option value="Micronesia">Micronesia</option>
                   <option value="Moldova">Moldova</option>
                   <option value="Monaco">Monaco</option>
                   <option value="Mongolia">Mongolia</option>
                   <option value="Montenegro">Montenegro</option>
                   <option value="Morocco">Morocco</option>
                   <option value="Mozambique">Mozambique</option>
                   <option value="Myanmar (burma)">Myanmar(Burma)</option>
                   <option value="Namibia">Namibia</option>
                   <option value="Nauru">Nauru</option>
                   <option value="Nepal">Nepal</option>
                   <option value="Netherlands">Netherlands</option>
                   <option value="New Zealand">New Zealand</option>
                   <option value="Nicaragua">Nicaragua</option>
                   <option value="Niger">Niger</option>
                   <option value="Nigeria">Nigeria</option>
                   <option value="Morth Macedonia">North Macedonia</option>
                   <option value="Norway">Norway</option>
                   <option value="Oman">Oman</option>
                   <option value="Pakistan">Pakistan</option>
                   <option value="Palau">palau</option>
                   <option value="Panama">Panama</option>
                   <option value="Papua New Guinea"></option>
                   <option value="Paraguay">Paraguay</option>
                   <option value="Peru">Peru</option>
                   <option value="Philippines">Philippines</option>
                   <option value="Poland">Poland</option>
                   <option value="Portugal">Portugal</option>
                   <option value="Qatar">Qatar</option>
                   <option value="Romania">Romania</option>
                   <option value="Russia">Russia</option>
                   <option value="Rwanda">Rwanda</option>
                   <option value="Saint kitts & Nevis">Saint Kitts & Nevis</option>
                   <option value="Saint Lucia">Saint Lucia</option>
                   <option value="Saint Vincent & the Grenadines">Saint Vincent & the Grenadines</option>
                   <option value="Samoa">Samoa</option>
                   <option value="San Marino">San Marino</option>
                   <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                   <option value="Saudi Arabia">Saudi Arabia</option>
                   <option value="Senegal">Senegal</option>
                   <option value="Serbia">Serbia</option>
                   <option value="Seychelles">Seychelles</option>
                   <option value="Sierra Leone">Sierra Leone</option>
                   <option value="Singapore">Singapore</option>
                   <option value="Slovakia">Slovakia</option>
                   <option value="Slovenia">Slovenia</option>
                   <option value="Solomon Islands">Solomon Islands</option>
                   <option value="Somalia">Somalia</option>
                   <option value="South Africa">South Africa</option>
                   <option value="Spain">Spain</option>
                   <option value="Sri Lanka">Sri Lanka</option>
                   <option value="Sudan">Sudan</option>
                   <option value="Sudan(south)">Sudan (south)</option>
                   <option value="Suriname">Suriname</option>
                   <option value="Sweden">Sweden</option>
                   <option value="Switzerland">Switzerland</option>
                   <option value="Syria">Syria</option>
                   <option value="Taiwan">Taiwan</option>
                   <option value="Tajikistan">Tajikistan</option>
                   <option value="Tanzania">Tanzania</option>
                   <option value="Thailand">Thailand</option>
                   <option value="Togo">Togo</option>
                   <option value="Tonga">Tonga</option>
                   <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                   <option value="Tunisia">Tunisia</option>
                   <option value="Turkey">Turkey</option>
                   <option value="Turkmenistan">Turkmenistan</option>
                   <option value="Tuvalu">Tuvalu</option>
                   <option value="Uganda">Uganda</option>
                   <option value="Ukraine">Ukraine</option>
                   <option value="United Arab Emirates">United Arab Emirates</option>
                   <option value="United Kingdom">United kingdom</option>
                   <option value="usa">United States of America</option>
                   <option value="Uruguay">Uruguay</option>
                   <option value="Uzbekistan">Uzbekistan</option>
                   <option value="Vanuatu">Vanuatu</option>
                   <option value="Vatican City">Vatican City</option>
                   <option value="Venezuela">Venezuela</option>
                   <option value="Vietnam">Vietnam</option>
                   <option value="Yemen">Yemen</option>
                   <option value="Zambia">Zambia</option>
                   <option value="Zimbabwe">Zimbabwe</option>
                 </select>
                 <small className="ml-1 text-red-600">{(formik.touched.country || formik.submitCount > 0) && formik.errors.country}</small>
               </div>
             )}
             
              {/* Only show Routing if transfer type is international and selected country is USA*/}
              {isInternational && isUsa && (
                <div className="flex flex-col mb-3">
                  <label htmlFor="routing" className="ml-1 text-sm font-medium">Routing Number</label>
                  <input type="text" id="routing" name="routing" maxLength={9}
                  placeholder="Enter routing number"
                  className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.routing}
                  />
                  <small className="ml-1 text-red-600">{(formik.touched.routing || formik.submitCount > 0) && formik.errors.routing}</small>
                </div>
              )}
              
              {/* Only show swift/BIC for international transfers */}
              {isInternational && formik.values.country && (
                <div className="flex flex-col mb-3">
                  <label htmlFor="swift" className="ml-1 text-sm font-medium">Swift/BIC code</label>
                  <input type="text" id="swift" name="swift"
                  placeholder="Enter swift/BIC code"
                  className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.swift}
                  />
                  <small className="ml-1 text-red-600">{(formik.touched.swift || formik.submitCount > 0) && formik.errors.swift}</small>
                </div>
              )}

              <hr className="text-gray-400 w-full my-5" />
              <p className="my-5 text-lg font-semibold">Enter Transfer details</p>

              {/* Transfer amount */}
              <div className="flex flex-col mb-3">
                <label htmlFor="amount" className="ml-1 text-sm font-medium">Amount(usd)</label>
                <input type="number" id="amount" name="amount"
                placeholder="Enter transfer amount"
                className="px-4 py-2 my-2 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                />
                <small className="ml-1 text-red-600">{(formik.touched.amount || formik.submitCount > 0) && formik.errors.amount}</small>
              </div>
              {/* Transfer note */}
              <div className="flex flex-col mb-3">
                <label htmlFor="note" className="ml-1 text-sm font-medium">Transfer Note (optional)</label>
                <textarea id="note" name="note" 
                placeholder="provide any additional information or instructions related to the transfer"
                className="py-2 px-4 my-2 h-20 border-2 border-gray-300 rounded-3xl outline-none w-full lg:w-2/4 "
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