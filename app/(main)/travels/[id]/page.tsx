import Link from "next/link";
import GoogleMap from "./_components/google-map";

const page = () => {
  return (
    <div className="h-full relative p-4">
      <Link href={"/travels/new"} passHref>
        Create
      </Link>
      <GoogleMap />
    </div>
  );
};

export default page;
