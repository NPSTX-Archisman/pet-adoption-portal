import api from "./axios";

export const getPets = (
  page = 0
) =>
  api.get(`/pets?page=${page}`);

export const getPet = (
  tag: string
) =>
  api.get(`/pets/${tag}`);

export const createPet = (
  payload: unknown
) =>
  api.post("/pets/add", payload);

export const getPetByTag = (
  tag: string
) =>
  api.get(`/pets/${tag}`);

export const getRequests = (
  tag: string
) =>
  api.get(`/pets/${tag}/adoptions`);


export const updatePetByTag = (tag: string, payload: unknown) => (
  api.patch(`/pets/${tag}`, payload)
);

export const deletePetByTag = (tag: string) => {
  api.delete(`/pets/${tag}`)
}