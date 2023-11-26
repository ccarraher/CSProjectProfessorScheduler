import { Box } from "@mui/material";
import { Header } from "./header";
import * as React from "react";
import { SideNav } from "./side-nav";

export const BaseLayout = ({ isAdmin = false, children }: BaseLayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <Header />
      <SideNav isAdmin={isAdmin} />
      {children}
    </Box>
  );
};

interface BaseLayoutProps {
  readonly isAdmin?: boolean;
  readonly children: React.ReactNode;
}
