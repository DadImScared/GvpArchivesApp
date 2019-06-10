jest.mock("./components/Icon", () => "Icon");
jest.mock("./components/Marquee", () => "Marquee");
jest.mock("ScrollView", () => require.requireMock("ScrollViewMock"));
