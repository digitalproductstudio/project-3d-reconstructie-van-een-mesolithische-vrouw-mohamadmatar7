import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="px-4 py-3">
      <div className="flex gap-6 justify-center">
        {[
          { to: '/', label: 'Home' },
          { to: '/model', label: '3D Model' },
          { to: '/ar', label: 'AR' },
          { to: '/facts', label: 'Facts' },
        ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="relative text-[#5C3A1E] font-medium text-lg md:text-xl hover:text-[#8B5A2B] transition mt-4"
          style={{ textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.25)' }}
        >
          <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#8B5A2B] after:transition-all after:duration-300 hover:after:w-full">
            {item.label}
          </span>
        </Link>

        ))}
      </div>
    </nav>
  );
}
