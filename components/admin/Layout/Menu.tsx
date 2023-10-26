import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Collapse, ListItem, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Layers, BarChart, Person } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DataSaverOff from "@mui/icons-material/DataSaverOff";
import MarkunreadMailbox from "@mui/icons-material/MarkunreadMailbox";
import ContactMail from "@mui/icons-material/ContactMail";
import Download from "@mui/icons-material/Download";
import Outbound from "@mui/icons-material/Outbound";
import Newspaper from "@mui/icons-material/Newspaper";
import Map from "@mui/icons-material/Map";
import Image from "next/image";
import { useSelector } from "react-redux";

import ListSubheader from "@mui/material/ListSubheader";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Settings from "@mui/icons-material/Settings";

import { appDispatch, appSelector } from "@/store/hooks";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProps = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProps) {
  const theme = useTheme();
  const router = useRouter();
  const userSelector = useSelector((store: any) => store.admin);
  const [userOpen, setUserOpen] = React.useState<boolean>(false);
  const [bannerOpen, setBannerOpen] = React.useState<boolean>(false);
  const [saddleOpen, setsaddleOpen] = React.useState<boolean>(false);
  const [perfectBindingOpen, setperfectbindingOpen] =
    React.useState<boolean>(false);
  const [foldingOpen, setfoldingOpen] = React.useState<boolean>(false);
  const [cuttingOpen, setcuttingOpen] = React.useState<boolean>(false);
  const [coverPaperOpen, setcoverPaperOpen] = React.useState<boolean>(false);
  const [textPaperOpen, settextPaperOpen] = React.useState<boolean>(false);
  const [textPrintingOpen, setPrintingOpen] = React.useState<boolean>(false);
  const [databaseOpen, setdatabaseOpen] = React.useState<boolean>(false);
  const [settingOpen, setsettingOpen] = React.useState<boolean>(false);
  const [contactyqOpen, setContactyqOpen] = React.useState<boolean>(false);
  const [newsOpen, setnewsOpen] = React.useState<boolean>(false);
  const [contactbrOpen, setContactbrOpen] = React.useState<boolean>(false);
  const [contacttohOpen, setContacttohOpen] = React.useState<boolean>(false);
  const [downloadsbrochureOpen, setDownloadsBrochureOpen] = React.useState<boolean>(false);
  const [contactlistOpen, setContacListOpen] = React.useState<boolean>(false);
  const [downloadsmanualsOpen, setDownloadsManualsOpen] = React.useState<boolean>(false);
  const [downoadslistOpen, setDownLoadsListOpen] = React.useState<boolean>(false);

  const [open_menu, setOpen] = React.useState<boolean>(false);

  const dispatch = appDispatch();

  const { data } = appSelector((state) => state.login);

  const handleClick = () => {
    setOpen(!open_menu);
  };

  if (data.data.fullname == "Administrator") {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Stack direction="row" alignItems="center">
            <Image
              width={200}
              height={68}
              unoptimized={true}
              alt="logo"
              src={"/static/images/tohatsu.png"}
            />

            <IconButton onClick={onDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Stack>
        </DrawerHeader>
        <Divider />

        <List>
          <Link
            href="/admin/user"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setUserOpen(!userOpen)}
              className={
                router.pathname === "/admin/user"
                  ? "Mui-selected"
                  : router.pathname === "/admin/user/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/user/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/user/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/news"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setnewsOpen(!newsOpen)}
              className={
                router.pathname === "/admin/news"
                  ? "Mui-selected"
                  : router.pathname === "/admin/news/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/news/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/news/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <Newspaper />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/contact_list"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setContacListOpen(!contactlistOpen)}
              className={
                router.pathname === "/admin/contact_list"
                  ? "Mui-selected"
                  : router.pathname === "/admin/contact_year_req"
                    ? "Mui-selected"
                    : router.pathname === "/admin/contact_year_req/edit"
                      ? "Mui-selected"
                      : router.pathname === "/admin/contact_year_req/add"
                        ? "Mui-selected"
                        : router.pathname === "/admin/contact_year_req/upload"
                          ? "Mui-selected"
                          : router.pathname === "/admin/contact_broc_req"
                            ? "Mui-selected"
                            : router.pathname === "/admin/contact_broc_req/edit"
                              ? "Mui-selected"
                              : router.pathname === "/admin/contact_broc_req/add"
                                ? "Mui-selected"
                                : router.pathname === "/admin/contact_broc_req/upload"
                                  ? "Mui-selected"
                                  : router.pathname === "/admin/contact_toha_req"
                                    ? "Mui-selected"
                                    : router.pathname === "/admin/contact_toha_req/edit"
                                      ? "Mui-selected"
                                      : router.pathname === "/admin/contact_toha_req/add"
                                        ? "Mui-selected"
                                        : router.pathname === "/admin/contact_toha_req/upload"
                                          ? "Mui-selected"
                                          : ""
              }
            >
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/downloads_list"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setDownLoadsListOpen(!downoadslistOpen)}
              className={
                router.pathname === "/admin/downloads_list"
                  ? "Mui-selected"
                  : router.pathname === "/admin/downloads_brochure"
                    ? "Mui-selected"
                    : router.pathname === "/admin/downloads_brochure/edit"
                      ? "Mui-selected"
                      : router.pathname === "/admin/downloads_brochure/add"
                        ? "Mui-selected"
                        : router.pathname === "/admin/downloads_brochure/upload"
                          ? "Mui-selected"
                          : router.pathname === "/admin/downloads_manuals"
                            ? "Mui-selected"
                            : router.pathname === "/admin/downloads_manuals/edit"
                              ? "Mui-selected"
                              : router.pathname === "/admin/downloads_manuals/add"
                                ? "Mui-selected"
                                : router.pathname === "/admin/downloads_manuals/upload"
                                  ? "Mui-selected"
                                  : ""
              }
            >
              <ListItemIcon>
                <Download />
              </ListItemIcon>
              <ListItemText primary="Downloads" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/outboards_category"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setDownLoadsListOpen(!downoadslistOpen)}
              className={
                router.pathname === "/admin/outboards_category"
                  ? "Mui-selected"
                  : router.pathname === "/admin/outboards_category/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/outboards_category/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/outboards_category/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <Outbound />
              </ListItemIcon>
              <ListItemText primary="Outboards Category" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/find_dealer"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setDownLoadsListOpen(!downoadslistOpen)}
              className={
                router.pathname === "/admin/find_dealer"
                  ? "Mui-selected"
                  : router.pathname === "/admin/find_dealer/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/find_dealer/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/find_dealer/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <Map />
              </ListItemIcon>
              <ListItemText primary="Find Dealer" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    );
  }
}
