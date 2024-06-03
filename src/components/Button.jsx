import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base = `inline-block 
  rounded-full bg-yellow-400 text-sm md:text-sm font-semibold uppercase text-stone-800 
  transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 
  focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 
  disabled:cursor-not-allowed`;

  const styles = {
    primary: base + " px-4 py-2 md:px-6 md:py-4",
    clear: `inline-block 
    rounded-full px-4 py-1.5 md:px-6 md:py-3.5 border-2 border-stone-300 
    bg-transparent hover:bg-stone-300 text-stone-400 hover:text-stone-800
    text-sm md:text-sm font-semibold uppercase
    transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2`,
    small: base + " px-3 py-2 text-sm md:px-5 md:py-1.5",
    rounded: base + " w-6 h-6 p-0 sm:w-8 sm:h-8",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
