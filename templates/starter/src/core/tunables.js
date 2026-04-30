// Tunables loader. Reads numeric design values from assets/data/*.json
// so gameplay code never hardcodes magic numbers.

let data = {};

export async function loadTunables(urls) {
  const entries = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`tunables: failed ${url} (${res.status})`);
      return [url, await res.json()];
    })
  );
  data = entries.reduce((acc, [url, obj]) => {
    // Namespace by filename: assets/data/player.json → data.player.*
    const key = url.split('/').pop().replace(/\.json$/, '');
    acc[key] = obj;
    return acc;
  }, {});
}

export function tunables(dottedPath) {
  const parts = dottedPath.split('.');
  let cur = data;
  for (const p of parts) {
    if (cur == null || !(p in cur)) {
      throw new Error(`tunables: missing "${dottedPath}"`);
    }
    cur = cur[p];
  }
  return cur;
}

// For tests: inject data directly.
export function _setTunables(obj) { data = obj; }
