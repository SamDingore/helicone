import { useOrg } from "@/components/layout/organizationContext";
import { getJawnClient } from "@/lib/clients/jawn";
import { useState } from "react";

interface Result {
  success: boolean;
  data?: { id: string };
  error?: { message: string };
}

const deleteProperty = async (key: string, setIsDeleting: (isDeleting: boolean) => void, orgId?: string ): Promise<Result> => {
  try {

    setIsDeleting(true);

    const jawn = getJawnClient(orgId);
    const { data } = await jawn.POST("/v1/deletedproperty/create", {
      body: {
        key,
      },
    });

    if (data?.data) {
      return { success: true, data: { id: data.data } };
    }

    return { success: false, error: { message: data?.error || "Unknown error" } };
  } catch {
    
    return { success: false, error: { message: "Request failed" } };
  } finally {
    setIsDeleting(false);
  }
};

interface deletePropertyHandler {
  deletePropertyHandler: (key: string) => Promise<Result>;
  isDeleting: boolean;
}

export const useDeleteProperty = (): deletePropertyHandler => {
  const orgId = useOrg();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deletePropertyHandler = (key: string) => deleteProperty(key, setIsDeleting, orgId?.currentOrg?.id);

  return {
    deletePropertyHandler,
    isDeleting,
  };
};
