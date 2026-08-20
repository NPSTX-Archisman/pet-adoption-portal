import api from "./axios";

export const getMyRequests = (
  page:number = 0,
  pageSize: number = 5
) =>
  api.get(`/adoptions/my?page=${page}&pageSize=${pageSize}`);

export const createRequest = (petTag: string) =>
  api.post("/adoptions/request", {
    petTag,
  });

export const getAllRequests = (
  page:number = 0,
  pageSize: number = 5
) => api.get(`/adoptions?page=${page}&pageSize=${pageSize}`)

export const updateRequestStatus = (id: number, status: string) => 
  api.patch(`/adoptions/${id}/status`, {
    "status": status
  });

export const deleteRequest = (id: number) => 
  api.delete(`/adoptions/${id}`);