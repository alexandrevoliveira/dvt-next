import { Stack } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="MENU">
        <NavLink href="/" icon={RiDashboardLine}>Main</NavLink>
      </NavSection>
    </Stack>
  );
}