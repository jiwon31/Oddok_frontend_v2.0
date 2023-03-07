import { toast } from "react-toastify";

export default function useToast() {
  const successToast = (message: string) => toast.success(message);
  const errorToast = (message: string) => toast.error(message);

  return { successToast, errorToast };
}
