export default function FilterOptions({ eyeColors, genders, eyeColorFilter, genderFilter, setEyeColorFilter, setGendersFilter }) {
  return (
    <div className="flex items-center justify-center gap-10 mt-4">
      <div className="flex items-center justify-center gap-2">
        <p>Eye color:</p>
        <select value={eyeColorFilter} onChange={(e) => setEyeColorFilter(e.target.value)} className="rounded-lg text-black p-1 w-32">
          <option value="">All</option>
          {eyeColors.map((eyeColor) => (
            <option key={eyeColor} value={eyeColor}>{eyeColor.charAt(0).toUpperCase() + eyeColor.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center gap-2">
        <p>Gender:</p>
        <select value={genderFilter} onChange={(e) => setGendersFilter(e.target.value)} className="rounded-lg text-black p-1 w-32">
          <option value="">All</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
}