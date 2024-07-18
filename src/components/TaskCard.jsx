import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../Firebase";

const TaskCard = ({
  id,
  title,
  date,
  description,
  status,
  getData,
  color,
  handleDeleteButton,
}) => {
  const [inputProgress, setinputProgress] = React.useState(status);

  const handleChange = (event) => {
    setinputProgress(event.target.value);
  };
  const updateStatus = async () => {
    const data = {
      status: inputProgress,
    };
    await updateDoc(doc(db, "taskCard", id), data);
    getData();
  };

  useEffect(() => {
    updateStatus();
  }, [inputProgress]);

  return (
    <div>
      {/* Box untuk memberikan minWidth */}
      <Box sx={{ minWidth: "300px", marginBottom: 3 }}>
        {/* Card secara keseluruhan */}
        <Card variant="outlined" sx={{ borderRadius: "20px" }}>
          {/* card content */}
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {date}
            </Typography>
            <Typography variant="body2">{description}</Typography>
            {/* Box yang berisi form control dan icon button delete */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              {/* select */}
              <FormControl sx={{ minWidth: "150px" }}>
                <InputLabel id="demo-simple-select-label">
                  inputProgress
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="inputProgess"
                  onChange={handleChange}
                  sx={{ borderRadius: "20px", backgroundColor: color }}
                >
                  <MenuItem value={"To do"}>To do</MenuItem>
                  <MenuItem value={"In progress"}>In progress</MenuItem>
                  <MenuItem value={"Finish"}>Finish</MenuItem>
                </Select>
              </FormControl>
              {/* icon button */}
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => {
                  handleDeleteButton(db, id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default TaskCard;
