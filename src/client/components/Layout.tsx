function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-gray-800 bg-gray-200 dark:text-gray-200 text-gray-800 min-h-screen">
      <div className="xl:max-w-[1240px] mx-auto px-4 pt-3">{children}</div>
    </div>
  );
}

export default Layout;
