-- Câu 1:
SELECT DISTINCT kh.MaKH, kh.TenKH, kh.DiaChi, kh.SoDT
FROM khack_hang kh
JOIN DAT_PHONG dp 
ON kh.MaKH = dp.MaKH
WHERE kh.DiaChi = 'Hoa xuan';

-- Câu 2:
SELECT
    p.MaPhong,
    p.LoaiPhong,
    p.SoKhachToiDa,
    p.GiaPhong,
    COUNT(dp.MaPhong) AS SoLanDat
FROM phong p
JOIN dat_phong dp 
ON p.MaPhong = dp.MaPhong
WHERE dp.TrangThaiDat = 'Da dat'
GROUP BY
    p.MaPhong,
    p.LoaiPhong,
    p.SoKhachToiDa,
    p.GiaPhong
HAVING COUNT(dp.MaPhong) > 2;

-- Câu 3:
SELECT TenKH
FROM khack_hang
WHERE LEFT(TenKH, 1) IN ('H', 'N', 'M')
  AND LENGTH(TenKH) <= 20;

-- Câu 4:
SELECT DISTINCT tenkh FROM khack_hang

-- Câu 5:
SELECT MaDV, TenDV, DonViTinh, DonGia
FROM dich_vu_di_kem
WHERE (DonViTinh = 'lon' AND DonGia > 10000)
   OR (DonViTinh = 'Cai' AND DonGia < 5000);

-- Câu 6:
SELECT
    dp.MaDatPhong,
    p.MaPhong,
    p.LoaiPhong,
    p.SoKhachToiDa,
    p.GiaPhong,
    kh.MaKH,
    kh.TenKH,
    kh.SoDT,
    dp.NgayDat,
    dp.GioBatDau,
    dp.GioKetThuc,
    ct.MaDV AS MaDichVu,
    ct.SoLuong,
    dv.DonGia
FROM DAT_PHONG dp
JOIN PHONG p              
ON dp.MaPhong = p.MaPhong
JOIN khack_hang kh        
ON dp.MaKH = kh.MaKH
LEFT JOIN CHI_TIET_SU_DUNG_DV ct 
ON dp.MaDatPhong = ct.MaDatPhong
LEFT JOIN DICH_VU_DI_KEM dv      
ON ct.MaDV = dv.MaDV
WHERE EXTRACT(YEAR FROM dp.NgayDat) 
IN (2016, 2017)
  AND p.GiaPhong > 50000;