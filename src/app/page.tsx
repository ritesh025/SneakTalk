"use client";

import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";

const Page = () => {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
};

export default Page;

function Lobby() {
  const { username } = useUsername();
  const router = useRouter();

  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get("destroyed") === "true";
  const error = searchParams.get("error");

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {wasDestroyed && (
          <div className="bg-red-950/50 border border-red-900 p-6 text-center">
            <p className="text-red-500 text-normal font-bold">
              ROOM DESTROYED💥
            </p>
            <p className="text-zinc-400 text-[13px] mt-1">
              The room has been successfully destroyed. All messages have been
              deleted.
            </p>
          </div>
        )}
        {error === "room-not-found" && (
          <div className="bg-red-950/50 border border-red-900 p-6 text-center">
            <p className="text-red-500 text-normal font-bold">
              ROOM NOT FOUND⚠️
            </p>
            <p className="text-zinc-400 text-[13px] mt-1">
              The room you are trying to access does not exist. Create a new
              room to start chatting.
            </p>
          </div>
        )}
        {error === "room-full" && (
          <div className="bg-red-950/50 border border-red-900 p-6 text-center">
            <p className="text-red-500 text-normal font-bold">ROOM FULL💯</p>
            <p className="text-zinc-400 text-[13px] mt-1">
              The room you are trying to join is already full. Please create a
              new room to start chatting.
            </p>
          </div>
        )}

        <div className="text-center space-y-2">
          <Link href="/">
            <h1 className="text-3xl font-bold tracking-tight text-lime-500 mb-1">
              SneakTalk
              <MessagesSquare className="inline ml-2 text-lime-500" size={28} />
            </h1>
          </Link>
          <p className="text-neutral-400 text-sm">
            Conversations with an Expiry date.
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your Username
              </label>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => createRoom()}
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black hover:scale-105 transition-colors mt-2 cursor-pointer disabled:opacity-50"
            >
              CREATE SECURE CHAT ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
  
}
