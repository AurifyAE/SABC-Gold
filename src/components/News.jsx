import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const NewsTicker = ({ newsItems = [] }) => {
  const items =
    newsItems.length > 0
      ? newsItems
      : [{ description: "Welcome to SABC Gold Updates" }];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "38px",
          lg: "2.7vw",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backdropFilter: "blur(0.6vw)",
        background: `
          linear-gradient(
            90deg,
            rgba(2, 24, 17, 0.95) 0%,
            rgba(5, 44, 32, 0.9) 40%,
            rgba(2, 20, 14, 0.95) 100%
          )
        `,
        borderTop: "0.08vw solid rgba(225, 195, 105, 0.28)",
        borderBottom: "0.08vw solid rgba(225, 195, 105, 0.15)",
        boxShadow: `
          inset 0 0 1vw rgba(212, 175, 55, 0.06),
          0 0 1.5vw rgba(0,0,0,0.5)
        `,
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#FFF0BA",
          background:
            "linear-gradient(135deg, rgba(4, 48, 35, 0.98) 0%, rgba(8, 70, 52, 0.98) 50%, rgba(3, 34, 25, 0.98) 100%)",
          borderRight: "0.1vw solid rgba(225, 195, 105, 0.35)",
          fontSize: {
            xs: "14px",
            lg: "1.35vw",
          },
          fontWeight: 900,
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          padding: "0 3vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow:
            "inset 0 0 0.8vw rgba(212, 175, 55, 0.15), 2px 0 10px rgba(0,0,0,0.3)",
        }}
      >
        SABC Gold
      </Typography>

      {/* NEWS TICKER */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Marquee
          speed={40} // Lower = slower
          gradient={false}
          autoFill={true}
          loop={0}
          direction="left" // Infinite
        >
          {items.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                textTransform: "capitalize",
                color: "#FFF4E3",
                fontSize: {
                  xs: "14px",
                  lg: "1.3vw",
                },
                fontWeight: 700,
                whiteSpace: "nowrap",
                mx: "1.5vw",
                flexShrink: 0,
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default NewsTicker;
