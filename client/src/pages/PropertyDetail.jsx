import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResidency } from '../api/api';
import {
  MdArrowBack, MdLocationOn, MdBed, MdBathtub,
  MdSquareFoot, MdCalendarToday, MdHome,
} from 'react-icons/md';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResidency(id)
      .then((res) => setProperty(res.data))
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading property details...</div>;
  if (!property) return <div className="no-results"><h3>Property not found</h3></div>;

  const formatPrice = (price, listingType) => {
    const formatted = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(price);
    return listingType === 'rent' ? `${formatted}/month` : formatted;
  };

  const facilities = typeof property.facilities === 'object' && property.facilities !== null
    ? property.facilities
    : {};

  return (
    <div className="detail-page">
      <div className="back-btn" onClick={() => navigate(-1)}>
        <MdArrowBack /> Back to listings
      </div>

      {property.image ? (
        <img className="detail-image" src={property.image} alt={property.title} />
      ) : (
        <div className="detail-image-placeholder">
          <MdHome />
        </div>
      )}

      <div className="detail-header">
        <div>
          <div className="card-badges" style={{ marginBottom: '0.5rem' }}>
            <span className={`badge ${property.listingType === 'rent' ? 'badge-rent' : 'badge-sale'}`}>
              {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            <span className="badge badge-type">{property.propertyType}</span>
          </div>
          <h1>{property.title}</h1>
          <div className="card-location" style={{ fontSize: '1.1rem' }}>
            <MdLocationOn /> {property.address}, {property.city}, {property.region || property.country}
          </div>
        </div>
        <div className="detail-price">
          {formatPrice(property.price, property.listingType)}
        </div>
      </div>

      <div className="detail-info">
        {property.bedrooms != null && (
          <div className="detail-info-item">
            <MdBed size={24} />
            <div className="value">{property.bedrooms}</div>
            <div className="label">Bedrooms</div>
          </div>
        )}
        {property.bathrooms != null && (
          <div className="detail-info-item">
            <MdBathtub size={24} />
            <div className="value">{property.bathrooms}</div>
            <div className="label">Bathrooms</div>
          </div>
        )}
        {property.area != null && (
          <div className="detail-info-item">
            <MdSquareFoot size={24} />
            <div className="value">{property.area} m²</div>
            <div className="label">Area</div>
          </div>
        )}
        {property.yearBuilt != null && (
          <div className="detail-info-item">
            <MdCalendarToday size={24} />
            <div className="value">{property.yearBuilt}</div>
            <div className="label">Year Built</div>
          </div>
        )}
      </div>

      <div className="detail-description">
        <h2>Description</h2>
        <p>{property.description}</p>

        {Object.keys(facilities).length > 0 && (
          <>
            <h2 style={{ marginTop: '1.5rem' }}>Facilities</h2>
            <div className="detail-facilities">
              {Object.entries(facilities).map(([key, value]) => (
                value && <span key={key} className="facility-tag">{key}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
