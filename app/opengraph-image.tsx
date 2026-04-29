import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ClinicalSim.ai — AI Clinical Simulation"
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
          ClinicalSim.ai
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
            AI Clinical Simulation
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              color: "#79f0b8",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Practice the Conversations That Matter Most
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
          Communication remediation · ACGME milestone-aligned · CCC-ready
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
