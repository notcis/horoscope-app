import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { employees } from "@/data-mock/employees";
import { setTimeout } from "timers/promises";
import { columns } from "./columns";

export default async function page() {
  await setTimeout(5000);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={employees} columns={columns} />
      </CardContent>
    </Card>
  );
}
