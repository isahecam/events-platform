import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link
          href="/"
          className="logo">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={24}
            height={24}
          />
          <p>Grajalitos Events</p>
        </Link>

        <ul>
          <Link href="/">Inicio</Link>
          <Link href="/events">Eventos</Link>
          <Link href="/about">Crea un evento</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
