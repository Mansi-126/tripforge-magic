import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  color?: "purple" | "blue" | "cyan" | "green" | "yellow" | "orange" | "pink";
}

const colorClasses = {
  purple: "border-app-purple/30 hover:border-app-purple bg-app-purple/5 hover:bg-app-purple/10",
  blue: "border-app-blue/30 hover:border-app-blue bg-app-blue/5 hover:bg-app-blue/10",
  cyan: "border-app-cyan/30 hover:border-app-cyan bg-app-cyan/5 hover:bg-app-cyan/10",
  green: "border-app-green/30 hover:border-app-green bg-app-green/5 hover:bg-app-green/10",
  yellow: "border-app-yellow/30 hover:border-app-yellow bg-app-yellow/5 hover:bg-app-yellow/10",
  orange: "border-app-orange/30 hover:border-app-orange bg-app-orange/5 hover:bg-app-orange/10",
  pink: "border-app-pink/30 hover:border-app-pink bg-app-pink/5 hover:bg-app-pink/10",
};

export const SelectionCard = ({
  icon,
  title,
  description,
  isSelected,
  onClick,
  className = "",
  color = "purple"
}: SelectionCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 p-6 border-2 hover:scale-[1.02] hover:shadow-lg",
        isSelected
          ? "bg-gradient-primary text-white border-primary shadow-glow"
          : colorClasses[color],
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={cn(
          "text-2xl transition-colors duration-300",
          isSelected ? "text-white" : "text-primary"
        )}>
          {icon}
        </div>
        <h3 className={cn(
          "font-semibold text-lg",
          isSelected ? "text-white" : "text-foreground"
        )}>
          {title}
        </h3>
        {description && (
          <p className={cn(
            "text-sm opacity-80",
            isSelected ? "text-white" : "text-muted-foreground"
          )}>
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};