import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModelPrivacyCell } from "@/components/common/models/table-cell/ModelPrivacyCell";
import { formatDate } from "@/lib/utils";
import { ModelType } from "@/types";

interface ModesTableProps {
  data: ModelType[] | undefined;
}

export const ModelsTable: FC<ModesTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Privacy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((model: ModelType) => (
            <TableRow key={model.id}>
              <TableCell>{model.id}</TableCell>
              <TableCell>{model.name}</TableCell>
              <TableCell>{formatDate(model.upload_date)}</TableCell>
              <TableCell>{model.status}</TableCell>
              <TableCell>
                <ModelPrivacyCell
                  currentStatus={model.status}
                  currentPrivacy={model.privacy}
                  currentId={model.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
