import httpClient from "./httpClient";
import { Enquiry } from "../types/enquery";

export const getAllEnquiries = async (
  page: number,
  size: number
): Promise<Enquiry[]> => {

  const response = await httpClient.get(
    `/admin/enqueryList?page=${page}&size=${size}`
  );

  return response.data.data.content;
};