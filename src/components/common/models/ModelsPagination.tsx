import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { useSetOffset } from "@/states/useSetOffset";
import { useRowPage } from "@/states/useRowPage";

interface ModelsPaginationProps {
  total: number | undefined;
  nextOffset: string | undefined;
}

export const ModelsPagination: FC<ModelsPaginationProps> = ({
  total = 0,
  nextOffset,
}) => {
  const [row, setRow] = useRowPage((state) => [state.row, state.setRow]);
  const [offsets, addOffset, removeLastOffset, resetOffset] = useSetOffset(
    (state) => [
      state.offsets,
      state.addOffset,
      state.removeLastOffset,
      state.resetOffset,
    ]
  );

  const totalPage = Math.ceil(total / row);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {total} total models.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${row}`}
            onValueChange={(value) => setRow(parseInt(value, 10))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {offsets.length + 1} of {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={offsets.length === 0}
            onClick={resetOffset}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={offsets.length === 0}
            onClick={removeLastOffset}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={nextOffset === "" || offsets.length + 1 === totalPage}
            onClick={() =>
              addOffset(typeof nextOffset === "string" ? nextOffset : "")
            }
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
