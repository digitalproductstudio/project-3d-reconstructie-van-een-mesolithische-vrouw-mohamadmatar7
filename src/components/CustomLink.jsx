import { Link } from 'react-router-dom';

const CustomLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="bg-[#7A3D02] hover:bg-[#5c2e01] text-[#DEBE89] text-lg px-6 py-3 rounded-lg shadow-md uppercase font-bold font-poppins transition"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
