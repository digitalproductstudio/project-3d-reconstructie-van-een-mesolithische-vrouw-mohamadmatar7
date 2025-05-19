import { Link } from 'react-router-dom';
import FactCarousel from '../components/FactCarousel';
import facts from '../assets/facts.json';

export default function FactsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-[#402103]">
      {/* <h2 className="text-3xl font-bold mb-4"
       style={{ fontFamily: 'IM Fell English, serif' }}
      >Wetenschappelijke Feiten</h2>
      <p className="mb-6">
        DNA-onderzoek onthult kenmerken zoals oogkleur, haarkleur, en huidtint, maar laat ruimte voor interpretatie.
      </p>
      <Link to="/tools"         className="bg-[#7A3D02] hover:bg-[#5c2e01] text-[#DEBE89] text-lg px-6 py-3 rounded-lg shadow-md uppercase font-bold font-poppins transition"
      >
        Volgende: Instrumenten
      </Link> */}

      <FactCarousel facts={facts} />

    </div>
  );
}
