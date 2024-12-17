import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {loginUser} from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

const SigninForm = () => {
    const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
        dispatch(loginUser(values))
      console.log("form value: ", values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 container spacing={2}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                varient="outlined"
                size="large"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                varient="outlined"
                type="password"
                size="large"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />

            <Button
                variant="content"
                fullWidth
                type="sumbit"
                size="large"
                sx={{
                borderRadius: "29px",
                py: "15px",
                bgcolor: "#2e2e2d",
                color: "white",
                }}
            >
                Signin
            </Button>
      </Grid2>
    </form>
  );
};

export default SigninForm;
