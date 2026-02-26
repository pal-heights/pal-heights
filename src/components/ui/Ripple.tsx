import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@lib/utlis/cn";
import "./ripple.css";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {}

export const Ripple = React.memo(function Ripple({
  className,
  ...props
}: RippleProps) {
  return (
    <div className={cn("ripple-wrapper", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="ripple-circle"
          style={
            {
              "--i": i,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});

Ripple.displayName = "Ripple";
