import Link from "next/link";

const Menu = () => {
  return (
    <nav className="flex bg-green-400 h-12">
      <h1 className="mx-4 content-center text-green-600 font-bold text-2xl">
        <Link href="/">Foodies</Link>
      </h1>
      <ul className="flex p-3">
        <li className="mx-3">
          <Link href="/list">List</Link>
        </li>
        <li className="mx-3">
          <Link href="/planner">Planner</Link>
        </li>
        <li className="mx-3">
          <Link href="/recipes">Recipes</Link>
        </li>
        <li className="mx-3">
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
      <div className="absolute right-0">
        {/* <button className="btn mr-4">Dodaj przepis</button> */}
        <button className="btn mr-4">Reset planner</button>
      </div>
    </nav>
  );
};

export default Menu;
