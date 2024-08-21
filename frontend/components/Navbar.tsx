import Link from "next/link";
function Navbar() {
  return (
    <nav className="py-1 flex gap-x-4 border-b-2">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
export default Navbar;
