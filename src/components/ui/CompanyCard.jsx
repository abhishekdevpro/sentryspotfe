export default function CompanyCard({ children, className = "" }) {
  return (
    <div
      className={`app-light-bg rounded-2xl shadow-lg p-8 md:p-12 border border-blue-100 transition-all hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
