import { NextResponse } from "next/server";
import { AppError } from "./errors";

const statusMap: Record<string, number> = {
  NOT_FOUND: 404,
  VALIDATION_ERROR: 400,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  INTERNAL: 500,
};

type RouteHandlerContext<T = unknown> = { params: Promise<T> | T };

type RouteHandler<T = unknown> = (
  request: Request,
  context: RouteHandlerContext<T>,
) => Promise<NextResponse | Response> | NextResponse | Response;

export function withErrorHandler<T = unknown>(handler: RouteHandler<T>) {
  return async (request: Request, context: RouteHandlerContext<T>) => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof AppError) {
        const status = statusMap[error.code] || 500;
        return NextResponse.json(
          { error: error.message, code: error.code },
          { status },
        );
      }

      console.error("Unhandled Server Error:", error);

      return NextResponse.json(
        { error: "Internal Server Error", code: "INTERNAL" },
        { status: 500 },
      );
    }
  };
}
