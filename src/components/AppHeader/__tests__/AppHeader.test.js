import React from "react";
import {
  AppHeader,
  HeaderLogo,
  HeaderLinks,
  HeaderUser,
  HeaderButton,
} from "../AppHeader";
import { shallow } from "enzyme";
import Logo from "../../Logo";

describe("AppHeader Component tests", () => {
  it("contains Logo, HeaderLinks and HeaderUser", () => {
    const appHeader = shallow(<AppHeader />);

    expect(appHeader.find(HeaderLogo).find(Logo)).toHaveLength(1);
    expect(appHeader.find(HeaderLinks)).toHaveLength(1);
    expect(appHeader.find(HeaderUser)).toHaveLength(1);
  });

  it("show spinner if userIsLoading", () => {
    const appHeader = shallow(<AppHeader userIsLoading />);

    expect(appHeader.find(".user__spinner")).toHaveLength(1);
  });

  it("show error if error", () => {
    const appHeader = shallow(<AppHeader error="some error" />);

    expect(appHeader.find(".user__error")).toHaveLength(1);
  });

  it("show user email if user", () => {
    const appHeader = shallow(<AppHeader user={{ email: "some@email.com" }} />);

    expect(appHeader.find(".user__email")).toHaveLength(1);
  });

  it("should call props.logout when logout button is clicked", () => {
    const mockFunction = jest.fn();
    const appHeader = shallow(<AppHeader logout={mockFunction} />);

    // Test before event
    expect(mockFunction).not.toHaveBeenCalled();

    // Simulate click event
    appHeader.find(HeaderButton).simulate("click");

    // Test after event
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
