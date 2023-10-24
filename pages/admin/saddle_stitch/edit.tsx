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
  getSaddle,
  editSaddle,
  getSaddleById,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/saddle_stitch";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data, data_text_no, data_text_paper, data_printing  , data_cover_paper_edit} = appSelector((state) => state.saddle_stitch);

  const [sadd_type, setType] = React.useState<String>("");
  const [sadd_finished_size, setFinishedSize] = React.useState<String>("");
  const [cover, setCover] = React.useState<String>("");
  const [sadd_text, setSTextNo] = React.useState<String>("");
  const [sadd_cover_paper, setSCoverPaper] = React.useState<String>("");
  const [sadd_printing, setPrinting] = React.useState<String>("");
  const [sadd_text_paper, setSTextPaper] = React.useState<String>("");
  const [sadd_cover_coating, setSaddCoverCoating] = React.useState<String>("");
  const [sadd_text_coating, setSaddTextCoating] = React.useState<String>("");
  const [sadd_500, setNumber500] = React.useState("");
  const [sadd_1000, setNumber1000] = React.useState("");
  const [sadd_2000, setNumber2000] = React.useState("");
  const [sadd_3000, setNumber3000] = React.useState("");
  const [sadd_4000, setNumber4000] = React.useState("");
  const [sadd_5000, setNumber5000] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/saddle_stitch");
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
    dispatch(getSaddleById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setType(value.payload[0].sadd_type);
          setFinishedSize(value.payload[0].sadd_finished_size);
          setCover(value.payload[0].sadd_cover);
          setSTextNo(value.payload[0].sadd_text);
          setSCoverPaper(value.payload[0].sadd_cover_paper)
          setPrinting(value.payload[0].sadd_printing);
          setSTextPaper(value.payload[0].sadd_text_paper);
          setSaddCoverCoating(value.payload[0].sadd_cover_coating);
          setSaddTextCoating(value.payload[0].sadd_text_coating);
          setNumber500(value.payload[0].sadd_500);
          setNumber1000(value.payload[0].sadd_1000);
          setNumber2000(value.payload[0].sadd_2000);
          setNumber3000(value.payload[0].sadd_3000);
          setNumber4000(value.payload[0].sadd_4000);
          setNumber5000(value.payload[0].sadd_5000);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    sadd_type: sadd_type,
    sadd_finished_size: sadd_finished_size,
    cover: cover,
    sadd_text: sadd_text,
    sadd_cover_paper: sadd_cover_paper,
    sadd_printing: sadd_printing,
    sadd_text_paper: sadd_text_paper,
    sadd_cover_coating: sadd_cover_coating,
    sadd_text_coating: sadd_text_coating,
    sadd_500: sadd_500,
    sadd_1000: sadd_1000,
    sadd_2000: sadd_2000,
    sadd_3000: sadd_3000,
    sadd_4000: sadd_4000,
    sadd_5000: sadd_5000,
  };

  const handleNumber500 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber500(input)
  }

  const handleFloat500 = () => {
    setNumber500(sadd_500)
  } 

  const handleNumber1000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber1000(input)
  }

  const handleFloat1000 = () => {
    setNumber1000(sadd_1000)
  }

  const handleNumber2000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber2000(input)
  }

  const handleFloat2000 = () => {
    setNumber2000(sadd_2000)
  }

  const handleNumber3000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber3000(input)
  }

  const handleFloat3000 = () => {
    setNumber3000(sadd_3000)
  }

  const handleNumber4000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber4000(input)
  }

  const handleFloat4000 = () => {
    setNumber4000(sadd_4000)
  }
  
  const handleNumber5000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber5000(input)
  }

  const handleFloat5000 = () => {
    setNumber5000(sadd_5000)
  }   

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {'>'} Saddle Stitch {'>'} Edit
            </Typography>

            <Field 
              fullWidth
              component={TextFieldInput}
              name="sadd_type"
              type="text"
              label="Type"
              value={sadd_type}
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
              name="sadd_finished_size"
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
                    value={sadd_finished_size}
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
              name="sadd_cover"
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
              name="sadd_text"
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
                    value={sadd_text}
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
              name="sadd_cover_paper"
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
                    value={sadd_cover_paper}
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
              name="sadd_text_paper"
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
                    value={sadd_text_paper}
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
              name="sadd_printing"
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
                    value={sadd_printing}
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
              name="sadd_cover_coating"
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
                    value={sadd_cover_coating}
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
              name="sadd_text_coating"
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
                    value={sadd_text_coating}
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
              name="sadd_500"
              type="number"
              label="500"
              value={sadd_500}
              onChange = {handleNumber500}
              onKeyUp = {handleFloat500}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="sadd_1000"
              type="number"
              label="1,000"
              value={sadd_1000}
              onChange = {handleNumber1000}
              onKeyUp = {handleFloat1000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="sadd_2000"
              type="number"
              label="2,000"
              value={sadd_2000}
              onChange = {handleNumber2000}
              onKeyUp = {handleFloat2000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="sadd_3000"
              type="number"
              label="3,000"
              value={sadd_3000}
              onChange = {handleNumber3000}
              onKeyUp = {handleFloat3000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="sadd_4000"
              type="number"
              label="4,000"
              value={sadd_4000}
              onChange = {handleNumber4000}
              onKeyUp = {handleFloat4000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="sadd_5000"
              type="number"
              label="5,000"
              value={sadd_5000}
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
              onClick={() => router.push("/admin/saddle_stitch")}
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
              data.append("sadd_type", String(sadd_type));
              data.append("sadd_finished_size", String(sadd_finished_size));
              data.append("sadd_cover", String(cover));
              data.append("sadd_text", String(sadd_text));
              data.append("sadd_cover_paper", String(sadd_cover_paper));
              data.append("sadd_text_paper", String(sadd_text_paper));
              data.append("sadd_printing", String(sadd_printing));
              data.append("sadd_cover_coating", String(sadd_cover_coating));
              data.append("sadd_text_coating", String(sadd_text_coating));
              data.append("sadd_500", String(sadd_500));
              data.append("sadd_1000", String(sadd_1000));
              data.append("sadd_2000", String(sadd_2000));
              data.append("sadd_3000", String(sadd_3000));
              data.append("sadd_4000", String(sadd_4000));
              data.append("sadd_5000", String(sadd_5000));

              data.append("sadd_id", id);

              dispatch(editSaddle(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/saddle_stitch");
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
