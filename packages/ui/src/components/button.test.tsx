import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("applies the variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button").className).toContain("bg-destructive");
  });
});
