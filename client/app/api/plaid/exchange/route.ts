import { NextRequest, NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV!],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
        "PLAID-SECRET": process.env.PLAID_SECRET!,
      },
    },
  })
);

export async function POST(req: NextRequest) {
  try {
    const { public_token } = await req.json();
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    return NextResponse.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("Plaid exchange error:", error);
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
}
