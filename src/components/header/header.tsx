import { ModeToggle } from "@/components/header/mode-toggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-md z-10 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Redis Viewer Tool</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
