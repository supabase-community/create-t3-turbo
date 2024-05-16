import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive dark:bg-destructive dark:text-destructive-foreground">
      <AlertTriangle size={16} />
      <p>{message}</p>
    </div>
  );
};
