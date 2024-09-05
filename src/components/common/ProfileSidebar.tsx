"use client";

import { useIsMobile } from "@/hooks";
import { profileSidebarData } from "@/lib/config/profile-sidebar";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BaseSidebar } from "../ui";

type Props = {
  open: boolean;
};

export const ProfileSidebar = ({ open }: Props) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const currentPath = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    const path = profileSidebarData.find(
      (sidebarItem) => sidebarItem.path === currentPath
    );
    if (path) {
      setSelectedIndex(profileSidebarData.indexOf(path));
    } else {
      setSelectedIndex(undefined);
    }
  }, [currentPath]);

  const handleListItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault();
    router.push(path);
  };

  const onClose = () => {
    // TODO: handle close sidebar
  };

  const user = (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Avatar
        alt="Remy Sharp"
        src="/images/avatar.png"
        sx={{ width: 64, height: 64 }}
      />
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          minHeight: "36px",
        }}
        disableGutters
        variant="dense"
      >
        <Typography
          paragraph
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            margin: 0,
            lineHeight: "18px",
            color: "#98A2B3",
          }}
        >
          Welcome
        </Typography>
        <Typography
          paragraph
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            margin: 0,
            lineHeight: "18.77px",
          }}
        >
          Jane Meldrum
        </Typography>
      </Toolbar>
    </Box>
  );

  const Content = () => {
    return (
      <Box>
        {!isMobile && (
          <>
            <Box
              style={{
                paddingLeft: "40px",
                paddingTop: "37.6px",
                paddingBottom: "32px",
              }}
            >
              {user}
            </Box>
            <Divider />
          </>
        )}
        <List
          disablePadding
          sx={{
            paddingLeft: "40px",
            paddingTop: "32px",
            paddingRight: "40px",
          }}
        >
          {isMobile && (
            <Box
              sx={{
                width: "100%",
                justifyContent: "flex-end",
                display: "flex",
                marginBottom: "14px",
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  display: { md: "none" },
                  marginLeft: "auto",
                  marginRight: "0px",
                }}
              >
                <Image
                  src={"/icons/cross.svg"}
                  alt="close"
                  width={20}
                  height={20}
                />
              </IconButton>
            </Box>
          )}
          {profileSidebarData.map((sidebarItem, index) => (
            <ListItem
              key={sidebarItem.id}
              disablePadding
              sx={{ marginBottom: "36px" }}
              onClick={sidebarItem.onClick}
            >
              <ListItemButton
                disableGutters
                sx={{
                  gap: "15px",
                  color: "#000",
                  transition: "all 0.3s",
                  "&.Mui-selected": {
                    color: "#FE645E",
                  },
                  "&:hover": {
                    paddingLeft: "10px",
                  },
                }}
                selected={index === selectedIndex}
                onClick={(e) => handleListItemClick(e, sidebarItem.path)}
              >
                <ListItemIcon sx={{ minWidth: 20 }}>
                  <sidebarItem.icon
                    size={20}
                    color={index === selectedIndex ? "#FE645E" : "#6e7378"}
                  />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={sidebarItem.name}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    lineHeight: "18.77px",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <>
      <BaseSidebar
        isMobile={isMobile}
        open={!isMobile}
        containerStyle={{ padding: "24px 0px" }}
      >
        <Content />
      </BaseSidebar>
    </>
  );
};
