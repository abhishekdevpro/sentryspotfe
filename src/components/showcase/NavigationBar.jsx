// CompanyNav.jsx
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const navItems = [
    { id: "why-choose-us", label: "Why Choose Us" },
    { id: "inside-cognizant", label: "Inside Cognizant" },
    { id: "company-benefits", label: "Benefits" },
    { id: "leadership-team", label: "Leadership" },
    { id: "job-listings", label: "Jobs" },
    { id: "social-footer", label: "Connect" },
  ];

  return (
    <nav className="app-light-bg rounded-xl shadow-md border border-blue-100 overflow-x-auto">
      <ul className="flex gap-2 px-4 py-3 text-sm md:text-base font-medium text-blue-700 whitespace-nowrap md:justify-center md:items-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
          href={`#${item.id}`}
          className="px-4 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          {item.label}
        </a>
        </li>
        ))}
      </ul>
    </nav>
  );
}
