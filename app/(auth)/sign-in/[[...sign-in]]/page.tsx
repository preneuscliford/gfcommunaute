import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className=" flex items-center justify-center ">
      {/* <div className=" w-1/2 p-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          error excepturi quidem praesentium eveniet quae esse quam beatae aut,
          voluptatem libero animi obcaecati hic dolores. Deserunt iure
          perferendis ratione corporis!
        </p>
        <Image src="/assets/hands.png" alt="" width={500} height={400} />
      </div> */}
      <div className="  mt-10">
        <SignIn />
      </div>
    </section>
  );
}
