import Layout from "@/components/admin/Layout/Layout";
import withAuth from "@/components/admin/withAuth";
import React, { useRef } from "react";
import Box from "@mui/material/Box";
import { TextField as TextFieldInput} from "formik-material-ui";
import { Field, Form, Formik, FormikProps } from "formik";
import { Button, Card, CardContent, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import { appDispatch, appSelector } from "@/store/hooks";
import {
  addFolding,
  getCoverPaper,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/folding";
import router from "next/router";
import { string } from "yup";

const initialValues: any = {
  fold_type: "",
  fold_finished_size: "",
  fold_open_size: "",
  fold_column: "",
  fold_page: "",
  fold_text_paper: "",
  fold_printing: "",
  fold_text_coating: "",
  fold_500: 0,
  fold_1000: 0,
  fold_2000: 0,
  fold_3000: 0,
  fold_4000: 0,
  fold_5000: 0,
};

function Add() {
  const dispatch = appDispatch();
  const { data, data_text_no, data_text_paper, data_printing } = appSelector(
    (state) => state.folding
  );
  const editorRef = useRef<any>(null);
  const [fold_type, setType] = React.useState<String>("Folding");
  const [fold_finished_size, setFinishedSize] = React.useState<String>("");
  const [fold_open_size, setCover] = React.useState<String>("");
  const [level, setLevel] = React.useState<String>("Administrator");
  const [fold_column, setFolding] = React.useState<String>("");
  const [fold_page, setSCoverPaper] = React.useState<String>("");
  const [s_printing, setPrinting] = React.useState<String>("");
  const [s_text_no, setSTextNo] = React.useState<String>("");
  const [fold_text_paper, setSTextPaper] = React.useState<String>("");
  const [s_cover_coating, setSaddCoverCoating] = React.useState<String>("");
  const [fold_text_coating, setSaddTextCoating] = React.useState<String>("");
  const [s_500, setNumber500] = React.useState();
  const [s_1000, setNumber1000] = React.useState();
  const [s_2000, setNumber2000] = React.useState();
  const [s_3000, setNumber3000] = React.useState();
  const [s_4000, setNumber4000] = React.useState();
  const [s_5000, setNumber5000] = React.useState();

  const handleNumber500 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber500(input)
  }

  const handleFloat500 = () => {
    setNumber500(s_500)
  }  

  const handleNumber1000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber1000(input)
  }

  const handleFloat1000 = () => {
    setNumber1000(s_1000)
  }

  const handleNumber2000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber2000(input)
  }

  const handleFloat2000 = () => {
    setNumber2000(s_2000)
  }

  const handleNumber3000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber3000(input)
  }

  const handleFloat3000 = () => {
    setNumber3000(s_3000)
  }

  const handleNumber4000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber4000(input)
  }

  const handleFloat4000 = () => {
    setNumber4000(s_4000)
  }
  
  const handleNumber5000 = (e:any) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber5000(input)
  }

  const handleFloat5000 = () => {
    setNumber5000(s_5000)
  }  

  React.useEffect(() => {
    dispatch(getCoverPaper("get"));
    dispatch(getTextPaper("get"));
    dispatch(getTextNo("get"));
    dispatch(getPrinting("get"));
  }, [dispatch]);

  var rows: any = data ?? [];
  var rows_text_no: any = data_text_no ?? [];
  var rows_text_paper: any = data_text_paper ?? [];
  var rows_printing: any = data_printing ?? [];

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {'>'} Folding {'>'} Add one by one
            </Typography>

            <Field
              fullWidth
              component={TextFieldInput}
              name="fold_type"
              type="text"
              label="Type"
              value={fold_type}
              id="filled-read-only-input"
              InputProps={{
              readOnly: true,
              }}
              variant="filled"
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
                      setFinishedSize(e.target.value);
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
                      setCover(e.target.value);
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
                      setFolding(e.target.value);
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
                      setSCoverPaper(e.target.value);
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
                    label="Text paper"
                    onChange={(e: any) => {
                      setSTextPaper(e.target.value);
                    }}
                    value={fold_text_paper}
                    fullWidth
                  >
                    {rows_text_paper.length > 0
                      ? rows_text_paper.map((value: any) => (
                          <MenuItem key={value?.text_id} value={value.text_name}>
                            {value.text_name}
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
                      setPrinting(e.target.value);
                    }}
                    value={s_printing}
                    fullWidth
                  >
                    {rows_printing.length > 0
                      ? rows_printing.map((value: any) => (
                          <MenuItem key={value?.printing_id} value={value.printing_name}>
                            {value.printing_name}
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
                      setSaddTextCoating(e.target.value);
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
              value={s_500}
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
              value={s_1000}
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
              value={s_2000}
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
              value={s_3000}
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
              value={s_4000}
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
              value={s_5000}
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
              // if (!values.fold_1000) errors.fold_1000 = "Enter 1000";
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
              data.append("fold_printing", String(s_printing));
              data.append("fold_text_coating", String(fold_text_coating));
              data.append("fold_500", String(s_500));
              data.append("fold_1000", String(s_1000));
              data.append("fold_2000", String(s_2000));
              data.append("fold_3000", String(s_3000));
              data.append("fold_4000", String(s_4000));
              data.append("fold_5000", String(s_5000));
              dispatch(addFolding(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been added",
                    "success"
                  ).then(function () {
                    router.push("/admin/folding");
                  });
                } else {
                  Swal.fire("Error!", "Please check your input", "error").then(
                    function () {
                      return false;
                    }
                  );
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

export default withAuth(Add);
