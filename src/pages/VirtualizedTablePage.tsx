import { VirtualWatchlist } from "../components/VirtualWatchlist";
import initialInstruments from "../data/instruments";

function VirtualizedTablePage() {
  return <VirtualWatchlist instruments={initialInstruments} />;
}

export default VirtualizedTablePage;
