import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Formik,
  Form,
  Field,
} from "formik";

import { toFormikValidationSchema }
  from "zod-formik-adapter";

import {
    deletePetByTag,
  getPetByTag,
  updatePetByTag,
} from "../../api/pets.api";

import {
  UpdatePetSchema,
} from "../../schemas/update-pet.schema";

export default function PetEditPage() {

  const { tag } =
    useParams();

  const navigate =
    useNavigate();

  const [pet, setPet] =
    useState<any>(null);

  useEffect(() => {

    loadPet();

  }, []);

  const loadPet =
    async () => {

      if (!tag) return;

      const response =
        await getPetByTag(tag);

      setPet(
        response.data
      );
    };

  const handleDelete =
    async () => {

      if (!tag) return;

      const confirmed =
        window.confirm(
          "Delete this pet?"
        );

      if (!confirmed) {
        return;
      }

      await deletePetByTag(tag);

      navigate("/");
    };

  if (!pet) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Edit Pet
      </h1>

      <Formik
        initialValues={{
          name:
            pet.name || "",

          breed:
            pet.breed || "",

          age:
            pet.age || 0,

          imageUrl:
            pet.imageUrl || "",

          description:
            pet.description || "",

          weight:
            pet.weight || 0,

          vaccinated:
            pet.isVaccinated,

          neutered:
            pet.isNeutered,
        }}
        enableReinitialize
        validationSchema={
          toFormikValidationSchema(
            UpdatePetSchema
          )
        }
        onSubmit={async (
          values,
          { setSubmitting }
        ) => {

          try {

            await updatePetByTag(
              tag!,
              values
            );

            alert(
              "Pet updated successfully"
            );

          } catch {

            alert(
              "Update failed"
            );

          } finally {

            setSubmitting(
              false
            );

          }
        }}
      >

        {({
          isSubmitting,
          values,
        }) => (

          <Form
            className="
              grid
              lg:grid-cols-2
              gap-8
            "
          >

            {/* FORM */}

            <div
              className="
                bg-white
                shadow
                rounded-xl
                p-6
              "
            >

              <div className="space-y-4">

                <Field
                  name="name"
                  placeholder="Name"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                  "
                />

                <Field
                  name="breed"
                  placeholder="Breed"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                  "
                />

                <Field
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                  "
                />

                <Field
                  name="imageUrl"
                  placeholder="Image URL"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                  "
                />

                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                  "
                />

                <Field
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                  "
                />

                <label className="flex gap-3">

                  <Field
                    type="checkbox"
                    name="vaccinated"
                  />

                  Vaccinated

                </label>

                <label className="flex gap-3">

                  <Field
                    type="checkbox"
                    name="neutered"
                  />

                  Neutered

                </label>

              </div>

              <div className="mt-8 flex gap-3">

                <button
                  type="submit"
                  disabled={
                    isSubmitting
                  }
                  className="
                    flex-1
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-lg
                  "
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={
                    handleDelete
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-6
                    rounded-lg
                  "
                >
                  Delete
                </button>

              </div>

            </div>

            {/* Preview */}

            <div
              className="
                bg-white
                rounded-xl
                shadow
                overflow-hidden
              "
            >
              <img src={values.imageUrl}/>
              

              <div className="p-5">

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {values.name}
                </h2>

                <p>
                  {values.breed}
                </p>

                <p>
                  Age:
                  {" "}
                  {values.age}
                </p>

              </div>

            </div>

          </Form>

        )}

      </Formik>

    </div>

  );
}