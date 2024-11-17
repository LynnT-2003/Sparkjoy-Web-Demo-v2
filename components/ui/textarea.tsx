import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    // <textarea
    //   className={cn(
    //     "flex h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xl shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-lg",
    //     className
    //   )}
    //   ref={ref}
    //   {...props}
    // />
    <textarea
      className={cn(
        "flex h-[200px] w-full rounded-md bg-transparent px-3 py-2 text-xl shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 border-0 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
