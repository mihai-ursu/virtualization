import type { TargetedEvent } from "preact";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import type { Instrument } from "../data/instruments";

const ROW_HEIGHT = 32;
const OVERSCAN = 6;

export function useVirtualWatchlist(instruments: Instrument[]) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
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

  function handleScroll(event: TargetedEvent<HTMLDivElement>) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  const rowCount = instruments.length;
  const bodyHeight = Math.max(0, viewportHeight - ROW_HEIGHT);

  // Keep the range valid if a filter shrinks the list while we're scrolled down.
  const maxScrollTop = Math.max(0, rowCount * ROW_HEIGHT - bodyHeight);
  const offset = Math.min(scrollTop, maxScrollTop);

  const start = Math.max(0, Math.floor(offset / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(
    rowCount,
    Math.ceil((offset + bodyHeight) / ROW_HEIGHT) + OVERSCAN,
  );

  const visibleRows = instruments.slice(start, end).map((instrument, index) => ({
    instrument,
    ariaRowIndex: start + index + 2,
  }));

  return {
    viewportRef,
    handleScroll,
    visibleRows,
    ariaRowCount: rowCount + 1,
    rowHeight: ROW_HEIGHT,
    topHeight: start * ROW_HEIGHT,
    bottomHeight: (rowCount - end) * ROW_HEIGHT,
  };
}
