import Layout from "@/components/admin/Layout/Layout";
import withAuth from "@/components/admin/withAuth";
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { TextField as TextFieldInput } from "formik-material-ui";
import { Field, Form, Formik, FormikProps } from "formik";
import { Button, Card, CardContent, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Editor } from "@tinymce/tinymce-react";
import { productImageURL, getBase64 } from "@/utils/commonUtil";
import axios from "axios";
import Swal from "sweetalert2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { appDispatch, appSelector } from "@/store/hooks";
import { editDownloadsBrochure, getDownloadsBrochureById } from "@/features/admin/downloads_brochure";
import router, { useRouter } from "next/router";
import Image from "next/image";
import { color } from "@mui/system";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [db_status, setDbStatus] = React.useState<String>("Show");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.downloads_brochure);
  const [db_subject, setDbSubject] = React.useState<String>("");
  const [db_file, setDbFile] = React.useState<any>("");
  const [db_category, setDbCategory] = React.useState<String>("Brochure");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/news");
    }
  }

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        // <Image
        //   objectFit="contain"
        //   alt="db_file"
        //   src={values.file_obj}
        //   width={200}
        //   height={100}
        // />
        <div style={{ color: "red" }}>Old File : {db_file}</div>
      );
    } else if (data) {
      if (data.length > 0) {
        return (
          // <Image
          //   objectFit="contain"
          //   alt="db_file"
          //   src={`/upload/downloads_brochure/${data[0].db_file}`}
          //   width={200}
          //   height={100}
          // />
          <div style={{ color: "red" }}>Old File : {db_file}</div>
        );
      }
    }
  };

  React.useEffect(() => {
    dispatch(getDownloadsBrochureById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setDate(dayjs(value.payload[0].db_date));
          setDbSubject(value.payload[0].db_subject);
          setDbFile(value.payload[0].db_file);
          setDbCategory(value.payload[0].db_category);
          setDbStatus(value.payload[0].db_status);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    db_date: date,
    db_subject: db_subject,
    db_file: db_file,
    db_category: db_category,
    db_status: db_status
  };

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              {'Edit > Brochure'}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Post Date *"
                format="YYYY-MM-DD"
                value={dayjs(`${date}`)}
                onChange={(newValue: any) => {
                  setDate(newValue);
                }}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
            <br />
            <br />
            <Field
              fullWidth
              component={TextFieldInput}
              name="db_subject"
              type="text"
              label="Subject * "
              value={db_subject}
              onChange={(e: any) => {
                setDbSubject(e.target.value);
              }}
            />
            <br />
            <br />
            <Box>
              <span style={{ color: "000" }}>
                Thumbnail Image *
              </span>
              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  if (e.target.files[0]) {
                    setFieldValue("file", e.target.files[0]);
                    setFieldValue(
                      "file_obj",
                      URL.createObjectURL(e.target.files[0])
                    );
                  }
                }}
                name="file"
                accept="image/*"
                id="file"
                style={{ padding: "20px 0 0 20px" }}
              />
              <br /><br />
              <div >
                {showPreviewImage(values)}
              </div>
            </Box>
            <br />
            <br />
            <Field
              name="db_category"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Brochure *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Brochure"
                    onChange={(e: any) => {
                      setDbCategory(e.target.value);
                    }}
                    value={db_category}
                    fullWidth
                  >
                    <MenuItem value="Brochure">Brochure</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="db_status"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Status *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    onChange={(e: any) => {
                      setDbStatus(e.target.value);
                    }}
                    value={db_status}
                    fullWidth
                  >
                    <MenuItem value="Show">Show</MenuItem>
                    <MenuItem value="Hide">Hide</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </CardContent>
          <CardActions>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => router.push("/admin/downloads_brochure")}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

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
              // if (!values.news_date) errors.news_date = "Enter Post Date";
              // if (!news_title) errors.news_title = "Enter News Title";
              // if (!values.news_status) errors.news_status = "Enter Status";
              // if (!values.news_detail) errors.news_detail = "Enter News Detail";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              if (db_subject == '') {
                Swal.fire(
                  "Warning!",
                  "Please fill out the information completely.",
                  "info"
                )
                return false;
              }

              const value_date = dayjs(date, "YYYY-MM-DD").toDate();
              let day: any = value_date.getDate();
              let month: any = value_date.getMonth() + 1;
              if (month <= 9) {
                month = "0" + month;
              }
              if (day <= 9) {
                day = "0" + day;
              }
              const year = value_date.getFullYear();
              const db_date = year + "-" + month + "-" + day;
              if (values.file) {
                var filename = values.file.name;
                var reader = new FileReader();
                reader.onload = function (event: any) {
                  var imagevalue = event.target.result;
                  fetch(imagevalue)
                    .then((res) => res.blob())
                    .then(async (blob) => {
                      var formData = new FormData();
                      formData.append("db_date", db_date);
                      formData.append("db_subject", String(db_subject));
                      formData.append("db_category", String(db_category));
                      formData.append("db_status", String(db_status));
                      formData.append("file", blob, filename);
                      formData.append("db_id", id);
                      var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                      const response: any = await axios.post(
                        `${urlupload}/downloads_brochure/edit/withimage`,
                        formData
                      );
                      if (response.data.status == "success") {
                        Swal.fire(
                          "Success!",
                          "Your data has been updated.",
                          "success"
                        ).then(function () {
                          router.push("/admin/downloads_brochure");
                        });
                      } else {
                        Swal.fire(
                          "Error!",
                          "Please check your data.",
                          "error"
                        ).then(function () {
                          return false;
                        });
                      }
                    });
                };
                reader.readAsDataURL(values.file);
              } else {
                var formData = new FormData();
                formData.append("db_date", db_date);
                formData.append("db_subject", String(db_subject));
                formData.append("db_category", String(db_category));
                formData.append("db_status", String(db_status));
                formData.append("db_id", id);
                var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                const response: any = await axios.post(
                  `${urlupload}/downloads_brochure/edit`,
                  formData
                );
                if (response.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated.",
                    "success"
                  ).then(function () {
                    router.push("/admin/downloads_brochure");
                  });
                } else {
                  Swal.fire("Error!", "Please check your data.", "error").then(
                    function () {
                      return false;
                    }
                  );
                }
              }

              setSubmitting(false);
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
}

export default withAuth(Edit);
