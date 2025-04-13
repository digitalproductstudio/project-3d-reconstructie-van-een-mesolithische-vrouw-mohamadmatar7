import { Link } from 'react-router-dom';

export default function FactsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Wetenschappelijke Feiten</h2>
      <p className="mb-6">
        DNA-onderzoek onthult kenmerken zoals oogkleur, haarkleur, en huidtint, maar laat ruimte voor interpretatie.
      </p>
      <Link to="/tools" className="bg-blue-600 text-white px-4 py-2 rounded">
        Volgende: Instrumenten
      </Link>
    </div>
  );
}
