import Layout from "@/components/admin/Layout/Layout";
import withAuth from "@/components/admin/withAuth";
import React, { useRef } from "react";
import Box from "@mui/material/Box";
import { TextField as TextFieldInput } from "formik-material-ui";
import { Field, Form, Formik, FormikProps } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import { appDispatch, appSelector } from "@/store/hooks";
import { uploadUser } from "@/features/admin/user";
import router, { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "cookies-next";
const initialValuesExcel: any = {
  file: "",
};

const showFormExcel = ({ values, setFieldValue }: FormikProps<any>) => {
  return (
    <Form>
      <Card>
        <CardContent sx={{ padding: 4 }}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Database {">"} Paper Bag {">"} Import Excel
          </Typography>
          <Typography gutterBottom variant="h3">
            {/* Upload User by Excel */}
          </Typography>

          {/* <input
            type="file"
            name="file"
            onChange={(e: React.ChangeEvent<any>) => {
              e.preventDefault();
              setFieldValue("file", e.target.files[0]); // for upload
            }}
            accept=".xlsx"
            id="file"
            required
            style={{ padding: "20px 0 0 20px" }}
          /> */}
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                m: 1,
                p: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  border: "1px solid",
                  textAlign: "center",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  fontSize: "0.875rem",
                  fontWeight: "700",
                }}
              >
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "150px",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#A8A8A8",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image="/static/images/uploadPH.jpg"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <span
                        style={{
                          paddingRight: "10px",
                          paddingTop: "20px",
                          float: "left",
                          marginLeft: "10px",
                        }}
                      >
                        File Format:{" "}
                        <a
                          href={`/format/paper_bag/Upload_Paper_Bag.xlsx`}
                          style={{
                            marginLeft: "10px",
                            color: "blue",
                          }}
                        >
                          Download
                        </a>
                      </span>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <span
                        style={{
                          paddingRight: "10px",
                          paddingTop: "20px",
                          float: "left",
                          marginLeft: "10px",
                        }}
                      >
                        Import Excel:{" "}
                      </span>
                      <input
                        type="file"
                        name="file"
                        onChange={(e: React.ChangeEvent<any>) => {
                          e.preventDefault();
                          setFieldValue("file", e.target.files[0]); // for upload
                        }}
                        accept=".xlsx"
                        id="file"
                        required
                        style={{ padding: "20px 0 0 20px" }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </div>

          <br />
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginRight: 1 }}
          >
            Upload
          </Button>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => router.push("/admin/paper_bag")}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Form>
  );
};

function Upload() {
  const dispatch = appDispatch();

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Formik
            validate={(values) => {
              let errors: any = {};
              if (!values.file) errors.file = "Enter Excel";
              return errors;
            }}
            initialValues={initialValuesExcel}
            onSubmit={async (values, { setSubmitting }) => {
              var filename = values.file.name;
              const url = process.env.NEXT_PUBLIC_BASE_URL_API;
              var reader = new FileReader();
              reader.onload = function (event: any) {
                var imagevalue = event.target.result;
                fetch(imagevalue)
                  .then((res) => res.blob())
                  .then(async (blob) => {
                    var formData = new FormData();
                    formData.append("file", blob, filename);
                    var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                    const response: any = await axios.post(
                      `${urlupload}/paper_bag/upload`,
                      formData
                    );
                    if (response.data.status == "success") {
                      Swal.fire(
                        "Success!",
                        "Your paper bag has been uploaded.",
                        "success"
                      ).then(function () {
                        router.push("/admin/paper_bag");
                      });
                    } else {
                      Swal.fire(
                        "Error!",
                        "Please check your excel file.",
                        "error"
                      ).then(function () {
                        return false;
                      });
                    }
                  });
              };
              reader.readAsDataURL(values.file);
              setSubmitting(false);
            }}
          >
            {(props) => showFormExcel(props)}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
}

export default withAuth(Upload);
