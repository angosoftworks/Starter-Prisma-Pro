import { format } from "date-fns";
import { ClientButton } from "./ClientButton";

export const DashboardHeader = ({
  name,
  status,
  lastScan,
}: {
  name: string;
  status: string;
  lastScan: Date;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="px-2 py-1 border rounded text-sm">{status}</span>
          <span className="text-sm text-muted-foreground">
            Dernière analyse : {format(lastScan, "dd/MM/yyyy HH:mm")}
          </span>
        </div>
      </div>

      {/* Client-only action */}
      <ClientButton />
    </div>
  );
};