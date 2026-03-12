import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResidency } from '../api/api';
import { GREEK_REGIONS, GREEK_CITIES, PROPERTY_TYPES, LISTING_TYPES } from '../data/greekData';

export default function AddProperty() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    region: '',
    country: 'Greece',
    image: '',
    listingType: 'sale',
    propertyType: 'apartment',
    area: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    userEmail: '',
    facilities: {
      parking: false,
      airConditioning: false,
      garden: false,
      pool: false,
      balcony: false,
      elevator: false,
      furnished: false,
      storage: false,
    },
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFacility = (facility) => {
    setForm((prev) => ({
      ...prev,
      facilities: { ...prev.facilities, [facility]: !prev.facilities[facility] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const data = {
      ...form,
      price: Number(form.price),
      area: form.area ? Number(form.area) : null,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : null,
    };

    try {
      await createResidency(data);
      setMessage({ type: 'success', text: 'Property listed successfully!' });
      setTimeout(() => navigate('/properties'), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create listing' });
    }
  };

  return (
    <div className="form-page">
      <h1>List Your Property</h1>
      <p className="section-subtitle">Fill in the details to list your property in Greece</p>

      {message && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Listing Type */}
        <div className="form-row">
          <div className="form-group">
            <label>Listing Type *</label>
            <select value={form.listingType} onChange={(e) => handleChange('listingType', e.target.value)} required>
              {LISTING_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Property Type *</label>
            <select value={form.propertyType} onChange={(e) => handleChange('propertyType', e.target.value)} required>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title *</label>
          <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Beautiful villa in Santorini" required />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description *</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Describe the property..." required />
        </div>

        {/* Price */}
        <div className="form-row">
          <div className="form-group">
            <label>Price (€) *</label>
            <input type="number" min="0" value={form.price} onChange={(e) => handleChange('price', e.target.value)} placeholder={form.listingType === 'rent' ? 'Monthly rent' : 'Sale price'} required />
          </div>
          <div className="form-group">
            <label>Area (m²)</label>
            <input type="number" min="0" value={form.area} onChange={(e) => handleChange('area', e.target.value)} placeholder="e.g. 120" />
          </div>
        </div>

        {/* Rooms */}
        <div className="form-row-3">
          <div className="form-group">
            <label>Bedrooms</label>
            <input type="number" min="0" value={form.bedrooms} onChange={(e) => handleChange('bedrooms', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Bathrooms</label>
            <input type="number" min="0" value={form.bathrooms} onChange={(e) => handleChange('bathrooms', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Year Built</label>
            <input type="number" min="1900" max="2030" value={form.yearBuilt} onChange={(e) => handleChange('yearBuilt', e.target.value)} />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Address *</label>
          <input type="text" value={form.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="e.g. 15 Odos Ermou" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <select value={form.city} onChange={(e) => handleChange('city', e.target.value)} required>
              <option value="">Select city</option>
              {GREEK_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Region *</label>
            <select value={form.region} onChange={(e) => handleChange('region', e.target.value)} required>
              <option value="">Select region</option>
              {GREEK_REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image */}
        <div className="form-group">
          <label>Image URL</label>
          <input type="url" value={form.image} onChange={(e) => handleChange('image', e.target.value)} placeholder="https://example.com/image.jpg" />
        </div>

        {/* Your Email */}
        <div className="form-group">
          <label>Your Email *</label>
          <input type="email" value={form.userEmail} onChange={(e) => handleChange('userEmail', e.target.value)} placeholder="your@email.com" required />
        </div>

        {/* Facilities */}
        <div className="form-group">
          <label>Facilities</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {Object.keys(form.facilities).map((facility) => (
              <label key={facility} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.facilities[facility]}
                  onChange={() => handleFacility(facility)}
                />
                {facility.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
          List Property
        </button>
      </form>
    </div>
  );
}
