import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllResidencies } from '../api/api';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import { MdHome, MdSell, MdPeople } from 'react-icons/md';

export default function Home() {
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
    <>
      {/* Hero */}
      <section className="hero">
        <h1>Find Your Dream Home in <span>Greece</span></h1>
        <p>Discover properties for sale and rent across the most beautiful regions of Greece</p>
        <SearchFilters filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      </section>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number"><MdHome size={40} /></div>
          <div className="stat-label">Properties Listed</div>
          <div className="stat-number" style={{ fontSize: '1.5rem' }}>{properties.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number"><MdSell size={40} /></div>
          <div className="stat-label">For Sale</div>
          <div className="stat-number" style={{ fontSize: '1.5rem' }}>
            {properties.filter((p) => p.listingType === 'sale').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number"><MdPeople size={40} /></div>
          <div className="stat-label">For Rent</div>
          <div className="stat-number" style={{ fontSize: '1.5rem' }}>
            {properties.filter((p) => p.listingType === 'rent').length}
          </div>
        </div>
      </div>

      {/* Latest Properties */}
      <section className="section">
        <h2 className="section-title">Latest Properties</h2>
        <p className="section-subtitle">Browse the newest listings across Greece</p>

        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : filtered.length === 0 ? (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try adjusting your search filters or <Link to="/add-property">list a property</Link></p>
          </div>
        ) : (
          <div className="property-grid">
            {filtered.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {filtered.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/properties" className="btn btn-outline">View All Properties</Link>
          </div>
        )}
      </section>
    </>
  );
}
