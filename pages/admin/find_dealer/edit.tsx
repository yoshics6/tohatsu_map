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
import { getTextNo, editTextNo, getTextNoById } from "@/features/admin/text_no";
import router, { useRouter } from "next/router";

function Edit() {
  const dispatch = appDispatch();
  const id: any = router.query.id;
  const editorRef = useRef<any>(null);
  const [status, setStatus] = React.useState<String>("active");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const { data } = appSelector((state) => state.cover_paper);
  const [text_no_name, setTextNo_name] = React.useState<String>("");

  if (data) {
    if (data.length === 0) {
      router.push("/admin/text_no");
    }
  }
  React.useEffect(() => {
    dispatch(getTextNoById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setTextNo_name(value.payload[0].text_no_name);
        }
      }
    });
  }, [dispatch, id]);

  const initialValues: any = {
    text_no_name: text_no_name,
  };

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h4">
            Setting {'>'} Text No {'>'} Edit
            </Typography>

            <Field
              fullWidth
              component={TextFieldInput}
              name="text_no_name"
              type="text"
              label="Name"
              value={text_no_name}
              onChange={(e: any) => {
                setTextNo_name(e.target.value);
              }}
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
              onClick={() => router.push("/admin/text_no")}
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
              if (!String(text_no_name)) errors.text_no_name = "Enter Name";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              let data = new FormData();
              data.append("text_no_name", String(text_no_name));
              data.append("text_no_id", id);
              dispatch(editTextNo(data)).then((result: any) => {
                if (result.payload.data.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your data has been updated",
                    "success"
                  ).then(function () {
                    router.push("/admin/text_no");
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
