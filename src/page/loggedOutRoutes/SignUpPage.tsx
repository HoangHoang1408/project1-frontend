import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  NormaInputProps,
  NormalInput,
} from "../../components/custom/form/NormalInput";
import SelectInput, {
  SelectInputProps,
} from "../../components/custom/form/SelectInput";
import { loadingWhite } from "../../images";
import { UserRole } from "../../__generated__/globalTypes";
import {
  SignUpMutaion,
  SignUpMutaionVariables,
} from "../../__generated__/SignUpMutaion";

type SignupInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole;
};

function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SignupInputs>({
    mode: "onBlur",
  });
  const normalInputProps: NormaInputProps[] = [
    {
      type: "text",
      labelString: "Name",
      placeholder: "Name",
      registerObject: register("name", {
        required: {
          value: true,
          message: "Name is required!",
        },
      }),
      errorMessage: errors.name?.message,
    },
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
        validate: (val) =>
          val.length >= 8 || "Password must have at least 8 characters",
      }),
      errorMessage: errors.password?.message,
    },
    {
      type: "password",
      labelString: "Confirm Password",
      placeholder: "Confirm Password",
      registerObject: register("confirmPassword", {
        required: {
          value: true,
          message: "Confirm password is required!",
        },
        validate: (val) =>
          val === getValues().password || "Confirm password is not match",
      }),
      errorMessage: errors.confirmPassword?.message,
    },
  ];
  const roles = Object.keys(UserRole).filter((k) => k !== "Admin");
  const selectInputProps: SelectInputProps[] = [
    {
      registerObject: register("role", {
        validate: (v) => roles.includes(v) || "Invalid user role",
      }),
      errorMessage: errors.role?.message,
      labelString: "Role",
      optionList: roles,
    },
  ];
  // mutation

  const [signup, { loading }] = useMutation<
    SignUpMutaion,
    SignUpMutaionVariables
  >(SIGNUP_MUTATION);

  // submit handler
  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    const { email, password, name, role } = data;
    signup({
      variables: {
        input: {
          email,
          password,
          name,
          role,
        },
      },
      onCompleted: (data) => {
        if (data.signup.error) return toast.error(data.signup.error.message);
        toast.success("Sign up successfully! Login to continue");
        navigate("/login");
      },
      onError: () => {
        toast.error("Failed to sign up. Please try again later");
      },
    });
  };

  return (
    <div className="w-full grid place-items-center text-green-700 font-semibold px-4 my-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-center font-bold mb-4">Sign up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between space-y-2"
        >
          <h1 className="text-lg -mb-2">Welcome!</h1>
          <div className="flex flex-col space-y-1">
            {normalInputProps.map((prop, i) => (
              <NormalInput key={i} {...prop} />
            ))}
            {selectInputProps.map((prop, i) => (
              <SelectInput key={i} {...prop} />
            ))}
          </div>
          <button className="grid place-items-center h-[2.8rem] bg-green-500 text-white font-semibold hover:bg-green-600 transition">
            {!loading && <h1>Sign up</h1>}
            {loading && (
              <img className="w-11" src={loadingWhite} alt="loading"></img>
            )}
          </button>
          <div>
            <h1 className="text-sm text-center">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="underline">Log in</span>{" "}
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

const SIGNUP_MUTATION = gql`
  mutation SignUpMutaion($input: SignUpInput!) {
    signup(input: $input) {
      ok
      error {
        message
      }
    }
  }
`;

export default SignUpPage;
