import Link from "next/link";
import AddButtons from "./additionalButtons/addButtons";

const Menu = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-14 bg-black/50 backdrop-blur border-t border-white/20">
      <nav className="flex bg-background2 h-12">
        <h1 className="mx-4 content-center font-bold text-2xl">
          <Link className="text-backgroundtext" href="/">
            Foodies
          </Link>
        </h1>
        <ul className="flex p-3">
          <li className="mx-3">
            <Link className="text-backgroundtext font-retro" href="/list">
              List
            </Link>
          </li>
          <li className="mx-3">
            <Link className="text-backgroundtext font-retro" href="/planner">
              Planner
            </Link>
          </li>
          <li className="mx-3">
            <Link className="text-backgroundtext font-retro" href="/recipes">
              Recipes
            </Link>
          </li>
          <li className="mx-3">
            <Link className="text-backgroundtext font-retro" href="/cart">
              Cart
            </Link>
          </li>
        </ul>
        <AddButtons />
      </nav>
    </div>
  );
};

export default Menu;
