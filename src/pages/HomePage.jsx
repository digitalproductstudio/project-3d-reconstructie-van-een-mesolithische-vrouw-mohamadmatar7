import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Welkom bij de Mesolithische Vrouw
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
        Ontdek hoe wetenschap en verbeelding samenkomen in de reconstructie van een vrouw uit het mesolithicum.
      </p>
      <Link
        to="/model"
        className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Start de reconstructie
      </Link>
    </div>
  );
}
