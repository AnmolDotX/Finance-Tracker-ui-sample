import Link from "next/link";

const Settings = () => {
  return (
    <div>
      <p className="mb-4 max-w-lg">
        Dude, That&apos;s just placeholder. <br /> &quot;Settings&quot; was not
        suppose to be in assignment
      </p>
      <Link
        className="bg-slate-100 py-2 px-4 mt-8 text-slate-900 font-medium uppercase text-xs tracking-widest"
        href={"/"}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Settings;
