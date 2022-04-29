import { Stack } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineAreaChart, AiOutlineLineChart, AiOutlineBarChart } from "react-icons/ai";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { useSession } from "next-auth/react";

export function SidebarNav() {
  const { data: session } = useSession();

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="MENU">
        <NavLink href="/" icon={RiDashboardLine}>Main</NavLink>
      </NavSection>
      {session && (
        <NavSection title="DASHBOARDS">
          <NavLink href="/dashboards/area" icon={AiOutlineAreaChart}>Area</NavLink>
          <NavLink href="/dashboards/line" icon={AiOutlineLineChart}>Line</NavLink>
          <NavLink href="/dashboards/column" icon={AiOutlineBarChart}>Column</NavLink>
        </NavSection>
      )}
    </Stack>
  );
}