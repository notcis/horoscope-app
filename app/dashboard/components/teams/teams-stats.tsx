import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { teamLeaders } from "@/data-mock/teamLeaders";
import {
  ListChecksIcon,
  PieChartIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TeamDistributionChart from "./team-distribution-chart";
import SupportTicketsResolved from "./support-tickets-resolved";

export default function TeamsStats() {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
      <Card4 />
    </>
  );
}

const Card1 = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Total teams</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex gap-2">
          <UsersIcon />
          <div className="text-5xl font-bold">8</div>
        </div>
        <div>
          <Button size="xs" asChild>
            <Link href="/dashboard/teams">view all</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Card2 = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex justify-between items-center">
          <span>Team leaders</span>
          <StarIcon className=" text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {teamLeaders.map((teamleader) => (
          <TooltipProvider
            key={`${teamleader.firstName}${teamleader.lastName}`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar>
                  {!!teamleader.avatar && (
                    <Image
                      src={teamleader.avatar}
                      alt={`${teamleader.firstName} ${teamleader.lastName} avatar`}
                    />
                  )}
                  <AvatarFallback>
                    {teamleader.firstName[0]}
                    {teamleader.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                {teamleader.firstName} {teamleader.lastName}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </CardContent>
    </Card>
  );
};

const Card3 = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex justify-between items-center">
          <span>Team distribution</span>
          <PieChartIcon />
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <TeamDistributionChart />
      </CardContent>
    </Card>
  );
};

const Card4 = () => {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ListChecksIcon />
          <span>Support tickets resolved</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <SupportTicketsResolved />
      </CardContent>
    </Card>
  );
};
