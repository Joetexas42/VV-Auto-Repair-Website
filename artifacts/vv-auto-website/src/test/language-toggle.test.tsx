import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Router } from "wouter";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Navigation } from "@/components/layout";

const ACTIVE_CLASSES = ["bg-white", "font-extrabold"];
const INACTIVE_CLASS = "text-white\\/55";

function renderNavigation() {
  return render(
    <Router>
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    </Router>,
  );
}

describe("Desktop language toggle active styles", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("English button is active by default", () => {
    renderNavigation();
    const enBtn = screen.getByTestId("btn-lang-en");
    expect(enBtn).toHaveClass("bg-white");
    expect(enBtn).toHaveClass("font-extrabold");
  });

  it("Vietnamese button is inactive by default", () => {
    renderNavigation();
    const viBtn = screen.getByTestId("btn-lang-vi");
    expect(viBtn).not.toHaveClass("bg-white");
    expect(viBtn).not.toHaveClass("font-extrabold");
  });

  it("clicking Vietnamese makes it active", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByTestId("btn-lang-vi"));
    expect(screen.getByTestId("btn-lang-vi")).toHaveClass("bg-white");
    expect(screen.getByTestId("btn-lang-vi")).toHaveClass("font-extrabold");
  });

  it("clicking Vietnamese makes English inactive", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByTestId("btn-lang-vi"));
    expect(screen.getByTestId("btn-lang-en")).not.toHaveClass("bg-white");
    expect(screen.getByTestId("btn-lang-en")).not.toHaveClass("font-extrabold");
  });

  it("clicking English after Vietnamese restores English as active", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByTestId("btn-lang-vi"));
    await user.click(screen.getByTestId("btn-lang-en"));
    expect(screen.getByTestId("btn-lang-en")).toHaveClass("bg-white");
    expect(screen.getByTestId("btn-lang-vi")).not.toHaveClass("bg-white");
  });

  it("only one button has the active pill style at a time", async () => {
    const user = userEvent.setup();
    renderNavigation();

    const enBtn = screen.getByTestId("btn-lang-en");
    const viBtn = screen.getByTestId("btn-lang-vi");

    expect(enBtn).toHaveClass("bg-white");
    expect(viBtn).not.toHaveClass("bg-white");

    await user.click(viBtn);

    expect(viBtn).toHaveClass("bg-white");
    expect(enBtn).not.toHaveClass("bg-white");
  });
});

describe("Mobile language toggle active styles", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  async function openMobileMenuAndRender() {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByTestId("btn-mobile-menu"));
    return user;
  }

  it("mobile menu opens and shows language toggle", async () => {
    await openMobileMenuAndRender();
    expect(screen.getByTestId("mobile-language-toggle")).toBeInTheDocument();
  });

  it("mobile English button is active by default", async () => {
    await openMobileMenuAndRender();
    expect(screen.getByTestId("btn-mobile-lang-en")).toHaveClass("bg-white");
    expect(screen.getByTestId("btn-mobile-lang-en")).toHaveClass("font-extrabold");
  });

  it("mobile Vietnamese button is inactive by default", async () => {
    await openMobileMenuAndRender();
    expect(screen.getByTestId("btn-mobile-lang-vi")).not.toHaveClass("bg-white");
    expect(screen.getByTestId("btn-mobile-lang-vi")).not.toHaveClass("font-extrabold");
  });

  it("clicking mobile Vietnamese makes it active", async () => {
    const user = await openMobileMenuAndRender();
    await user.click(screen.getByTestId("btn-mobile-lang-vi"));
    expect(screen.getByTestId("btn-mobile-lang-vi")).toHaveClass("bg-white");
    expect(screen.getByTestId("btn-mobile-lang-vi")).toHaveClass("font-extrabold");
  });

  it("clicking mobile Vietnamese makes mobile English inactive", async () => {
    const user = await openMobileMenuAndRender();
    await user.click(screen.getByTestId("btn-mobile-lang-vi"));
    expect(screen.getByTestId("btn-mobile-lang-en")).not.toHaveClass("bg-white");
    expect(screen.getByTestId("btn-mobile-lang-en")).not.toHaveClass("font-extrabold");
  });

  it("mobile and desktop toggles stay in sync", async () => {
    const user = await openMobileMenuAndRender();
    await user.click(screen.getByTestId("btn-mobile-lang-vi"));

    expect(screen.getByTestId("btn-mobile-lang-vi")).toHaveClass("bg-white");
    expect(screen.getByTestId("btn-lang-vi")).toHaveClass("bg-white");
    expect(screen.getByTestId("btn-mobile-lang-en")).not.toHaveClass("bg-white");
    expect(screen.getByTestId("btn-lang-en")).not.toHaveClass("bg-white");
  });

  it("only one mobile button has the active pill style at a time", async () => {
    const user = await openMobileMenuAndRender();

    const mobileEn = screen.getByTestId("btn-mobile-lang-en");
    const mobileVi = screen.getByTestId("btn-mobile-lang-vi");

    expect(mobileEn).toHaveClass("bg-white");
    expect(mobileVi).not.toHaveClass("bg-white");

    await user.click(mobileVi);

    expect(mobileVi).toHaveClass("bg-white");
    expect(mobileEn).not.toHaveClass("bg-white");
  });
});
