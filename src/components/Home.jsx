import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  styled,
  Paper,
  Backdrop,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useAppState } from "../AppStateContext";
import axios from "axios";

import TicketGroupPriority from "./TicketGroupPriority";
import TicketGroupStatus from "./TicketGroupStatus";
import TicketGroupUser from "./TicketGroupUser";

import inProgressIcon from "../assets/work-in-progress.png";
import backlogIcon from "../assets/Daco_4816812.png";
import cancelIcon from "../assets/cancel-button.png";
import doneIcon from "../assets/PngItem_5284486.png";
import todoIcon from "../assets/pngwing.com.png";

import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Canceled: cancelIcon,
};

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const priorityIcons = {
  4: (
    <Tooltip title={priorityLabels[4]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <ErrorTwoToneIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  3: (
    <Tooltip title={priorityLabels[3]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SignalCellular4BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  2: (
    <Tooltip title={priorityLabels[2]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SignalCellular3BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  1: (
    <Tooltip title={priorityLabels[1]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SignalCellular1BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  0: (
    <Tooltip title={priorityLabels[0]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <MoreHorizIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
};

const priorityValues = [4, 3, 2, 1, 0];

const statusValues = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

const MainContainer = styled(Grid)({
  /* ... */
});

const Home = () => {
  const { selectedOptions } = useAppState();
  const [data, setData] = useState({
    tickets: [],
    users: [],
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        setData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // including all sorted data sets at Home
  // by considering Home to be the absolute page for the instance
  // group basis status
  const groupedTickets_status = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_status[ticket.status]) {
      groupedTickets_status[ticket.status] = [];
    }
    groupedTickets_status[ticket.status].push(ticket);
  });

  // group basis user
  const groupedTickets_user = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_user[ticket.userId]) {
      groupedTickets_user[ticket.userId] = [];
    }
    groupedTickets_user[ticket.userId].push(ticket);
  });

  // group basis priority
  const groupedTickets_priority = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_priority[ticket.priority]) {
      groupedTickets_priority[ticket.priority] = [];
    }
    groupedTickets_priority[ticket.priority].push(ticket);
  });
  //

  // sorting basis title
  const compareTitles = (a, b) => {
    return a.title.localeCompare(b.title);
  };

  if (selectedOptions.ordering === "title") {
    for (const status in groupedTickets_status) {
      groupedTickets_status[status]?.sort(compareTitles);
    }
    for (const user in groupedTickets_user) {
      groupedTickets_user[user]?.sort(compareTitles);
    }
    for (const priority in groupedTickets_priority) {
      groupedTickets_priority[priority]?.sort(compareTitles);
    }
  }
  //

  // sorting basis priority
  const comparePriority = (a, b) => {
    return a.priority - b.priority;
  };

  if (selectedOptions.ordering === "priority") {
    for (const status in groupedTickets_status) {
      groupedTickets_status[status]?.sort(comparePriority);
    }
    for (const user in groupedTickets_user) {
      groupedTickets_user[user]?.sort(comparePriority);
    }
    for (const priority in groupedTickets_priority) {
      groupedTickets_priority[priority]?.sort(comparePriority);
    }
  }
  //

  return (
    <Box
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <MainContainer container>
        <Backdrop
          open={!isDataLoaded}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {selectedOptions.grouping === "status" ? (
          <TicketGroupStatus
            data={data}
            groupedTickets_status={groupedTickets_status}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}

        {selectedOptions.grouping === "user" ? (
          <TicketGroupUser
            data={data}
            groupedTickets_user={groupedTickets_user}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={priorityValues}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}

        {selectedOptions.grouping === "priority" ? (
          <TicketGroupPriority
            data={data}
            groupedTickets_priority={groupedTickets_priority}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={priorityValues}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}
      </MainContainer>
    </Box>
  );
};

export default Home;