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
  getPaperBag,
  editPaperBag,
  getPaperBagById,
  // getCoverPaperEdit,
  // getTextPaper,
  // getTextNo,
  // getPrinting,
} from "@/features/admin/paper_bag";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.paper_bag);

  const [papb_type, setType] = React.useState<String>("Paper Bag");
  const [papb_finished_size, setFinishedSize] = React.useState<String>("");
  const [cutt_open_size, setCover] = React.useState<String>("");
  const [level, setLevel] = React.useState<String>("Administrator");
  const [cutt_column, setcutting] = React.useState<String>("");
  const [papb_page, setSCoverPaper] = React.useState<String>("");
  const [papb_printing, setPrinting] = React.useState<String>("");
  const [s_text_no, setSTextNo] = React.useState<String>("");
  const [papb_paper, setSTextPaper] = React.useState<String>("");
  const [papb_binding, setBinding] = React.useState<String>("");
  const [papb_coating, setSaddTextCoating] = React.useState<String>("");
  const [s_100, setNumber100] = React.useState("");
  const [s_200, setNumber200] = React.useState("");
  const [s_300, setNumber300] = React.useState("");
  const [s_400, setNumber400] = React.useState("");
  const [s_500, setNumber500] = React.useState("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/paper_bag");
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
    dispatch(getPaperBagById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setType(value.payload[0].papb_type);
          setFinishedSize(value.payload[0].papb_finished_size);
          setSCoverPaper(value.payload[0].papb_page);
          setSTextPaper(value.payload[0].papb_paper);
          setPrinting(value.payload[0].papb_printing);
          setPrinting(value.payload[0].papb_printing);
          setSaddTextCoating(value.payload[0].papb_coating);
          setBinding(value.payload[0].papb_binding);
          setNumber100(value.payload[0].papb_100);
          setNumber200(value.payload[0].papb_200);
          setNumber300(value.payload[0].papb_300);
          setNumber400(value.payload[0].papb_400);
          setNumber500(value.payload[0].papb_500);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    papb_type: papb_type,
    papb_finished_size: papb_finished_size,
    papb_page: papb_page,
    papb_paper: papb_paper,
    papb_printing: papb_printing,
    papb_coating: papb_coating,
    papb_binding: papb_binding,
    papb_100: s_100,
    papb_200: s_200,
    papb_300: s_300,
    papb_400: s_400,
    papb_500: s_500,
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
              Database {">"} Paper Bag {">"} Edit
            </Typography>

            <Field
              fullWidth
              component={TextFieldInput}
              name="papb_type"
              type="text"
              label="Type"
              value={papb_type}
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
              name="papb_finished_size"
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
                    value={papb_finished_size}
                    fullWidth
                  >
                    <MenuItem value="W 25 x H 16 x D 12 cm.">
                      W 25 x H 16 x D 12 cm.
                    </MenuItem>
                    <MenuItem value="W 25 x H 33 x D 12 cm.">
                      W 25 x H 33 x D 12 cm.
                    </MenuItem>
                    <MenuItem value="W 30 x H 40 x  D 9 cm.">
                      W 30 x H 40 x D 9 cm.
                    </MenuItem>
                    <MenuItem value="W 35 x H 25 x  D 9 cm.">
                      W 35 x H 25 x D 9 cm.
                    </MenuItem>
                    <MenuItem value="W 35 x H 45 x  D 9 cm.">
                      W 35 x H 45 x D 9 cm.
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            {/* <Field
              name="papb_page"
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
                    value={papb_page}
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
              name="papb_paper"
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
                    value={papb_paper}
                    fullWidth
                  >
                    <MenuItem value="Art Card 190 gsm">
                      Art Card 190 gsm
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="papb_printing"
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
                    value={papb_printing}
                    fullWidth
                  >
                    <MenuItem value="4/0C">4/0C</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="papb_coating"
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
                    value={papb_coating}
                    fullWidth
                  >
                    <MenuItem value="PVC">PVC</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <Field
              name="papb_binding"
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
                    value={papb_binding}
                    fullWidth
                  >
                    <MenuItem value="White Nylon rope">
                      White Nylon rope
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
              name="papb_100"
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
              name="papb_200"
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
              name="papb_300"
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
              name="papb_400"
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
              name="papb_500"
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
              onClick={() => router.push("/admin/paper_bag")}
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
              data.append("papb_type", String(papb_type));
              data.append("papb_finished_size", String(papb_finished_size));
              data.append("papb_page", /* String(papb_page) */ '1');
              data.append("papb_paper", String(papb_paper));
              data.append("papb_printing", String(papb_printing));
              data.append("papb_coating", String(papb_coating));
              data.append("papb_binding", String(papb_binding));
              data.append("papb_100", String(s_100));
              data.append("papb_200", String(s_200));
              data.append("papb_300", String(s_300));
              data.append("papb_400", String(s_400));
              data.append("papb_500", String(s_500));

              data.append("papb_id", id);

              dispatch(editPaperBag(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/paper_bag");
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
