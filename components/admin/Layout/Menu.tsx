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

        {/* <List>
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
        </List> */}

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

        {/* <List>
          <Link
            href="/admin/downloads_brochure"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setDownloadsBrochureOpen(!downloadsbrochureOpen)}
              className={
                router.pathname === "/admin/downloads_brochure"
                  ? "Mui-selected"
                  : router.pathname === "/admin/downloads_brochure/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/downloads_brochure/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/downloads_brochure/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <Download />
              </ListItemIcon>
              <ListItemText primary="Downloads Brochure" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/downloads_manuals"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setDownloadsManualsOpen(!downloadsmanualsOpen)}
              className={
                router.pathname === "/admin/downloads_manuals"
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
              <ListItemText primary="Downloads Manuals" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/contact_year_req"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setContactyqOpen(!contactyqOpen)}
              className={
                router.pathname === "/admin/contact_year_req"
                  ? "Mui-selected"
                  : router.pathname === "/admin/contact_year_req/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/contact_year_req/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/contact_year_req/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary="Contact Year Req" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/contact_broc_req"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setContactbrOpen(!contactbrOpen)}
              className={
                router.pathname === "/admin/contact_broc_req"
                  ? "Mui-selected"
                  : router.pathname === "/admin/contact_broc_req/edit"
                    ? "Mui-selected"
                    : router.pathname === "/admin/contact_broc_req/add"
                      ? "Mui-selected"
                      : router.pathname === "/admin/contact_broc_req/upload"
                        ? "Mui-selected"
                        : ""
              }
            >
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary="Contact Broc Req" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/contact_toha_req"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setContacttohOpen(!contacttohOpen)}
              className={
                router.pathname === "/admin/contact_toha_req"
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
              <ListItemText primary="Contact Toha Req" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/sales_amount_summary"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setdatabaseOpen(!databaseOpen)}
              className={
                router.pathname === "/admin/sales_amount_summary"
                  ? "Mui-selected"
                  : router.pathname === "/admin/sales_summary"
                    ? "Mui-selected"
                    : router.pathname === "/admin/sales_saddle_stitch"
                      ? "Mui-selected"
                      : router.pathname === "/admin/sales_perfect_binding"
                        ? "Mui-selected"
                        : router.pathname === "/admin/sales_folding"
                          ? "Mui-selected"
                          : router.pathname === "/admin/sales_cutting_sheet"
                            ? "Mui-selected"
                            : router.pathname === "/admin/sales_calendar"
                              ? "Mui-selected"
                              : router.pathname === "/admin/sales_paper_bag"
                                ? "Mui-selected"
                                : router.pathname === "/admin/sales_plastic_file"
                                  ? "Mui-selected"
                                  : router.pathname === "/admin/sales_envelope"
                                    ? "Mui-selected"
                                    : ""
              }
            >
              <ListItemIcon>
                <MarkunreadMailbox />
              </ListItemIcon>
              <ListItemText primary="Sales Amount" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
        <Link
          href="/admin/banner"
          style={{ textDecoration: "none", color: "#000000DE" }}
          passHref
        >
          <ListItem
            onClick={() => setBannerOpen(!bannerOpen)}
            className={
              router.pathname === "/admin/banner"
                ? "Mui-selected"
                : router.pathname === "/admin/banner/edit"
                ? "Mui-selected"
                : router.pathname === "/admin/banner/add"
                ? "Mui-selected"
                : ""
            }
          >
            <ListItemIcon>
              <PhotoSizeSelectActualIcon />
            </ListItemIcon>
            <ListItemText primary="Banner" />
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
            onClick={() => setNewsOpen(!newsOpen)}
            className={
              router.pathname === "/admin/news"
                ? "Mui-selected"
                : router.pathname === "/admin/news/edit"
                ? "Mui-selected"
                : router.pathname === "/admin/news/add"
                ? "Mui-selected"
                : ""
            }
          >
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </Link>
      </List>

      <List>
        <Link
          href="/admin/contact"
          style={{ textDecoration: "none", color: "#000000DE" }}
          passHref
        >
          <ListItem
            button
            onClick={() => setUserOpen(!userOpen)}
            className={
              router.pathname === "/admin/contact" ? "Mui-selected" : ""
            }
          >
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
      </List> */}

        {/* <List>
          <Typography
            variant="h6"
            component="h6"
            style={{ marginLeft: "10px", color: "red" }}
          >
            Setting File
          </Typography>
        </List> */}

        {/* <List>
          <Link
            href="/admin/database"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setdatabaseOpen(!databaseOpen)}
              className={
                router.pathname === "/admin/database"
                  ? "Mui-selected"
                  : router.pathname === "/admin/saddle_stitch"
                    ? "Mui-selected"
                    : router.pathname === "/admin/saddle_stitch/edit"
                      ? "Mui-selected"
                      : router.pathname === "/admin/saddle_stitch/add"
                        ? "Mui-selected"
                        : router.pathname === "/admin/saddle_stitch/upload"
                          ? "Mui-selected"
                          : router.pathname === "/admin/perfect_binding"
                            ? "Mui-selected"
                            : router.pathname === "/admin/perfect_binding/edit"
                              ? "Mui-selected"
                              : router.pathname === "/admin/perfect_binding/add"
                                ? "Mui-selected"
                                : router.pathname === "/admin/perfect_binding/upload"
                                  ? "Mui-selected"
                                  : router.pathname === "/admin/folding"
                                    ? "Mui-selected"
                                    : router.pathname === "/admin/folding/edit"
                                      ? "Mui-selected"
                                      : router.pathname === "/admin/folding/add"
                                        ? "Mui-selected"
                                        : router.pathname === "/admin/folding/upload"
                                          ? "Mui-selected"
                                          : router.pathname === "/admin/cutting_sheet"
                                            ? "Mui-selected"
                                            : router.pathname === "/admin/cutting_sheet/edit"
                                              ? "Mui-selected"
                                              : router.pathname === "/admin/cutting_sheet/add"
                                                ? "Mui-selected"
                                                : router.pathname === "/admin/cutting_sheet/upload"
                                                  ? "Mui-selected"
                                                  : router.pathname === "/admin/calendar"
                                                    ? "Mui-selected"
                                                    : router.pathname === "/admin/calendar/edit"
                                                      ? "Mui-selected"
                                                      : router.pathname === "/admin/calendar/add"
                                                        ? "Mui-selected"
                                                        : router.pathname === "/admin/calendar/upload"
                                                          ? "Mui-selected"
                                                          : router.pathname === "/admin/paper_bag"
                                                            ? "Mui-selected"
                                                            : router.pathname === "/admin/paper_bag/edit"
                                                              ? "Mui-selected"
                                                              : router.pathname === "/admin/paper_bag/add"
                                                                ? "Mui-selected"
                                                                : router.pathname === "/admin/paper_bag/upload"
                                                                  ? "Mui-selected"
                                                                  : router.pathname === "/admin/plastic_file"
                                                                    ? "Mui-selected"
                                                                    : router.pathname === "/admin/plastic_file/edit"
                                                                      ? "Mui-selected"
                                                                      : router.pathname === "/admin/plastic_file/add"
                                                                        ? "Mui-selected"
                                                                        : router.pathname === "/admin/plastic_file/upload"
                                                                          ? "Mui-selected"
                                                                          : router.pathname === "/admin/envelope"
                                                                            ? "Mui-selected"
                                                                            : router.pathname === "/admin/envelope/edit"
                                                                              ? "Mui-selected"
                                                                              : router.pathname === "/admin/envelope/add"
                                                                                ? "Mui-selected"
                                                                                : router.pathname === "/admin/envelope/upload"
                                                                                  ? "Mui-selected"
                                                                                  : ""
              }
            >
              <ListItemIcon>
                <DataSaverOff />
              </ListItemIcon>
              <ListItemText primary="Database" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/saddle_stitch"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setsaddleOpen(!saddleOpen)}
              className={
                router.pathname === "/admin/saddle_stitch"
                  ? "Mui-selected"
                  : router.pathname === "/admin/saddle_stitch/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/saddle_stitch/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/saddle_stitch/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <PrintingIcon />
              </ListItemIcon>
              <ListItemText primary="Saddle Stitch" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/perfect_binding"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setperfectbindingOpen(!perfectBindingOpen)}
              className={
                router.pathname === "/admin/perfect_binding"
                  ? "Mui-selected"
                  : router.pathname === "/admin/perfect_binding/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/perfect_binding/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/perfect_binding/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <PrintingIcon />
              </ListItemIcon>
              <ListItemText primary="Perfect Binding" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/folding"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setfoldingOpen(!foldingOpen)}
              className={
                router.pathname === "/admin/folding"
                  ? "Mui-selected"
                  : router.pathname === "/admin/folding/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/folding/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/folding/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <PrintingIcon />
              </ListItemIcon>
              <ListItemText primary="Folding" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/cutting_sheet"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setcuttingOpen(!cuttingOpen)}
              className={
                router.pathname === "/admin/cutting_sheet"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cutting_sheet/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cutting_sheet/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cutting_sheet/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <PrintingIcon />
              </ListItemIcon>
              <ListItemText primary="Cutting Sheet" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/setting_database"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setsettingOpen(!settingOpen)}
              className={
                router.pathname === "/admin/setting_database"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cover_paper"
                    ? "Mui-selected"
                    : router.pathname === "/admin/cover_paper/edit"
                      ? "Mui-selected"
                      : router.pathname === "/admin/cover_paper/add"
                        ? "Mui-selected"
                        : router.pathname === "/admin/cover_paper/upload"
                          ? "Mui-selected"
                          : router.pathname === "/admin/text_paper"
                            ? "Mui-selected"
                            : router.pathname === "/admin/text_paper/edit"
                              ? "Mui-selected"
                              : router.pathname === "/admin/text_paper/add"
                                ? "Mui-selected"
                                : router.pathname === "/admin/text_paper/upload"
                                  ? "Mui-selected"
                                  : router.pathname === "/admin/text_no"
                                    ? "Mui-selected"
                                    : router.pathname === "/admin/text_no/edit"
                                      ? "Mui-selected"
                                      : router.pathname === "/admin/text_no/add"
                                        ? "Mui-selected"
                                        : router.pathname === "/admin/text_no/upload"
                                          ? "Mui-selected"
                                          : router.pathname === "/admin/printing"
                                            ? "Mui-selected"
                                            : router.pathname === "/admin/printing/edit"
                                              ? "Mui-selected"
                                              : router.pathname === "/admin/printing/add"
                                                ? "Mui-selected"
                                                : router.pathname === "/admin/printing/upload"
                                                  ? "Mui-selected"
                                                  : ""
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItem>
          </Link>
        </List> */}

        {/* <List>
          <Link
            href="/admin/cover_paper"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setcoverPaperOpen(!coverPaperOpen)}
              className={
                router.pathname === "/admin/cover_paper"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cover_paper/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cover_paper/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/cover_paper/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Cover Paper" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/text_paper"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => settextPaperOpen(!textPaperOpen)}
              className={
                router.pathname === "/admin/text_paper"
                  ? "Mui-selected"
                  : router.pathname === "/admin/text_paper/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/text_paper/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/text_paper/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Text Paper" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/text_no"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => settextPaperOpen(!textPaperOpen)}
              className={
                router.pathname === "/admin/text_no"
                  ? "Mui-selected"
                  : router.pathname === "/admin/text_no/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/text_no/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/text_no/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Text No" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link
            href="/admin/printing"
            style={{ textDecoration: "none", color: "#000000DE" }}
            passHref
          >
            <ListItem
              button
              onClick={() => setPrintingOpen(!textPrintingOpen)}
              className={
                router.pathname === "/admin/printing"
                  ? "Mui-selected"
                  : router.pathname === "/admin/printing/edit"
                  ? "Mui-selected"
                  : router.pathname === "/admin/printing/add"
                  ? "Mui-selected"
                  : router.pathname === "/admin/printing/upload"
                  ? "Mui-selected"
                  : ""
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Printing" />
            </ListItem>
          </Link>
        </List> */}
      </Drawer>
    );
  }
}
