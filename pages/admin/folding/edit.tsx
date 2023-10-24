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
  getFolding,
  editFolding,
  getFoldingById,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/folding";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data, data_text_no, data_text_paper, data_printing  , data_cover_paper_edit} = appSelector((state) => state.folding);

  const [fold_type, setFoldType] = React.useState<String>("");
  const [fold_finished_size, setFoldFinishedSize] = React.useState<String>("");
  const [fold_open_size, setFoldOpenSize] = React.useState<String>("");
  const [fold_column, setFoldColumn] = React.useState<String>("");
  const [fold_page, setFoldPage] = React.useState<String>("");
  const [fold_text_paper, setFoldCoverPaper] = React.useState<String>("");
  const [fold_printing, setFoldPrinting] = React.useState<String>("");
  const [fold_text_coating, setFoldCoating] = React.useState<String>("");
  const [fold_500, setNumber500] = React.useState("");
  const [fold_1000, setNumber1000] = React.useState("");
  const [fold_2000, setNumber2000] = React.useState("");
  const [fold_3000, setNumber3000] = React.useState("");
  const [fold_4000, setNumber4000] = React.useState("");
  const [fold_5000, setNumber5000] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/folding");
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
    dispatch(getFoldingById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setFoldType(value.payload[0].fold_type);
          setFoldFinishedSize(value.payload[0].fold_finished_size);
          setFoldOpenSize(value.payload[0].fold_open_size);
          setFoldColumn(value.payload[0].fold_column);
          setFoldPage(value.payload[0].fold_page)
          setFoldCoverPaper(value.payload[0].fold_text_paper);
          setFoldPrinting(value.payload[0].fold_printing);
          setFoldCoating(value.payload[0].fold_text_coating);
          setNumber500(value.payload[0].fold_500);
          setNumber1000(value.payload[0].fold_1000);
          setNumber2000(value.payload[0].fold_2000);
          setNumber3000(value.payload[0].fold_3000);
          setNumber4000(value.payload[0].fold_4000);
          setNumber5000(value.payload[0].fold_5000);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    fold_type: fold_type,
    fold_finished_size: fold_finished_size,
    fold_open_size: fold_open_size,
    fold_column: fold_column,
    fold_page: 	fold_page,
    fold_text_paper: fold_text_paper,
    fold_printing: fold_printing,
    fold_text_coating: fold_text_coating,
    fold_500: fold_500,
    fold_1000: fold_1000,
    fold_2000: fold_2000,
    fold_3000: fold_3000,
    fold_4000: fold_4000,
    fold_5000: fold_5000,
  };

  const handleNumber500 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber500(input)
  }

  const handleFloat500 = () => {
    setNumber500(fold_500)
  }  

  const handleNumber1000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber1000(input)
  }

  const handleFloat1000 = () => {
    setNumber1000(fold_1000)
  }

  const handleNumber2000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber2000(input)
  }

  const handleFloat2000 = () => {
    setNumber2000(fold_2000)
  }

  const handleNumber3000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber3000(input)
  }

  const handleFloat3000 = () => {
    setNumber3000(fold_3000)
  }

  const handleNumber4000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber4000(input)
  }

  const handleFloat4000 = () => {
    setNumber4000(fold_4000)
  }
  
  const handleNumber5000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber5000(input)
  }

  const handleFloat5000 = () => {
    setNumber5000(fold_5000)
  }  

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {'>'} Folding {'>'} Edit
            </Typography>

            <Field 
              fullWidth
              component={TextFieldInput}
              name="fold_type"
              type="text"
              label="Type"
              value={fold_type}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              onChange={(e: any) => {
                setFoldType(e.target.value);
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
                      setFoldFinishedSize(e.target.value);
                    }}
                    value={fold_finished_size}
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
              name="fold_open_size"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Open Size *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Open Size"
                    onChange={(e: any) => {
                      setFoldOpenSize(e.target.value);
                    }}
                    value={fold_open_size}
                    fullWidth
                  >
                    <MenuItem value="630 x 297 mm.">630 x 297 mm.</MenuItem>
                    <MenuItem value="840 x 297 mm.">840 x 297 mm.</MenuItem>
                    <MenuItem value="A2">A2</MenuItem>
                    <MenuItem value="A3">A3</MenuItem>
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="B2">B2</MenuItem>
                    <MenuItem value="B3">B3</MenuItem>
                    <MenuItem value="B4">B4</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="fold_column"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Fold *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Fold"
                    onChange={(e: any) => {
                      setFoldColumn(e.target.value);
                    }}
                    value={fold_column}
                    fullWidth
                  >
                    <MenuItem value="1 Fold 2 Column">1 Fold 2 Column</MenuItem>
                    <MenuItem value="2 Fold 3 Column">2 Fold 3 Column</MenuItem>
                    <MenuItem value="2 Fold 4 Column">2 Fold 4 Column</MenuItem>
                    <MenuItem value="3 Fold 4 Column">3 Fold 4 Column</MenuItem>
                    <MenuItem value="3 Fold 8 Column">3 Fold 8 Column</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="fold_page"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Page *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Page"
                    onChange={(e: any) => {
                      setFoldPage(e.target.value);
                    }}
                    value={fold_page}
                    fullWidth
                  >
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="fold_text_paper"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Text Paper *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Text Paper"
                    onChange={(e: any) => {
                      setFoldCoverPaper(e.target.value);
                    }}
                    value={fold_text_paper}
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
              name="fold_printing"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Printing color *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Printing color"
                    onChange={(e: any) => {
                      setFoldPrinting(e.target.value);
                    }}
                    value={fold_printing}
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
              name="fold_text_coating"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Coating *</InputLabel>
                  <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Coating"
                    onChange={(e: any) => {
                      setFoldCoating(e.target.value);
                    }}
                    value={fold_text_coating}
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
              name="fold_500"
              type="number"
              label="500"
              value={fold_500}
              onChange = {handleNumber500}
              onKeyUp = {handleFloat500}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="fold_1000"
              type="number"
              label="1,000"
              value={fold_1000}
              onChange = {handleNumber1000}
              onKeyUp = {handleFloat1000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="fold_2000"
              type="number"
              label="2,000"
              value={fold_2000}
              onChange = {handleNumber2000}
              onKeyUp = {handleFloat2000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="fold_3000"
              type="number"
              label="3,000"
              value={fold_3000}
              onChange = {handleNumber3000}
              onKeyUp = {handleFloat3000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="fold_4000"
              type="number"
              label="4,000"
              value={fold_4000}
              onChange = {handleNumber4000}
              onKeyUp = {handleFloat4000}
            />
            <br />
            <br />
            <Field required
              fullWidth
              component={TextFieldInput}
              name="fold_5000"
              type="number"
              label="5,000"
              value={fold_5000}
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
              onClick={() => router.push("/admin/folding")}
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
              data.append("fold_type", String(fold_type));
              data.append("fold_finished_size", String(fold_finished_size));
              data.append("fold_open_size", String(fold_open_size));
              data.append("fold_column", String(fold_column));
              data.append("fold_page", String(fold_page));
              data.append("fold_text_paper", String(fold_text_paper));
              data.append("fold_printing", String(fold_printing));
              data.append("fold_text_coating", String(fold_text_coating));
              data.append("fold_500", String(fold_500));
              data.append("fold_1000", String(fold_1000));
              data.append("fold_2000", String(fold_2000));
              data.append("fold_3000", String(fold_3000));
              data.append("fold_4000", String(fold_4000));
              data.append("fold_5000", String(fold_5000));

              data.append("fold_id", id);

              dispatch(editFolding(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/folding");
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
