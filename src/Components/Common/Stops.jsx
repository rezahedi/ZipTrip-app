import React from "react";
import PropTypes from "prop-types";
import Stop from "./Stop";
import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const Stops = ({ stops }) => {
  return (
    <Box sx={{ mt: 4, width: { md: 760, xs: "100%" } }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Activities
      </Typography>
      <Timeline
        position="right"
        sx={{
          width: "100%",
          pl: 0,
          ".MuiTimelineItem-missingOppositeContent:before": { display: "none" },
          ".MuiTimelineContent-root": { pt: 1.5, pr: 0, pb: 4, pl: 2 },
          ".MuiTimelineDot-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "#4CAF50",
            p: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot>
              <RoomOutlinedIcon sx={{ width: 30, height: 30 }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h5">Start Point</Typography>
          </TimelineContent>
        </TimelineItem>
        {stops.map((stop, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot>
                <RoomOutlinedIcon sx={{ width: 30, height: 30 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Stop {...stop} />
            </TimelineContent>
          </TimelineItem>
        ))}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot>
              <RoomOutlinedIcon sx={{ width: 30, height: 30 }} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h5">Finish Point</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
};

Stops.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Stops;
