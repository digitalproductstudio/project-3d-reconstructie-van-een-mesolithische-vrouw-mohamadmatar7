export default function ColorSegmentPicker({ label, value, onChange, options }) {
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
  