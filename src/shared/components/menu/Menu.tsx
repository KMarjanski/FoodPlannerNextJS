import Link from "next/link";
import AddButtons from "./additionalButtons/addButtons";

const Menu = () => {
  return (
    <nav className="flex items-center backdrop-blur-sm border-b border-white/10 h-16">
      <h1 className="mx-6 font-bold text-2xl">
        <Link className="text-green-500 hover:text-green-400 transition-colors" href="/">
          Jedzonko
        </Link>
      </h1>
      <ul className="flex gap-8 p-4">
        <li>
          <Link className="text-white/80 hover:text-green-400 font-medium transition-colors" href="/lista">
            Lista
          </Link>
        </li>
        <li>
          <Link className="text-white/80 hover:text-green-400 font-medium transition-colors" href="/planer">
            Planer
          </Link>
        </li>
        <li>
          <Link className="text-white/80 hover:text-green-400 font-medium transition-colors" href="/przepisy">
            Przepisy
          </Link>
        </li>
        <li>
          <Link className="text-white/80 hover:text-green-400 font-medium transition-colors" href="/koszyk">
            Koszyk
          </Link>
        </li>
      </ul>
      <AddButtons />
    </nav>
  );
};

export default Menu;
