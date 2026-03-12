import { GREEK_REGIONS, PROPERTY_TYPES, LISTING_TYPES } from '../data/greekData';

export default function SearchFilters({ filters, setFilters, onSearch }) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="search-bar">
      <select value={filters.listingType} onChange={(e) => handleChange('listingType', e.target.value)}>
        <option value="">Buy or Rent</option>
        {LISTING_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <select value={filters.region} onChange={(e) => handleChange('region', e.target.value)}>
        <option value="">All Regions</option>
        {GREEK_REGIONS.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <select value={filters.propertyType} onChange={(e) => handleChange('propertyType', e.target.value)}>
        <option value="">Property Type</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Max price (€)"
        value={filters.maxPrice}
        onChange={(e) => handleChange('maxPrice', e.target.value)}
      />

      <button className="btn btn-primary" onClick={onSearch}>Search</button>
    </div>
  );
}
