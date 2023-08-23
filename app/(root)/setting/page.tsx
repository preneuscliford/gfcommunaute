import { UserProfile } from "@clerk/nextjs";

function Setting() {
  return (
    <div className=" absolute z-50">
      <h1>Parametre</h1>
      <UserProfile />
    </div>
  );
}

export default Setting;
