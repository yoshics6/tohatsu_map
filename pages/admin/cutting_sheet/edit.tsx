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
  getCuttingSheet,
  editCuttingSheet,
  getCuttingSheetById,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/cutting_sheet";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data, data_text_no, data_text_paper, data_printing  , data_cover_paper_edit} = appSelector((state) => state.cutting_sheet);

  const [cutt_type, setCuttingType] = React.useState<String>("");
  const [cutt_finished_size, setCuttingFinishedSize] = React.useState<String>("");
  const [cutt_open_size, setCuttingOpenSize] = React.useState<String>("");
  const [cutt_column, setCuttingColumn] = React.useState<String>("");
  const [cutt_page, setCuttingPage] = React.useState<String>("");
  const [cutt_text_paper, setCuttingCoverPaper] = React.useState<String>("");
  const [cutt_printing, setCuttingPrinting] = React.useState<String>("");
  const [cutt_text_coating, setCuttingCoating] = React.useState<String>("");
  const [cutt_500, setNumber500] = React.useState("");
  const [cutt_1000, setNumber1000] = React.useState("");
  const [cutt_2000, setNumber2000] = React.useState("");
  const [cutt_3000, setNumber3000] = React.useState("");
  const [cutt_4000, setNumber4000] = React.useState("");
  const [cutt_5000, setNumber5000] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/cutting_sheet");
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
    dispatch(getCuttingSheetById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setCuttingType(value.payload[0].cutt_type);
          setCuttingFinishedSize(value.payload[0].cutt_finished_size);
          setCuttingPage(value.payload[0].cutt_page)
          setCuttingCoverPaper(value.payload[0].cutt_text_paper);
          setCuttingPrinting(value.payload[0].cutt_printing);
          setCuttingCoating(value.payload[0].cutt_text_coating);
          setNumber500(value.payload[0].cutt_500);
          setNumber1000(value.payload[0].cutt_1000);
          setNumber2000(value.payload[0].cutt_2000);
          setNumber3000(value.payload[0].cutt_3000);
          setNumber4000(value.payload[0].cutt_4000);
          setNumber5000(value.payload[0].cutt_5000);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    cutt_type: cutt_type,
    cutt_finished_size: cutt_finished_size,
    cutt_page: cutt_page,
    cutt_text_paper: cutt_text_paper,
    cutt_printing: cutt_printing,
    cutt_text_coating: cutt_text_coating,
    cutt_500: cutt_500,
    cutt_1000: cutt_1000,
    cutt_2000: cutt_2000,
    cutt_3000: cutt_3000,
    cutt_4000: cutt_4000,
    cutt_5000: cutt_5000,
  };

  const handleNumber500 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber500(input)
  }

  const handleFloat500 = () => {
    setNumber500(cutt_500)
  } 

  const handleNumber1000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber1000(input)
  }

  const handleFloat1000 = () => {
    setNumber1000(cutt_1000)
  }

  const handleNumber2000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber2000(input)
  }

  const handleFloat2000 = () => {
    setNumber2000(cutt_2000)
  }

  const handleNumber3000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber3000(input)
  }

  const handleFloat3000 = () => {
    setNumber3000(cutt_3000)
  }

  const handleNumber4000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber4000(input)
  }

  const handleFloat4000 = () => {
    setNumber4000(cutt_4000)
  }
  
  const handleNumber5000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber5000(input)
  }

  const handleFloat5000 = () => {
    setNumber5000(cutt_5000)
  }  
 
  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
            Database {'>'} Cutting Sheet {'>'} Edit
            </Typography>

            <Field 
              fullWidth
              component={TextFieldInput}
              name="cutt_type"
              type="text"
              label="Type"
              value={cutt_type}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              onChange={(e: any) => {
                setCuttingType(e.target.value);
              }}
            />
            <br />
            <br />
            <Box sx={{ color: 'error.main' }}>* All items need to be input.</Box><br/>
            <Field
              name="fold_finished_size"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Finished Size *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Finished Size"
                    onChange={(e: any) => {
                      setCuttingFinishedSize(e.target.value);
                    }}
                    value={cutt_finished_size}
                    fullWidth
                  >
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="A5">A5</MenuItem>
                    <MenuItem value="B4">B4</MenuItem>
                    <MenuItem value="B5">B5</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cutt_page"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Page *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Page"
                    onChange={(e: any) => {
                      setCuttingPage(e.target.value);
                    }}
                    value={cutt_page}
                    fullWidth
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cutt_text_paper"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Text Paper *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Text Paper"
                    onChange={(e: any) => {
                      setCuttingCoverPaper(e.target.value);
                    }}
                    value={cutt_text_paper}
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
              name="cutt_printing"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Printing color *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Printing color"
                    onChange={(e: any) => {
                      setCuttingPrinting(e.target.value);
                    }}
                    value={cutt_printing}
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
              name="cutt_text_coating"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Coating *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Coating"
                    onChange={(e: any) => {
                      setCuttingCoating(e.target.value);
                    }}
                    value={cutt_text_coating}
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
              name="cutt_500"
              type="number"
              label="500"
              value={cutt_500}
              onChange = {handleNumber500}
              onKeyUp = {handleFloat500}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="cutt_1000"
              type="number"
              label="1,000"
              value={cutt_1000}
              onChange = {handleNumber1000}
              onKeyUp = {handleFloat1000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="cutt_2000"
              type="number"
              label="2,000"
              value={cutt_2000}
              onChange = {handleNumber2000}
              onKeyUp = {handleFloat2000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="cutt_3000"
              type="number"
              label="3,000"
              value={cutt_3000}
              onChange = {handleNumber3000}
              onKeyUp = {handleFloat3000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="cutt_4000"
              type="number"
              label="4,000"
              value={cutt_4000}
              onChange = {handleNumber4000}
              onKeyUp = {handleFloat4000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="cutt_5000"
              type="number"
              label="5,000"
              value={cutt_5000}
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
              onClick={() => router.push("/admin/cutting_sheet")}
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
              data.append("cutt_type", String(cutt_type));
              data.append("cutt_finished_size", String(cutt_finished_size));
              data.append("cutt_page", String(cutt_page));
              data.append("cutt_text_paper", String(cutt_text_paper));
              data.append("cutt_printing", String(cutt_printing));
              data.append("cutt_text_coating", String(cutt_text_coating));
              data.append("cutt_500", String(cutt_500));
              data.append("cutt_1000", String(cutt_1000));
              data.append("cutt_2000", String(cutt_2000));
              data.append("cutt_3000", String(cutt_3000));
              data.append("cutt_4000", String(cutt_4000));
              data.append("cutt_5000", String(cutt_5000));

              data.append("cutt_id", id);

              dispatch(editCuttingSheet(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/cutting_sheet");
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
