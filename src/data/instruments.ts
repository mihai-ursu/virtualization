export type Instrument = {
  id: string;
  symbol: string;
  priceInCents: number;
};

function generateInstruments(count: number): Instrument[] {
  return Array.from({ length: count }, (_, index) => {
    const suffix = String(index + 1).padStart(5, "0");

    return {
      id: `instrument-${suffix}`,
      symbol: `SYM${suffix}`,
      priceInCents: 1_000 + ((index * 7_919) % 90_000),
    };
  });
}

const initialInstruments = generateInstruments(50_000);

export default initialInstruments;
