import { useEffect } from "react";
import { toast } from "@workspace/ui/lib/sonner";
import { redirect } from "next/navigation";

type FormState = { success: boolean | null; message: string };

export function useFormToastAndRedirect(
  state: FormState,
  successMessage: string,
  redirectPath?: string
) {
  useEffect(() => {
    if (state.success === null || state.message === "") return;

    if (state.success === true) {
      toast.success(successMessage);
      if (redirectPath) redirect(redirectPath);
    }
    if (state.success === false) {
      toast.error(state.message);
    }
  }, [state, successMessage, redirectPath]);
}