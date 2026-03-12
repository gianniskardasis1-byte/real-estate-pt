export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        Greek<span>Homes</span>
      </div>
      <p>Find your dream property in Greece — for sale or rent</p>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.6 }}>
        &copy; {new Date().getFullYear()} GreekHomes. All rights reserved.
      </p>
    </footer>
  );
}
