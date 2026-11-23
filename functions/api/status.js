export async function onRequest(context) {
  const env = context.env;

  const bridgeUrl = env.MT5_BRIDGE_URL;
  const token = env.MT5_BRIDGE_TOKEN;

  if (!bridgeUrl || !token) {
    return Response.json(
      { error: "Missing MT5 bridge configuration" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${bridgeUrl}/api/status`, {
      headers: {
        "X-Bridge-Token": token
      }
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status
    });
  } catch (error) {
    return Response.json(
      { connected: false, error: "Cannot connect to MT5 Bridge" },
      { status: 502 }
    );
  }
}
