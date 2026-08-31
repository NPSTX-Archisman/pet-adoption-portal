import {
  useEffect,
  useState,
} from "react";

import { getPets } from "../../api/pets.api";
import { useAuth } from "../../context/AuthContext";
import PetCard from "../../components/pets/PetCard";

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
          gap-4
        "
      >
        {activeTab === "ACTIVE" && unadoptedPets.map((pet) => (
          
          <PetCard pet={pet} role={role} />
        ))} 
        {activeTab === "ADOPTED" && adoptedPets.map((pet) => (
          <PetCard pet={pet} role={role} />
        ))}
      </div>

    </div>

  </div>
);
}