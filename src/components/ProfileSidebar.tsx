"use client";

import * as React from "react";

import { Inter, Work_Sans } from "next/font/google";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { profileSidebarData } from "@/lib/config/profile-sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// TODO: get the fonts from the general theme
const inter = Inter({ subsets: ["latin"] });
const workSans = Work_Sans({ style: ["normal", "italic"], subsets: ["latin"] });

export default function ProfileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
    undefined
  );
  const [width, setWidth] = React.useState(0);
  const [sidebarWidth, setSidebarWidth] = React.useState(320);

  const currentPath = usePathname();
  const router = useRouter();

  React.useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  React.useEffect(() => {
    setSidebarWidth(width < 700 ? 260 : 320);
  }, [width]);

  React.useEffect(() => {
    const path = profileSidebarData.find(
      (sidebarItem) => sidebarItem.path === currentPath
    );
    if (path) {
      setSelectedIndex(profileSidebarData.indexOf(path));
    } else {
      setSelectedIndex(undefined);
    }
  }, [currentPath]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleListItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault();
    router.push(path);
  };

  const user = (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
          className={inter.className}
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
          className={workSans.className}
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
    </div>
  );

  const drawer = (
    <div>
      <div
        style={{
          paddingLeft: "40px",
          paddingTop: "37.6px",
          paddingBottom: "32px",
        }}
      >
        {user}
      </div>
      <Divider />
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
                className={workSans.className}
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
    </div>
  );

  const sidebarMobile = (
    <div
      style={{
        padding: "24px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "46px",
        }}
      >
        <Image
          src={'/icons/cross.svg'}
          alt="Close Sidebar Icon"
          width={10}
          height={10}
          className=""
          onClick={handleDrawerToggle}
        />
      </div>
      <div style={{ padding: "0px 8px" }}>
        <List disablePadding>
          {profileSidebarData.map((sidebarItem, index) => (
            <ListItem
              key={sidebarItem.id}
              disablePadding
              sx={{ marginBottom: "36px" }}
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
                  className={workSans.className}
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
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* TODO: Use Iconbutton to show sidebar on mobile view 
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", mr: 2, display: { sm: "none" } }}
          >
            <Image
              src={HamburgerMenu}
              alt="Open Sidebar Icon"
              width={15.37}
              height={12.3}
            />
          </IconButton>
        </Toolbar>*/}
      <Box
        component="nav"
        sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
        aria-label="profile options"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarWidth,
            },
          }}
        >
          {sidebarMobile}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarWidth,
              top: { xs: 0, sm: "120px" }, // 120px is the height of the header TODO: change to theme value
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 3, md: "52px" },
          px: { xs: "20px", md: "60px" },
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
