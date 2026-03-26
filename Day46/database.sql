-- 1. BẢNG WALLETS
CREATE TABLE wallets (
    id BIGSERIAL PRIMARY KEY,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    balance NUMERIC(18,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 2. BẢNG TRANSACTION_TYPES
CREATE TABLE transaction_types (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Seed dữ liệu loại giao dịch
INSERT INTO transaction_types (name) VALUES
('deposit'),   -- nạp tiền
('withdraw'),  -- rút tiền
('transfer');  -- chuyển tiền


-- 3. BẢNG TRANSACTIONS
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,

    sender_wallet_id BIGINT NULL,
    receiver_wallet_id BIGINT NULL,

    type_id SMALLINT NOT NULL,

    amount NUMERIC(18,2) NOT NULL CHECK (amount > 0),
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_sender_wallet
        FOREIGN KEY (sender_wallet_id)
        REFERENCES wallets(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_transactions_receiver_wallet
        FOREIGN KEY (receiver_wallet_id)
        REFERENCES wallets(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_transactions_type
        FOREIGN KEY (type_id)
        REFERENCES transaction_types(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- 4. BẢNG TRANSACTION_LOGS
CREATE TABLE transaction_logs (
    id BIGSERIAL PRIMARY KEY,
    transaction_id  BIGINT NOT NULL,
    step  VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success','failed')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_logs_transaction
        FOREIGN KEY (transaction_id)
        REFERENCES transactions(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- TẠI SAO DÙNG NUMERIC(18,2)
-- NUMERIC lưu số theo dạng fixed-point
-- Không bị sai số khi tính toán
-- numeric ra số làm tròn, còn numeric/double ra số xấp xỉ
-- nếu dùng FLOAT sau nhiều lần giao dịch sẽ sai số tích lũy, lệch số dư, không đối soát được, mất tiền hệ thống

-- Tại sao phải lưu cột balance trong wallets
-- - Nếu mỗi lần cần số dư đều SUM từ transactions → rất chậm khi dữ liệu lớn
-- - Tốn tài nguyên và không phù hợp hệ thống realtime
-- - Dễ gây race condition khi nhiều giao dịch đồng thời
--
--  Lưu sẵn balance giúp:
-- - Truy vấn nhanh
-- - Đảm bảo hiệu năng
-- - Kết hợp transaction để vẫn giữ tính chính xác