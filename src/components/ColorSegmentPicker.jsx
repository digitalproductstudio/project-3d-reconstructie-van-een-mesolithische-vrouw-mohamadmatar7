export default function ColorSegmentPicker({ label, value, onChange, options, type = 'picker' }) {
  if (type === 'slider') {
    const gradient = `linear-gradient(to right, ${options.join(',')})`;

    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        <input
          type="range"
          min="0"
          max={options.length - 1}
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer border-2 border-gray-300"
          style={{
            background: gradient,
          }}
        />
      </div>
    );
  }

  // Default (oude bolletjes)
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-10 h-10 rounded-full border-2 shadow-sm transition-transform duration-200 ease-in-out hover:scale-110 ${
              value === color ? 'ring-2 ring-offset-2 ring-black' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`${label} ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
