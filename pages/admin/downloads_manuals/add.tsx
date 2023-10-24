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
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const initialValues: any = {
  dm_date: dayjs(),
  dm_subject: "",
  file_en: "",
  file_fr: "",
  file_es: "",
  file_de: "",
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
  const [category, setCategory] = React.useState<String>("Manuals");
  const [dmhorsepower, setDmhorsepower] = React.useState<String>("2");
  const [dmstrokemodels, setDmstrokemodels] = React.useState<String>("2-STROKE MODELS (CARBURETED)");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [isEnglish, setIsEnglish] = React.useState<any>("English");
  const [isFrancais, setIsFrancais] = React.useState<any>(false);
  const [isEspanol, setIsEspanol] = React.useState<any>(false);
  const [isDeutsch, setIsDeutsch] = React.useState<any>(false);

  // setIsEnglish((current: any) => !current);
  const handleChangeEn = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsEnglish("English");
    } else {
      setIsEnglish("");
    }
  };

  const handleChangeFr = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsFrancais("Francais");
    } else {
      setIsFrancais("");
    }
  };

  const handleChangeEs = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsEspanol("Espanol");
    } else {
      setIsEspanol("");
    }
  };

  const handleChangeDeu = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsDeutsch("Deutsch");
    } else {
      setIsDeutsch("");
    }
  };

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              {'Add > Manuals'}
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
              name="dm_subject"
              type="text"
              label="Subject *"
              id="dm_subject"
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
                    <MenuItem value="Manuals">Manuals</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  name="dm_horse_power"
                  style={{ marginTop: 16 }}
                  component={() => (
                    <FormControl fullWidth>
                      <InputLabel>Horse Power (HP) *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Horse Power (HP)"
                        onChange={(e: any) => {
                          setDmhorsepower(e.target.value);
                        }}
                        value={dmhorsepower}
                        fullWidth
                      >
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="2.5">2.5</MenuItem>
                        <MenuItem value="3.5">3.5</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="dm_stroke_models"
                  style={{ marginTop: 16 }}
                  component={() => (
                    <FormControl fullWidth>
                      <InputLabel>STROKE MODELS *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="STROKE MODELS *"
                        onChange={(e: any) => {
                          setDmstrokemodels(e.target.value);
                        }}
                        value={dmstrokemodels}
                        fullWidth
                      >
                        <MenuItem value="2-STROKE MODELS (CARBURETED)">2-STROKE MODELS (CARBURETED)</MenuItem>
                        <MenuItem value="4-STROKE MODELS">4-STROKE MODELS</MenuItem>
                        <MenuItem value="TLDI MODELS)">TLDI MODELS</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <br />
            <div>
              Additional File * <br />
              <Box style={{ color: "red" }}>Please fill in at least 1 additional file. default English</Box><br />
              <label htmlFor="English">
                <input
                  type="checkbox"
                  value={isEnglish}
                  onChange={handleChangeEn}
                  id="English"
                  name="English"
                  checked
                />
                &nbsp; English
              </label>
            </div>
            <div>
              <label htmlFor="Francais">
                <input
                  type="checkbox"
                  value={isFrancais}
                  onChange={handleChangeFr}
                  id="Francais"
                  name="Francais"
                />
                &nbsp; Français
              </label>
            </div>
            <div>
              <label htmlFor="Espanol">
                <input
                  type="checkbox"
                  value={isEspanol}
                  onChange={handleChangeEs}
                  id="Espanol"
                  name="Espanol"
                />
                &nbsp; Español
              </label>
            </div>
            <div>
              <label htmlFor="Deutsch">
                <input
                  type="checkbox"
                  value={isDeutsch}
                  onChange={handleChangeDeu}
                  id="Deutsch"
                  name="Deutsch"
                />
                &nbsp; Deutsch
              </label>
            </div>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* {isEnglish ? */}
                <>
                  <span style={{ color: "000" }}>
                    English File (PDF/JPG) *
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
                          setFieldValue("file_en", "");
                        } else {
                          setFieldValue("file_en", e.target.files[0]);
                          setFieldValue(
                            "file_obj",
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }
                    }}
                    name="file_en"
                    accept="image/* , .pdf"
                    id="file_en"
                    style={{ padding: "20px 0 0 20px" }}
                  />
                  <Box style={{ color: "red" }}>* File size should not be over 100MB</Box>
                </>
                {/* : ''} */}
              </Grid>
              <Grid item xs={6}>
                {isFrancais ?
                  <>
                    <span style={{ color: "000" }}>
                      Français File (PDF/JPG) *
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
                            setFieldValue("file_fr", "");
                          } else {
                            setFieldValue("file_fr", e.target.files[0]);
                            setFieldValue(
                              "file_obj",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }
                      }}
                      name="file_fr"
                      accept="image/* , .pdf"
                      id="file_fr"
                      style={{ padding: "20px 0 0 20px" }}
                    />
                    <Box style={{ color: "red" }}>* File size should not be over 100MB</Box>
                  </>
                  : ''}
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {isEspanol ?
                  <>
                    <span style={{ color: "000" }}>
                      Español File (PDF/JPG) *
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
                            setFieldValue("file_es", "");
                          } else {
                            setFieldValue("file_es", e.target.files[0]);
                            setFieldValue(
                              "file_obj",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }
                      }}
                      name="file_es"
                      accept="image/* , .pdf"
                      id="file_es"
                      style={{ padding: "20px 0 0 20px" }}
                    />
                    <Box style={{ color: "red" }}>* File size should not be over 100MB</Box>
                  </>
                  : ''}
              </Grid>
              <Grid item xs={6}>
                {isDeutsch ?
                  <>
                    <span style={{ color: "000" }}>
                      Deutsch File (PDF/JPG) *
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
                            setFieldValue("file_de", "");
                          } else {
                            setFieldValue("file_de", e.target.files[0]);
                            setFieldValue(
                              "file_obj",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }
                      }}
                      name="file_de"
                      accept="image/* , .pdf"
                      id="file_de"
                      style={{ padding: "20px 0 0 20px" }}
                    />
                    <Box style={{ color: "red" }}>* File size should not be over 100MB</Box>
                  </>
                  : ''}
              </Grid>
            </Grid>
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
              onClick={() => router.push("/admin/downloads_manuals")}
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
              if (values.dm_subject == '') {
                Swal.fire(
                  "Warning!",
                  "Please fill out the information completely.",
                  "info"
                )
                return false;
              }
              if (values.file_en.name != undefined || values.file_fr.name != undefined || values.file_es.name != undefined || values.file_de.name != undefined) {
              }
              else {
                Swal.fire(
                  "Warning!",
                  "Please upload the file.",
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
              const dm_date = year + "-" + month + "-" + day;
              var filename_en = values.file_en.name;
              var filename_fr = values.file_fr.name;
              var filename_es = values.file_es.name;
              var filename_de = values.file_de.name;
              var reader = new FileReader();
              reader.onload = function (event: any) {
                var imagevalue = event.target.result;
                fetch(imagevalue)
                  .then((res) => res.blob())
                  .then(async (blob) => {
                    var formData = new FormData();
                    formData.append("dm_date", dm_date);
                    formData.append("dm_subject", values.dm_subject);
                    formData.append("dm_category", String(category));
                    formData.append("dm_horse_power", String(dmhorsepower));
                    formData.append("dm_stroke_models", String(dmstrokemodels));
                    formData.append("English", String(isEnglish));
                    formData.append("file_en", blob, filename_en);
                    formData.append("Francais", String(isFrancais));
                    formData.append("file_fr", blob, filename_fr);
                    formData.append("Espanol", String(isEspanol));
                    formData.append("file_es", blob, filename_es);
                    formData.append("Deutsch", String(isDeutsch));
                    formData.append("file_de", blob, filename_de);
                    formData.append("dm_status", String(status));

                    var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                    const response: any = await axios.put(
                      `${urlupload}/downloads_manuals/create`,
                      formData
                    );
                    if (response.data.status == "success") {
                      Swal.fire(
                        "Success!",
                        "Your data has been uploaded.",
                        "success"
                      ).then(function () {
                        router.push("/admin/downloads_manuals");
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
              reader.readAsDataURL(values.file_en);
              reader.readAsDataURL(values.file_fr);
              reader.readAsDataURL(values.file_es);
              reader.readAsDataURL(values.file_de);
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
