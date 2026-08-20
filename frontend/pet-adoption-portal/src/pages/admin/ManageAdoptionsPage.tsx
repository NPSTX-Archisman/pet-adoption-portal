import { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  deleteRequest,
  getAllRequests,
  updateRequestStatus,
} from "../../api/adoptions.api";

import {
  UpdateStatusSchema,
} from "../../schemas/adoption.schema";
import type { AdoptionRequest } from "../../types/adoption";


export default function ManageAdoptionsPage() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const loadRequests = async () => {
    try {
      const response = await getAllRequests(page, pageSize);
      setRequests(response.data.content);
      setTotalPages(response.data.totalPages);

      if (page >= response.data.totalPages) {
        setPage(0);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRequest =
    async (
      requestId: number
    ) => {
  
      const confirmed =
        window.confirm(
          "Delete this adoption request?"
        );
  
      if (!confirmed) {
        return;
      }
  
      try {
  
        await deleteRequest(
          requestId
        );

        await loadRequests();
  
      } catch (error) {
  
        console.error(error);
  
        alert(
          "Failed to delete request."
        );
  
      }
  };

  const handlePageSizeChange = (size: number) => {
    setPage(0);
    setPageSize(size);
  };

  useEffect(() => {
    loadRequests();
  }, [page, pageSize]);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Adoption Requests
      </h1>

      {requests.length === 0 && (
        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
            text-slate-500
          "
        >
          No adoption requests found.
        </div>
      )}

      <div className="space-y-5">

        {requests.map((request) => (

          <div
            key={request.id}
            className="
              bg-white
              rounded-2xl
              shadow-md
              p-6
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                justify-between
                items-start
                mb-5
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {request.petName}: {request.petTag}
                </h2>

                <p
                  className="
                    text-slate-500
                  "
                >
                  Applicant: {request.applicantName}
                </p>

                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-1
                  "
                >
                  Requested:
                  {" "}
                  {new Date(
                    request.requestedAt
                  ).toLocaleString()}
                </p>

              </div>

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium

                  ${
                    request.status ===
                    "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : request.status ===
                        "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : request.status ===
                        "PAYMENT_PENDING"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {request.status}
              </span>

            </div>

            {/* STATUS FORM */}

            <Formik
              initialValues={{
                status:
                  request.status,
              }}
              validationSchema={
                toFormikValidationSchema(
                  UpdateStatusSchema
                )
              }
              enableReinitialize
              onSubmit={async (
                values,
                {
                  setSubmitting,
                }
              ) => {
                try {

                  await updateRequestStatus(
                    request.id,
                    values.status
                  );

                  await loadRequests();

                } catch (error) {

                  console.error(error);

                  alert(
                    "Failed to update status."
                  );

                } finally {

                  setSubmitting(false);

                }
              }}
            >

              {({
                isSubmitting,
              }) => (
                <>

                <Form
                  className="
                    flex
                    flex-col
                    md:flex-row
                    gap-4
                  "
                >

                  <Field
                    as="select"
                    name="status"
                    className="
                      border
                      rounded-lg
                      p-3
                      min-w-[250px]
                    "
                  >
                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="CHECKIN">
                      CHECKIN
                    </option>

                    <option value="PAYMENT_PENDING">
                      PAYMENT_PENDING
                    </option>

                    <option value="APPROVED">
                      APPROVED
                    </option>

                    <option value="REJECTED">
                      REJECTED
                    </option>
                  </Field>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-6
                      py-3
                      rounded-lg
                      font-medium
                    "
                  >
                    {
                      isSubmitting
                        ? "Updating..."
                        : "Update Status"
                    }
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteRequest(
                        request.id
                      )
                    }
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-6
                      py-3
                      rounded-lg
                      font-medium
                    "
                  >
                    Delete Request
                  </button>

                </Form>
              </>

              )}

            </Formik>

          </div>

        ))}

      </div>

      <div
        className="
          flex
          justify-center
          items-center
          gap-4
          mt-8
        "
      >

        <button
          disabled={page === 0}
          onClick={() =>
            setPage(
              current =>
                current - 1
            )
          }
          className="
            bg-slate-700
            text-white
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <span>
          Page {page + 1}
          {" / "}
          {totalPages}
        </span>
        <input
          type="number"
          min={1}
          max={100}
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="
            w-20
            border
            rounded-lg
            px-3
            py-2
          "
        />

        <button
          disabled={
            page >= totalPages - 1
          }
          onClick={() =>
            setPage(
              current =>
                current + 1
            )
          }
          className="
            bg-slate-700
            text-white
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Next
        </button>

      </div>

    </div>
  );
}