import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { authLogin } from "@/redux/slice/auth.slice";
import { SignInSchema, SignInType } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignIn = () => {
	const form = useForm<SignInType>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const dispatch = useAppDispatch();

	// 2. Define a submit handler.
	async function onSubmit(values: SignInType) {
		console.log(" values~", values);
		await dispatch(authLogin(values));
	}
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className=' border border-neutral-600 rounded-md px-[100px] py-[50px] '>
				<div className='w-[300px] space-y-3'>
					<div className=''>
						<div>
							<h2 className='text-2xl font-bold'>
								Login to your Account
							</h2>
							<p className='text-xs font-normal'>
								Welcome back! Select method to log in:
							</p>
						</div>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='shadcn'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder='shadcn'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Đăng nhập
							</Button>
						</form>
					</Form>
					<div className='flex items-center justify-center gap-1 text-xs text-center'>
						<span>Don’t have account?</span>
						<Link
							to='/sign-up'
							className='font-medium text-blue-500'
						>
							Create an account
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
