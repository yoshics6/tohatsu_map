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
  getCalendar,
  editCalendar,
  getCalendarById,
  // getCoverPaperEdit,
  // getTextPaper,
  // getTextNo,
  // getPrinting,
} from "@/features/admin/calendar";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.calendar);

  const [cale_type, setType] = React.useState<String>("Calendar");
  const [cale_finished_size, setFinishedSize] = React.useState<String>("");
  const [cutt_open_size, setCover] = React.useState<String>("");
  const [level, setLevel] = React.useState<String>("Administrator");
  const [cutt_column, setcutting] = React.useState<String>("");
  const [cale_page, setSCoverPaper] = React.useState<String>("");
  const [cale_printing, setPrinting] = React.useState<String>("");
  const [s_text_no, setSTextNo] = React.useState<String>("");
  const [cale_paper, setSTextPaper] = React.useState<String>("");
  const [cale_binding, setBinding] = React.useState<String>("");
  const [cale_stand, setSaddTextCoating] = React.useState<String>("");
  const [cale_o_ring_color, setORingColor] = React.useState<String>("");
  const [s_100, setNumber100] = React.useState("");
  const [s_200, setNumber200] = React.useState("");
  const [s_300, setNumber300] = React.useState("");
  const [s_400, setNumber400] = React.useState("");
  const [s_500, setNumber500] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/calendar");
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
    dispatch(getCalendarById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setType(value.payload[0].cale_type);
          setFinishedSize(value.payload[0].cale_finished_size);
          setSCoverPaper(value.payload[0].cale_page);
          setSTextPaper(value.payload[0].cale_paper);
          setPrinting(value.payload[0].cale_printing);
          setPrinting(value.payload[0].cale_printing);
          setSaddTextCoating(value.payload[0].cale_stand);
          setBinding(value.payload[0].cale_binding);
          setORingColor(value.payload[0].cale_o_ring_color);
          setNumber100(value.payload[0].cale_100);
          setNumber200(value.payload[0].cale_200);
          setNumber300(value.payload[0].cale_300);
          setNumber400(value.payload[0].cale_400);
          setNumber500(value.payload[0].cale_500);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    cale_type: cale_type,
    cale_finished_size: cale_finished_size,
    cale_page: cale_page,
    cale_paper: cale_paper,
    cale_printing: cale_printing,
    cale_stand: cale_stand,
    cale_binding: cale_binding,
    cale_o_ring_color: cale_o_ring_color,
    cale_100: s_100,
    cale_200: s_200,
    cale_300: s_300,
    cale_400: s_400,
    cale_500: s_500,
  };

  const handleNumber100 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber100(input);
  };

  const handleFloat100 = () => {
    setNumber100(s_100);
  };

  const handleNumber200 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber200(input);
  };

  const handleFloat200 = () => {
    setNumber200(s_200);
  };

  const handleNumber300 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber300(input);
  };

  const handleFloat300 = () => {
    setNumber300(s_300);
  };

  const handleNumber400 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber400(input);
  };

  const handleFloat400 = () => {
    setNumber400(s_400);
  };

  const handleNumber500 = (e: any) => {
    let input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber500(input);
  };

  const handleFloat500 = () => {
    setNumber500(s_500);
  };

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
              Database {">"} Cutting Sheet {">"} Edit
            </Typography>

            <Field
              fullWidth
              component={TextFieldInput}
              name="cutt_type"
              type="text"
              label="Type"
              value={cale_type}
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
              name="fold_finished_size"
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
                    value={cale_finished_size}
                    fullWidth
                  >
                    <MenuItem value='5" x 7"'>5" x 7"</MenuItem>
                    <MenuItem value='6" x 8"'>6" x 8"</MenuItem>
                    <MenuItem value='7" x 10"'>7" x 10"</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cale_page"
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
                    value={cale_page}
                    fullWidth
                  >
                    <MenuItem value="8 Sheet">8 Sheet</MenuItem>
                    <MenuItem value="14 Sheet">14 Sheet</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cale_paper"
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
                    value={cale_paper}
                    fullWidth
                  >
                    <MenuItem value="Art card 230 g.">Art card 230 g.</MenuItem>
                    <MenuItem value="White card 240 g.">
                      White card 240 g.
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cale_printing"
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
                    value={cale_printing}
                    fullWidth
                  >
                    <MenuItem value="4/4c">4/4c</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cale_stand"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>Stand *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Stand"
                    onChange={(e: any) => {
                      setSaddTextCoating(e.target.value);
                    }}
                    value={cale_stand}
                    fullWidth
                  >
                    <MenuItem value="No print">No print</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cale_binding"
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
                    value={cale_binding}
                    fullWidth
                  >
                    <MenuItem value="4 Wire O ring 2 Position">
                      4 Wire O ring 2 Position
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="cale_o_ring_color"
              style={{ marginTop: 20 }}
              component={() => (
                <FormControl fullWidth>
                  <InputLabel>O ring Color *</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="O ring Color"
                    onChange={(e: any) => {
                      setORingColor(e.target.value);
                    }}
                    value={cale_o_ring_color}
                    fullWidth
                  >
                    <MenuItem value="White">
                      White
                    </MenuItem>
                    <MenuItem value="Black">
                      Black
                    </MenuItem>
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
              name="cale_100"
              type="number"
              label="100"
              value={s_100}
              onChange={handleNumber100}
              onKeyUp={handleFloat100}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="cale_200"
              type="number"
              label="200"
              value={s_200}
              onChange={handleNumber200}
              onKeyUp={handleFloat200}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="cale_300"
              type="number"
              label="300"
              value={s_300}
              onChange={handleNumber300}
              onKeyUp={handleFloat300}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="cale_400"
              type="number"
              label="400"
              value={s_400}
              onChange={handleNumber400}
              onKeyUp={handleFloat400}
            />
            <br />
            <br />
            <Field
              required
              fullWidth
              component={TextFieldInput}
              name="cale_500"
              type="number"
              label="500"
              value={s_500}
              onChange={handleNumber500}
              onKeyUp={handleFloat500}
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
              onClick={() => router.push("/admin/calendar")}
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
              data.append("cale_type", String(cale_type));
              data.append("cale_finished_size", String(cale_finished_size));
              data.append("cale_page", String(cale_page));
              data.append("cale_paper", String(cale_paper));
              data.append("cale_printing", String(cale_printing));
              data.append("cale_stand", String(cale_stand));
              data.append("cale_binding", String(cale_binding));
              data.append("cale_o_ring_color", String(cale_o_ring_color));
              data.append("cale_100", String(s_100));
              data.append("cale_200", String(s_200));
              data.append("cale_300", String(s_300));
              data.append("cale_400", String(s_400));
              data.append("cale_500", String(s_500));

              data.append("cale_id", id);

              dispatch(editCalendar(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/calendar");
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
