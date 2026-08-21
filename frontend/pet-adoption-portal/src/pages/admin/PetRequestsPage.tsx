import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";
import { getRequests } from "../../api/pets.api";
import type { AdoptionRequest } from "../../types/adoption";
import { deleteRequest } from "../../api/adoptions.api";

export default function PetRequestsPage() {

  const { tag } = useParams();

  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    loadData();

  }, [page, pageSize]);

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

      if (!tag) return;

      await loadData();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete request."
      );

    }
  };

  const loadData =
    async () => {

      if (!tag) return;

      console.log(tag);

      const response = await getRequests(tag);

      setRequests(
        response.data.content
      );
      setTotalPages(response.data.totalPages);

      if (page >= response.data.totalPages) {
        setPage(0);
      }
    };

  const handlePageSizeChange = (size: number) => {
    setPage(0);
    setPageSize(size);
  };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Requests For {tag}
      </h1>

      <div className="space-y-4">

        {requests.length === 0 && (

          <div
            className="
              bg-white
              shadow
              rounded-xl
              p-6
            "
          >
            No requests found.
          </div>

        )}

        {requests.map(
          request => (

            <div
              key={request.id}
              className="
                bg-white
                rounded-xl
                shadow
                p-5
                flex
                justify-between
              "
            >
              <div>
                <h2
                className="
                  text-xl
                  font-bold
                "
              >
                {
                  request.applicantEmail
                }
              </h2>

              <p
                className="
                  text-slate-500
                "
              >
                {request.status}
              </p>

              <p
                className="
                  text-sm
                  text-slate-400
                "
              >
                {
                  new Date(
                    request.requestedAt
                  ).toLocaleString()
                }
              </p>
              </div>

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

            </div>

          )
        )}

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