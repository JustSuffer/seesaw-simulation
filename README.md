# Tahterevalli Simülasyonu (Seesaw Simulation)

Bu proje, saf (pure) JavaScript kullanılarak geliştirilmiş, fizik kurallarına dayalı interaktif bir denge simülasyonudur. Herhangi bir harici kütüphane veya framework (React, jQuery vb.) kullanılmadan, tamamen DOM manipülasyonu ve temel algoritma mantığı ile hazırlanmıştır.

Canlı Demo: https://justsuffer.github.io/seesaw-simulation/

## Projenin Amacı
Projenin temel amacı, kullanıcı etkileşimlerini fizik kurallarıyla birleştirerek tarayıcı üzerinde gerçek zamanlı bir simülasyon oluşturmaktır. Kullanıcı tahterevalli üzerine tıkladığında, sistem ağırlık ve mesafe hesaplamalarını yaparak denge durumunu görselleştirir.

## Teknik Özellikler ve Yetenekler

- Fizik Motoru: Tahterevallinin eğimi, her iki taraftaki toplam tork (Ağırlık x Merkeze Uzaklık) farkına göre dinamik olarak hesaplanır.
- Veri Kalıcılığı (Local Storage): Sayfa yenilense veya tarayıcı kapatılsa bile, simülasyonun son durumu hafızada tutulur ve kaldığı yerden devam eder.
- Log Sistemi: Eklenen her ağırlığın bilgisi (kg, yön, mesafe) anlık olarak arayüzde listelenir.
- Responsive Arayüz: CSS Flexbox yapısı kullanılarak modern ve düzenli bir görünüm sağlanmıştır.
- Sıfırlama Özelliği: Simülasyonu ve hafızayı tamamen temizleyen bir reset mekanizması bulunur.

## Nasıl Çalışır?
Sistemin arkasındaki mantık şu üç adıma dayanır:
1. Koordinat Hesabı: Tahterevalli hareketli bir parça olduğu için, tıklama koordinatları sabit duran "pivot" (denge noktası) referans alınarak hesaplanır.
2. Tork Dengesi: Sağ ve sol taraftaki kuvvetlerin momentleri karşılaştırılır.
3. Görselleştirme: Hesaplanan sonuç, belirli bir sönümleme katsayısı ile açıya dönüştürülür ve CSS transform özelliği ile çubuğa uygulanır.

## Kurulum
Proje statik bir web uygulamasıdır, herhangi bir derleyici veya sunucu kurulumu gerektirmez.
1. Proje dosyalarını bilgisayarınıza indirin.
2. "index.html" dosyasını tarayıcınızda açın.

## İletişim
Geliştirici: İzzet Can Sorna
GitHub: https://github.com/JustSuffer
E-posta: izzet4626@gmail.com
