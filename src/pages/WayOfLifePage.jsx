import CustomLink from '../components/CustomLink';

export default function WayOfLifePage() {
  return (
    <div className="p-8">
      <h2
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: 'IM Fell English, serif' }}
      >
        Dagelijks Leven
      </h2>
      <p className="mb-6">
        Ze leefden in nauwe relatie met de natuur, trokken rond, jaagden en verzamelden voedsel.
      </p>
      <p className="text-gray-600 italic">(Linken naar het 3D model of landschap)</p>
      <CustomLink to="/tools">
        Terug naar Instrumenten
      </CustomLink>
    </div>
  );
}
