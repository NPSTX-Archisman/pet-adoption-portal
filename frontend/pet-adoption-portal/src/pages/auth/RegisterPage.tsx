import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { RegisterSchema } from "../../schemas/auth.schema";
import { register } from "../../api/auth.api";

export default function RegisterPage() {

  const navigate = useNavigate();

  return (
    <div className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-slate-100
      ">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(RegisterSchema)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register(values.fullName, values.email, values.password);
            alert("User successfully registered")
            navigate("/login");
          } catch {
            alert("Cannot register this user! Email already exists.");
          } finally {
            setSubmitting(false);
          }
        }}
      >

        {({ isSubmitting, }) => (
          <Form className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">
            <h1 className=" text-3xl font-bold mb-6">Register</h1>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Full Name</label>
              <Field name="fullName" className="w-full border rounded-lg p-3" />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1"/>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <Field name="email" className="w-full border rounded-lg p-3" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Password</label>
              <Field name="password" type="password" className="w-full border rounded-lg p-3" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
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
                ? "Registering..."
                : "Register"}
            </button>

          </Form>
        )}

      </Formik>
    </div>
  );
}