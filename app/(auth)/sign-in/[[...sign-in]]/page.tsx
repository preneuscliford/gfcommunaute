/* eslint-disable react/no-unescaped-entities */
import { SignIn } from "@clerk/nextjs";

import "../../../../styles/global.css";

export default function Page() {
  return (
    <section className="  ">
      <SignIn />
    </section>
  );
}
