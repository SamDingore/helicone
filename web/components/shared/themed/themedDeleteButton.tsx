import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clsx } from "../clsx";

interface ThemedDeleteButtonProps {
  onDelete: () => void;
  className?: string;
  isDeleting?: boolean;
}

export default function ThemedDeleteButton({ onDelete, className, isDeleting }: ThemedDeleteButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={onDelete}
            className={clsx("flex items-center gap-2 text-red-600 dark:text-red-400", className)}
            size="xs"
          >
            {isDeleting ? (
              <ArrowPathIcon className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <TrashIcon className="h-4 w-4 mr-1.5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Property</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
