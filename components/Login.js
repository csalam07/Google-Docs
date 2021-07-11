import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from "next-auth/client";
import LottieFiles from "./LottieFiles";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <LottieFiles />

      <Button color="blue" className="w-44" onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  );
}

export default Login;
