import React from "react";
import styles from "@/styles/View.module.css";

//Sweetalert
import Swal from "sweetalert2";

//React Hook Form
import { Controller, useForm } from "react-hook-form";
//Yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//MUI
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import { isAbsolute } from "path";

import { appDispatch, appSelector } from "@/store/hooks";
import { getResetPasswordById } from "@/features/admin/forgot_password";
import router, { useRouter } from "next/router";

type Props = {};

interface ForgotPassword {
  email: string;
  password: string;
  confirm_password: string;
}

const ResetPassword = ({ }: Props) => {
  const dispatch = appDispatch();
  const id: any = router.query.token;
  const [reset_password, setResetPassword] = React.useState<String>("");

  React.useEffect(() => {
    dispatch(getResetPasswordById(id)).then((value: any) => {
      if (value.payload) {
        if (value.payload.length > 0) {
          setResetPassword(value.payload[0].email);
        }
      }
    });
  }, [dispatch, id]);

  const errorColor = red[500];
  const defaultValue: ForgotPassword = {
    email: "",
    password: "",
    confirm_password: "",
  };
  const formValidateSchema = Yup.object().shape({
    password: Yup.string().required("Password is required").trim(),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .trim(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>({
    defaultValues: defaultValue,
    resolver: yupResolver(formValidateSchema),
  });

  const onSubmit = async (data: ForgotPassword) => {
    try {
      const formData = new FormData();
      formData.append("email", String(reset_password));
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);

      const URL = process.env.NEXT_PUBLIC_BASE_URL_API;
      await fetch(`${URL}/forgot_password/add`, {
        method: "PUT",
        body: formData,
      })
        .then(async (rawResponse) => {
          rawResponse.json().then((data) => {
            if (data == "weak") {
              Swal.fire(
                "Failed!",
                "The password must have at least 8 characters and contain numbers and special letters. <br> Example: Asd1234!",
                "error"
              ).then(function () {
                return false;
              });
            } else if (data == "Please check your password") {
              Swal.fire("Failed!", "Please check your password", "error").then(
                function () {
                  return false;
                }
              );
            } else if (data.status == "success") {
              Swal.fire("Success!", "", "success").then(function () {
                location.href = "/admin/login";
              });
              return false;
            } else {
              Swal.fire("Error!", "", "error").then(function () {
                return false;
              });
            }
          });
        })
        .catch((error) => {
          Swal.fire("Error!", "", "error").then(function () {
            return false;
          });
          return false;
        });
    } catch (e) {
      console.log("error!");
    }
  };

  // Modal
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [forgot_password, setForgotPassword] = React.useState("");

  const onSubmitModal = async (event: any) => {
    event.preventDefault();
    setOpen(false);
    try {
      const formData = new FormData();
      formData.append("forgot_password", `${forgot_password}`);
      const URL = process.env.NEXT_PUBLIC_BASE_URL_API;
      await fetch(`${URL}/forgot_password/forgot_password`, {
        method: "POST",
        body: formData,
      })
        .then(async (rawResponse) => {
          rawResponse.json().then((data) => {
            if (data.status == "success") {
              Swal.fire("Success!", "", "success").then(function () {
                location.href = "/login";
              });
              return false;
            } else {
              Swal.fire("Email not found.", "", "error").then(function () {
                return false;
              });
            }
          });
        })
        .catch((error) => {
          Swal.fire("Email not found.", "", "error").then(function () {
            return false;
          });
          return false;
        });
    } catch (e) {
      console.log("error!");
    }
  };
  // End Modal

  const [type, setType] = React.useState<string>("password");
  const [icon, setIcon] = React.useState(eyeOff);

  const eyeOffConfirm = eyeOff;
  const [typec, setTypeC] = React.useState<string>("password");
  const [iconc, setIconC] = React.useState(eyeOffConfirm);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleToggleConfirm = () => {
    if (typec === "password") {
      setIconC(eye);
      setTypeC("text");
    } else {
      setIconC(eyeOffConfirm);
      setTypeC("password");
    }
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      display="flex"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 10,
          borderRadius: 5,
          p: 2,
          textAlign: "center",
        }}
        style={{ width: 600 }}
      >
        <Typography component="h1" variant="h5">
          TOHATSU
        </Typography>
        <br />
        <Typography component="h1" variant="h6" style={{ color: "blue" }}>
          PLEASE INPUT YOUR NEW PASSWORD
        </Typography>
        <br />
        <Typography component="h1" align="center" style={{ color: "red" }}>
          The password must be at least 8 digits, containing upper case , figure and special character.
        </Typography>
        <br />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="email"
                label="Email"
                type="text"
                fullWidth
                value={reset_password}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            )}
            name="email"
            control={control}
            defaultValue=""
          />
          {errors.email?.message && (
            <Typography sx={{ color: errorColor }}>
              {errors.email?.message}
            </Typography>
          )}
          <br />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                label="Password"
                type={type}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                autoComplete="new-password"
                sx={{ marginTop: "10px" }}
              />
            )}
            name="password"
            control={control}
            defaultValue=""
          />
          <span
            style={{
              position: "absolute",
              marginLeft: "-40px",
              marginTop: "25px",
            }}
            onClick={handleToggle}>
            <Icon icon={icon} size={25} />
          </span>
          {errors.password?.message && (
            <Typography sx={{ color: errorColor }}>
              {errors.password?.message}
            </Typography>
          )}
          <br />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="confirm_password"
                label="Confirm Password"
                type={typec}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                autoComplete="new-password"
                sx={{ marginTop: "10px" }}
              />
            )}
            name="confirm_password"
            control={control}
            defaultValue=""
          />
          <span
            style={{
              position: "absolute",
              marginLeft: "-40px",
              marginTop: "25px",
            }}
            onClick={handleToggleConfirm}
          >
            <Icon icon={iconc} size={25} />
          </span>
          {errors.confirm_password?.message && (
            <Typography sx={{ color: errorColor }}>
              {errors.confirm_password?.message}
            </Typography>
          )}
          {/* <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onClick={handleToggle}
              />
            }
            label="View confirm_password"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset
          </Button>
        </Box>

        {/* Modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style} style={{ textAlign: "center" }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Please input your e-mail address{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <br />
              <Box
                component="form"
                onSubmit={onSubmitModal}
                style={{ width: 500 }}
                autoComplete="off"
              >
                <TextField
                  required
                  fullWidth
                  id="forgot_password"
                  name="forgot_password"
                  value={forgot_password}
                  type="email"
                  label="example@xxx.com"
                  onChange={(event) => setForgotPassword(event.target.value)}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ marginTop: "10px" }}
                  fullWidth
                  type="submit"
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};

export default ResetPassword;

// import React from 'react'

// const ResetPassword = () => {
//   return (
//     <div>Coming soon</div>
//   )
// }

// export default ResetPassword