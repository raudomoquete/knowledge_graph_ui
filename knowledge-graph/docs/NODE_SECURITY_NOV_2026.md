# Node.js November 2026 Security Release

**Pinned runtime:** Node.js `>=22.23.5` (22.x line security release)

**Source:** [Wednesday, November 11, 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases)

## Why this pin

The Node.js Project published security updates for the 26.x, 24.x, and 22.x release lines on or shortly after Wednesday, November 11, 2026. The highest severity fixed in the 22.x line is **HIGH**.

This repository pins `engines.node` to `>=22.23.5` and records `22.23.5` in `.nvmrc` / `.node-version` so local and CI runtimes use a patched 22.x build.

## Patched release (22.x)

| Line | Security release |
|------|------------------|
| 22.x | [v22.23.5](https://nodejs.org/en/blog/release/v22.23.5) |
| 24.x | v24.22.3 (reference) |
| 26.x | v26.13.1 (reference) |

## Vulnerabilities affecting 22.x

Issues listed as affecting the 22.x active release line in the November 2026 advisory:

| CVE | Severity | Summary |
|-----|----------|---------|
| CVE-2026-123864 | high | HTTPS: zero-length TLS write re-enters `llhttp_execute()`; server can copy heap into the request body |
| CVE-2026-123865 | high | HTTP/2 sessions never clean up if a protocol error is triggered during connection shutdown |
| CVE-2026-123866 | high | HTTP/2 stream teardown can send freed response memory to the peer |
| CVE-2026-123872 | high | TLS 1.2 renegotiation allows clients to change servername to bypass client certificate authentication |
| CVE-2026-123867 | medium | CA-only SNI client-CA overrides fail open to the default CA (per-host mTLS bypass) |
| CVE-2026-123871 | medium | Proxy credentials disclosed in `ERR_PROXY_INVALID_CONFIG` error messages |
| CVE-2026-123877 | medium | Certificate validation bypass in `https.Agent` via cross-policy TLS session reuse |
| CVE-2026-123875 | medium | HTTP/2: cancelling one `respondWithFile()` download crashes the server |
| CVE-2026-123829 | low | Permission Model bypass in recursive `fs.watch` leaks names of denied descendants |
| CVE-2026-123862 | low | zlib: pending `params()` plus `destroy()` throws uncatchable `ERR_INTERNAL_ASSERTION` |
| CVE-2026-106071 | low | Permission Model filesystem over-grant via wildcard radix lookup |

Dependency updates called out for 22.x in the advisory include **llhttp** and **sqlite**.

## Upgrade guidance

1. Install Node.js **22.23.5** or newer on the 22.x line (or a later patched line such as 24.22.3 / 26.13.1).
2. Confirm with `node -v`.
3. Reinstall dependencies if your toolchain expects the pinned runtime (`npm ci` / `npm install`).

## References

- Advisory: https://nodejs.org/en/blog/vulnerability/november-2026-security-releases
- Node.js security policy: https://nodejs.org/en/security/
