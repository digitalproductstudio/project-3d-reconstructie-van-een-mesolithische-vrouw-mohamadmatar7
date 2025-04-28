import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-[#402103]">
      <h1 
        className="text-4xl md:text-5xl font-extrabold mb-4"
        style={{ fontFamily: 'IM Fell English, serif' }}
      >
        Welkom bij de Mesolithische Vrouw
      </h1>

      <p 
        className="text-lg md:text-xl mb-6 max-w-xl font-poppins"
      >
        Ontdek hoe wetenschap en verbeelding samenkomen in de reconstructie van een vrouw uit het mesolithicum.
      </p>

      <Link
        to="/model"
        className="bg-[#7A3D02] hover:bg-[#5c2e01] text-[#DEBE89] text-lg px-6 py-3 rounded-lg shadow-md uppercase font-bold font-poppins transition"
      >
        Start de reconstructie
      </Link>
    </div>
  );
}
