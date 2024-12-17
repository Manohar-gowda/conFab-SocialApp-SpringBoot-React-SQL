import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid2, Button, MenuItem, Select, InputLabel } from "@mui/material"; 
import { registerUser } from "../../Store/Auth/Action";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name  is required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i+1);
const months = [ 'January', 'February', 'March', 'April', 'May',
     'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const SignupForm = () => {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      birthDate: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.birthDate;
      const birthDate = `${year}-${month}-${day}`;
      values.birthDate = birthDate;
      dispatch(registerUser(values))
      console.log("form value: ", values);
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("birthDate", {
      ...formik.values.birthDate,
      [name]: event.target.value,
    });
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 container spacing={2}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          varient="outlined"
          size="large"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

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
         <Grid2 container spacing={5} className="p-4">
         <Grid2>
            <InputLabel>Date</InputLabel>
            <Select 
            name="day"
            sx={{width:"100px"}} 
            onBlur={formik.handleBlur}
            onChange={handleDateChange("day")}
            value={formik.values.birthDate.day || ''}>
                {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
            </Select>          
            </Grid2>

            <Grid2 item xs={4}>
            <InputLabel>Month</InputLabel>
            <Select 
            name="month" 
            sx={{width:"100px"}} 
            onBlur={formik.handleBlur}
            onChange={handleDateChange("month")}
            value={formik.values.birthDate.month || ''}>
                {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
            </Select>
            </Grid2>

            <Grid2 item xs={4}>
            <InputLabel>Year</InputLabel>
           <Select 
            name="year" 
            sx={{width:"100px"}} 
            onBlur={formik.handleBlur}
            onChange={handleDateChange("year")}
            value={formik.values.birthDate.year || ''}>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
            </Select> 
            </Grid2>
         </Grid2>

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
          Signup
        </Button>
      </Grid2>
    </form>
  );
};

export default SignupForm;
