import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { InferType } from 'yup';
import * as yup from 'yup';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosError, AxiosResponse } from 'axios';


import { login } from '../../actions/authActions';


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.'),
    remember: yup.boolean()
});

const defaultValues = {
    email: '',
    password: '',
    remember: true
};

/**
 * The sign in page.
 */
function SignInPage() {

    const dispatch = useDispatch();

    const { control, formState, handleSubmit, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    useEffect(() => {
        setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
        setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
    }, [setValue]);

    function onSubmit({ email, password }: InferType<typeof schema>) {
        console.log(email, " : ", password)
        axios
            .post('http://localhost:5000/users/logIn', {
                data: {
                    email,
                    password
                }
            })
            .then(
                (
                    response: AxiosResponse<{
                        user: {
                            name: string;
                            email: string;
                        };
                        access_token: string;
                        error?: string;
                    }>
                ) => {
                    if (response.data.user) {
                        window.localStorage.setItem('jwt_login_token', response.data.access_token);
                        dispatch(login(response.data.user.name));
                    } else {
                        alert(response.data.error);
                    }
                }
            );
        //////////////////////////////// -- Login -- ///////////////////////////
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
            <Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
                <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
                    <img
                        className="w-48"
                        src="assets/images/logo/logo.svg"
                        alt="logo"
                    />

                    <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
                        Sign in
                    </Typography>
                    <div className="mt-2 flex items-baseline font-medium">
                        <Typography>Don't have an account?</Typography>
                        {/* <Link
                            className="ml-4"
                            to="/sign-up"
                        > */}
                        Sign up
                        {/* </Link> */}
                    </div>

                    <form
                        name="loginForm"
                        noValidate
                        className="mt-32 flex w-full flex-col justify-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Password"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormControlLabel
                                            label="Remember me"
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    {...field}
                                                />
                                            }
                                        />
                                    </FormControl>
                                )}
                            />

                            {/* <Link
                                className="text-md font-medium"
                                to="/pages/auth/forgot-password"
                            > */}
                            Forgot password?
                            {/* </Link> */}
                        </div>

                        <Button
                            variant="contained"
                            color="secondary"
                            className=" mt-16 w-full"
                            aria-label="Sign in"
                            disabled={!isValid}
                            type="submit"
                            size="large"
                        >
                            Sign in
                        </Button>

                        <div className="mt-32 flex items-center">
                            <div className="mt-px flex-auto border-t" />
                            <Typography
                                className="mx-8"
                                color="text.secondary"
                            >
                                Or continue with
                            </Typography>
                            <div className="mt-px flex-auto border-t" />
                        </div>

                    </form>
                </div>
            </Paper>
        </div>
    );
}

export default SignInPage;