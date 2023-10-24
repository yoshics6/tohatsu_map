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
  getEnvelope,
  editEnvelope,
  getEnvelopeById,
  // getCoverPaperEdit,
  // getTextPaper,
  // getTextNo,
  // getPrinting,
} from "@/features/admin/envelope";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.envelope);

  const [enve_type, setType] = React.useState<String>("Envelope");
  const [enve_finished_size, setFinishedSize] = React.useState<String>("");
  const [cutt_open_size, setCover] = React.useState<String>("");
  const [level, setLevel] = React.useState<String>("Administrator");
  const [cutt_column, setcutting] = React.useState<String>("");
  const [enve_page, setSCoverPaper] = React.useState<String>("");
  const [enve_printing, setPrinting] = React.useState<String>("");
  const [s_text_no, setSTextNo] = React.useState<String>("");
  const [enve_paper, setSTextPaper] = React.useState<String>("");
  const [enve_coating, setCoating] = React.useState<String>("");
  const [s_1000, setNumber1000] = React.useState("");
  const [s_2000, setNumber2000] = React.useState("");
  const [s_3000, setNumber3000] = React.useState("");
  const [s_4000, setNumber4000] = React.useState("");
  const [s_5000, setNumber5000] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/envelope");
    }
  }

  React.useEffect(() => {
    // dispatch(getCoverPaperEdit("get"));
    // dispatch(getTextPaper("get"));
    // dispatch(getTextNo("get"));
    // dispatch(getPrinting("get"));
  }, [dispatch]);

  // var rows: any = data ?? [];
  // var rows_text_no: any = data_text_no ?? [];
  // var rows_data_cover_paper : any = data_cover_paper_edit ?? [];
  // var rows_text_paper: any = data_text_paper ?? [];
  // var rows_printing: any = data_printing ?? [];

  React.useEffect(() => {
    dispatch(getEnvelopeById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setType(value.payload[0].enve_type);
          setFinishedSize(value.payload[0].enve_finished_size);
          setSCoverPaper(value.payload[0].enve_page);
          setSTextPaper(value.payload[0].enve_paper);
          setPrinting(value.payload[0].enve_printing);
          setPrinting(value.payload[0].enve_printing);
          setCoating(value.payload[0].enve_coating);
          setNumber1000(value.payload[0].enve_1000);
          setNumber2000(value.payload[0].enve_2000);
          setNumber3000(value.payload[0].enve_3000);
          setNumber4000(value.payload[0].enve_4000);
          setNumber5000(value.payload[0].enve_5000);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    enve_type: enve_type,
    enve_finished_size: enve_finished_size,
    enve_page: enve_page,
    enve_paper: enve_paper,
    enve_printing: enve_printing,
    enve_coating: enve_coating,
    enve_1000: s_1000,
    enve_2000: s_2000,
    enve_3000: s_3000,
    enve_4000: s_4000,
    enve_5000: s_5000,
  };

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

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {">"} Envelope {">"} Edit
            </Typography>

            <Field
              fullWidth
              component={TextFieldInput}
              name="enve_type"
              type="text"
              label="Type"
              value={enve_type}
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
              name="enve_finished_size"
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
                    value={enve_finished_size}
                    fullWidth
                  >
                    <MenuItem value='Envelope A4  (9" x 12.75")'>
                      Envelope A4  (9" x 12.75")
                    </MenuItem>
                    <MenuItem value='Envelope No. 9 (108 x 235 mm.)'>
                      Envelope No. 9 (108 x 235 mm.)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="enve_page"
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
                    value={enve_page}
                    fullWidth
                  >
                    <MenuItem value="1">1</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="enve_paper"
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
                    value={enve_paper}
                    fullWidth
                  >
                    <MenuItem value="KA paper">
                      KA paper
                    </MenuItem>
                    <MenuItem value="Woodfree 100 gsm">
                      Woodfree 100 gsm
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="enve_printing"
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
                    value={enve_printing}
                    fullWidth
                  >
                    <MenuItem value="1/0C">1/0C</MenuItem>
                    <MenuItem value="2/0C">2/0C</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="enve_coating"
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
                      setCoating(e.target.value);
                    }}
                    value={enve_coating}
                    fullWidth
                  >
                    <MenuItem value="No coating">No coating</MenuItem>
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
              name="enve_1000"
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
              name="enve_2000"
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
              name="enve_3000"
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
              name="enve_4000"
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
              name="enve_5000"
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
              onClick={() => router.push("/admin/envelope")}
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
              data.append("enve_type", String(enve_type));
              data.append("enve_finished_size", String(enve_finished_size));
              data.append("enve_page", String(enve_page));
              data.append("enve_paper", String(enve_paper));
              data.append("enve_printing", String(enve_printing));
              data.append("enve_coating", String(enve_coating));
              data.append("enve_1000", String(s_1000));
              data.append("enve_2000", String(s_2000));
              data.append("enve_3000", String(s_3000));
              data.append("enve_4000", String(s_4000));
              data.append("enve_5000", String(s_5000));

              data.append("enve_id", id);

              dispatch(editEnvelope(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/envelope");
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
