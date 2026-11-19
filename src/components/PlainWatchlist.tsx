import { type Instrument } from "../data/instruments";

const ROW_HEIGHT = 32;

export default function PlainWatchlist({
  instruments,
}: {
  instruments: Instrument[];
}) {
  return (
    <div
      class="watchlist-viewport"
      style={{ overflowY: "auto", overflowX: "hidden" }}
    >
      <table class="watchlist">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
          </tr>
        </thead>

        <tbody>
          {instruments.map((instrument) => (
            <tr key={instrument.id} style={{ height: `${ROW_HEIGHT}px` }}>
              <td>{instrument.symbol}</td>
              <td>{(instrument.priceInCents / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
