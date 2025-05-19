import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="px-4 py-3">
      <div className="flex gap-6 justify-center">
        {[
          { to: '/', label: 'Home' },
          { to: '/model', label: '3D Model' },
          { to: '/ar', label: 'AR' },
          { to: '/facts', label: 'Facts' },
        ].map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative font-medium text-lg md:text-xl transition mt-4 ${
                isActive ? 'text-[#fac798]' : 'text-[#5C3A1E] hover:text-[#fac798]'
              }`}
              style={{
                textShadow: isActive
                  ? '0.5px 0.5px 1px rgba(0, 0.3, 0, 0.75)'
                  : '0.5px 0.5px 1px rgba(0, 0, 0, 0.25)',
              }}
            >
              <span
                className={`after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2.5px] after:bg-[#fac798] after:transition-all after:duration-300 ${
                  isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
