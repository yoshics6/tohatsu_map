import Layout from "@/components/admin/Layout/Layout";
import withAuth from "@/components/admin/withAuth";
import React, { useRef } from "react";
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
import router from "next/router";
import Image from "next/image";
const initialValues: any = {
  // db_date: dayjs(),
  db_subject: "",
  // db_category: "",
  file: "",
  // db_status: "Show",
};

const showPreviewImage = (values: any) => {
  if (values.file_obj) {
    return (
      <Image
        objectFit="contain"
        alt="product image"
        src={values.file_obj}
        width={200}
        height={100}
      />
    );
  }
};

function Add() {
  const dispatch = appDispatch();
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("Show");
  const [category, setCategory] = React.useState<String>("Brochure");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              {'Add > Brochure'}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Post Date *"
                format="YYYY-MM-DD"
                value={date}
                onChange={(newValue: any) => {
                  // console.log(newValue);
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
              label="Subject *"
              id="db_subject"
            />
            <br />
            <br />
            <Field
              name="db_category"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Category * </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    onChange={(e: any) => {
                      setCategory(e.target.value);
                    }}
                    value={category}
                    fullWidth
                  >
                    <MenuItem value="Brochure">Brochure</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Box>
              {/* <Image
                objectFit="cover"
                alt="product image"
                src="/static/img/ic_photo.png"
                width={25}
                height={20}
              /> */}
              <span style={{ color: "000" }}>
                File (PDF/JPG) *
              </span>
              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  if (e.target.files[0]) {
                    if ((e.target.files[0].size / 1024) > 102400) {
                      Swal.fire(
                        "Warning",
                        "Your data has been uploaded.",
                        "warning"
                      )
                      setFieldValue("file", "");
                    } else {
                      setFieldValue("file", e.target.files[0]);
                      setFieldValue(
                        "file_obj",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }
                  }
                }}
                name="file"
                accept="image/* , .pdf"
                id="file"
                style={{ padding: "20px 0 0 20px" }}
              />
              {/* 
              <div style={{ margin: 16, width: 300 }}>
                {showPreviewImage(values)}
              </div> */}
            </Box>
            <span style={{ color: "red" }}>* File size should not be over 100MB</span>
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
                      setStatus(e.target.value);
                    }}
                    value={status}
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
              // if (!values.news_title) errors.news_title = "Enter News Title";
              // if (!values.news_image) errors.news_image = "Enter Image";
              // if (!values.news_detail) errors.news_detail = "Enter News Detail";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              if (values.file.name == undefined) {
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
              var filename = values.file.name;
              var reader = new FileReader();
              reader.onload = function (event: any) {
                var imagevalue = event.target.result;
                fetch(imagevalue)
                  .then((res) => res.blob())
                  .then(async (blob) => {
                    var formData = new FormData();
                    formData.append("db_date", db_date);
                    formData.append("db_subject", values.db_subject);
                    formData.append("db_category", String(category));
                    formData.append("file", blob, filename);
                    formData.append("db_status", String(status));

                    var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                    const response: any = await axios.put(
                      `${urlupload}/downloads_brochure/create`,
                      formData
                    );
                    if (response.data.status == "success") {
                      Swal.fire(
                        "Success!",
                        "Your data has been uploaded.",
                        "success"
                      ).then(function () {
                        router.push("/admin/downloads_brochure");
                      });
                    } else {
                      Swal.fire(
                        "Error!",
                        "Please check your input.",
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
            {(props) => showForm(props)}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
}

export default withAuth(Add);
