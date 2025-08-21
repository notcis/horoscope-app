import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeesStats from "./components/employees/employees-stats";
import TeamsStats from "./components/teams/teams-stats";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  console.log("User Session:", { session });

  return (
    <Tabs>
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employees stats</TabsTrigger>
        <TabsTrigger value="teams">Teams stats</TabsTrigger>
      </TabsList>

      <TabsContent value="employees">
        <EmployeesStats />
      </TabsContent>

      <TabsContent value="teams">
        <TeamsStats />
      </TabsContent>
    </Tabs>
  );
}
