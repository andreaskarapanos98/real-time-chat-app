import { SignIn } from "@clerk/clerk-react";
import { MessageCircle } from "lucide-react";

const SignInPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6">
      {/* Background Glow */}
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left Side */}
        <section className="hidden lg:block">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-blue-100 backdrop-blur">
            <MessageCircle size={18} />
            Real-Time Messaging
          </div>

          <h1 className="max-w-xl text-6xl font-bold leading-tight tracking-tight text-white">
            Connect instantly.
            <br />
            Chat beautifully.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
            A modern messaging platform built with React, Socket.IO,
            MongoDB and Clerk authentication.
          </p>

          <div className="mt-12 space-y-4 text-slate-300">
            <p>✅ Real-time messaging</p>
            <p>✅ Friend requests</p>
            <p>✅ Online presence</p>
            <p>✅ Read receipts</p>
            <p>✅ Typing indicators</p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
            <SignIn
              path="/sign-in"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  card: "shadow-none bg-transparent",
                  rootBox: "w-full",
                },
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignInPage;