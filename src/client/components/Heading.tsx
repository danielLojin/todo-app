function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-center text-4xl font-bold tracking-wider mb-8 ${className}`}
    >
      {children}
    </h1>
  );
}

export default Heading;
