// Hjälpfunktioner för Google Maps-markörer och sömlös animering längs en rutt.

export function pointAtFraction(google, path, t) {
  const segs = [];
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    const d = google.maps.geometry.spherical.computeDistanceBetween(path[i - 1], path[i]);
    segs.push(d);
    total += d;
  }
  let target = total * t;
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i]) {
      const f = segs[i] === 0 ? 0 : target / segs[i];
      return google.maps.geometry.spherical.interpolate(path[i], path[i + 1], f);
    }
    target -= segs[i];
  }
  return path[path.length - 1];
}

export function animateAlongPath(google, marker, path, durationMs, onProgress, onComplete) {
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs);
    marker.setPosition(pointAtFraction(google, path, t));
    onProgress?.(t);
    if (t < 1) requestAnimationFrame(tick);
    else onComplete?.();
  }
  requestAnimationFrame(tick);
}

export function badgeIcon(google, emoji, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><circle cx="24" cy="24" r="20" fill="${color}" stroke="#fff" stroke-width="3"/><text x="24" y="33" font-size="24" text-anchor="middle">${emoji}</text></svg>`;
  return { url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg), scaledSize: new google.maps.Size(48, 48), anchor: new google.maps.Point(24, 24) };
}

export function pinIcon(google, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="46" viewBox="0 0 34 46"><path d="M17 0C7.6 0 0 7.6 0 17c0 12 17 29 17 29s17-17 17-29C34 7.6 26.4 0 17 0z" fill="${color}"/><circle cx="17" cy="17" r="6" fill="#fff"/></svg>`;
  return { url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg), scaledSize: new google.maps.Size(34, 46), anchor: new google.maps.Point(17, 46) };
}

export function pulsingDotIcon(google) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><circle cx="30" cy="30" r="10" fill="#1976e9" fill-opacity="0.35"><animate attributeName="r" values="10;24;10" dur="1.8s" repeatCount="indefinite"/><animate attributeName="fill-opacity" values="0.45;0;0.45" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="30" cy="30" r="9" fill="#1976e9" stroke="#fff" stroke-width="3"/></svg>`;
  return { url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg), scaledSize: new google.maps.Size(60, 60), anchor: new google.maps.Point(30, 30) };
}