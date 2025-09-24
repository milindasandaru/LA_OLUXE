export default function Navbar() {
  return (
    <header className="w-full py-4 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Adora.lk</h1>
        <nav>
          <a className="px-3" href="#">Home</a>
          <a className="px-3" href="#">Shop</a>
          <a className="px-3" href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}
