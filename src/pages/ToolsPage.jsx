import { Link } from 'react-router-dom';

export default function ToolsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Instrumenten & Voorwerpen</h2>
      <p className="mb-6">
        De mesolithische vrouw gebruikte vuurstenen werktuigen, benen naalden en andere alledaagse objecten.
      </p>
      <Link to="/way-of-life" className="bg-blue-600 text-white px-4 py-2 rounded">
        Volgende: Leefwijze
      </Link>
    </div>
  );
}
