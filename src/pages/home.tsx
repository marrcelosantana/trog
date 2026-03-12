import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Home() {
  return (
    <div className="flex h-screen w-full">
      <header className="flex w-full justify-end p-4">
        <ThemeToggle />
      </header>
    </div>
  );
}
