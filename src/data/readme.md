# Data Layer

Aplikasi ini menggunakan 3 layer, yaitu: Data Layer, Domain Layer, dan Presentation Layer. Data Layer bertanggung jawab untuk mengakses data dari berbagai sumber, seperti database, API, atau penyimpanan lokal. Data Layer terdiri dari 3 bagian, yaitu: data source, repository, dan model.

## Data Source

Data Source bertanggung jawab untuk mengakses data dari berbagai sumber, seperti database, API, atau penyimpanan lokal. Data Source terdiri dari 3 bagian, yaitu: remote, local, dan shared.

## Repository

Repository bertanggung jawab untuk mengatur sumber data yang digunakan dalam aplikasi. Saat ini terdapat 2 sumber data, yaitu Rest API dan GraphQL API.
