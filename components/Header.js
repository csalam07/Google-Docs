import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";

function Header() {
  const [session, loading] = useSession();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        color="gray"
        buttonType="link"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex h-20 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl">
        Docs
      </h1>
      <form
        className="flex flex-grow md:mx-20 items-center mx-5 px-5 py-2 rounded-lg bg-gray-100 text-gray-600 
      focus-within:text-gray-600 focus-within:shadow-md
      "
      >
        <Icon name="search" size="3xl" color="darkgray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
        <button className="hidden" type="submit" onClick={handleSearch} />
      </form>
      <Button
        color="gray"
        buttonType="link"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0"
      >
        <Icon name="apps" size="3xl" />
      </Button>

      <img
        loading="lazy"
        onClick={() => signOut()}
        className="cursor-pointer h-12 w-12 rounded-full ml-2 hover:animate-pulse"
        src={session?.user?.image}
        alt="userimage"
      />
    </header>
  );
}

export default Header;
