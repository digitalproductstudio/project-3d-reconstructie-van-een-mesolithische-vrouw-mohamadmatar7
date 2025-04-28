import CustomLink from "../components/CustomLink";

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

      <CustomLink to="/model">
        Start de reconstructie
      </CustomLink>
    </div>
  );
}
