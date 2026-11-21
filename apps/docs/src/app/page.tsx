import { Button } from "@repo/ui";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-medium text-5xl tracking-tight">
        Turborepo Essential: Docs
      </h1>
      <p className="max-w-xl text-center text-sm">
        Documentation site. Edit <code>apps/docs/src/app/page.tsx</code> to
        start.
      </p>
      <Button>Get started</Button>
    </main>
  );
}
