function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800"
        
      }
      {...props}
    />
  );
}

export { Skeleton };
