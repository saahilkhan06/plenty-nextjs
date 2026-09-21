"use client";

import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getAllEnquiries } from "../../../Service/enquiryService";
import { Enquiry } from "../../../types/enquery";
import Link from "next/link";

export default function EnquiryTable() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [page, setPage] = useState(1);

  const size = 10;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const data = await getAllEnquiries(page - 1, size);
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, [page]);

  return (
    <div className="col-span-12 p-4 mb-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">Enquiries</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-normal text-stone-500">
              <th className="text-start p-1.5">ID</th>
              <th className="text-start p-1.5">Full Name</th>
              <th className="text-start p-1.5">Email</th>
              <th className="text-start p-1.5">Phone</th>
              <th className="text-start p-1.5">Travels</th>
              <th className="text-start p-1.5">URL</th>
              <th className="text-start p-1.5">Message</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((enquiry, index) => (
              <tr
                key={enquiry.id}
                className={index % 2 === 0 ? "bg-stone-100 text-sm" : "text-sm"}
              >
                <td className="p-1.5">{(page - 1) * size + index + 1}</td>

                <td
                  className="p-1.5 max-w-[150px] truncate"
                  title={enquiry.fullName}
                >
                  {enquiry.fullName}
                </td>
                <td className="p-1.5">{enquiry.email}</td>

                <td className="p-1.5">{enquiry.phone}</td>

                <td className="p-1.5">{enquiry.numberOfTravels}</td>

                <td className="p-1.5">
                  <Link
                    href={enquiry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 underline"
                  >
                    {enquiry.url}
                  </Link>
                </td>

                <td
                  className="p-1.5 max-w-[200px] truncate"
                  title={enquiry.message}
                >
                  {enquiry.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <Stack spacing={2} className="mt-5 items-center">
        <Pagination
          count={10}
          page={page}
          onChange={(_, value) => setPage(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
}
