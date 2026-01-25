import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("idToken")?.value;
  if (!token) {
    // リダイレクト先のURLを、現在のリクエストURLを基準に生成
    const signinUrl = new URL("/auth/signin", request.url);
    // リダイレクト先での処理の後に元の場所に戻すためにredirectパラメータを設定
    signinUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
