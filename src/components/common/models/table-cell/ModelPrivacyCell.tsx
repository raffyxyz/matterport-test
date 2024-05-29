import { FC } from "react";
import { client } from "@/gql-client";
import { updateModelPrivacy } from "@/lib/graphql/query-model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { LoaderCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useQueryParam } from "@/states/useQueryParam";
import { UpdatePrivacyResponse } from "@/types/update-privacy-types";

interface ModelPrivacyCellProps {
  currentStatus: "active" | "inactive" | string;
  currentPrivacy: "public" | "private";
  currentId: string;
}

export const ModelPrivacyCell: FC<ModelPrivacyCellProps> = ({
  currentStatus,
  currentPrivacy,
  currentId,
}) => {
  const query = useQueryParam((state) => state.query);

  const queryClient = useQueryClient();

  const modelMutation = useMutation({
    mutationFn: async (args: {
      id: string;
      privacy: "public" | "private" | string;
    }) =>
      await client.request<UpdatePrivacyResponse>(updateModelPrivacy, {
        modelId: args.id,
        visibility: args.privacy,
      }),
    onError: () => {
      console.error("Error in updating privacy.");
    },
    onSettled: async (data: UpdatePrivacyResponse | undefined) => {
      if (data?.errors) {
        toast.error(data?.errors[0]?.message);
      }
    },
    onSuccess: async () => {
      console.log("Code goes here!");
      await queryClient.invalidateQueries({
        queryKey: ["models", query.offset, query.pageSize],
        exact: true,
        refetchType: "all",
        stale: true,
      });

      toast.success("Privacy updated successfully.");
      console.log("Code exited here!");
    },
  });

  //   TODO: Need improvements on invalidating data.
  function updatePrivacyHandler(value: "public" | "private") {
    if (currentStatus !== "inactive") {
      if (currentPrivacy === value) {
        toast.error("Can't update model with the same privacy value.");
      } else {
        modelMutation.mutate({ id: currentId, privacy: value });
      }
    } else {
      toast.error("Can't update a model privacy with an inactive status.");
    }
  }

  return (
    <div className={cn("flex items-center space-x-2")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{currentPrivacy}</span>
            {modelMutation.isPending ? (
              <LoaderCircle className="ml-2 w-4 h-4 text-gray-500 animate-spin" />
            ) : (
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className={cn(
              currentPrivacy === "public"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            )}
            onClick={() => updatePrivacyHandler("public")}
          >
            <PersonIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Public
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              currentPrivacy === "private"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            )}
            onClick={() => updatePrivacyHandler("private")}
          >
            <LockClosedIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Private
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
