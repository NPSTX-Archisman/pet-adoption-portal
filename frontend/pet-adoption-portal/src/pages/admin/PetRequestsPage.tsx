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

  useEffect(() => {

    loadData();

  }, []);

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

      const response =
        await getRequests(tag);

      setRequests(
        response.data
      );
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

    </div>

  );
}