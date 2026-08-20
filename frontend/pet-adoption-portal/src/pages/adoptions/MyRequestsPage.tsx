import { useEffect, useState } from "react";
import { getMyRequests, createRequest, } from "../../api/adoptions.api";
import { getPetByTag, } from "../../api/pets.api";
import type { AdoptionRequest } from "../../types/adoption";
import type { Pet } from "../../types/pet";


export default function MyRequestsPage() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [petTag, setPetTag] = useState("");

  const [searchedPet, setSearchedPet] = useState<Pet | null>(null);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const loadRequests = async () => {
    try {
      const response = await getMyRequests(page, pageSize);
      setRequests(response.data.content);
      setTotalPages(response.data.totalPages);

      if (page >= response.data.totalPages) {
        setPage(0);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handlePageSizeChange = (size: number) => {
    setPage(0);
    setPageSize(size);
  };

  useEffect(() => {
    loadRequests();
  }, [page, pageSize]);

  const handleSearchPet = async () => {
    try {
      setLoading(true);

      const response = await getPetByTag(petTag);
      setSearchedPet(response.data);
    } catch (error) {
      console.error(error);
      alert("Pet not found.");
      setSearchedPet(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApply =
    async () => {
      if (!searchedPet) {
        return;
      }

      try {
        await createRequest(searchedPet.tag);

        alert("Request submitted successfully.");
        setShowModal(false);
        setPetTag("");
        setSearchedPet(null);
        loadRequests();
      } catch (error) {
        console.error(error);
        alert("Failed to create request.");
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          My Adoption Requests
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-lg
            shadow
          "
        >
          + New Request
        </button>
      </div>

      {/* REQUEST LIST */}

      <div className="grid gap-4">

        {requests.length === 0 && (
          <div
            className="
              bg-white
              shadow
              rounded-xl
              p-6
              text-slate-500
            "
          >
            You have not created any adoption requests yet.
          </div>
        )}

        {requests.map(
          (request) => {

            const badgeColor = request.status === "APPROVED" ?
              "bg-green-100 text-green-700" : request.status === "REJECTED" ?
                "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";

            return (
              <div
                key={request.id}
                className="
                  bg-white
                  shadow-md
                  rounded-xl
                  p-5
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <h2
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    {request.petName}: {request.petTag}
                  </h2>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
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
                    font-semibold
                    ${badgeColor}
                  `}
                >
                  {request.status}
                </span>
              </div>
            );
          }
        )}

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

      {/* MODAL */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-center
            items-center
            z-50
          "
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-xl
              p-6
              w-[550px]
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              New Adoption Request
            </h2>
            <input
              type="text"
              placeholder="Enter Pet Tag"
              value={petTag}
              onChange={(e) => setPetTag(e.target.value)}
              className="
                border
                rounded-lg
                w-full
                p-3
              "
            />
            <button
              onClick={handleSearchPet}
              disabled={loading}
              className="
                mt-4
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Search Pet
            </button>

            {/* Pet Preview */}

            {searchedPet && (
              <div
                className="
                  mt-6
                  border
                  rounded-xl
                  overflow-hidden
                "
              >
                <div className="p-4">
                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {searchedPet.name}
                  </h3>
                  <p>
                    Species: {searchedPet.species}
                  </p>

                  <p>
                    Age: {searchedPet.age}
                  </p>
                  <p>
                    Status:
                    <span
                      className={searchedPet.status === "AVAILABLE"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                      }
                    >
                      {searchedPet.status}
                    </span>
                  </p>

                  {searchedPet.status !== "ADOPTED" ?
                    (<button onClick={handleApply}
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
                    >
                      Apply For Adoption
                    </button>) :
                    (<div className="mt-4 text-red-600 font-semibold">
                      This pet is not available for adoption.
                    </div>)}

                </div>

              </div>
            )}

            <div
              className="
              flex
              justify-end
              mt-6
            "
            >
              <button
                onClick={() => {
                  setShowModal(false);

                  setPetTag("");

                  setSearchedPet(
                    null
                  );
                }}
                className="
                bg-slate-200
                hover:bg-slate-300
                px-4
                py-2
                rounded-lg
              "
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}