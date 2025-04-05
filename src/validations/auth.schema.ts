import { z } from "zod";

export const SignInSchema = z.object({
	email: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(8, {
		message: "Username must be at least 8 characters.",
	}),
});

export const SignUpSchema = z.object({
	email: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(8, {
		message: "Username must be at least 8 characters.",
	}),
});

export type SignUpType = z.TypeOf<typeof SignUpSchema>;
export type SignInType = z.TypeOf<typeof SignInSchema>;
