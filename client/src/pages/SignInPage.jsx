import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return <SignIn path="/sign-in" signUpUrl="/sign-up" />;
};

export default SignInPage;