import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  toFormikValidationSchema,
} from "zod-formik-adapter";

import {
  createPet,
} from "../../api/pets.api";
import { petSchema } from "../../schemas/pet.schema";

export default function AddPetPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Add New Pet
        </h1>

        <p className="text-slate-500 mt-2">
          Register a rescued pet for adoption.
        </p>

      </div>

      <Formik
        initialValues={{
          name: "",
          species: "DOG",
          age: 0
        }}
        validationSchema={toFormikValidationSchema(
          petSchema
        )}
        onSubmit={async (
          values,
          {
            resetForm,
            setSubmitting,
          }
        ) => {
          try {

            await createPet({
              ...values,

              intakeDate:
                new Date()
                  .toISOString()
                  .split("T")[0],
            });

            alert(
              "Pet created successfully!"
            );

            resetForm();

          } catch (error) {

            console.error(error);

            alert(
              "Failed to create pet."
            );

          } finally {

            setSubmitting(false);

          }
        }}
      >

        {({
          values,
          isSubmitting,
          setFieldValue,
        }) => (

          <Form
            className="
              grid
              lg:grid-cols-2
              gap-8
            "
          >

            {/* LEFT PANEL */}

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
              "
            >

              {/* NAME */}

              <div className="mb-5">

                <label
                  className="
                    block
                    mb-2
                    font-medium
                  "
                >
                  Pet Name
                </label>

                <Field
                  name="name"
                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                  "
                />

                <ErrorMessage
                  name="name"
                  component="div"
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                />

              </div>

              {/* SPECIES */}

              <div className="mb-5">

                <label
                  className="
                    block
                    mb-2
                    font-medium
                  "
                >
                  Species
                </label>

                <Field
                  as="select"
                  name="species"
                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                  "
                >

                  <option>DOG</option>
                  <option>CAT</option>
                  <option>BIRD</option>
                  <option>FISH</option>
                  <option>RABBIT</option>
                  <option>GUINEA_PIG</option>
                  <option>HAMSTER</option>
                  <option>REPTILE</option>
                  <option>AMPHIBIAN</option>
                  <option>INSECT</option>

                </Field>

              </div>

              {/* AGE */}

              <div className="mb-5">

                <label
                  className="
                    block
                    mb-2
                    font-medium
                  "
                >
                  Age
                </label>

                <Field
                  name="age"
                >
                  {({
                    field,
                  }: any) => (

                    <input
                      {...field}
                      type="number"
                      min={0}
                      className="
                        w-full
                        border
                        rounded-lg
                        p-3
                      "
                      onChange={(e) =>
                        setFieldValue(
                          "age",
                          Number(
                            e.target.value
                          )
                        )
                      }
                    />

                  )}
                </Field>

                <ErrorMessage
                  name="age"
                  component="div"
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                />

              </div>


              {/* SUBMIT */}

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
                  font-medium
                "
              >
                {isSubmitting
                  ? "Creating..."
                  : "Add Pet"}
              </button>

            </div>

            {/* LIVE PREVIEW */}

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                overflow-hidden
              "
            >
              <div className="p-5">

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {values.name ||
                    "Pet Name"}
                </h2>

                <p
                  className="
                    text-slate-500
                    mt-1
                  "
                >
                  {values.species}
                </p>

                <p className="mt-3">
                  Age: {values.age}
                </p>

                <span
                  className="
                    inline-block
                    mt-4
                    bg-green-100
                    text-green-700
                    px-4
                    py-2
                    rounded-full
                    font-medium
                  "
                >
                  AVAILABLE
                </span>

              </div>

            </div>

          </Form>
        )}
      </Formik>

    </div>
  );
}