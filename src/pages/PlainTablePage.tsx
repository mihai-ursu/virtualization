import PlainWatchlist from "../components/PlainWatchlist";
import initialInstruments from "../data/instruments";

function PlainTablePage() {
  return <PlainWatchlist instruments={initialInstruments} />;
}

export default PlainTablePage;
