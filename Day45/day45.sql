ALTER TABLE order_items
ADD COLUMN price_at_purchase DECIMAL(10,2);

-- cập nhật dữ liệu
UPDATE order_items oi
SET price_at_purchase = p.current_price
FROM products p
WHERE oi.product_id = p.id;

ALTER TABLE order_items
ALTER COLUMN price_at_purchase SET NOT NULL;

-- bài 1:
SELECT
    SUM(order_items.quantity * order_items.price_at_purchase)
        AS total_revenue
FROM orders
INNER JOIN order_items
ON orders.id = order_items.order_id;

-- bài 2
SELECT users.id,
       users.full_name,
       SUM(order_items.quantity * order_items.price_at_purchase) AS total_spent
FROM users
JOIN orders ON users.id = orders.user_id
JOIN order_items ON  orders.id = order_items.order_id
WHERE orders.status = 'completed'
AND orders.order_date >= '2026-01-01'
AND orders.order_date < '2026-02-01'
GROUP BY users.id, users.full_name
ORDER BY total_spent DESC
LIMIT 5;

-- bài 3
SELECT
    users.id, users.full_name,
    COUNT(comments.id) AS total_comment
FROM users
JOIN comments ON users.id = comments.user_id
WHERE comments.created_at >= '2026-01-01'
AND comments.created_at < '2026-02-01'
GROUP BY users.id, users.full_name
ORDER BY  total_comment DESC
LIMIT 5;

-- bài 4:
SELECT
    products.id, products.name, products.current_price,
    COUNT(comments.id) AS comment_count
FROM products
LEFT JOIN comments ON products.id = comments.product_id
GROUP BY products.id, products.name, products.current_price
ORDER BY comment_count DESC

-- bài 5:
WITH customer_spending AS (
    SELECT
        orders.user_id,
        SUM(order_items.quantity * order_items.price_at_purchase) AS total_spent
    FROM orders
    JOIN order_items  ON orders.id = order_items.order_id
    WHERE
        orders.status = 'completed'
        AND orders.order_date >= '2026-01-01'
        AND orders.order_date < '2026-02-01'
    GROUP BY orders.user_id
),
avg_spending AS (
    SELECT AVG(total_spent) AS avg_spent
    FROM customer_spending
)
SELECT
    users.id,
    users.full_name,
    customer_spending.total_spent,
    avg_spending.avg_spent
FROM customer_spending
JOIN users ON users.id = customer_spending.user_id
CROSS JOIN avg_spending
WHERE customer_spending.total_spent > avg_spending.avg_spent
ORDER BY customer_spending.total_spent DESC;

-- bài 6:
WITH quantity_product AS (
    SELECT SUM(oi.quantity) AS quantity
    FROM order_items oi
    GROUP BY oi.product_id
)

SELECT p.*, oi.quantity
FROM products p
JOIN order_items oi
ON oi.product_id = p.id
GROUP BY p.id, oi.quantity
HAVING SUM(oi.quantity) = (
    SELECT MAX(quantity)
    FROM quantity_product
)

-- bài 7:
WITH user_order AS (
    SELECT u.id,
           u.username,
           COUNT(DISTINCT o.id),
           SUM(oi.quantity * oi.price_at_purchase) AS total_spent,
           SUM(oi.quantity * oi.price_at_purchase) / COUNT(DISTINCT o.id) AS avg_spent
    FROM users u
    JOIN orders o
    ON u.id = o.user_id
    JOIN order_items oi
    ON oi.order_id = o.id
    WHERE EXTRACT(YEAR FROM o.order_date) = 2026
      AND EXTRACT(MONTH FROM o.order_date) = 1
    GROUP BY u.id, u.username
),
user_comment AS (
    SELECT c.user_id AS id,
           COUNT(DISTINCT c.id) AS total_comment
    FROM comments c
    WHERE EXTRACT(YEAR FROM c.created_at) = 2026
      AND EXTRACT(MONTH FROM c.created_at) = 1
    GROUP BY c.user_id
)

SELECT user_order.*, user_comment.total_comment
FROM user_order
LEFT JOIN user_comment
ON user_order.id = user_comment.id

-- bài 8:
SELECT p.id, p.name, p.current_price, p.category
FROM products p
LEFT JOIN order_items oi
ON p.id = oi.product_id
WHERE oi.product_id ISNULL

-- bài 9:
SELECT
    TO_CHAR(o.order_date, 'MM/YYYY') AS month_year,
    SUM(oi.quantity * oi.price_at_purchase) AS total_revenue,
    COUNT(DISTINCT o.id) AS total_orders,
    SUM(oi.quantity * oi.price_at_purchase) / COUNT(DISTINCT o.id) AS avg_order_value
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE
    o.status = 'completed'
    AND o.order_date >= '2025-12-01'
    AND o.order_date < '2026-02-01'
GROUP BY TO_CHAR(o.order_date, 'MM/YYYY')
ORDER BY MIN(o.order_date);

--bài 10:
SELECT
    users.full_name,
    COUNT(DISTINCT orders.id) AS total_orders,
    SUM(oi.quantity * oi.price_at_purchase) AS total_spent
FROM users
JOIN orders ON users.id = orders.user_id
JOIN order_items oi ON orders.id = oi.order_id
WHERE
    orders.status = 'completed'
    AND orders.order_date >= '2026-01-01'
    AND orders.order_date < '2026-02-01'
GROUP BY users.id, users.full_name
HAVING
    COUNT(DISTINCT orders.id) >= 2
    AND SUM(oi.quantity * oi.price_at_purchase) >= 30000000
ORDER BY total_spent DESC;