import { Formik, Form, Field, ErrorMessage } from "formik";

import { useNavigate } from "react-router-dom";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { login } from "../../api/auth.api";

import { useAuth } from "../../context/AuthContext";

import { LoginSchema, } from "../../schemas/auth.schema";

export default function LoginPage() {
  const navigate =
    useNavigate();

  const { refreshRole, refreshUser } = useAuth();

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-slate-100
      "
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(LoginSchema)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values.email, values.password);
            refreshRole();
            await refreshUser();
            navigate("/");
          } catch {
            alert("Invalid credentials");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          isSubmitting,
        }) => (
          <Form
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-lg
              w-[450px]
            "
          >
            <h1
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Login
            </h1>

            <div className="mb-4">

              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >
                Email
              </label>

              <Field
                name="email"
                className="
                  w-full
                  border
                  rounded-lg
                  p-3
                "
              />

              <ErrorMessage
                name="email"
                component="div"
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              />

            </div>

            <div className="mb-6">

              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >
                Password
              </label>

              <Field
                type="password"
                name="password"
                className="
                  w-full
                  border
                  rounded-lg
                  p-3
                "
              />

              <ErrorMessage
                name="password"
                component="div"
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              />

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-lg
              "
            >
              {isSubmitting
                ? "Signing In..."
                : "Login"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}