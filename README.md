# Vue Horse Racing Simulator

Bu proje, Vue.js (Vue 3) ve Vuex kullanılarak geliştirilmiş interaktif bir at yarışı simülasyonudur. Kullanıcılar rastgele oluşturulan atlarla çeşitli uzunluktaki yarışları izleyebilir, skor tablolarını görüntüleyebilir ve eğlenceli bir deneyim yaşayabilir.

## Özellikler

- **Rastgele At Oluşturma**: 20 farklı renkte at oluşturulur, her atın kondisyonu rastgele belirlenir.
- **Çoklu Tur Yarışları**: 6 farklı tur (1200m'den 2200m'ye kadar), her turda 10 at yarışır.
- **Dinamik Pist Uzunluğu**: Yarış uzunluğuna göre pist görsel olarak değişir (2200m %100, diğerleri orantısal).
- **Gerçek Zamanlı Güncellemeler**: Atların pozisyonları, hızları ve kronometreleri canlı olarak güncellenir.
- **Skor Tablosu**: Her tur sonrası liderlik tablosu gösterilir.
- **Vuex ile Durum Yönetimi**: Tüm global state Vuex 4 ile yönetilmektedir.
- **Unit Testler**: Vitest ve @vue/test-utils ile kapsamlı birim testleri.
- **E2E Testler**: Cypress ile uçtan uca kullanıcı yolculuğu testleri.

## Teknolojiler

- **Vue 3**: Composition API ile geliştirildi.
- **Vuex 4**: Global state yönetimi için.
- **Vite**: Hızlı geliştirme ve build için.
- **SCSS**: Stil için.
- **Vitest & @vue/test-utils**: Unit testler için.
- **Cypress**: E2E testler için.
