# Laporan Jurnal: Sistem Klasifikasi Obat Menggunakan Decision Tree

## Abstrak

Penelitian ini mengembangkan sistem klasifikasi obat menggunakan algoritma Decision Tree untuk memprediksi jenis obat yang tepat berdasarkan karakteristik pasien. Dataset terdiri dari 200 sampel dengan 5 fitur (Age, Sex, BP, Cholesterol, Na_to_K) dan 5 kelas obat (drugA, drugB, drugC, drugX, drugY). Model Decision Tree dengan max_depth=3 menghasilkan akurasi terbaik dengan generalisasi yang baik. Sistem diimplementasikan dalam web application menggunakan Flask untuk prediksi real-time. Hasil menunjukkan Na_to_K ratio sebagai fitur paling penting dalam prediksi obat.

**Kata kunci:** Decision Tree, Klasifikasi Obat, Machine Learning, Flask, Web Application

## 1. Pendahuluan

### 1.1 Latar Belakang

Pemilihan obat yang tepat merupakan aspek kritis dalam pengobatan. Faktor-faktor seperti usia, jenis kelamin, tekanan darah, kolesterol, dan rasio elektrolit mempengaruhi efektivitas obat. Sistem klasifikasi otomatis dapat membantu tenaga medis dalam memilih obat yang sesuai dengan karakteristik pasien.

### 1.2 Tujuan Penelitian

1. Mengembangkan model Decision Tree untuk klasifikasi obat
2. Menganalisis performa model dengan berbagai parameter
3. Mengimplementasikan sistem prediksi dalam web application
4. Mengevaluasi feature importance dalam prediksi obat

## 2. Metodologi

### 2.1 Dataset

Dataset terdiri dari 200 sampel dengan distribusi:
- **drugY**: 91 sampel (45.5%)
- **drugX**: 54 sampel (27.0%)
- **drugC**: 23 sampel (11.5%)
- **drugA**: 16 sampel (8.0%)
- **drugB**: 16 sampel (8.0%)

**Fitur yang digunakan:**
- Age: Usia pasien (15-74 tahun)
- Sex: Jenis kelamin (F/M)
- BP: Tekanan darah (LOW/NORMAL/HIGH)
- Cholesterol: Kolesterol (NORMAL/HIGH)
- Na_to_K: Rasio natrium-kalium (6.269-38.247)

### 2.2 Preprocessing Data

1. **Missing Values**: Tidak ditemukan missing values
2. **Encoding**: LabelEncoder untuk fitur kategorikal
3. **Train-Test Split**: 75% training, 25% testing dengan stratifikasi

### 2.3 Model Development

**Model A**: Decision Tree tanpa batasan
**Model B**: Decision Tree dengan max_depth=3

### 2.4 Evaluasi Model

- Accuracy Score
- Classification Report
- Confusion Matrix
- Feature Importance Analysis

## 3. Hasil dan Pembahasan

### 3.1 Performa Model

| Model | Accuracy | Depth | Leaves |
|-------|----------|-------|--------|
| Model A (Unlimited) | 1.0000 | 8 | 15 |
| Model B (Max Depth=3) | 0.9800 | 3 | 6 |

**Analisis:**
- Model A menunjukkan overfitting dengan akurasi 100%
- Model B memiliki generalisasi lebih baik dengan akurasi 98%
- Model B dipilih sebagai model terbaik

### 3.2 Feature Importance

| Fitur | Importance (%) |
|-------|----------------|
| Na_to_K | 49.0 |
| BP | 20.3 |
| Age | 15.2 |
| Cholesterol | 10.4 |
| Sex | 5.1 |

**Interpretasi:**
- Na_to_K ratio merupakan fitur paling determinan
- BP dan Age memiliki kontribusi signifikan
- Sex memiliki pengaruh paling kecil

### 3.3 Visualisasi Decision Tree

Model B menghasilkan pohon keputusan yang:
- Mudah diinterpretasi dengan depth=3
- Memiliki 6 leaf nodes
- Menunjukkan split criteria yang jelas

### 3.4 Web Application

Sistem web application berhasil diimplementasikan dengan fitur:
- Form input yang user-friendly
- Prediksi real-time
- Visualisasi probabilitas obat
- Chart feature importance
- Responsive design

## 4. Kesimpulan

1. **Model Decision Tree** dengan max_depth=3 menghasilkan performa terbaik dengan akurasi 98%
2. **Na_to_K ratio** merupakan fitur paling penting dalam prediksi obat
3. **Web application** berhasil diimplementasikan untuk prediksi real-time
4. **Model interpretable** memudahkan analisis dan validasi medis

## 5. Saran Pengembangan

1. **Validasi Medis**: Perlu konsultasi dengan tenaga medis untuk validasi klinis
2. **Dataset Expansion**: Penambahan data untuk meningkatkan generalisasi
3. **Model Ensemble**: Implementasi ensemble methods untuk performa lebih baik
4. **Real-time Integration**: Integrasi dengan sistem informasi rumah sakit

## 6. Daftar Pustaka

1. Breiman, L. (2001). Random forests. Machine learning, 45(1), 5-32.
2. Quinlan, J. R. (1986). Induction of decision trees. Machine learning, 1(1), 81-106.
3. Scikit-learn: Machine Learning in Python. Pedregosa et al., JMLR 12, pp. 2825-2830, 2011.
4. Flask Documentation. https://flask.palletsprojects.com/

## Lampiran

### A. Kode Implementasi

**Model Training:**
```python
from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)
```

**Web Application:**
```python
from flask import Flask, render_template, request
app = Flask(__name__)
```

### B. Screenshot Web Application

[Gambar 1: Interface Utama]
[Gambar 2: Hasil Prediksi]
[Gambar 3: Visualisasi Chart]

### C. Dataset Statistics

- Total samples: 200
- Features: 5
- Classes: 5
- Missing values: 0
- Data types: Mixed (numerical + categorical)

---

**Informasi Penulis:**
- Nama: [Nama Peneliti]
- Institusi: [Nama Institusi]
- Email: [email@institusi.ac.id]
- Tanggal: [Tanggal Penulisan]

**Catatan:** Laporan ini dibuat untuk keperluan akademik dan penelitian. Sistem tidak dimaksudkan untuk menggantikan konsultasi medis profesional.
