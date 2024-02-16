import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import AuthSessionButton from "./AuthSessionButton";

type Props = {};

export default function Appbar({}: Props) {
  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/">
          <p className="font-bold text-inherit">Logo</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <AuthSessionButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
