import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import cm from "@/public/images/cm.jpg";
import WorkLocationTrends from "./work-location-trends";

export default function EmployeesStats() {
  const totlalEmployees: number = 100;
  const employeesPresent: number = 80;
  const employeesPresentPercentage: number =
    (employeesPresent / totlalEmployees) * 100;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card1 totlalEmployees={totlalEmployees} />
        <Card2
          employeesPresentPercentage={employeesPresentPercentage}
          employeesPresent={employeesPresent}
        />
        <Card3 />
      </div>
      <Card4 />
    </>
  );
}

const Card1 = ({ totlalEmployees }: { totlalEmployees: number }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Total employees</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex gap-2">
          <UserIcon />
          <div className="text-5xl font-bold">{totlalEmployees}</div>
        </div>
        <div>
          <Button size="xs" asChild>
            <Link href="/dashboard/employees">view all</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Card2 = ({
  employeesPresentPercentage,
  employeesPresent,
}: {
  employeesPresentPercentage: number;
  employeesPresent: number;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Employees present</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {employeesPresentPercentage > 75 ? (
            <UserCheck2Icon />
          ) : (
            <UserRoundXIcon />
          )}

          <div className="text-5xl font-bold">{employeesPresent}</div>
        </div>
      </CardContent>
      <CardFooter>
        {employeesPresentPercentage > 75 ? (
          <span className="text-xs text-green-500 flex gap-1 items-center">
            <BadgeCheckIcon />
            {employeesPresentPercentage}% of employees are present
          </span>
        ) : (
          <span className="text-xs text-red-500 flex gap-1 items-center">
            <AlertTriangleIcon />
            only {employeesPresentPercentage}% of employees are present
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

const Card3 = () => {
  return (
    <Card className="border-pink-500 flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Employee of the month</CardTitle>
      </CardHeader>
      <CardContent className=" flex gap-2 items-center">
        <Avatar>
          <Image src={cm} alt="Employees of the month avatar" />
          <AvatarFallback>NC</AvatarFallback>
        </Avatar>
        <span className="text-2xl">NotCis!</span>
      </CardContent>
      <CardFooter className="flex gap-2 items-center text-xs text-muted-foreground mt-auto">
        <PartyPopperIcon className="text-pink-500" />
        <span>Congratulations, NotCis</span>
      </CardFooter>
    </Card>
  );
};

const Card4 = () => {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <LaptopIcon />
          <span>Employee work location trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent className=" pl-0">
        <WorkLocationTrends />
      </CardContent>
    </Card>
  );
};
