import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="border-b px-4 py-3 bg-white shadow-sm">
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
            className="relative text-gray-700 font-medium hover:text-blue-700 transition"
          >
            <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
