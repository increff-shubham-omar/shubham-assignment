"use client"

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Badge, Image } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import NextImage from "next/image";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { BsChevronCompactDown } from "react-icons/bs";
import { TfiHelpAlt, TfiSettings } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";


export const Navbar = () => {

  return (
    <NextUINavbar shouldHideOnScroll maxWidth="full" className="bg-white drop-shadow dark:bg-gray-900">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full">
        <NavbarBrand as="li" className="gap-5 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
          <Image
            as={NextImage}
            className="dark:hue-rotate-180 dark:invert"
            src="/aerchain.png"
            alt="Aerchain Logo"
            radius="none"
            width={123}
            height={18}
          />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item?.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground", underline: "hover" }),
                  "group hover:text-primary data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item?.href}
              >

                {item?.imageUrl ? <div className="mr-2">
                  <Image
                  as={NextImage}
                  removeWrapper
                  className="dark:hue-rotate-180 dark:invert"
                  src={item?.imageUrl}
                  alt="Module Icon"
                  radius="none"
                  width={16}
                  height={16} />
                </div> : ''}
                {item?.label}
                {item?.hasChildren ? <BsChevronCompactDown className="ml-2 transition-transform group-hover:rotate-180" /> : ''}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end" >
        <NavbarItem className="hidden sm:flex gap-3">
          <Button isIconOnly color="primary" variant="light">
          <TfiHelpAlt size={25} />
          </Button>
          <Badge
          content={21}
          color="warning"
          showOutline={false}
          shape="circle"
          size="sm"
          className="text-white top-2 right-0.5 max-h-5 text-[10px] pointer-events-none"
          >
            <Button isIconOnly color="primary" variant="light">
              <IoNotificationsOutline size={25} />
            </Button>
          </Badge>
          <Button isIconOnly color="primary" variant="light">
          <TfiSettings size={25} />
          </Button>
          <ThemeSwitch />
          <Button
            variant="flat"
            className="pl-0 bg-slate-100 dark:bg-default border dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400"
            startContent={<Image
              as={NextImage}
              className="mix-blend-multiply dark:mix-blend-screen dark:hue-rotate-180 dark:invert"
              src="/gmail.png"
              alt="Module Icon"
              width={150}
              height={100}
              radius="sm"
              style={{
                width: '100%',
                height: 'auto',
              }} />}
              endContent={<BsChevronCompactDown />}
              >
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
