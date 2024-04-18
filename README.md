# Pokejut

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Stradivary_pokejut&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Stradivary_pokejut)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Stradivary_pokejut&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Stradivary_pokejut)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Stradivary_pokejut&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Stradivary_pokejut)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Stradivary_pokejut&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Stradivary_pokejut)

## Deskripsi

Pokejut merupakan sebuah game virtual pet dimana kamu bisa memilih dan memberi makan pokemon. Ini adalah game sederhana dimana kamu bisa memberi makan pokemon dan mengembangkannya. Kamu juga bisa memilih untuk melepaskan pokemonmu jika kamu tidak menginginkannya lagi.

Aplikasi ini dibuat menggunakan React, React-router-dom, dan MantineUI, dengan menggunakan API dari [PokeAPI](https://pokeapi.co/)., selain itu kode ini mencoba menerapkan konsep dari clean code dan clean architecture.

## Preparasi Project

### Clone this repo

```
git clone [repo link]
```

### Install dependency

```
npm install
```

## Cara Menjalankan Aplikasi

### Menjalankan aplikasi dalam mode development

```
npm run dev
```

### Menjalankan aplikasi dalam mode production

```
npm run build

npm run start
```

## Pengujian dan Coverage

### Menjalankan pengujian

```
npm run test
```

### Melihat coverage

```
npm run cover
```

hasil coverage akan tersimpan di folder coverage, dan bisa diakses dengan membuka file index.html di folder tersebut.

## Stack yang digunakan

| Library           | Versi   | Deskripsi                                              | Ruang Lingkup       |
|-------------------|---------|--------------------------------------------------------|---------------------|
| React             |         | Web Framework untuk Javascript                          | Inti                |
| React-router-dom  |         | Perutean deklaratif untuk React                       | Perutean            |
| MantineUI         |         | Komponen dan hook React untuk RAD                       | Kerangka UI         |
| axios             |         | Klien HTTP berbasis Promise untuk browser dan Node.js  | Permintaan HTTP     |
| react-query       |         | Pengambilan dan penyimpanan data untuk aplikasi React  | Manajemen Data      |
| vite              |         | Compiler                                               | Compiler    |
| vitest            |         | Test Runner untuk Vite                                  | Pengujian           |
| react-testing-library |     | Utilitas pengujian untuk React                         | Pengujian           |


Untuk informasi lebih lanjut, silahkan buka [stack](./STACK.md)

## Struktur Folder

```
pokejut
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── data
│   ├── domain
│   ├── presentation
│   ├── styles
│   ├── utils
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx  
│   └── vite-env.d.ts
├── tests
```

