import { User } from "@/types/user";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputBox } from "@/components/commons/InputBox";
import { Button } from "@/components/commons/Button";
import { useAuthCtx } from "@/contexts/authContext";
import styles from "./LoginForm.module.sass";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username must be at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginForm = () => {
  const { login, isPendingLogin } = useAuthCtx();

  const { control, handleSubmit } = useForm<User>({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: User) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit((data) => handleLogin(data))}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputBox
            type="text"
            label="Username"
            value={value}
            onChange={onChange}
            isRequired
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputBox
            type="password"
            label="Password"
            value={value}
            onChange={onChange}
            isRequired
            error={error?.message}
          />
        )}
      />
      <div className={styles.submitButton}>
        <Button type="submit" size="lg" isLoading={isPendingLogin}>
          Login
        </Button>
      </div>
    </form>
  );
};
