import { GiCash } from "react-icons/gi";
import { FaChartLine, FaBitcoin, FaGlobe } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import phoneImg from '../../assets/phone.png';
import trackerImg from '../../assets/tracker.png'
import transferImg from '../../assets/transfer.png';
import loanImg from '../../assets/loan.png';
import investImg from '../../assets/trading.png';

export const featuresData1 = [
  {
    id: 1,
    icon: IoWalletSharp,
    head: "Receive Early Deposits \n Within 24hrs.",
    paragraph: "Experience the convenience of early payments \n arriving within just 24hrs. say goodbye to late payment.",
    coverStyle: "#f7ffd9",
    imgSrc: phoneImg
  },
  {
    id: 2,
    icon: FaChartLine,
    head: "Monitor Your Essential \n Expenses Wisely.",
    paragraph: "Take control of your financial journey by wisely \n monitoring your essential expenses.",
    coverStyle: "#e5ffdf",
    imgSrc: trackerImg
  }
];

export const featuresData2 = [
  {
    id: 1,
    icon: FaGlobe,
    head: "Send Money Anywhere, Anytime, Anyday",
    paragraph: "Send money to any destination of your choice, anytime, anyday.",
    coverStyle: "#ffe9d4",
    imgSrc: transferImg
  },
  {
    id: 2,
    icon: GiCash ,
    head: "Fast and Easy Loan Offers",
    paragraph: "Get the funds you need, when you need them. Fast, flexible, and hassle-free loans to power your dreams.",
    coverStyle: "#eff6ff",
    imgSrc: loanImg
  },
  {
    id: 3,
    icon: FaBitcoin,
    head: "Crypto Investments",
    paragraph: "Multiply your wealth with smart crypto investments. Secure, fast, and profitable—invest in the future today.",
    coverStyle: "#ddfded",
    imgSrc: investImg
  }
];