import { Box, Button, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import utc from "dayjs/plugin/utc";
import "../App.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
const Form = ({ getData }) => {
  dayjs.extend(utc);
  const [date, setDate] = useState(dayjs(""));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodo = async (e) => {
    e.preventDefault();
    const data = {
      date: date.toString(),
      title: title,
      description: description,
      status: "To do",
    };
    await addDoc(collection(db, "taskCard"), data);
    getData();
  };
  return (
    <div>
      {/* form membungkus semua yang ada dalam kodingan di bawah ini */}
      <form onSubmit={addTodo}>
        <Box
          sx={{
            marginTop: 3,
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* text field title */}
          <TextField
            className="inputButton"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* date time picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              className="inputButton"
              value={date}
              onChange={(newValue) => {
                setDate(dayjs(newValue).utc());
              }}
            />
          </LocalizationProvider>
          {/* text field description */}
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            className="inputButton"
            multiline
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Button
            sx={{ borderRadius: "20px" }}
            variant="outlined"
            type="submit"
          >
            Tambahkan
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
