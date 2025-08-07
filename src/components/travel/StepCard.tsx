import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StepCardProps {
  children: ReactNode;
  className?: string;
}

export const StepCard = ({ children, className = "" }: StepCardProps) => {
  return (
    <Card className={`card-glow border-0 p-8 w-full max-w-2xl mx-auto ${className}`}>
      {children}
    </Card>
  );
};