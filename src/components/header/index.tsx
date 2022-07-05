import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
        <div className="flex justify-start h-20 lg:w-0 lg:flex-1">
          <Link href="/">
            <Image
              className="cursor-pointer"
              height="60px"
              width="200px"
              src="/logo.svg"
              alt="pisa.dev"
              title="Home"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
