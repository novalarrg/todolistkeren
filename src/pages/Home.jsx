import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Form from "../components/Form";
import TaskCard from "../components/TaskCard";
import { db } from "../Firebase";
import utc from "dayjs/plugin/utc";

const dummy = [
  {
    id: 1,
    title: "belajar front end",
    date: "01.00",
    description: "belajar front end sambil olahraga",
    inprogress: "To do",
  },
  {
    id: 2,
    title: "belajar back end",
    date: "02.00",
    description: "belajar back end sambil olahraga",
    inprogress: "In progress",
  },
  {
    id: 3,
    title: "belajar ",
    date: "12.00",
    description: "belajar doang",
    inprogress: "Finish",
  },
  {
    id: 4,
    title: "makan",
    date: "04.00",
    description: "makan sambil lihat youtube",
    inprogress: "In progress",
  },
  {
    id: 5,
    title: "minum",
    date: "12.40",
    description: "minum air laut",
    inprogress: "To do",
  },
];

const Home = () => {
  //   getDoc(doc(db, "taskCard", "test")).then((doc) => {
  //     console.log(doc.data(), doc.id);
  //   });
  dayjs.extend(utc);
  const [data, setData] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "taskCard"));
    setData(querySnapshot.docs);
  };
  useEffect(() => {
    getData();
  }, []); //di awal aplikasi dijalankan

  const handleDeleteButton = async (db, id) => {
    await deleteDoc(doc(db, "taskCard", id));
    getData();
  };
  return (
    <div>
      {/* jadi ini adalah box yang utama */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          gap: 6,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        {/* Box untuk component form */}
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: 32 }}>
            Todo-list Keren
          </Typography>
          <Form getData={getData} />
        </Box>
        {/* Box untuk todo task card */}
        <Box
          sx={{
            display: "flex",
            gap: 6,
            flexDirection: {
              xs: "column",
              lg: "row",
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                backgroundColor: "#F8C4B4",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: 3,
                minWidth: "300px",
              }}
            >
              To do
            </Typography>
            {data
              .filter((d) => {
                return d.data().status === "To do";
              })
              .map((d, index) => {
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    title={d.data().title}
                    date={d.data().date}
                    description={d.data().description}
                    status={d.data().status}
                    getData={getData}
                    color="#F8C4B4"
                    handleDeleteButton={handleDeleteButton}
                  />
                );
              })}
          </Box>
          {/* Box untuk In Progress */}
          <Box>
            <Typography
              sx={{
                backgroundColor: "#E5EBB2",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: 3,
                minWidth: "300px",
              }}
            >
              In Progress
            </Typography>
            {data
              .filter((d) => {
                return d.data().status === "In progress";
              })
              .map((d, index) => {
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    title={d.data().title}
                    date={d.data().date}
                    description={d.data().description}
                    status={d.data().status}
                    getData={getData}
                    color={"#E5EBB2"}
                    handleDeleteButton={handleDeleteButton}
                  />
                );
              })}
          </Box>
          {/* Box untuk Finish */}
          <Box>
            <Typography
              sx={{
                backgroundColor: "#BCE29E",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: 3,
                minWidth: "300px",
              }}
            >
              Finish
            </Typography>
            {data
              .filter((d) => {
                return d.data().status === "Finish";
              })
              .map((d, index) => {
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    title={d.data().title}
                    date={d.data().date}
                    description={d.data().description}
                    status={d.data().status}
                    getData={getData}
                    color={"#BCE29E"}
                    handleDeleteButton={handleDeleteButton}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
