import { ISPConfigClient } from "../src/client";
import { buildToolset } from "../src/index";

const apiUrl = process.env.ISPCONFIG_API_URL;
const username = process.env.ISPCONFIG_USER;
const password = process.env.ISPCONFIG_PASS;

const hasEnv = Boolean(apiUrl && username && password);
const describeLive = hasEnv ? describe : describe.skip;

describeLive("ISPConfig live integration", () => {
  const client = new ISPConfigClient({
    apiUrl: apiUrl as string,
    username: username as string,
    password: password as string,
    verifySsl: true,
  });

  afterAll(async () => {
    await client.logout();
  });

  test("login and logout", async () => {
    const sessionId = await client.login();
    expect(typeof sessionId).toBe("string");
    expect(sessionId.length).toBeGreaterThan(10);

    const logoutRes = await client.logout();
    expect(logoutRes).toBeDefined();
  });

  test("fetch server info", async () => {
    const servers = await client.call<Array<Record<string, unknown>>>("server_get_all", {});
    expect(Array.isArray(servers)).toBe(true);
    expect(servers.length).toBeGreaterThan(0);

    const first = servers[0];
    const serverId = Number(first.server_id ?? 1);
    const details = await client.call<Record<string, unknown>>("server_get", { server_id: serverId });
    expect(details).toBeDefined();
    expect(details.server).toBeDefined();
  });

  test("list sites includes expected domains", async () => {
    const tools = buildToolset({
      apiUrl: apiUrl as string,
      username: username as string,
      password: password as string,
      verifySsl: true,
    });
    const siteListTool = tools.find((t) => t.name === "isp_sites_list");
    const result = await siteListTool!.run({}) as Array<Record<string, unknown>>;
    const domains = result.map((s) => String(s.domain));

    expect(domains).toContain("example.invalid");
    expect(domains).toContain("example.invalid");
    expect(domains).toContain("example.invalid");
  });

  test("client details for Elvatis id=1", async () => {
    const details = await client.call<Record<string, unknown>>("client_get", { client_id: 1 });
    const name = String(details.company_name ?? details.contact_name ?? "").toLowerCase();
    expect(name).toContain("elvatis");
  });

  test("ssl status check", async () => {
    const tools = buildToolset({
      apiUrl: apiUrl as string,
      username: username as string,
      password: password as string,
      verifySsl: true,
    });
    const sslTool = tools.find((t) => t.name === "isp_ssl_status");
    expect(sslTool).toBeDefined();
    const result = await sslTool!.run({});
    const out = result as { total: number; status: Array<Record<string, unknown>> };
    expect(out.total).toBeGreaterThan(0);
    const elvatis = out.status.find((x) => String(x.domain) === "example.invalid");
    expect(elvatis).toBeDefined();
    expect(["y", "Y", true]).toContain(elvatis?.ssl as never);
  });
});

describe("guards", () => {
  test("readOnly blocks write tool", async () => {
    const tools = buildToolset({
      apiUrl: "https://example.com/remote/json.php",
      username: "x",
      password: "x",
      readOnly: true,
    });

    const writeTool = tools.find((t) => t.name === "isp_client_add");
    await expect(writeTool!.run({})).rejects.toThrow("readOnly=true");
  });
});
