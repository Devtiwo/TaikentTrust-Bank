export const navMenu = [
  {
    id: 1,
    title: "Home",
    link: "/",
    isExternal: false
  },
  {
    id: 2,
    title: "About Us",
    link: "/about",
    isExternal: false
  },
  {
    id: 3,
    title: "Loans",
    link: "https://loan-mart.netlify.app",
    isExternal: true
  },
  {
    id: 4,
    title: "Investments",
    link: "https://taikentinvestments.netlify.app",
    isExternal: true
  }
];

export const handleClick = (setIsOpen) => {
  setIsOpen(false);
};