import { NextResponse } from "next/server";
import { getDashboardMetrics } from "@/repositories/metrics.repository";
import { AppError } from "@/lib/utils/errors";

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error("[METRICS_GET_ERROR]", error);
    if (error instanceof AppError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
