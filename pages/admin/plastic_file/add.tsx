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
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import { appDispatch, appSelector } from "@/store/hooks";
import { addPlasticFile } from "@/features/admin/plastic_file";
import router from "next/router";
import { string } from "yup";

const initialValues: any = {
  plas_type: "",
  plas_finished_size: "",
  plas_page: "",
  plas_paper: "",
  plas_printing: "",
  // plas_coating: "",
  plas_binding: "",
  plas_1000: 0,
  plas_2000: 0,
  plas_3000: 0,
  plas_4000: 0,
  plas_5000: 0,
};

function Add() {
  const dispatch = appDispatch();
  const { data } = appSelector((state) => state.plastic_file);
  const editorRef = useRef<any>(null);
  const [plas_type, setType] = React.useState<String>("Plastic File A4");
  const [plas_finished_size, setFinishedSize] = React.useState<String>("");
  const [cutt_open_size, setCover] = React.useState<String>("");
  const [level, setLevel] = React.useState<String>("Administrator");
  const [cutt_column, setcutting] = React.useState<String>("");
  const [plas_page, setSCoverPaper] = React.useState<String>("");
  const [plas_printing, setPrinting] = React.useState<String>("");
  const [s_text_no, setSTextNo] = React.useState<String>("");
  const [plas_paper, setSTextPaper] = React.useState<String>("");
  const [plas_binding, setBinding] = React.useState<String>("");
  // const [plas_coating, setSaddTextCoating] = React.useState<String>("");
  const [s_1000, setNumber1000] = React.useState();
  const [s_2000, setNumber2000] = React.useState();
  const [s_3000, setNumber3000] = React.useState();
  const [s_4000, setNumber4000] = React.useState();
  const [s_5000, setNumber5000] = React.useState();

  const handleNumber1000 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber1000(input);
  };

  const handleFloat1000 = () => {
    setNumber1000(s_1000);
  };

  const handleNumber2000 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber2000(input);
  };

  const handleFloat2000 = () => {
    setNumber2000(s_2000);
  };

  const handleNumber3000 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber3000(input);
  };

  const handleFloat3000 = () => {
    setNumber3000(s_3000);
  };

  const handleNumber4000 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber4000(input);
  };

  const handleFloat4000 = () => {
    setNumber4000(s_4000);
  };

  const handleNumber5000 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber5000(input);
  };

  const handleFloat5000 = () => {
    setNumber5000(s_5000);
  };

  // React.useEffect(() => {
  //   dispatch(getCoverPaper("get"));
  //   dispatch(getTextPaper("get"));
  //   dispatch(getTextNo("get"));
  //   dispatch(getPrinting("get"));
  // }, [dispatch]);

  var rows: any = data ?? [];

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {">"} Plastic File {">"} Add one by one
            </Typography>

            <Field
              fullWidth
              component={TextFieldInput}
              name="plas_type"
              type="text"
              label="Type"
              value={plas_type}
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
              name="plas_finished_size"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Finished Size *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Finished Size"
                    onChange={(e: any) => {
                      setFinishedSize(e.target.value);
                    }}
                    value={plas_finished_size}
                    fullWidth
                  >
                    <MenuItem value="W 22 cm x H 31 cm x Thickness 0.20 mm">
                      W 22 cm x H 31 cm x Thickness 0.20 mm
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            {/* <Field
              name="plas_page"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Page *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Page"
                    onChange={(e: any) => {
                      setSCoverPaper(e.target.value);
                    }}
                    value={plas_page}
                    fullWidth
                  >
                    <MenuItem value="1">1</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br /> */}
            <Field
              name="plas_paper"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Paper *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Paper"
                    onChange={(e: any) => {
                      setSTextPaper(e.target.value);
                    }}
                    value={plas_paper}
                    fullWidth
                  >
                    <MenuItem value="Clear PP (Transparent)">
                      Clear PP (Transparent)
                    </MenuItem>
                    <MenuItem value="Clear PP (White background)">
                      Clear PP (White background)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="plas_printing"
              style={{ marginTop: 16 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Printing color *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Printing color"
                    onChange={(e: any) => {
                      setPrinting(e.target.value);
                    }}
                    value={plas_printing}
                    fullWidth
                  >
                    <MenuItem value="4/0C">4/0C</MenuItem>
                    <MenuItem value="5/0C">5/0C</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            {/* <Field
              name="plas_coating"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Coating *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Coating"
                    onChange={(e: any) => {
                      setSaddTextCoating(e.target.value);
                    }}
                    value={plas_coating}
                    fullWidth
                  >
                    <MenuItem value="-">-</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br /> */}
            <Field
              name="plas_binding"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Binding *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Binding"
                    onChange={(e: any) => {
                      setBinding(e.target.value);
                    }}
                    value={plas_binding}
                    fullWidth
                  >
                    <MenuItem value="Die-cut">Die-cut</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="plas_1000"
              type="number"
              label="1,000"
              value={s_1000}
              onChange={handleNumber1000}
              onKeyUp={handleFloat1000}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="plas_2000"
              type="number"
              label="2,000"
              value={s_2000}
              onChange={handleNumber2000}
              onKeyUp={handleFloat2000}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="plas_3000"
              type="number"
              label="3,000"
              value={s_3000}
              onChange={handleNumber3000}
              onKeyUp={handleFloat3000}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="plas_4000"
              type="number"
              label="4,000"
              value={s_4000}
              onChange={handleNumber4000}
              onKeyUp={handleFloat4000}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="plas_5000"
              type="number"
              label="5,000"
              value={s_5000}
              onChange={handleNumber5000}
              onKeyUp={handleFloat5000}
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
              onClick={() => router.push("/admin/plastic_file")}
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
              // if (!values.cutt_1000) errors.cutt_1000 = "Enter 1000";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              let data = new FormData();
              data.append("plas_type", String(plas_type));
              data.append("plas_finished_size", String(plas_finished_size));
              data.append("plas_page", /* String(plas_page) */ '1');
              data.append("plas_paper", String(plas_paper));
              data.append("plas_printing", String(plas_printing));
              // data.append("plas_coating", String(plas_coating));
              data.append("plas_binding", String(plas_binding));
              data.append("plas_1000", String(s_1000));
              data.append("plas_2000", String(s_2000));
              data.append("plas_3000", String(s_3000));
              data.append("plas_4000", String(s_4000));
              data.append("plas_5000", String(s_5000));
              dispatch(addPlasticFile(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been added",
                    "success"
                  ).then(function () {
                    router.push("/admin/plastic_file");
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
