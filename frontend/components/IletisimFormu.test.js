import React from "react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";
import App from "../App";

test("hata olmadan render ediliyor", async () => {
  render(<App />);
});

test("iletişim formu headerı render ediliyor", async () => {
  render(<IletisimFormu />);
  const h1Title = screen.getByRole("heading", { level: 1 });
  expect(h1Title).toBeInTheDocument();
  expect(h1Title).toHaveTextContent("İletişim Formu");
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const adtest = screen.getByTestId("ad");
  await waitFor(() => {
    userEvent.type(adtest, "anıl");
  });
  expect(adtest).not.toBeInvalid();
  const adError = screen.getByTestId("error");
  expect(adError).toBeInTheDocument;
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const buttonTest = screen.getByTestId("button");

  await userEvent.click(buttonTest);
  const errorTests = screen.getAllByTestId("error");
  expect(errorTests).toHaveLength(3);
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const adtest4 = screen.getByTestId("ad");
  const surNameTest4 = screen.getByTestId("soyad");
  const buttonTest4 = screen.getByTestId("button");
  await userEvent.type(adtest4, "mauro");
  userEvent.type(surNameTest4, "Icardi");
  userEvent.click(buttonTest4);
  const error4 = screen.getByTestId("error");
  expect(error4).toBeInTheDocument;
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const emailTest5 = screen.getByTestId("email");
  const emaildiv = screen.getByTestId("emailerror");
  await userEvent.type(emailTest5, "aşkadamı");
  expect(emaildiv).toHaveTextContent(
    "email geçerli bir email adresi olmalıdır."
  );
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const surNameTest5 = screen.getByTestId("soyad");
  const buttonTest6 = screen.getByTestId("button");
  const surNameErrDiv = screen.getByTestId("soyaderror");
  await userEvent.click(buttonTest6);
  expect(surNameErrDiv).toHaveTextContent("soyad gereklidir.");
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const adtest7 = screen.getByTestId("ad");
  const surNameTest7 = screen.getByTestId("soyad");
  const emailTest7 = screen.getByTestId("email");

  await userEvent.type(adtest7, "mauro");
  userEvent.type(surNameTest7, "Icardi");
  userEvent.type(emailTest7, "aşkadamı@aşkınolayım.com");
  const submitButton = screen.getByRole("button", { name: "Gönder" });
  userEvent.click(submitButton);
  const errorMessage = screen.queryAllByTestId("error");
  expect(errorMessage).toHaveLength(0);
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
  const adtest8 = screen.getByLabelText("Ad*");
  const surNameTest8 = screen.getByLabelText("Soyad*");
  const emailTest8 = screen.getByLabelText("Email*");
  const mesajTest8 = screen.getByLabelText("Mesaj");
  const submitButton = screen.getByRole("button", { name: "Gönder" });

  await userEvent.type(adtest8, "mauro");
  userEvent.type(surNameTest8, "Icardi");
  userEvent.type(emailTest8, "aşkadamı@aşkınolayım.com");
  userEvent.type(mesajTest8, "Şampiyon Galatasaray");
  userEvent.click(submitButton);
});
