import React from "react";
//Sweetalert
import Swal from "sweetalert2";

//React Hook Form
import { Controller, useForm } from "react-hook-form";
//Yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//MUI
import { Container, Box, TextField, Button, Typography, Grid, Fade, Modal, Backdrop } from "@mui/material";
import { red } from "@mui/material/colors";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

type Props = {};

interface User {
  username: string;
  password: string;
}

interface UserModal {
  forgot_password: string;
}

const Login = ({ }: Props) => {
  const errorColor = red[500];
  const defaultValue: User = { username: "", password: "" };
  const formValidateSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").trim(),
    password: Yup.string().required("Password is required").trim(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: defaultValue,
    resolver: yupResolver(formValidateSchema),
  });

  // view password
  const [type, setType] = React.useState<string>("password");
  const [icon, setIcon] = React.useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const onSubmit = async (data: User) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      const URL = process.env.NEXT_PUBLIC_BASE_URL_API;
      await fetch(`${URL}/auth/login`, {
        method: "POST",
        body: formData,
      })
        .then(async (rawResponse) => {
          rawResponse.json().then((data) => {
            if (data.status == "success") {
              Swal.fire("Success!", "", "success").then(function () {
                location.href = "/admin/user"; // find_dealer
              });
              return false;
            } else {
              Swal.fire("Error!", "Please check username or password", "error").then(function () {
                return false;
              });
            }
          });
        })
        .catch((error) => {
          Swal.fire("Error!", "Please check username or password", "error").then(function () {
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
    position: "absolute",
    border: "2px solid #000",
    bgcolor: "background.paper",
    width: "50%",
    height: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
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
              Swal.fire("Success!", "We send you an email to reset your password.", "success").then(function () {
                location.href = "/admin/login";
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

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      display="flex"
      className="imagebackground"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 10,
          borderRadius: 5,
          p: 2,
        }}
        style={{ width: 600 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          // style={{ width: 500 }}
          autoComplete="off"
        >
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            TOHATSU
          </Typography><br />
          <Typography gutterBottom sx={{ textAlign: "center" }}>
            ________________________ Back-End Login ________________________
          </Typography><br />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="username"
                label="Username"
                type="text"
                fullWidth
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            name="username"
            control={control}
            defaultValue=""
          />
          {errors.username?.message && (
            <Typography sx={{ color: errorColor }}>
              {errors.username?.message}
            </Typography>
          )}

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
            onClick={handleToggle}
          >
            <Icon icon={icon} size={25} />
          </span>
          {errors.password?.message && (
            <Typography sx={{ color: errorColor }}>
              {errors.password?.message}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            sx={{ marginTop: "10px" }}
            fullWidth
            type="submit"
          >
            Login
          </Button>
          <Grid container sx={{ textAlign: "right" }}>
            <Grid item xs>
              <Button onClick={handleOpen}>
                <u>Forgot password</u>
              </Button>
            </Grid>
          </Grid>
        </form>

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
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                You will need to reset your password. <br />
                Please enter your email address so we can send you an email to reset your password.{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <br />
              <Box component="form" onSubmit={onSubmitModal} autoComplete="off">
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

export default Login;
