import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function page() {
  const user = await currentUser();
  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: userInfo._Id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className=" mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className=" head-text">Onboarding</h1>
      <div className=" mt-3 text-base-regular text-light-2">
        Completer votre profile pour continuer.
      </div>
      <section className=" mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continuer" />
      </section>
    </main>
  );
}

export default page;
