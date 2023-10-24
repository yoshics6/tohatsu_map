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
import { editNews, getNewsById } from "@/features/admin/news";
import router, { useRouter } from "next/router";
import Image from "next/image";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [news_status, setNewsStatus] = React.useState<String>("Publish");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.news);
  const [news_title, setNewsTitle] = React.useState<String>("");
  const [news_detail, setNewsDetail] = React.useState<any>("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/news");
    }
  }

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          objectFit="contain"
          alt="new_title"
          src={values.file_obj}
          width={200}
          height={100}
        />
      );
    } else if (data) {
      if (data.length > 0) {
        return (
          <Image
            objectFit="contain"
            alt="new_title"
            src={`/upload/news/${data[0].news_image}`}
            width={200}
            height={100}
          />
        );
      }
    }
  };

  React.useEffect(() => {
    dispatch(getNewsById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setDate(dayjs(value.payload[0].news_date));
          setNewsTitle(value.payload[0].news_title);
          setNewsStatus(value.payload[0].news_status);
          setNewsDetail(value.payload[0].news_detail);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    news_date: date,
    news_title: news_title,
    news_detail: news_detail,
    news_status: news_status,
  };

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              {'Edit > News'}
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
              name="news_title"
              type="text"
              label="News Title * "
              value={news_title}
              onChange={(e: any) => {
                setNewsTitle(e.target.value);
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
                name="news_image"
                accept="image/*"
                id="news_image"
                style={{ padding: "20px 0 0 20px" }}
              />
              <div style={{ margin: 16, width: 300 }}>
                {showPreviewImage(values)}
              </div>
            </Box>
            <br />
            <br />
            Detail * <br /><br />
            <Editor
              apiKey="2s0w71caf8mc5dpcr17pwapuu74ko8mkivvenvzdmvnqyjti"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={news_detail}
              init={{
                height: 750,
                menubar: true,
                automatic_uploads: false,
                file_picker_callback: function (cb, value, meta) {
                  var input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*, video/*");

                  input.onchange = async function (e: any) {
                    var file = e.target.files[0];
                    var filename = file.name;
                    var reader = new FileReader();
                    reader.onload = function (event: any) {
                      var imagevalue = event.target.result;
                      fetch(imagevalue)
                        .then((res) => res.blob())
                        .then(async (blob) => {
                          var formData = new FormData();
                          formData.append("file", blob, filename);
                          var urlupload =
                            process.env.NEXT_PUBLIC_BASE_URL_API;
                          const response: any = await axios.post(
                            `${urlupload}/tinyupload`,
                            formData
                          );
                          cb(response.data.location, {
                            alt: response.data.alt,
                          });
                        });
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                },
                plugins: "link image textpattern lists table preview media",
                toolbar:
                  " undo redo preview | formatselect | Link | image media | table | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <br />
            <br />
            <Field
              name="news_status"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Status *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    onChange={(e: any) => {
                      setNewsStatus(e.target.value);
                    }}
                    value={news_status}
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
              onClick={() => router.push("/admin/news")}
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
              if (editorRef.current.getContent() == '' || initialValues.news_title == '') {
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
              const news_date = year + "-" + month + "-" + day;
              if (values.file) {
                var filename = values.file.name;
                var reader = new FileReader();
                reader.onload = function (event: any) {
                  var imagevalue = event.target.result;
                  fetch(imagevalue)
                    .then((res) => res.blob())
                    .then(async (blob) => {
                      var formData = new FormData();
                      formData.append("news_date", news_date);
                      formData.append("news_title", String(news_title));
                      formData.append("news_status", String(news_status));
                      formData.append("file", blob, filename);
                      if (editorRef.current) {
                        formData.append("news_detail", editorRef.current.getContent());
                      } else {
                        formData.append("news_detail", "");
                      }
                      formData.append("news_id", id);
                      var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                      const response: any = await axios.post(
                        `${urlupload}/news/edit/withimage`,
                        formData
                      );
                      if (response.data.status == "success") {
                        Swal.fire(
                          "Success!",
                          "Your data has been updated.",
                          "success"
                        ).then(function () {
                          router.push("/admin/news");
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
                if (editorRef.current.getContent() == '' || initialValues.news_title == '') {
                  Swal.fire(
                    "Warning!",
                    "Please fill out the information completely.",
                    "info"
                  )
                  return false;
                }
                var formData = new FormData();
                formData.append("news_date", news_date);
                formData.append("news_title", String(news_title));
                formData.append("news_status", String(news_status));
                if (editorRef.current) {
                  formData.append("news_detail", editorRef.current.getContent());
                } else {
                  formData.append("news_detail", "");
                }
                formData.append("news_id", id);
                var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                const response: any = await axios.post(
                  `${urlupload}/news/edit`,
                  formData
                );
                if (response.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated.",
                    "success"
                  ).then(function () {
                    router.push("/admin/news");
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
