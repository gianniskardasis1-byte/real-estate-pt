import { useState, useEffect } from 'react';
import { getAllResidencies } from '../api/api';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    listingType: '',
    region: '',
    propertyType: '',
    maxPrice: '',
  });

  useEffect(() => {
    getAllResidencies()
      .then((res) => {
        setProperties(res.data);
        setFiltered(res.data);
      })
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    let result = [...properties];
    if (filters.listingType) result = result.filter((p) => p.listingType === filters.listingType);
    if (filters.region) result = result.filter((p) => p.region === filters.region);
    if (filters.propertyType) result = result.filter((p) => p.propertyType === filters.propertyType);
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));
    setFiltered(result);
  };

  return (
    <section className="section">
      <h2 className="section-title">All Properties</h2>
      <p className="section-subtitle">Browse all available properties in Greece</p>

      <div style={{ marginBottom: '2rem' }}>
        <SearchFilters filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="loading">Loading properties...</div>
      ) : filtered.length === 0 ? (
        <div className="no-results">
          <h3>No properties match your criteria</h3>
          <p>Try adjusting your search filters</p>
        </div>
      ) : (
        <>
          <p className="section-subtitle">{filtered.length} properties found</p>
          <div className="property-grid">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
