import { useLayoutEffect, useRef, useState } from "preact/hooks";
import type { Instrument } from "../data/instruments";

const ROW_HEIGHT = 32;
const OVERSCAN = 6;

export function VirtualWatchlist({
  instruments,
}: {
  instruments: Instrument[];
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const rowCount = instruments.length;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => setViewportHeight(viewport.clientHeight);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  const bodyHeight = Math.max(0, viewportHeight - ROW_HEIGHT);

  // Keep the range valid if a filter shrinks the list while we're scrolled down.
  const maxScrollTop = Math.max(0, rowCount * ROW_HEIGHT - bodyHeight);
  const offset = Math.min(scrollTop, maxScrollTop);

  const start = Math.max(0, Math.floor(offset / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(
    rowCount,
    Math.ceil((offset + bodyHeight) / ROW_HEIGHT) + OVERSCAN,
  );

  const topHeight = start * ROW_HEIGHT;
  const bottomHeight = (rowCount - end) * ROW_HEIGHT;

  return (
    <div
      class="watchlist-viewport"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
      ref={viewportRef}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <table class="watchlist" aria-rowcount={rowCount + 1}>
        <thead>
          <tr
            // style={{ height: `${topHeight}px`, padding: 0 }}
            aria-rowindex={1}
          >
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
          </tr>
        </thead>

        <tbody>
          {topHeight > 0 && (
            <tr aria-hidden="true">
              <td
                colSpan={2}
                style={{ height: `${topHeight}px`, padding: 0 }}
              />
            </tr>
          )}

          {instruments.slice(start, end).map((instrument, index) => (
            <tr
              key={instrument.id}
              style={{ height: `${ROW_HEIGHT}px` }}
              aria-rowindex={start + index + 2}
            >
              <td>{instrument.symbol}</td>
              <td>{(instrument.priceInCents / 100).toFixed(2)}</td>
            </tr>
          ))}

          {bottomHeight > 0 && (
            <tr aria-hidden="true">
              <td
                colSpan={2}
                style={{ height: `${bottomHeight}px`, padding: 0 }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
