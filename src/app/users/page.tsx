import { auth } from "../../../auth";
import { ButtonSignOut } from "@/components/Button/signOutButton";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return <div>You need to log in</div>;
  }

  return (
    <div>
      <ButtonSignOut>hey</ButtonSignOut>
      Hello my friend
    </div>
  );
}
