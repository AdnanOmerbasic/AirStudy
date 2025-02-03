import { GmailIcon } from "@/icons/gmail-icon/gmail";
import { Button } from "../ui/Button/button";
import { googleSignIn } from "@/actions";

export default function SignInWithGoogle() {
  return (
    <form action={googleSignIn}>
      <div className="flex justify-center w-72 pt-4">
        <Button size="sm" variant="secondary">
          <GmailIcon className="pr-2" />
          Sign in with Gmail
        </Button>
      </div>
    </form>
  );
}
