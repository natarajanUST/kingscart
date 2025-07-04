import { render } from "@testing-library/react";
import Navbar from "./nav-bar";

describe("Navbar", () => {
  it("Kings Cart should be in the document", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText(/Kings Cart/i)).toBeInTheDocument();
  });

  it("Cart should be in the document", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText(/Cart/i)).toBeInTheDocument();
  })
});

