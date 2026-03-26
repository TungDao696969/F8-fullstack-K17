BEGIN;

-- Lock 2 ví
SELECT id, balance FROM wallets
WHERE id IN (1, 2)
FOR UPDATE;

-- kiểm tra số dư
DO $$
DECLARE
    sender_balance NUMERIC(18,2);
BEGIN
    SELECT balance INTO sender_balance FROM wallets WHERE id = 1;
    IF sender_balance < 100 THEN
        RAISE EXCEPTION 'Số dư không đủ để thực hiện giao dịch';
    END IF;
END $$;

-- trừ tiền vi
UPDATE wallets
SET balance = balance - 100
WHERE id = 1;

-- cộng tiền vi
UPDATE wallets
SET balance = balance + 100
WHERE id = 2;

-- insert bản ghi vào transactions
INSERT INTO transactions (
    sender_wallet_id,
    receiver_wallet_id,
    type_id,
    amount,
    note
) VALUES (
    1,
    2,
    3,
    100,
    'Chuyển tiền từ 1 sang 2'
)
RETURNING id;


INSERT INTO transaction_logs (
    transaction_id,
    step,
    status
) VALUES (
    currval('transactions_id_seq'),
    'Transfer completed',
    'success'
);


COMMIT;

BEGIN;

SELECT id, balance
FROM wallets
WHERE id = 1
FOR UPDATE;


UPDATE wallets
SET balance = balance + 200
WHERE id = 1;


INSERT INTO transactions (
    sender_wallet_id,
    receiver_wallet_id,
    type_id,
    amount,
    note
) VALUES (
    NULL,
    1,
    1,
    200,
    'Nạp tiền vào ví'
)
RETURNING id;

INSERT INTO transaction_logs (
    transaction_id,
    step,
    status
) VALUES (
    currval('transactions_id_seq'),
    'Deposit completed',
    'success'
);

COMMIT;

ROLLBACK;

--nếu bỏ transaction và hai lệnh UPDATE chạy riêng lẻ thì:
-- Trừ tiền ví A xong mà server crash trước khi cộng ví B
-- => Ví A mất tiền, ví B không nhận
-- => Dữ liệu sai lệch