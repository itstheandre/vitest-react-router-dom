import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { BrowserRouter, useNavigate, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", async () => ({
  ...((await vi.importActual(
    "react-router-dom"
  )) as typeof import("react-router-dom")),
  useNavigate: vi.fn(),
}));

describe("Test", () => {
  const mockNavigate = vi.mocked(useNavigate);
  let func: Mock<any[], any> = vi.fn();
  beforeEach(() => {
    mockNavigate.mockReset();

    mockNavigate.mockImplementation(() => {
      return func;
    });

    render(
      <Wrapper>
        <Two />
      </Wrapper>
    );
  });

  afterEach(() => {
    func.mockReset();
  });
  it("works", async () => {
    //   mockNavigate.mockReturnValueOnce(() => {
    //     console.log("Hello");
    //   });
    const text = screen.getByText(/hello/i);
    expect(text).toBeDefined();

    await userEvent.click(text);
    expect(func).toHaveBeenCalledWith("/");
  });

  it("works again", async () => {
    const text = screen.getByText(/hello/i);
    expect(text).toBeDefined();

    await userEvent.click(text);
    expect(func).toHaveBeenCalledWith("/");
  });
});
function Wrapper({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

function Two() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/");
      }}
    >
      Hello there
    </button>
  );
}
