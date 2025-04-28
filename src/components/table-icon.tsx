import { useState } from "react";
import { LucideProps } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

interface TableIconProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  action: () => void;
  className?: string;
  message?: string;
}

const TableIcon = ({ Icon, action, className, message }: TableIconProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    action();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Icon size={16} className={className} onClick={() => setOpen(true)} />
      </PopoverTrigger>
      <PopoverContent className="relative w-72 h-24">
        <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        <Button onClick={handleConfirm} className="absolute right-2 bottom-2">
          Confirm
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default TableIcon;
