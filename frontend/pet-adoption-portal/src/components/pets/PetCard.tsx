import { Link } from "react-router-dom";
import type { Pet } from "../../types/pet";

export default function PetCard({pet, role}: {pet: Pet, role: string | null}) {
    return (
        <div
            key={pet.tag}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-md
              hover:shadow-xl
              flex
              flex-col
              h-full
              transition
              duration-300
              p-4
              flex-1
            "
          >
            <div className="h-64 w-full overflow-hidden">
              <img src={pet.imageUrl} alt={pet.name} className="h-full w-full" />
            </div>


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
    );
};