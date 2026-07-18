import { SignUp } from "@clerk/clerk-react";
import { MessageCircle } from "lucide-react";

const SignUpPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-10">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <section className="hidden lg:block">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-blue-100 backdrop-blur">
            <MessageCircle size={18} />
            Join the conversation
          </div>

          <h1 className="max-w-xl text-6xl font-bold leading-tight tracking-tight text-white">
            Create your account.
            <br />
            Start chatting.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
            Connect with friends, exchange messages instantly, and enjoy a
            simple real-time chat experience.
          </p>

          <div className="mt-12 space-y-4 text-slate-300">
            <p>✓ Create your friend network</p>
            <p>✓ Send messages in real time</p>
            <p>✓ See online and typing status</p>
            <p>✓ Keep track of unread messages</p>
            <p>✓ Secure authentication with Clerk</p>
          </div>
        </section>

        <section className="flex justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <SignUp
              path="/sign-up"
              signInUrl="/sign-in"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                },
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;