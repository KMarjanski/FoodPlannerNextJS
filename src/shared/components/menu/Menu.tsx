import Link from "next/link";
import SetPlannerButtons from "./SetPlannerButtons";

const Menu = () => {
  return (
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
      <div className="absolute right-0">
        <SetPlannerButtons />
      </div>
    </nav>
  );
};

export default Menu;
