import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .pipe(
      z.email({
        message: "Email khôngđúng định dạng",
      }),
    ),

  password: z.string().min(1, "Password không được để trống"),
});

export default function Login() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending, error } = useLogin();
  const [open, setOpen] = useState(false);
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        login(res.access_token);
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer">
          <User className="mr-2 h-4 w-4 rounded-full bg-orange-500 p-0.5" />
          Login / Sign up
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Login</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email..."
              {...register("email")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password..."
              {...register("password")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Login"}
          </Button>
          {error && (
            <p className="text-sm text-red-500 text-center">{error.message}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
