import React, { useRef, useState } from "react";

export function DraggableResize() {
  const [leftWidth, setLeftWidth] = useState(300); // initial width in px
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const startDragging = () => {
    isDragging.current = true;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const handleDragging = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerX = containerRef.current.getBoundingClientRect().left;
    const newLeftWidth = e.clientX - containerX;

    setLeftWidth(newLeftWidth);
  };

  // Attach/remove mousemove globally
  React.useEffect(() => {
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex w-full h-96 bg-gray-100">
      <div style={{ width: leftWidth }} className="bg-blue-300">
        Left Panel
      </div>
      <div
        onMouseDown={startDragging}
        className="w-2 cursor-col-resize bg-gray-400"
      />
      <div className="flex-1 bg-green-300">Right Panel</div>
    </div>
  );
}
