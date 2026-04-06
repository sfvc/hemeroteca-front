// import { Menu, X, Newspaper, Users } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { useMemo, useRef, useState } from "react";
// import logoMunicipalidad from "/-Isologotipo_Catamarca Capital.png";

// type NavItem = {
//   label: string;
//   route: string;
//   icon?: React.ComponentType<{ className?: string }>;
// };

// export default function Navbar() {
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const mobilePanelRef = useRef<HTMLDivElement | null>(null);

//   const navItems = useMemo<NavItem[]>(
//     () => [
//       { label: "Noticias", route: "/noticias", icon: Newspaper },
//       { label: "Nosotros", route: "/nosotros", icon: Users },
//     ],
//     [],
//   );

//   const isActive = (route: string) => {
//     if (route === "/") return location.pathname === "/";
//     return location.pathname.startsWith(route);
//   };

//   return (
//     <header className="fixed inset-x-0 top-0 z-50">
//       <div className="relative overflow-visible bg-slate-800/10 backdrop-blur-md rounded-2xl my-4 mx-4 md:mx-6 lg:mx-8">
//         <div className="flex h-20 items-center justify-between px-5 sm:px-6 lg:px-8">
//           {/* LOGO */}
//           <Link
//             to="/"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center gap-3"
//           >
//             <img
//               src={logoMunicipalidad}
//               alt="Catamarca Capital"
//               className="h-12 sm:h-16 object-contain"
//             />
//           </Link>

//           {/* DESKTOP MENU */}
//           <nav className="hidden items-center gap-3 md:flex">
//             {navItems.map((item) => (
//               <NavButton
//                 key={item.route}
//                 label={item.label}
//                 active={isActive(item.route)}
//                 to={item.route}
//                 icon={item.icon}
//               />
//             ))}
//           </nav>

//           {/* MOBILE BUTTON BURGER */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileOpen((v) => !v)}
//               className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-white shadow-md transition hover:bg-[#6d1236]"
//             >
//               {mobileOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileOpen && (
//           <div
//             ref={mobilePanelRef}
//             className="border-t border-slate-600 px-3 pb-3 md:hidden"
//           >
//             <div className="pt-3">
//               {navItems.map((item) => (
//                 <MobileLink
//                   key={item.route}
//                   label={item.label}
//                   active={isActive(item.route)}
//                   to={item.route}
//                   icon={item.icon}
//                   onClick={() => setMobileOpen(false)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// function NavButton({
//   label,
//   active,
//   to,
//   icon: Icon,
// }: {
//   label: string;
//   active: boolean;
//   to: string;
//   icon?: React.ComponentType<{ className?: string }>;
// }) {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white transition-all duration-300 ${
//         active
//           ? "bg-slate-600"
//           : "bg-slate-700 hover:bg-gray-300 hover:text-slate-900"
//       }`}
//     >
//       {Icon && <Icon className="h-5 w-5" />}
//       {label}
//     </Link>
//   );
// }

// function MobileLink({
//   label,
//   active,
//   to,
//   icon: Icon,
//   onClick,
// }: {
//   label: string;
//   active: boolean;
//   to: string;
//   icon?: React.ComponentType<{ className?: string }>;
//   onClick: () => void;
// }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className={`mt-2 flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
//         active ? "bg-slate-900" : "bg-slate-900 hover:bg-slate-700"
//       }`}
//     >
//       {Icon && <Icon className="h-4 w-4" />}
//       {label}
//     </Link>
//   );
// }
