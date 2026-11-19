import type { Instrument } from "../data/instruments";
import { useVirtualWatchlist } from "../hooks/useVirtualWatchlist";

export function VirtualWatchlist({
  instruments,
}: {
  instruments: Instrument[];
}) {
  const {
    viewportRef,
    handleScroll,
    visibleRows,
    ariaRowCount,
    rowHeight,
    topHeight,
    bottomHeight,
  } = useVirtualWatchlist(instruments);

  return (
    <div
      class="watchlist-viewport"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
      ref={viewportRef}
      onScroll={handleScroll}
    >
      <table class="watchlist" aria-rowcount={ariaRowCount}>
        <thead>
          <tr aria-rowindex={1}>
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

          {visibleRows.map(({ instrument, ariaRowIndex }) => (
            <tr
              key={instrument.id}
              style={{ height: `${rowHeight}px` }}
              aria-rowindex={ariaRowIndex}
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
