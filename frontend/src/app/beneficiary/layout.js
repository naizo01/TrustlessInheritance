export default function Layout({ children }) {
  return (
    <div className="h-full gap-12">
      <div className="">{children}</div>
    </div>
  );
}

// This is a nested layout within the RootLayout, where this Layout comes in.
