import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setLoginStatusToLocal,
  userObjectVar,
} from "../../apollo/loginStatus";
import {
  NormaInputProps,
  NormalInput,
} from "../../components/custom/form/NormalInput";
import { SIMPLE_USER_FRAGMENT } from "../../constants/fragment/SimpleUserFragment";
import { loadingWhite } from "../../images";
import {
  LoginMutaion,
  LoginMutaionVariables,
} from "../../__generated__/LoginMutaion";

type LoginInputs = {
  email: string;
  password: string;
};

function LoginPage() {
  // form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>({
    mode: "onBlur",
  });
  const inputProps: NormaInputProps[] = [
    {
      type: "email",
      labelString: "Email",
      placeholder: "Email",
      registerObject: register("email", {
        required: {
          value: true,
          message: "Email is required!",
        },
        pattern:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      }),
      errorMessage:
        errors.email?.message || errors.email?.type === "pattern"
          ? "Invalid email address"
          : undefined,
    },
    {
      type: "password",
      labelString: "Password",
      placeholder: "Password",
      registerObject: register("password", {
        required: {
          value: true,
          message: "Password is required!",
        },
      }),
      errorMessage: errors.password?.message,
    },
  ];
  // mutation hook
  const [login, { loading }] = useMutation<LoginMutaion, LoginMutaionVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login }) => {
        const { accessToken, error, ok, user } = login;
        if (!ok && error?.message) return toast.error(error.message);
        userObjectVar(user);
        setLoginStatusToLocal({
          isLoggedIn: true,
          accessToken,
        });
        console.log(user);
      },
      onError: () => {
        toast.error("Can not login right now. Please try again later");
      },
    }
  );
  // handler
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    const { email, password } = data;
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className="w-full grid place-items-center text-green-600 font-semibold px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-center font-bold mb-6">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between space-y-3"
        >
          <h1 className="text-xl -mb-2">Welcome back!</h1>
          <div className="flex flex-col space-y-1">
            {inputProps.map((prop, i) => (
              <NormalInput key={i} {...prop} />
            ))}
          </div>
          <button className="grid place-items-center h-[2.8rem] bg-green-500 text-white font-semibold hover:bg-green-600 transition">
            {!loading && <h1>Login</h1>}
            {loading && (
              <img className="w-11" src={loadingWhite} alt="loading"></img>
            )}
          </button>
          <div>
            <h1 className="text-sm text-center">
              New to us?{" "}
              <Link to={"/signup"}>
                <span className="underline">Create an account</span>{" "}
              </Link>
              or{" "}
              <Link to={"/forgot-password"}>
                <span className="underline">Forgot password</span>
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

const LOGIN_MUTATION = gql`
  ${SIMPLE_USER_FRAGMENT}
  mutation LoginMutaion($input: LoginInput!) {
    login(input: $input) {
      ok
      error {
        message
      }
      accessToken
      user {
        ...SimpleUser
      }
    }
  }
`;

export default LoginPage;
