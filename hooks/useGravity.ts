"use client";

import { useState, useCallback } from "react";

export function useGravity() {
  const [gravityOn, setGravityOn] = useState(false);

  const toggle = useCallback(() => setGravityOn((prev) => !prev), []);

  return { gravityOn, toggle };
}
