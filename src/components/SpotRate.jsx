import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.screen.width <= 768); // 🔥 screen.width ignores zoom
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir,
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir,
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir,
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir,
    );
  }, [silverData.ask]);

  const getColors = (dir, isSilver) => {
    if (dir === "rise")
      return {
        bgColor: "#00c853",
        border: "0.08vw solid #00E676",
        color: "#ffffff",
      };
    if (dir === "fall")
      return {
        bgColor: "#d50000",
        border: "0.08vw solid #ff1744",
        color: "#ffffff",
      };
    return {
      bgColor: "rgba(2, 20, 15, 0.55)",
      border: isSilver
        ? "0.08vw solid rgba(190, 225, 235, 0.35)"
        : "0.08vw solid rgba(225, 195, 105, 0.4)",
      color: "#ffffff",
    };
  };

  const PricePulse = ({ label, value, dir, isSilver }) => {
    const { bgColor, border, color } = getColors(dir, isSilver);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          mb: ".5vw",
          overflow: "hidden",
          ...(hasPulse && {
            animation:
              dir === "rise"
                ? "pulseRise 0.8s ease-out"
                : "pulseFall 0.8s ease-out",
          }),
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.4vw",
            },
            fontWeight: 700,
            letterSpacing: "0.2vw",
            color: isSilver ? "#CFE1F2" : "#F7D88B",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              sm: "2.5vw",
              md: "1.8vw",
              lg: "2.4vw",
              xl: "2.4vw",
            },
            fontWeight: 800,
            letterSpacing: "0.15vw",
            textAlign: "center",
            bgcolor: bgColor,
            color: color,
            border: border,
            borderRadius: "0.8vw",
            py: "0.2vw",
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 2px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          {value != null && value !== 0 && value !== "0.00" && value !== "0"
            ? value
            : "0"}
        </Typography>
      </Box>
    );
  };

  const MetalPanel = ({ data, bidDir, askDir, theme }) => {
    const isSilver = theme === "silver";

    const title = isSilver ? "SILVER" : "GOLD";

    return (
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "1.4vw",
          backdropFilter: "blur(0.8vw)",
          background: isSilver
            ? `linear-gradient(135deg, rgba(14, 30, 28, 0.72) 0%, rgba(24, 46, 42, 0.8) 50%, rgba(10, 22, 20, 0.88) 100%)`
            : `linear-gradient(135deg, rgba(4, 38, 28, 0.72) 0%, rgba(8, 56, 42, 0.8) 50%, rgba(2, 26, 19, 0.9) 100%)`,
          border: isSilver
            ? "0.1vw solid rgba(190, 225, 235, 0.35)"
            : "0.1vw solid rgba(225, 195, 105, 0.4)",
          boxShadow: isSilver
            ? `
            inset 0 0 1.2vw rgba(190, 225, 235, 0.08),
            0 0.4vw 1.6vw rgba(0,0,0,0.45)
          `
            : `
            inset 0 0 1.2vw rgba(212, 175, 55, 0.1),
            0 0.4vw 1.6vw rgba(0,0,0,0.45)
          `,
          padding: {
            xs: "2vw 3vw",
            sm: "0.5vw 2vw",
            md: "1.5vw 1vw",
          },
          display: "grid",
          alignItems: "center",
          gap: "1vw",
          gridTemplateColumns: ".7fr 1fr 1fr",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            padding: "0.08vw",
            borderRadius: "inherit",
            background: isSilver
              ? `linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(190, 225, 235, 0.25) 35%, rgba(12, 36, 32, 0.05) 65%, rgba(190, 225, 235, 0.5) 100%)`
              : `linear-gradient(135deg, rgba(255, 235, 160, 0.65) 0%, rgba(225, 195, 105, 0.25) 35%, rgba(6, 46, 35, 0.05) 65%, rgba(225, 195, 105, 0.5) 100%)`,
            WebkitMask: `
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0)
            `,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "4.5vw",
              height: "4.5vw",
              objectFit: "contain",
            }}
            component="img"
            src={isSilver ? "/images/silver-bar.png" : "/images/gold-bar.png"}
            alt={title}
          />

          <Box
            sx={{
              fontSize: { xs: "14px", md: "1.7vw" },
              fontWeight: 800,
              letterSpacing: "0.1em",
              background: isSilver
                ? "linear-gradient(90deg, #E8F4FF, #9AC6FF)"
                : "linear-gradient(90deg, #FFF5CC, #DFB74A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1",
            }}
          >
            {title}
          </Box>
        </Box>

        <Box
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.6vw",
              lg: "1.4vw",
              xl: "1.2vw",
            },
            color: "#fff",
            fontWeight: "700",
          }}
        >
          <PricePulse
            label="BID"
            value={data.bid}
            dir={bidDir}
            isSilver={isSilver}
          />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>LOW </span>
          <span className="hl-value-low" style={{ color: "#FF4D4D" }}>
            {data.low != null ? data.low : "—"}
          </span>
        </Box>

        {/* Price Boxes */}
        <Box
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.6vw",
              lg: "1.4vw",
              xl: "1.2vw",
            },
            color: "#fff",
            fontWeight: "700",
          }}
        >
          <PricePulse
            label="ASK"
            value={data.ask}
            dir={askDir}
            isSilver={isSilver}
          />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>HIGH </span>
          <span className="hl-value-high" style={{ color: "#00E676" }}>
            {data.high != null ? data.high : "—"}
          </span>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: "1vw",
        width: "100%",
        alignItems: "end",
        marginTop: {
          xs: "20px", // mobile
          sm: "0vw", // small tablets
        },
        gridTemplateColumns: { xs: "1fr" },
      }}
    >
      <MetalPanel
        data={goldData}
        bidDir={goldBidDir}
        askDir={goldAskDir}
        theme="gold"
      />

      <MetalPanel
        data={silverData}
        bidDir={silverBidDir}
        askDir={silverAskDir}
        theme="silver"
      />
    </Box>
  );
};

export default SpotRate;
