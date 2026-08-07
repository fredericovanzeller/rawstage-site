# rawstage-site

The RawStage beta page (GitHub Pages) and the beta DMG releases.

## Custom domain — one step, when the DNS is in place

The domain is **not** live yet, so `CNAME` is parked as `CNAME.pending`.
With a `CNAME` file present, GitHub Pages redirects
`fredericovanzeller.github.io/rawstage-site` to the custom domain — which
would make the page unreachable until DNS resolves.

Once the records below have propagated:

```
git mv CNAME.pending CNAME && git commit -m "custom domain: rawstage.app" && git push
```

then Settings → Pages → confirm the custom domain and tick **Enforce HTTPS**
(the certificate issues itself; `.app` is HSTS-preloaded, so it REQUIRES https).

DNS records (apex `@`, four A records):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

CNAME `www` → `fredericovanzeller.github.io`

## Releases

Each release carries two assets: the versioned DMG and a copy named
`RawStage-beta.dmg`. The page's download button points at the stable name via
`releases/latest/download/RawStage-beta.dmg`, so it survives every new build —
always upload both.
