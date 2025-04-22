"use client";

export default function Footer() {
  return (
    <footer className="mt-auto row-start-3 flex flex-wrap items-center justify-center gap-6 p-4 text-sm text-gray-500">
      <p>
        Built with ❤️ by{" "}
        <a
          href="https://github.com/virangaj"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700 transition-colors"
        >
          virangaj
        </a>{" "}
        &copy; {new Date().getFullYear()} — All rights reserved.
      </p>
    </footer>
  );
}
