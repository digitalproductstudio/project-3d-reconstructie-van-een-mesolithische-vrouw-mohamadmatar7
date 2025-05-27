import { GiNecklaceDisplay } from 'react-icons/gi';

export default function NecklacePicker({ showNeck, showNeck1, onChange }) {
  const getImageSrc = (file) =>
    import.meta.env.MODE === 'development'
      ? `/images/${file}`
      : `${import.meta.env.BASE_URL}/images/${file}`;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-[#EEBD74] flex items-center gap-2 mb-1">
        <GiNecklaceDisplay className="text-xl" />
        Ketting
      </label>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onChange('none')}
          className={`rounded-lg p-2 h-24 flex flex-col items-center justify-center gap-1 transition ${
            !showNeck && !showNeck1
              ? 'bg-[#86561C]/20 border-2 border-[#EEBD74]'
              : 'bg-white/10 border border-transparent hover:border-[#86561C]'
          }`}
        >
          <span className={`text-sm font-semibold text-[#EEBD74]`}
          style={{ textShadow: '2px 3px 5px #5C3A1E' }}
          >
            Geen
          </span>
        </button>

        <button
          onClick={() => onChange('neck')}
          className={`rounded-lg overflow-hidden p-1 h-24 border transition ${
            showNeck ? 'border-[#EEBD74] bg-[#86561C]/20' : 'border-transparent hover:border-[#86561C] bg-white/10'
          }`}
        >
          <img src={getImageSrc('neck.png')} alt="Ketting 1" className="object-contain w-full h-full" />
        </button>

        <button
          onClick={() => onChange('neck1')}
          className={`rounded-lg overflow-hidden p-1 h-24 border transition ${
            showNeck1 ? 'border-[#EEBD74] bg-[#86561C]/20' : 'border-transparent hover:border-[#86561C] bg-white/10'
          }`}
        >
          <img src={getImageSrc('neck1.png')} alt="Ketting 2" className="object-contain w-full h-full" />
        </button>
      </div>
    </div>
  );
}
