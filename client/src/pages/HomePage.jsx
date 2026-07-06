import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div>
      <h1>Real-Time Chat App</h1>

      <SignedOut>
        <p>Please sign in or create an account to start chatting.</p>

        <Link to="/sign-in">Sign In</Link>
        <br />
        <Link to="/sign-up">Sign Up</Link>
      </SignedOut>

      <SignedIn>
        <p>You are signed in.</p>

        <UserButton />
        <br />
        <Link to="/chat">Go to Chat</Link>
      </SignedIn>
    </div>
  );
};

export default HomePage;