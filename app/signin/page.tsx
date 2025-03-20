import { signInWithGoogle } from "@/app/signin/actions";

export default function LoginPage() {
  return (
    <form action={signInWithGoogle}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
