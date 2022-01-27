import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  NormaInputProps,
  NormalInput,
} from "../../components/custom/form/NormalInput";
import { loadingWhite } from "../../images";
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "../../__generated__/ForgotPasswordMutation";
type SignupInputs = {
  email: string;
};

function ForgotPassword() {
  // form set up
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
      type: "email",
      labelString: "Enter your registed email",
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
  ];
  // mutation
  const [forgotPassword, { loading }] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD_MUTATION, {
    onCompleted(data) {
      if (data.forgotPassword.error)
        return toast.error(data.forgotPassword.error.message);
      toast.info(
        `Email sent to ${
          getValues().email
        }. Follow the guides to change the password.`
      );
    },
    onError() {
      toast.error(`Cant not reset password right now. Please try again later`);
    },
  });

  // submit hanlder
  const onSubmit: SubmitHandler<SignupInputs> = ({ email }) => {
    forgotPassword({
      variables: {
        input: {
          email,
        },
      },
    });
  };
  return (
    <div className="w-full grid place-items-center text-green-700 font-semibold px-4 my-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl text-center font-bold mb-12">
          Forgot Password
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between space-y-2"
        >
          <div className="flex flex-col space-y-1">
            {normalInputProps.map((prop, i) => (
              <NormalInput key={i} {...prop} className=" space-y-1" />
            ))}
          </div>
          <button className="grid place-items-center h-[2.8rem] bg-green-500 text-white font-semibold hover:bg-green-600 transition">
            {!loading && <h1>Send email</h1>}
            {loading && (
              <img className="w-11" src={loadingWhite} alt="loading"></img>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPasswordMutation($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      ok
      error {
        message
      }
    }
  }
`;

export default ForgotPassword;
