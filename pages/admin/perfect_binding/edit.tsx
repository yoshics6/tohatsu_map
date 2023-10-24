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
import {
  getPerfectBinding,
  editPerfectBinding,
  getPerfectBindingById,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/perfect_binding";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data, data_text_no, data_text_paper, data_printing  , data_cover_paper_edit} = appSelector((state) => state.perfect_binding);

  const [perf_type, setType] = React.useState<String>("");
  const [perf_finished_size, setFinishedSize] = React.useState<String>("");
  const [cover, setCover] = React.useState<String>("");
  const [perf_text, setSTextNo] = React.useState<String>("");
  const [perf_cover_paper, setSCoverPaper] = React.useState<String>("");
  const [perf_printing, setPrinting] = React.useState<String>("");
  const [perf_text_paper, setSTextPaper] = React.useState<String>("");
  const [perf_cover_coating, setSaddCoverCoating] = React.useState<String>("");
  const [perf_text_coating, setSaddTextCoating] = React.useState<String>("");
  const [perf_500, setNumber500] = React.useState("");
  const [perf_1000, setNumber1000] = React.useState("");
  const [perf_2000, setNumber2000] = React.useState("");
  const [perf_3000, setNumber3000] = React.useState("");
  const [perf_4000, setNumber4000] = React.useState("");
  const [perf_5000, setNumber5000] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/perfect_binding");
    }
  }

  React.useEffect(() => {
    dispatch(getCoverPaperEdit("get"));
    dispatch(getTextPaper("get"));
    dispatch(getTextNo("get"));
    dispatch(getPrinting("get"));
  }, [dispatch]);

  // var rows: any = data ?? [];
  var rows_text_no: any = data_text_no ?? [];
  var rows_data_cover_paper : any = data_cover_paper_edit ?? [];
  var rows_text_paper: any = data_text_paper ?? [];
  var rows_printing: any = data_printing ?? [];

  React.useEffect(() => {
    dispatch(getPerfectBindingById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setType(value.payload[0].perf_type);
          setFinishedSize(value.payload[0].perf_finished_size);
          setCover(value.payload[0].perf_cover);
          setSTextNo(value.payload[0].perf_text);
          setSCoverPaper(value.payload[0].perf_cover_paper)
          setPrinting(value.payload[0].perf_printing);
          setSTextPaper(value.payload[0].perf_text_paper);
          setSaddCoverCoating(value.payload[0].perf_cover_coating);
          setSaddTextCoating(value.payload[0].perf_text_coating);
          setNumber500(value.payload[0].perf_500);
          setNumber1000(value.payload[0].perf_1000);
          setNumber2000(value.payload[0].perf_2000);
          setNumber3000(value.payload[0].perf_3000);
          setNumber4000(value.payload[0].perf_4000);
          setNumber5000(value.payload[0].perf_5000);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    perf_type: perf_type,
    perf_finished_size: perf_finished_size,
    cover: cover,
    perf_text: perf_text,
    perf_cover_paper: perf_cover_paper,
    perf_printing: perf_printing,
    perf_text_paper: perf_text_paper,
    perf_cover_coating: perf_cover_coating,
    perf_text_coating: perf_text_coating,
    perf_500: perf_500,
    perf_1000: perf_1000,
    perf_2000: perf_2000,
    perf_3000: perf_3000,
    perf_4000: perf_4000,
    perf_5000: perf_5000,
  };

  const handleNumber500 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber500(input)
  }

  const handleFloat500 = () => {
    setNumber500(perf_500)
  }  

  const handleNumber1000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber1000(input)
  }

  const handleFloat1000 = () => {
    setNumber1000(perf_1000)
  }

  const handleNumber2000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber2000(input)
  }

  const handleFloat2000 = () => {
    setNumber2000(perf_2000)
  }

  const handleNumber3000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber3000(input)
  }

  const handleFloat3000 = () => {
    setNumber3000(perf_3000)
  }

  const handleNumber4000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber4000(input)
  }

  const handleFloat4000 = () => {
    setNumber4000(perf_4000)
  }
  
  const handleNumber5000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber5000(input)
  }

  const handleFloat5000 = () => {
    setNumber5000(perf_5000)
  }  

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {'>'} Perfect Binding {'>'} Edit
            </Typography>

            <Field 
              fullWidth
              component={TextFieldInput}
              name="perf_type"
              type="text"
              label="Type"
              value={perf_type}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              onChange={(e: any) => {
                setType(e.target.value);
              }}
            />
            <br />
            <br />
            <Box sx={{ color: 'error.main' }}>* All items need to be input.</Box><br/>
            <Field
              name="perf_finished_size"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Finished Size *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Finished Size"
                    onChange={(e: any) => {
                      setFinishedSize(e.target.value);
                    }}
                    value={perf_finished_size}
                    fullWidth
                  >
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="B5">B5</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_cover"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Cover *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Cover"
                    onChange={(e: any) => {
                      setCover(e.target.value);
                    }}
                    value={cover}
                    fullWidth
                  >
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_text"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Text *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Text"
                    onChange={(e: any) => {
                      setSTextNo(e.target.value);
                    }}
                    value={perf_text}
                    fullWidth
                  >
                    {rows_text_no.length > 0 ? rows_text_no.map((value: any) => (
                        <MenuItem key={value?.text_no_id} value={value?.text_no_name}>
                          {value?.text_no_name}
                        </MenuItem>
                      ))
                    : ''}
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_cover_paper"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Cover Paper *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Cover Paper"
                    onChange={(e: any) => {
                      setSCoverPaper(e.target.value);
                    }}
                    value={perf_cover_paper}
                    fullWidth
                  >
                    {rows_data_cover_paper.length > 0
                      ? rows_data_cover_paper.map((value: any) => (
                          <MenuItem key={value?.cp_id} value={value?.cp_name}>
                            {value?.cp_name}
                          </MenuItem>
                        ))
                      : ""}
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_text_paper"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Text Paper *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Text Paper"
                    onChange={(e: any) => {
                      setSTextPaper(e.target.value);
                    }}
                    value={perf_text_paper}
                    fullWidth
                  >
                    {rows_text_paper.length > 0
                      ? rows_text_paper.map((value: any) => (
                          <MenuItem key={value?.text_id} value={value?.text_name}>
                            {value?.text_name}
                          </MenuItem>
                        ))
                      : ""}
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_printing"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Printing color *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Printing color"
                    onChange={(e: any) => {
                      setPrinting(e.target.value);
                    }}
                    value={perf_printing}
                    fullWidth
                  >
                    {rows_printing.length > 0
                      ? rows_printing.map((value: any) => (
                          <MenuItem key={value?.printing_id} value={value?.printing_name}>
                            {value?.printing_name}
                          </MenuItem>
                        ))
                      : ""}
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_cover_coating"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Cover Coating *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Cover Coating"
                    onChange={(e: any) => {
                      setSaddCoverCoating(e.target.value);
                    }}
                    value={perf_cover_coating}
                    fullWidth
                  >
                    <MenuItem value="No coating">No coating</MenuItem>
                    <MenuItem value="PVC">PVC</MenuItem>
                    <MenuItem value="Varnish">Varnish</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="perf_text_coating"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Text Coating *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Text Coating"
                    onChange={(e: any) => {
                      setSaddTextCoating(e.target.value);
                    }}
                    value={perf_text_coating}
                    fullWidth
                  >
                    <MenuItem value="No coating">No coating</MenuItem>
                    <MenuItem value="PVC">PVC</MenuItem>
                    <MenuItem value="Varnish">Varnish</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="perf_500"
              type="number"
              label="500"
              value={perf_500}
              onChange = {handleNumber500}
              onKeyUp = {handleFloat500}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="perf_1000"
              type="number"
              label="1,000"
              value={perf_1000}
              onChange = {handleNumber1000}
              onKeyUp = {handleFloat1000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="perf_2000"
              type="number"
              label="2,000"
              value={perf_2000}
              onChange = {handleNumber2000}
              onKeyUp = {handleFloat2000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="perf_3000"
              type="number"
              label="3,000"
              value={perf_3000}
              onChange = {handleNumber3000}
              onKeyUp = {handleFloat3000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="perf_4000"
              type="number"
              label="4,000"
              value={perf_4000}
              onChange = {handleNumber4000}
              onKeyUp = {handleFloat4000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="perf_5000"
              type="number"
              label="5,000"
              value={perf_5000}
              onChange = {handleNumber5000}
              onKeyUp = {handleFloat5000}
            />
            <br />
            <br />
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
              onClick={() => router.push("/admin/perfect_binding")}
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
              // if (!String(name)) errors.name = "Enter name";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              let data = new FormData();
              data.append("perf_type", String(perf_type));
              data.append("perf_finished_size", String(perf_finished_size));
              data.append("perf_cover", String(cover));
              data.append("perf_text", String(perf_text));
              data.append("perf_cover_paper", String(perf_cover_paper));
              data.append("perf_text_paper", String(perf_text_paper));
              data.append("perf_printing", String(perf_printing));
              data.append("perf_cover_coating", String(perf_cover_coating));
              data.append("perf_text_coating", String(perf_text_coating));
              data.append("perf_500", String(perf_500));
              data.append("perf_1000", String(perf_1000));
              data.append("perf_2000", String(perf_2000));
              data.append("perf_3000", String(perf_3000));
              data.append("perf_4000", String(perf_4000));
              data.append("perf_5000", String(perf_5000));

              data.append("perf_id", id);

              dispatch(editPerfectBinding(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/perfect_binding");
                  });
                } else {
                  Swal.fire(
                    "Error!",
                    result.payload.data.message,
                    "error"
                  ).then(function () {
                    return false;
                  });
                }
              });

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
