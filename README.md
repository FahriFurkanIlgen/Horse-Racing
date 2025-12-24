# Vue Horse Racing Simulator

Bu proje, Vue.js kullanarak geliştirilmiş interaktif bir at yarışı simülasyonu uygulamasıdır. Kullanıcılar rastgele oluşturulan atlarla çeşitli uzunluktaki yarışları izleyebilir, skor tablolarını görüntüleyebilir ve eğlenceli bir deneyim yaşayabilir.

## Özellikler

- **Rastgele At Oluşturma**: 20 farklı renkte at oluşturulur, her atın kondisyon durumu rastgele belirlenir.
- **Çoklu Tur Yarışları**: 6 farklı tur (1200m'den 2200m'ye kadar), her turda 10 at yarışır.
- **Dinamik Pist Uzunluğu**: Yarış uzunluğuna göre pist görsel olarak değişir (2200m %100, diğerleri orantısal).
- **Gerçek Zamanlı Güncellemeler**: Atların pozisyonları, hızları ve kronometreleri canlı olarak güncellenir.
- **Skor Tablosu**: Her tur sonrası liderlik tablosu gösterilir.

## Teknolojiler

- **Vue 3**: Composition API ile geliştirildi.
- **Pinia**: Durum yönetimi için kullanıldı.
- **Vite**: Hızlı geliştirme ve build için.
- **SCSS**: Stil için.
- **Vitest**: Testler için.
