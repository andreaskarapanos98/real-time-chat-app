import { Link } from "react-router-dom";
import {
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <section>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-100 backdrop-blur">
              <Sparkles size={16} />
              Real-time conversations, beautifully simple
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Stay connected with the people who matter.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A fast and modern messaging experience with live conversations,
              online presence, typing indicators, unread messages, and more.
            </p>
          </section>

          <section className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/30">
                  <MessageCircle size={25} />
                </div>

                <h2 className="text-2xl font-bold">
                  Welcome to FlowChat
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Sign in to continue your conversations or create a new
                  account to get started.
                </p>
              </div>

              <SignedOut>
                <div className="space-y-3">
                  <Link
                    to="/sign-in"
                    className="flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/sign-up"
                    className="flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
                  >
                    Create account
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "h-11 w-11",
                        },
                      }}
                    />

                    <div>
                      <p className="font-semibold">You are signed in</p>
                      <p className="text-sm text-slate-300">
                        Your conversations are ready.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/chat"
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    Open chat
                  </Link>
                </div>
              </SignedIn>

              <p className="mt-6 text-center text-xs text-slate-400">
                Built with React, Socket.IO, MongoDB, and Clerk
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const Feature = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
      <span className="text-blue-300">{icon}</span>
      {title}
    </div>
  );
};

export default HomePage;