# Font Hiyerarşisi - Inter Font Sistemi

## 🎨 Kullanılan Font

**Inter** - Google Fonts'tan yükleniyor
- **Weights:** 200, 400, 600
- **Display:** swap (performans için)

---

## 📐 Font Weight Hiyerarşisi

### 1. **font-extralight (200)** - İnce Metinler
**Kullanım Alanları:**
- Timestamp'ler (`2 saat önce`, `15:30`)
- İkincil açıklamalar
- Placeholder metinler
- Kategori etiketleri
- Yardımcı bilgiler
- Alt başlıklar (subtitle)

**Örnek:**
```tsx
<span className="text-xs text-gray-400 font-extralight">
  2 saat önce
</span>
```

---

### 2. **font-normal (400)** - Ana Metinler
**Kullanım Alanları:**
- Body metinler
- Paragraflar
- Liste öğeleri
- Normal içerik
- Varsayılan metin

**Örnek:**
```tsx
<p className="text-gray-700 font-normal">
  Bu bir normal paragraf metnidir.
</p>
```

---

### 3. **font-semibold (600)** - Başlıklar ve Vurgular
**Kullanım Alanları:**
- Başlıklar (h1, h2, h3, h4)
- Buton metinleri
- Link metinleri
- Kullanıcı isimleri
- Önemli sayılar/istatistikler
- Vurgulanması gereken metinler
- Badge/Tag metinleri

**Örnek:**
```tsx
<h2 className="text-xl font-semibold">
  Başlık
</h2>

<button className="px-4 py-2 bg-primary text-white font-semibold">
  Kaydet
</button>
```

---

## 🔄 Yapılan Değişiklikler

### Font Weight Dönüşümleri:
- ✅ `font-bold` (700) → `font-semibold` (600)
- ✅ `font-extrabold` (800) → `font-semibold` (600)
- ✅ `font-medium` (500) → `font-semibold` (600)
- ✅ `font-light` (300) → `font-extralight` (200)
- ✅ `font-thin` (100) → `font-extralight` (200)

### CSS Güncellemeleri:
- ✅ Google Fonts'tan Inter import edildi
- ✅ Wiki content `strong` tag'i: 700 → 600

---

## 📊 Kullanım İstatistikleri

**Toplam Font Weight Kullanımı:** 435+ yer
- `font-semibold`: ~200+ kullanım (başlıklar, butonlar)
- `font-normal`: ~150+ kullanım (normal metinler)
- `font-extralight`: ~85+ kullanım (ince metinler)

---

## ✅ Kullanım Kuralları

### ✅ YAPILMASI GEREKENLER

1. **Başlıklar için:**
   ```tsx
   <h1 className="text-4xl font-semibold">Ana Başlık</h1>
   <h2 className="text-2xl font-semibold">Alt Başlık</h2>
   <h3 className="text-xl font-semibold">Bölüm Başlığı</h3>
   ```

2. **Butonlar için:**
   ```tsx
   <button className="px-4 py-2 bg-primary text-white font-semibold">
     Kaydet
   </button>
   ```

3. **Normal metinler için:**
   ```tsx
   <p className="text-gray-700 font-normal">
     Normal paragraf metni
   </p>
   ```

4. **İnce metinler için:**
   ```tsx
   <span className="text-xs text-gray-400 font-extralight">
     Timestamp veya yardımcı bilgi
   </span>
   ```

### ❌ YAPILMAMASI GEREKENLER

- ❌ `font-bold` (700) kullanma → `font-semibold` kullan
- ❌ `font-medium` (500) kullanma → `font-semibold` veya `font-normal` kullan
- ❌ `font-light` (300) kullanma → `font-extralight` kullan
- ❌ 200, 400, 600 dışında font-weight kullanma

---

## 🎯 Örnek Kullanımlar

### Kart Başlığı
```tsx
<div className="bg-white rounded-xl p-4">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Kart Başlığı
  </h3>
  <p className="text-sm font-normal text-gray-600 mb-1">
    Normal açıklama metni
  </p>
  <span className="text-xs font-extralight text-gray-400">
    2 saat önce
  </span>
</div>
```

### Buton Grubu
```tsx
<div className="flex gap-2">
  <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg">
    Kaydet
  </button>
  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-normal rounded-lg">
    İptal
  </button>
</div>
```

### Kullanıcı Kartı
```tsx
<div className="flex items-center gap-3">
  <img src="avatar.jpg" className="w-10 h-10 rounded-full" />
  <div>
    <h4 className="font-semibold text-gray-900">Kullanıcı Adı</h4>
    <p className="text-sm font-normal text-gray-600">@username</p>
    <span className="text-xs font-extralight text-gray-400">
      Son görülme: 5 dakika önce
    </span>
  </div>
</div>
```

---

## 📈 Performans

- **Font Yükleme:** Google Fonts (CDN)
- **Display:** swap (FOUT önleme)
- **Weights:** Sadece 3 weight (200, 400, 600) - Optimize edilmiş
- **CSS Boyutu:** 115.59 KB (Inter font dahil)

---

**Son Güncelleme:** 29 Kasım 2025  
**Güncellenen Dosya:** 33+ component  
**Build Durumu:** ✅ Başarılı

