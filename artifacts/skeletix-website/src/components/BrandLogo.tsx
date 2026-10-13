import logo from '../assets/skeletix-logo.jpeg';

export default function BrandLogo() {
  return (
    <span className="brand-mark">
      <img
        src={logo}
        alt="Skeletix fingerprint skull logo"
        width={60}
        height={60}
        data-testid="img-skeletix-logo"
      />
    </span>
  );
}
