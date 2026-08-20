import { z } from "zod";

export const UpdateStatusSchema =
  z.object({
    status: z.enum([
      "PENDING",
      "CHECKIN",
      "PAYMENT_PENDING",
      "APPROVED",
      "REJECTED",
    ]),
  });