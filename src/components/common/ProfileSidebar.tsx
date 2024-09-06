"use client";
import { useIsMobile } from "@/hooks";
import { profileSidebarData } from "@/lib/config/profile-sidebar";
import {
  Avatar,
  Box,
  Button,
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
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BaseSidebar } from "../ui";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export const ProfileSidebar = ({ open, onClose }: Props) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const currentPath = usePathname();
  const isMobile = useIsMobile();
  const { data } = useSession();
  const image = data?.user?.image;
  const firstName = data?.user?.firstName;
  const lastName = data?.user?.lastName;
  const username = data?.user?.username;

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

  const user = (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Box
        sx={{
          width: "64px",
          height: "64px",
          border: "1px solid #fff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={(firstName || username || " ")[0].toUpperCase()}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Avatar
            src="/"
            alt={(firstName || username || " ")[0].toUpperCase()}
            sx={{
              width: 1,
              height: 1,
              bgcolor: "primary.main",
              color: "#fff",
            }}
          />
        )}
      </Box>
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
        {firstName && lastName && (
          <Typography>
            <Typography component="span">{firstName}</Typography>{" "}
            <Typography component="span">{lastName}</Typography>
          </Typography>
        )}
        {!(firstName && lastName) && <Typography>{username}</Typography>}
      </Toolbar>
    </Box>
  );

  const Content = () => {
    return (
      <Box>
        {isMobile && (
          <Box
            sx={{
              width: "100%",
              justifyContent: "flex-end",
              display: "flex",
              position: "absolute",
              top: "16px",
              right: "28px",
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
        {data ? (
          <>
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
            <List
              disablePadding
              sx={{
                paddingLeft: "40px",
                paddingTop: "32px",
                paddingRight: "40px",
              }}
            >
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
          </>
        ) : (
          <Box sx={{ marginTop: "100px", paddingX: "20px" }}>
            <Link
              href="/auth/sign-in"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  height: "48px",
                  typography: {
                    textTransform: "none",
                    fontWeight: "700",
                  },
                }}
                variant="outlined"
                color="primary"
              >
                Sign in
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      <BaseSidebar
        isMobile={isMobile}
        open={open}
        containerStyle={{ padding: "24px 0px" }}
        onClose={onClose}
      >
        <Content />
      </BaseSidebar>
    </>
  );
};
