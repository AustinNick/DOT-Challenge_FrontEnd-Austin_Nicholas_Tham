# DOT-Challenge_BackEnd-Austin_Nicholas_Tham

Ini adalah project RestAPI yang saya buat untuk mengikuti challenge dari DOT Indonesia. Project ini dibuat menggunakan **NestJS** dan **MySQL** sebagai databasenya. Disini saya membuat RestAPI untuk film. Terdapat fitur CRUD untuk film dan kategori film dimana keduanya merupakan relation many to many.

## Documentation Notes

Design Pattern yang digunakan dalam project ini adalah **Clean Architecture**. Alasan saya menggunakan Clean Architecture ialah karena saya ingin membuat project yang scalable dan mudah untuk di maintain. Dengan menggunakan Clean Architecture, saya dapat memisahkan antara business logic, domain logic, dan infrastruktur logic. Hal ini memudahkan saya untuk melakukan perubahan pada project ini di masa depan.

## Cara Menjalankan Project

1. Clone repository ini
2. Install dependencies dengan cara menjalankan perintah `npm install`
3. Buat file `.env` di root project dan isi dengan konfigurasi yang dibutuhkan. Contoh isi file `.env`:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=
    DB_DATABASE=dot_challenge
    ```

4. Jalankan perintah `npm run start:dev` untuk menjalankan project

## API Documentation

API documentation dapat diakses di [sini](https://documenter.getpostman.com/view/10668291/Tz5tYz1z)
