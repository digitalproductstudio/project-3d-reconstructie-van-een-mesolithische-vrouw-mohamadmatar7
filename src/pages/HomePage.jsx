import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1        className="text-4xl md:text-5xl font-extrabold mb-4"
        style={{ fontFamily: "'IM Fell English', serif", color: "#402103" }}>
        Welkom bij de Mesolithische Vrouw
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-xl"
        style={{ 
          fontFamily: "'Poppins', sans-serif",
          color: "#402103" }}>
        Ontdek hoe wetenschap en verbeelding samenkomen in de reconstructie van een vrouw uit het mesolithicum.
      </p>
      <Link
        to="/model"
        className=" text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        style={{ backgroundColor: "#7A3D02", fontFamily: "'Poppins', sans-serif", color: "#DEBE89", fontWeight: "bold", textTransform: "uppercase" }}>
        Start de reconstructie
      </Link>
    </div>
  );
}
