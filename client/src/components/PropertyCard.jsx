import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdBed, MdBathtub, MdSquareFoot, MdHome } from 'react-icons/md';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  const formatPrice = (price, listingType) => {
    const formatted = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(price);
    if (listingType === 'rent') return <>{formatted}<span className="price-period">/month</span></>;
    return formatted;
  };

  return (
    <div className="property-card" onClick={() => navigate(`/property/${property.id}`)}>
      {property.image ? (
        <img className="card-image" src={property.image} alt={property.title} />
      ) : (
        <div className="card-image-placeholder">
          <MdHome />
        </div>
      )}

      <div className="card-body">
        <div className="card-badges">
          <span className={`badge ${property.listingType === 'rent' ? 'badge-rent' : 'badge-sale'}`}>
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          <span className="badge badge-type">{property.propertyType}</span>
        </div>

        <h3>{property.title}</h3>

        <div className="card-location">
          <MdLocationOn />
          {property.city}, {property.region || property.country}
        </div>

        <div className="card-details">
          {property.bedrooms != null && (
            <span><MdBed /> {property.bedrooms} beds</span>
          )}
          {property.bathrooms != null && (
            <span><MdBathtub /> {property.bathrooms} baths</span>
          )}
          {property.area != null && (
            <span><MdSquareFoot /> {property.area} m²</span>
          )}
        </div>

        <div className="card-price">
          {formatPrice(property.price, property.listingType)}
        </div>
      </div>
    </div>
  );
}
