import "@testing-library/jest-dom";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    return "";
  },
}));

jest.mock("@root/assets/images", () => ({
  images: {
    logo: "/path/to/mock/logo.png",
  },
}));

jest.mock("@amplitude/analytics-browser", () => ({
  init: jest.fn(),
  track: jest.fn(),
}));
