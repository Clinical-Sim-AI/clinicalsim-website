import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ClinicalSim — AI Clinical Simulation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#061729",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          ClinicalSim
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 28,
            }}
          >
            Communication is a
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 500,
              color: "#79f0b8",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            clinical procedure.
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#e8e7e6",
            opacity: 0.75,
          }}
        >
          Voice AI simulation · Rubric-scored feedback · Pilot study
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
