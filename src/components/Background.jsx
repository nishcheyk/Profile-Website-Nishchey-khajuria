import React, { useState, useEffect } from "react";

const FallingKeysComponent = () => {
  const [keys, setKeys] = useState([]);

  const availableKeys = [
    "< >",
    "",
    "if else",
    "+",
    "-",
    "*",
    "/",
    "%",
    "=",
    "!",
    "<",
    ">",
    "&",
    "|",
    "^",
    "~",
    "?",
    ":",
    ";",
    ",",
    ".",
    "_",
    "$",
    "#",
    "@",
    ";",
    "'",
    "?",
    "( )",
    "&",
    "$",
    "@",
    "#",
    "~",
    "&",
    "|",
    "^",
    "~",
    "<<",
    ">>",
    ">>>",
    "++",
    "--",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 10) + 10; // Random number of keys to create
      const newKeys = [];

      for (let i = 0; i < count; i++) {
        const randomKey =
          availableKeys[Math.floor(Math.random() * availableKeys.length)];
        const initialLeft = Math.random() * window.innerWidth; // Random initial horizontal position
        const initialTop = Math.random() * window.innerHeight; // Random initial vertical position
        const newKey = {
          id: Date.now() + i,
          char: randomKey,
          left: initialLeft,
          top: initialTop,
          rotation: Math.floor(Math.random() * 360), // Random rotation angle (0 to 359 degrees)
          directionX: Math.random() > 0.5 ? 1 : -1, // Random direction for X-axis (1 for right, -1 for left)
          directionY: Math.random() > 0.5 ? 1 : -1, // Random direction for Y-axis (1 for down, -1 for up)
          speed: Math.random() * 5 + 2, // Random speed between 2 to 7 units per second
          size: 18, // Initial font size
          phase: "expand", // Initial phase is 'expand'
        };
        newKeys.push(newKey);

        // Remove key after a short delay
        setTimeout(() => {
          setKeys((prevKeys) => prevKeys.filter((k) => k.id !== newKey.id));
        }, 6000); // 6 seconds for removal
      }

      setKeys((prevKeys) => [...prevKeys, ...newKeys]);
    }, 2000); // Generate keys every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const updatePosition = () => {
    setKeys((prevKeys) =>
      prevKeys.map((key) => {
        let newLeft = key.left + key.directionX * key.speed;
        let newTop = key.top + key.directionY * key.speed;

        // Check if key has gone out of bounds horizontally and adjust direction
        if (newLeft < 0 || newLeft > window.innerWidth) {
          newLeft = Math.min(Math.max(newLeft, 0), window.innerWidth); // Ensure key stays within bounds
          key.directionX *= -1; // Reverse direction to bounce
        }

        // Check if key has gone out of bounds vertically and adjust direction
        if (newTop < 0 || newTop > window.innerHeight) {
          newTop = Math.min(Math.max(newTop, 0), window.innerHeight); // Ensure key stays within bounds
          key.directionY *= -1; // Reverse direction to bounce
        }

        // Update size based on the phase
        let newSize = key.size;
        if (key.phase === "expand" && newSize < 48) {
          newSize += 1; // Increase size to maximum
        } else if (key.phase === "expand" && newSize >= 48) {
          key.phase = "shrink"; // Change phase to 'shrink'
        } else if (key.phase === "shrink" && newSize > 24) {
          newSize -= 1; // Shrink back to original size
        } else if (key.phase === "shrink" && newSize <= 24) {
          key.phase = "disappear"; // Change phase to 'disappear'
        } else if (key.phase === "disappear" && newSize > 0) {
          newSize -= 1; // Reduce size to make the key disappear
        }

        return { ...key, left: newLeft, top: newTop, size: newSize };
      })
    );
  };

  useEffect(() => {
    const updateInterval = setInterval(updatePosition, 50); // Update position every 50 milliseconds
    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "black", // Set black background
      }}
    >
      {keys.map((key) => (
        <div
          key={key.id}
          style={{
            position: "absolute",
            left: key.left,
            top: key.top,
            fontSize: `${key.size}px`, // Adjust font size based on the size property
            color: "#fff",
            transform: `rotate(${key.rotation}deg)`, // Apply rotation
            transition:
              "left 0.05s linear, top 0.05s linear, font-size 0.05s linear", // Smooth transitions
            zIndex: "0", // Ensure keys appear above the background
          }}
        >
          {key.char}
        </div>
      ))}
    </div>
  );
};

export default FallingKeysComponent;
