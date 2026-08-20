import {
  useEffect,
  useState,
} from "react";

import { getPets } from "../../api/pets.api";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PetsPage() {
  const { role, refreshRole } = useAuth();

  const [pets, setPets] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ADOPTED">("ACTIVE");

  useEffect(() => {

    getPets()
      .then((res) =>
        setPets(
          res.data.content
        )
      );
    
      refreshRole();

  }, []);

  const unadoptedPets = pets.filter(pet =>
      pet.status !== "ADOPTED"
  );

  const adoptedPets = pets.filter(pet =>
        pet.status === "ADOPTED"
  );

  return (
  <div className="min-h-screen bg-slate-100">

    <section
      className="
        bg-gradient-to-r
        from-blue-600
        to-indigo-700
        text-white
        py-16
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-4">
          Find Your Forever Friend
        </h1>

        <p className="text-xl text-blue-100">
          Browse rescued pets waiting for a loving home.
        </p>

      </div>
    </section>

    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-4 mb-8">

      <button
        onClick={() => setActiveTab("ACTIVE")}
        className={`
          px-5
          py-3
          rounded-lg
          font-medium

          ${
            activeTab ===
            "ACTIVE"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }
        `}
      >
        Available Pets
      </button>

      <button
        onClick={() =>
          setActiveTab("ADOPTED")
        }
        className={`
          px-5
          py-3
          rounded-lg
          font-medium

          ${
            activeTab ===
            "ADOPTED"
              ? "bg-green-600 text-white"
              : "bg-white"
          }
        `}
      >
        Adopted Pets
      </button>

    </div>

      <h2 className="text-3xl font-bold mb-8 text-slate-800">
        Find Your Pet
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {activeTab === "ACTIVE" && unadoptedPets.map((pet) => (
          
          <div
            key={pet.tag}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-md
              hover:shadow-xl
              transition
              duration-300
              p-3
            "
          >

            <img src={pet.imageUrl} />

              <h2 className="text-2xl font-bold">
                Name: {pet.name}
              </h2>

              <p className="text-blue-500">
                Tag ID: {pet.tag}
              </p>             

              <p className="text-gray-500">
                Species: {pet.species}
              </p>

              <p className="mt-2">
                Age: {pet.age}
              </p>

              <span
                className={
                  pet.status === "AVAILABLE"
                    ? "inline-block mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    : "inline-block mt-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                }
              >
                {pet.status}
              </span>

                {role === "ADMIN" && (

                  <div className="mt-4 flex gap-2">

                    <Link
                      to={`/admin/pets/${pet.tag}/edit`}
                      className="
                        flex-1
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        text-center
                        py-2
                        rounded-lg
                      "
                    >
                      Edit
                    </Link>

                    <Link
                      to={`/admin/pets/${pet.tag}/requests`}
                      className="
                        flex-1
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        text-center
                        py-2
                        rounded-lg
                      "
                    >
                      Requests
                    </Link>

                  </div>

                )}

            </div>
        ))} 
        {activeTab === "ADOPTED" && adoptedPets.map((pet) => (
          
          <div
            key={pet.tag}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-md
              hover:shadow-xl
              transition
              duration-300
            "
          >

            <img
              src={pet.imageUrl} />
              <h2 className="text-2xl font-bold">
                {pet.name}
              </h2>
                           

              <p className="text-gray-500">
                {pet.species}
              </p>

              <p className="mt-2">
                Age: {pet.age}
              </p>

              <span
                className={
                  pet.status === "AVAILABLE"
                    ? "inline-block mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    : "inline-block mt-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                }
              >
                {pet.status}
              </span>

            </div>
        ))}
      </div>

    </div>

  </div>
);
}