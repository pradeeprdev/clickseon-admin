"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login } from "../../services/authService";
import toast from "react-hot-toast";

type FormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            email: "admin@clickgrow.com",
            password: "123456",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            const res = await login(data.email, data.password);

            localStorage.setItem("token", res.token);

            if (res.user) {
                localStorage.setItem("user", JSON.stringify(res.user));
            }

            toast.success("Login successful");

            router.push("/dashboard");
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                err.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                    ClickGrow AI
                </h1>

                <p className="text-slate-500 mt-2">
                    Admin Dashboard Login
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="admin@example.com"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700 transition"
                >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}