import CustomLink from '../components/CustomLink';

export default function ToolsPage() {
  return (
    <div className="p-8">
      <h2
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: 'IM Fell English, serif' }}
      >
        Instrumenten & Voorwerpen
      </h2>
      <p className="mb-6">
        De mesolithische vrouw gebruikte vuurstenen werktuigen, benen naalden en andere alledaagse objecten.
      </p>
      <CustomLink to="/way-of-life">
        Volgende: Leefwijze
      </CustomLink>
    </div>
  );
}
