'use client'

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
import { editDownloadsManuals, getDownloadsManualsById } from "@/features/admin/downloads_manuals";
import router, { useRouter } from "next/router";
import Image from "next/image";
import { color } from "@mui/system";
import Grid from '@mui/material/Grid';

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [dm_status, setDmStatus] = React.useState<String>("Show");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.downloads_manuals);
  const [dm_subject, setDmSubject] = React.useState<String>("");
  const [dm_category, setDmCategory] = React.useState<String>("Manuals");
  const [dm_horse_power, setDmhorsepower] = React.useState<String>("2");
  const [dm_stroke_models, setDmstrokemodels] = React.useState<String>("2-STROKE MODELS (CARBURETED)");
  const [dm_additional_file_en, setDmEnFile] = React.useState<any>("");
  const [dm_additional_file_fr, setDmFrFile] = React.useState<any>("");
  const [dm_additional_file_es, setDmEsFile] = React.useState<any>("");
  const [dm_additional_file_de, setDmDeFile] = React.useState<any>("");
  const [isEnglishChk, setIsEnglishChk] = React.useState<any>("");
  const [isEnglish, setIsEnglish] = React.useState<any>(false);
  const [isFrancais, setIsFrancais] = React.useState<any>(false);
  const [isFrancaisChk, setIsFrancaisChk] = React.useState<any>("");
  const [isEspanol, setIsEspanol] = React.useState<any>(false);
  const [isEspanolChk, setIsEspanolChk] = React.useState<any>("");
  const [isDeutsch, setIsDeutsch] = React.useState<any>(false);
  const [isDeutschChk, setIsDeutschChk] = React.useState<any>("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/downloads_manuals");
    }
  }

  const showPreviewImageEn = (values: any) => {
    return (
      <div style={{ color: "green" }}>Old File : {dm_additional_file_en.substring(dm_additional_file_en.length - 5) == 'false' ? '' : dm_additional_file_en}</div>
    );
  };

  const showPreviewImageFr = (values: any) => {
    return (
      <div style={{ color: "green" }}>Old File : {dm_additional_file_fr.substring(dm_additional_file_fr.length - 5) == 'false' ? '' : dm_additional_file_fr}</div>
    );
  };

  const showPreviewImageEs = (values: any) => {
    return (
      <div style={{ color: "green" }}>Old File : {dm_additional_file_es.substring(dm_additional_file_es.length - 5) == 'false' ? '' : dm_additional_file_es}</div>
    );
  };

  const showPreviewImageDe = (values: any) => {
    return (
      <div style={{ color: "green" }}>Old File : {dm_additional_file_de.substring(dm_additional_file_de.length - 5) == 'false' ? '' : dm_additional_file_de}</div>
    );
  };

  React.useEffect(() => {
    dispatch(getDownloadsManualsById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setDate(dayjs(value.payload[0].dm_date));
          setDmSubject(value.payload[0].dm_subject);
          setDmEnFile(value.payload[0].dm_additional_file_en);
          setDmFrFile(value.payload[0].dm_additional_file_fr);
          setDmEsFile(value.payload[0].dm_additional_file_es);
          setDmDeFile(value.payload[0].dm_additional_file_de);
          setDmCategory(value.payload[0].dm_category);
          setDmStatus(value.payload[0].dm_status);
          setDmhorsepower(value.payload[0].dm_horse_power);
          setDmstrokemodels(value.payload[0].dm_stroke_models);
          setIsEnglishChk(value.payload[0].dm_file_en == "English" ? "English" : false);
          setIsFrancaisChk(value.payload[0].dm_file_fr == "Francais" ? "Francais" : false);
          setIsEspanolChk(value.payload[0].dm_file_es == "Espanol" ? "Espanol" : false);
          setIsDeutschChk(value.payload[0].dm_file_de == "Deutsch" ? "Deutsch" : false);
          setIsEnglish(value.payload[0].dm_file_en == "English" ? "English" : false);
          setIsFrancais(value.payload[0].dm_file_fr == "Francais" ? "Francais" : false);
          setIsEspanol(value.payload[0].dm_file_es == "Espanol" ? "Espanol" : false);
          setIsDeutsch(value.payload[0].dm_file_de == "Deutsch" ? "Deutsch" : false);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    dm_date: dayjs(),
    dm_subject: "",
    file_en: "",
    file_fr: "",
    file_es: "",
    file_de: "",
  };

  // setIsEnglish((current: any) => !current);
  const handleChangeEn = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsEnglishChk(true);
      setIsEnglish("English");
    } else {
      setIsEnglishChk(false);
      setIsEnglish("");
    }
  };

  const handleChangeFr = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsFrancaisChk(true);
      setIsFrancais("Francais");
    } else {
      setIsFrancaisChk(false);
      setIsFrancais("");
    }
  };

  // const [isChecked, setIsChecked] = React.useState(true);

  const handleChangeEs = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsEspanolChk(true);
      setIsEspanol("Espanol");
    } else {
      setIsEspanolChk(false);
      setIsEspanol("");
    }
  };

  const handleChangeDeu = (event: { target: { checked: any; }; }) => {
    if (event.target.checked) {
      setIsDeutsch("Deutsch");
      setIsDeutschChk(true);
    } else {
      setIsDeutsch("");
      setIsDeutschChk(false);
    }
  };

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              {'Edit > Manuals'}
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
              name="dm_subject"
              type="text"
              label="Subject * "
              value={dm_subject}
              onChange={(e: any) => {
                setDmSubject(e.target.value);
              }}
            />
            <br />
            <br />
            <Field
              name="dm_category"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Manuals *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Manuals"
                    onChange={(e: any) => {
                      setDmCategory(e.target.value);
                    }}
                    value={dm_category}
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
                        label="Horse Power (HP) *"
                        onChange={(e: any) => {
                          setDmhorsepower(e.target.value);
                        }}
                        value={dm_horse_power}
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
                        value={dm_stroke_models}
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
              Additional File * <br /><br />
              {/* <Box style={{ color: "red" }}>Please fill in at least 1 additional file. default English</Box><br /> */}
              <label htmlFor="English">
                <input
                  type="checkbox"
                  value={isEnglish}
                  onChange={handleChangeEn}
                  id="English"
                  name="English"
                  checked={isEnglishChk}
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
                  checked={isFrancaisChk}
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
                  checked={isEspanolChk}
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
                  checked={isDeutschChk}
                />
                &nbsp; Deutsch
              </label>
            </div>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {isEnglish ?
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
                    <div>
                      {showPreviewImageEn(values)}
                    </div>
                    <Box style={{ color: "red" }}>* File size should not be over 100MB</Box>
                  </>
                  : ''}
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
                    <div>
                      {showPreviewImageFr(values)}
                    </div>
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
                    <div>
                      {showPreviewImageEs(values)}
                    </div>
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
                    <div>
                      {showPreviewImageDe(values)}
                    </div>
                    <Box style={{ color: "red" }}>* File size should not be over 100MB</Box>
                  </>
                  : ''}
              </Grid>
            </Grid>
            <br />
            <Field
              name="dm_status"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Status *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    onChange={(e: any) => {
                      setDmStatus(e.target.value);
                    }}
                    value={dm_status}
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
              // if (!news_title) errors.news_title = "Enter News Title";
              // if (!values.news_status) errors.news_status = "Enter Status";
              // if (!values.news_detail) errors.news_detail = "Enter News Detail";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              if (dm_subject == '') {
                Swal.fire(
                  "Warning!",
                  "Please fill out the information completely.",
                  "info"
                )
                return false;
              }

              if (isEnglish == "English" && values.file_en.name == undefined && dm_additional_file_en.substring(dm_additional_file_en.length - 5) == 'false') {
                Swal.fire(
                  "Warning!",
                  "Please upload the file.",
                  "info"
                )
                return false;
              }
              else if (isFrancais == "Francais" && values.file_fr.name == undefined && dm_additional_file_fr.substring(dm_additional_file_fr.length - 5) == 'false') {
                Swal.fire(
                  "Warning!",
                  "Please upload the file.",
                  "info"
                )
                return false;
              }
              else if (isEspanol == "Espanol" && values.file_es.name == undefined && dm_additional_file_es.substring(dm_additional_file_es.length - 5) == 'false') {
                Swal.fire(
                  "Warning!",
                  "Please upload the file.",
                  "info"
                )
                return false;
              }
              else if (isDeutsch == "Deutsch" && values.file_de.name == undefined && dm_additional_file_de.substring(dm_additional_file_de.length - 5) == 'false') {
                Swal.fire(
                  "Warning!",
                  "Please upload the file.",
                  "info"
                )
                return false;
              }
              else { }

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
              var filename_en = values.file_en.name == undefined ? dm_additional_file_en : values.file_en.name;
              var filename_fr = values.file_fr.name == undefined ? dm_additional_file_fr : values.file_fr.name;
              var filename_es = values.file_es.name == undefined ? dm_additional_file_es : values.file_es.name;
              var filename_de = values.file_de.name == undefined ? dm_additional_file_de : values.file_de.name;
              if (values.file_en.name != undefined || values.file_fr.name != undefined || values.file_es.name != undefined || values.file_de.name != undefined) {
                var reader = new FileReader();
                reader.onload = function (event: any) {
                  var imagevalue = event.target.result;
                  fetch(imagevalue)
                    .then((res) => res.blob())
                    .then(async (blob) => {
                      var formData = new FormData();
                      formData.append("dm_date", dm_date);
                      formData.append("dm_subject", String(dm_subject));
                      formData.append("dm_category", String(dm_category));
                      formData.append("dm_horse_power", String(dm_horse_power));
                      formData.append("dm_stroke_models", String(dm_stroke_models));
                      formData.append("English", String(isEnglish));
                      formData.append("file_en", blob, filename_en);
                      formData.append("Francais", String(isFrancais));
                      formData.append("file_fr", blob, filename_fr);
                      formData.append("Espanol", String(isEspanol));
                      formData.append("file_es", blob, filename_es);
                      formData.append("Deutsch", String(isDeutsch));
                      formData.append("file_de", blob, filename_de);
                      formData.append("dm_status", String(dm_status));
                      formData.append("dm_id", id);
                      var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                      const response: any = await axios.post(
                        `${urlupload}/downloads_manuals/edit/withimage`,
                        formData
                      );
                      if (response.data.status == "success") {
                        Swal.fire(
                          "Success!",
                          "Your data has been updated.",
                          "success"
                        ).then(function () {
                          router.push("/admin/downloads_manuals");
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
                if (values.file_en) {
                  reader.readAsDataURL(values.file_en);
                }
                else {
                }
                if (values.file_fr) {
                  reader.readAsDataURL(values.file_fr);
                }
                else {
                }
                if (values.file_es) {
                  reader.readAsDataURL(values.file_es);
                }
                else {
                }
                if (values.file_de) {
                  reader.readAsDataURL(values.file_de);
                }
                else {
                }
              } else {
                var formData = new FormData();
                formData.append("dm_date", dm_date);
                formData.append("dm_subject", String(dm_subject));
                formData.append("dm_category", String(dm_category));
                formData.append("dm_horse_power", String(dm_horse_power));
                formData.append("dm_stroke_models", String(dm_stroke_models));
                formData.append("English", String(isEnglish));
                formData.append("Francais", String(isFrancais));
                formData.append("Espanol", String(isEspanol));
                formData.append("Deutsch", String(isDeutsch));
                formData.append("dm_status", String(dm_status));
                formData.append("dm_id", id);
                var urlupload = process.env.NEXT_PUBLIC_BASE_URL_API;
                const response: any = await axios.post(
                  `${urlupload}/downloads_manuals/edit`,
                  formData
                );
                if (response.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated.",
                    "success"
                  ).then(function () {
                    router.push("/admin/downloads_manuals");
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
