import Link from "next/link";

const page = () => {
  return (
    <div className="h-full relative p-4">
      <Link href={"/travels"} passHref>
        Create
      </Link>
    </div>
  );
};

export default page;
