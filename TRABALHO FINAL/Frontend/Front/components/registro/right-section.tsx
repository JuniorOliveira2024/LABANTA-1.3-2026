"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export const RightSection = () => {
  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [pais, setPais] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [numeroIdentificacao, setNumeroIdentificacao] = useState("");
  const [telefone, setTelefone] = useState("");

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmail(e.target.value);
    } else {
      setEmail("");
    }
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
    } else {
      setPassword("");
    }
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value);
    } else {
      setName("");
    }
  };

  const changeDataNascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDataNascimento(e.target.value);
    } else {
      setDataNascimento("");
    }
  };

  const changePais = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPais(e.target.value);
    } else {
      setPais("");
    }
  };

  const changeLocalidade = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setLocalidade(e.target.value);
    } else {
      setLocalidade("");
    }
  };

  const changeNumeroIdentificacao = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value) {
      setNumeroIdentificacao(e.target.value);
    } else {
      setNumeroIdentificacao("");
    }
  };

  const changeTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTelefone(e.target.value);
    } else {
      setTelefone("");
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // fetch API
    await fetch("http://localhost:8080/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        data_nascimento: dataNascimento,
        pais: pais,
        localidade: localidade,
        numero_identificacao: numeroIdentificacao,
        telefone: telefone,
        email: email,
        password: password,
        role: "cliente",
        enabled: true,
      }),
    }).then((response) => {
      console.log(response.json());
    });
  };

  console.log({ email: email, password: password });

  return (
    <div className="w-1/2 flex flex-col justify-center">
      <Card className="h-full flex flex-col justify-center px-14 gap-16">
        <CardHeader>
          <span className="text-5xl font-bold">Registro</span>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>Nome</Label>
              <Input
                type="text"
                placeholder="Nome completo"
                className="py-2 h-10 text-lg"
                value={name}
                onChange={changeName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Data de nascimento</Label>
              <Input
                type="text"
                placeholder="DD/MM/YYYY"
                className="py-2 h-10 text-lg"
                value={dataNascimento}
                onChange={changeDataNascimento}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>País</Label>
              <Input
                type="text"
                placeholder="País"
                className="py-2 h-10 text-lg"
                value={pais}
                onChange={changePais}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Localidade</Label>
              <Input
                type="text"
                placeholder="Localidade"
                className="py-2 h-10 text-lg"
                value={localidade}
                onChange={changeLocalidade}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Número de identificação</Label>
              <Input
                type="text"
                placeholder="Número de identificação"
                className="py-2 h-10 text-lg"
                value={numeroIdentificacao}
                onChange={changeNumeroIdentificacao}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Telefone</Label>
              <Input
                type="text"
                placeholder="Telefone"
                className="py-2 h-10 text-lg"
                value={telefone}
                onChange={changeTelefone}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="example@example.com"
                className="py-2 h-10 text-lg"
                value={email}
                onChange={changeEmail}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Your password..."
                className="py-2 text-lg h-10"
                value={password}
                onChange={changePassword}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="bg-[#13A4EC] rounded-md text-white font-bold py-3 drop-shadow-lg drop-shadow-gray-200"
            >
              Criar Conta
            </Button>
          </div>
          <div className="flex justify-center gap-1">
            <span>Já tem uma conta? </span>
            <Link href="/login" className="text-[#13A4EC] font-semibold">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
